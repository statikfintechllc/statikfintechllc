#!/usr/bin/env node
// @ts-nocheck
import { promises as fs } from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const argMap = {};
for (let i = 0; i < args.length; i += 1) {
    const key = args[i];
    if (!key.startsWith('--')) continue;
    const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;
    argMap[key.replace(/^--/, '')] = value;
}

const projectRoot = path.resolve(argMap.root || path.join(__dirname, '..'));
const componentNameInput = (argMap.component || '').trim();
const variantInput = (argMap.variant || '').toLowerCase();
const domain = (argMap.domain || '').trim();

let themeDirectoryUsed = null;

if (!componentNameInput || !variantInput || !domain) {
    console.error('[component-builder] Usage: node component-builder.mjs --component <name> --variant <desktop|mobile|both> --domain <domain> [--root <path>]');
    process.exit(1);
}

const componentFileName = componentNameInput.endsWith('.js') ? componentNameInput : `${componentNameInput}.js`;
const componentName = componentFileName.replace(/\.js$/, '');
const variantSet = new Set();

switch (variantInput) {
    case 'desktop':
    case 'mobile':
        variantSet.add(variantInput);
        break;
    case 'both':
        variantSet.add('desktop');
        variantSet.add('mobile');
        break;
    default:
        console.error(`[component-builder] Unsupported variant "${variantInput}". Use desktop, mobile, or both.`);
        process.exit(1);
}

const globalComponentsDir = path.join(projectRoot, 'components', 'global.c');
const domainDir = path.join(projectRoot, domain);
const domainComponentRoot = path.join(domainDir, 'components');
const managementRoot = path.join(projectRoot, 'components', domain);

async function pathExists(targetPath) {
    try {
        await fs.access(targetPath);
        return true;
    } catch (err) {
        return false;
    }
}

function toPascalCase(value) {
    return value
        .split(/[^a-zA-Z0-9]+/)
        .filter(Boolean)
        .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join('');
}

function toCamelCase(value) {
    const pascal = toPascalCase(value);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function normalizeTokenKey(rawKey) {
    const cleaned = rawKey
        .replace(/^--/, '')
        .replace(/-color$/i, '')
        .replace(/-?colour$/i, '')
        .replace(/[^a-z0-9]+/gi, '-');
    return toCamelCase(cleaned);
}

async function extractThemeTokens() {
    const override = process.env.SFTI_THEME_DIRECTORY;
    const stylesDir = override
        ? (path.isAbsolute(override) ? override : path.join(projectRoot, override))
        : path.join(domainDir, `${domain}.styles`);

    themeDirectoryUsed = stylesDir;

    const tokens = {};
    let tokenCount = 0;

    if (!(await pathExists(stylesDir))) {
        if (override) {
            const display = path.relative(projectRoot, stylesDir);
            console.warn(`[component-builder] Theme directory override not found: ${display}`);
        }
        return tokens;
    }

    const entries = await fs.readdir(stylesDir, { withFileTypes: true });
    const cssFiles = entries
        .filter(entry => entry.isFile() && /\.(css|scss|sass)$/i.test(entry.name))
        .map(entry => entry.name);

    for (const fileName of cssFiles) {
        const filePath = path.join(stylesDir, fileName);
        const content = await fs.readFile(filePath, 'utf8');
        const rootBlocks = content.match(/:root\s*\{[^}]+\}/gi) || [];

        for (const block of rootBlocks) {
            const declarations = block.replace(/^[^{]*\{/, '').replace(/\}$/, '').split(';');
            for (const entry of declarations) {
                const [rawKey, rawValue] = entry.split(':');
                if (!rawKey || !rawValue) continue;
                const key = normalizeTokenKey(rawKey.trim());
                const value = rawValue.trim();
                if (!key || !value) continue;
                tokens[key] = value;
                tokenCount += 1;
            }
        }
    }

    if (tokenCount > 0) {
        return tokens;
    }

    return {};
}

function buildRegistrationSnippet(domainName, variantName, componentId, themeTokens) {
    const serializedTokens = JSON.stringify(themeTokens, null, 4);
    const tokenPayload = serializedTokens || '{}';
    const pascalComponent = toPascalCase(componentId);
    const pascalDomain = toPascalCase(domainName);
    const variantLabel = variantName === 'mobile' ? 'Mobile' : 'Desktop';
    const exportName = `${pascalDomain}${pascalComponent}${variantLabel}`;
    const factoryName = `create${exportName}`;

    return `
(function registerSFTiDomainBindings() {
    const domain = '${domainName}';
    const variant = '${variantName}';
    const component = '${componentId}';
    const themeTokens = ${tokenPayload};
    const globalObj = typeof window !== 'undefined' ? window : globalThis;

    const registrar = (typeof registerDomainTheme === 'function' && registerDomainTheme)
        || (globalObj && typeof globalObj.registerDomainTheme === 'function' && globalObj.registerDomainTheme)
        || null;

    if (registrar && themeTokens && Object.keys(themeTokens).length) {
        registrar(domain, themeTokens);
    }

    const resolver = (typeof getSFTiComponent === 'function' && getSFTiComponent)
        || (globalObj && typeof globalObj.getSFTiComponent === 'function' && globalObj.getSFTiComponent)
        || null;

    const registry = (typeof registerSFTiComponent === 'function' && registerSFTiComponent)
        || (globalObj && typeof globalObj.registerSFTiComponent === 'function' && globalObj.registerSFTiComponent)
        || null;

    let implementation = resolver ? resolver('global', variant, component) : null;

    if (!implementation && globalObj) {
        if (variant === 'mobile' && globalObj['SFTiMobile${pascalComponent}']) {
            implementation = globalObj['SFTiMobile${pascalComponent}'];
        } else if (globalObj['SFTi${pascalComponent}']) {
            implementation = globalObj['SFTi${pascalComponent}'];
        }
    }

    let DomainImplementation = implementation;

    if (implementation && typeof implementation === 'function') {
        DomainImplementation = class extends implementation {
            constructor(config = {}) {
                const nextConfig = (config && typeof config === 'object') ? { ...config } : {};
                if (!nextConfig.domain) {
                    nextConfig.domain = domain;
                }
                super(nextConfig);
            }
        };
        Object.setPrototypeOf(DomainImplementation, implementation);
    }

    if (!DomainImplementation) {
        if (globalObj && globalObj.console && typeof globalObj.console.warn === 'function') {
            globalObj.console.warn('[SFTi] Missing base implementation for ' + domain + '/' + variant + '/' + component);
        }
        return;
    }

    if (registry) {
        registry({ domain, variant, name: component, implementation: DomainImplementation });
    }

    if (globalObj) {
        if (!globalObj['${exportName}']) {
            globalObj['${exportName}'] = DomainImplementation;
        }
        if (!globalObj['${factoryName}']) {
            globalObj['${factoryName}'] = (config = {}) => new DomainImplementation(config);
        }
        globalObj.SFTiComponents = globalObj.SFTiComponents || {};
        globalObj.SFTiComponents[domain] = globalObj.SFTiComponents[domain] || {};
        globalObj.SFTiComponents[domain][variant] = globalObj.SFTiComponents[domain][variant] || {};
        globalObj.SFTiComponents[domain][variant][component] = DomainImplementation;
    }
})();
`;
}

async function buildVariant(variant, themeTokens) {
    const sourcePath = path.join(globalComponentsDir, variant, componentFileName);
    if (!(await pathExists(sourcePath))) {
        throw new Error(`Global component not found: ${path.relative(projectRoot, sourcePath)}`);
    }

    const sourceContent = await fs.readFile(sourcePath, 'utf8');

    const header = `/**
 * Auto-generated domain component
 * Domain   : ${domain}
 * Variant  : ${variant}
 * Component: ${componentName}
 * Source   : ${path.relative(projectRoot, sourcePath)}
 * Generated: ${new Date().toISOString()}
 */
`;

    const registration = buildRegistrationSnippet(domain, variant, componentName, themeTokens);
    const output = `${header}
${sourceContent}
${registration}
`;

    const domainTargetDir = path.join(domainComponentRoot, `${domain}.c`, `${variant}.c`);
    const managementTargetDir = path.join(managementRoot, variant);

    await fs.mkdir(domainTargetDir, { recursive: true });
    await fs.mkdir(managementTargetDir, { recursive: true });

    const domainTargetPath = path.join(domainTargetDir, componentFileName);
    const managementTargetPath = path.join(managementTargetDir, componentFileName);

    await fs.writeFile(domainTargetPath, output, 'utf8');
    await fs.writeFile(managementTargetPath, output, 'utf8');

    console.log(`[component-builder] Built ${componentName} (${variant}) for ${domain}`);
    console.log(`  ↳ ${path.relative(projectRoot, domainTargetPath)}`);
    console.log(`  ↳ ${path.relative(projectRoot, managementTargetPath)}`);
}

async function main() {
    if (!(await pathExists(globalComponentsDir))) {
        throw new Error('Global components directory not found.');
    }

    if (!(await pathExists(domainDir))) {
        throw new Error(`Domain directory not found: ${path.relative(projectRoot, domainDir)}`);
    }

    if (!(await pathExists(domainComponentRoot))) {
        throw new Error(`Domain component root missing: ${path.relative(projectRoot, domainComponentRoot)}`);
    }

    const themeTokens = await extractThemeTokens();
    const themeCount = Object.keys(themeTokens).length;
    if (themeDirectoryUsed) {
        const display = path.relative(projectRoot, themeDirectoryUsed);
        if (themeCount > 0) {
            console.log(`[component-builder] Loaded ${themeCount} theme tokens from ${display}`);
        } else {
            console.log(`[component-builder] No theme tokens discovered in ${display}`);
        }
    }

    for (const variant of variantSet) {
        await buildVariant(variant, themeTokens);
    }
}

main().catch(err => {
    console.error('[component-builder] Build failed:', err.message);
    process.exit(1);
});
