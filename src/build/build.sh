#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
COMPONENT_BUILDER="${SCRIPT_DIR}/component-builder.mjs"
BUILD_ALL="${SCRIPT_DIR}/build-all.sh"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

usage() {
    cat <<'EOF'
SFTi Build Toolkit
==================

Usage:
  ./build.sh component [options] <component> [desktop|mobile|both] <domain|all>
  ./build.sh component-manifest [--manifest path] [--clean] [--dry-run]
  ./build.sh all [args]
  ./build.sh help

Component Options:
  -c, --component    Component id (e.g. navbar, svg-card, ticker)
  -v, --variant      Variant to build: desktop, mobile, both (default: both)
  -d, --domain       Target domain slug (www, dev, server) or 'all' for all domains
  --clean            Remove previously generated files before building
  --dry-run          Validate inputs without invoking the builder

Platform Definitions:
  desktop            Screen width > 768px (includes tablets in landscape)
  mobile             Screen width <= 768px (includes phones and small tablets)

Component Dependencies:
  mobile navbar      Includes integrated ticker functionality
  desktop navbar     Excludes ticker (never displays correctly on desktop)

Examples:
  ./build.sh component navbar desktop dev
  ./build.sh component navbar both all --clean
  ./build.sh component -c card -v both -d www --clean
  ./build.sh component ticker mobile dev
  ./build.sh component-manifest --manifest ./src/build/components.manifest.json
  ./build.sh all clean
EOF
}

log_info()  { echo -e "${BLUE}[build]${NC} $1"; }
log_warn()  { echo -e "${YELLOW}[build]${NC} $1"; }
log_error() { echo -e "${RED}[build]${NC} $1"; }
log_done()  { echo -e "${GREEN}[build]${NC} $1"; }

ensure_node() {
    if ! command -v node >/dev/null 2>&1; then
        log_error "Node.js is required for component builds"
        exit 1
    fi
}

component_filename() {
    local name="$1"
    if [[ "$name" != *.js ]]; then
        name="${name}.js"
    fi
    printf '%s' "$name"
}

normalize_variant() {
    local raw="${1:-both}"
    raw="${raw,,}"
    case "$raw" in
        desktop|mobile|both)
            printf '%s' "$raw"
            ;;
        *)
            log_error "Unknown variant '${1}' (expected desktop, mobile, or both)"
            exit 1
            ;;
    esac
}

ensure_domain_exists() {
    local domain="$1"
    local domain_dir="${PROJECT_ROOT}/${domain}"
    if [[ ! -d "$domain_dir" ]]; then
        log_error "Domain directory not found: ${domain}"
        exit 1
    fi
}

ensure_domain_structure() {
    local domain="$1"
    local domain_components_root="${PROJECT_ROOT}/${domain}/components/${domain}.c"
    local management_root="${PROJECT_ROOT}/components/${domain}"

    mkdir -p "${domain_components_root}/desktop.c" "${domain_components_root}/mobile.c"
    mkdir -p "${management_root}/desktop" "${management_root}/mobile"
}

reset_component_directories() {
    local domain="$1"
    ensure_domain_structure "$domain"

    local domain_root="${PROJECT_ROOT}/${domain}/components/${domain}.c"
    local management_root="${PROJECT_ROOT}/components/${domain}"

    find "${domain_root}/desktop.c" -maxdepth 1 -type f -name '*.js' -delete 2>/dev/null || true
    find "${domain_root}/mobile.c" -maxdepth 1 -type f -name '*.js' -delete 2>/dev/null || true
    find "${management_root}/desktop" -maxdepth 1 -type f -name '*.js' -delete 2>/dev/null || true
    find "${management_root}/mobile" -maxdepth 1 -type f -name '*.js' -delete 2>/dev/null || true
}

component_exists() {
    local component="$1"
    local variant="$2"
    local filename
    filename="$(component_filename "$component")"

    case "$variant" in
        desktop)
            if [[ ! -f "${PROJECT_ROOT}/components/global.c/desktop/${filename}" ]]; then
                log_error "Missing desktop component: components/global.c/desktop/${filename}"
                exit 1
            fi
            ;;
        mobile)
            if [[ ! -f "${PROJECT_ROOT}/components/global.c/mobile/${filename}" ]]; then
                log_error "Missing mobile component: components/global.c/mobile/${filename}"
                exit 1
            fi
            ;;
        both)
            component_exists "$component" desktop
            component_exists "$component" mobile
            ;;
    esac
}

clean_component_outputs() {
    local component="$1"
    local variant="$2"
    local domain="$3"
    local filename="$(component_filename "$component")"
    local domain_root="${PROJECT_ROOT}/${domain}/components/${domain}.c"
    local management_root="${PROJECT_ROOT}/components/${domain}"

    if [[ "$variant" == "desktop" || "$variant" == "both" ]]; then
        rm -f "${domain_root}/desktop.c/${filename}" 2>/dev/null || true
        rm -f "${management_root}/desktop/${filename}" 2>/dev/null || true
    fi

    if [[ "$variant" == "mobile" || "$variant" == "both" ]]; then
        rm -f "${domain_root}/mobile.c/${filename}" 2>/dev/null || true
        rm -f "${management_root}/mobile/${filename}" 2>/dev/null || true
    fi
}

detect_domain_styles() {
    local domain="$1"
    local styles_dir="${PROJECT_ROOT}/${domain}/${domain}.styles"
    if [[ -d "$styles_dir" ]]; then
        log_info "Using theme tokens from ${domain}/${domain}.styles/" >&2
        printf '%s' "$styles_dir"
    else
        log_warn "No theme styles directory found for domain '${domain}'" >&2
        printf ''
    fi
}

build_single_domain() {
    local component="$1"
    local variant="$2"
    local domain="$3"
    local clean_outputs="${4:-false}"
    local dry_run="${5:-false}"
    
    variant="$(normalize_variant "$variant")"
    ensure_domain_exists "$domain"
    component_exists "$component" "$variant"
    ensure_domain_structure "$domain"

    if [[ "$clean_outputs" == true ]]; then
        clean_component_outputs "$component" "$variant" "$domain"
    fi

    local styles_dir
    styles_dir="$(detect_domain_styles "$domain")"

    log_info "Building '${component}' (${variant}) for domain '${domain}'"

    if [[ "$dry_run" == true ]]; then
        log_done "Dry run complete. No files were generated."
        return
    fi

    local node_cmd=(node "$COMPONENT_BUILDER" --root "$PROJECT_ROOT" --component "$component" --variant "$variant" --domain "$domain")

    if [[ -n "$styles_dir" ]]; then
        SFTI_THEME_DIRECTORY="$styles_dir" "${node_cmd[@]}"
    else
        "${node_cmd[@]}"
    fi

    log_done "Finished '${component}' (${variant}) for '${domain}'"
}

run_component_build() {
    ensure_node

    local component=""
    local variant="both"
    local domain=""
    local clean_outputs=false
    local dry_run=false

    while [[ $# -gt 0 ]]; do
        case "$1" in
            -c|--component)
                component="$2"
                shift 2
                ;;
            -v|--variant)
                variant="$2"
                shift 2
                ;;
            -d|--domain)
                domain="$2"
                shift 2
                ;;
            --clean)
                clean_outputs=true
                shift
                ;;
            --dry-run)
                dry_run=true
                shift
                ;;
            --)
                shift
                break
                ;;
            *)
                if [[ -z "$component" ]]; then
                    component="$1"
                else
                    local candidate="${1,,}"
                    if [[ "$variant" == "both" && "$candidate" =~ ^(desktop|mobile|both)$ ]]; then
                        variant="$candidate"
                    elif [[ -z "$domain" ]]; then
                        domain="$1"
                    else
                        log_error "Unexpected argument: $1"
                        usage
                        exit 1
                    fi
                fi
                shift
                ;;
        esac
    done

    if [[ -z "$component" || -z "$domain" ]]; then
        log_error "Component id and domain are required"
        usage
        exit 1
    fi

    domain="${domain,,}"
    domain="${domain#/}"
    domain="${domain%/}"

    # Handle "all" domain by building for all available domains
    if [[ "$domain" == "all" ]]; then
        local available_domains=("www" "dev" "server")
        log_info "Building '${component}' (${variant}) for all domains"
        
        for target_domain in "${available_domains[@]}"; do
            if [[ -d "${PROJECT_ROOT}/${target_domain}" ]]; then
                log_info "Building for domain: ${target_domain}"
                build_single_domain "$component" "$variant" "$target_domain" "$clean_outputs" "$dry_run"
            else
                log_warn "Skipping domain '${target_domain}' - directory not found"
            fi
        done
        return
    fi

    build_single_domain "$component" "$variant" "$domain" "$clean_outputs" "$dry_run"
}

run_manifest_build() {
    ensure_node

    local manifest_path="${SCRIPT_DIR}/components.manifest.json"
    local clean_outputs=false
    local dry_run=false

    while [[ $# -gt 0 ]]; do
        case "$1" in
            -m|--manifest)
                manifest_path="$2"
                shift 2
                ;;
            --clean)
                clean_outputs=true
                shift
                ;;
            --dry-run)
                dry_run=true
                shift
                ;;
            --)
                shift
                break
                ;;
            *)
                log_error "Unknown option for component-manifest: $1"
                usage
                exit 1
                ;;
        esac
    done

    if [[ ! -f "$manifest_path" ]]; then
        log_error "Manifest not found: $manifest_path"
        exit 1
    fi

    local entries
    entries=$(node -e "const fs=require('fs');const file=process.argv[1];const manifest=JSON.parse(fs.readFileSync(file,'utf8'));if(!Array.isArray(manifest)){throw new Error('Manifest must be an array');}const lines=manifest.map((entry,index)=>{if(!entry||!entry.component||!entry.domain){throw new Error('Invalid manifest entry at index '+index);}
const variant=(entry.variant||'both').toString().toLowerCase();
return [entry.component,variant,entry.domain].join('\t');});process.stdout.write(lines.join('\n'))" "$manifest_path") || {
        log_error "Failed to parse manifest at $manifest_path"
        exit 1
    }

    if [[ -z "$entries" ]]; then
        log_warn "Manifest is empty: $manifest_path"
        return
    fi

    local -A manifest_domains=()
    local -a entry_lines=()

    while IFS= read -r line; do
        [[ -z "$line" ]] && continue
        entry_lines+=("$line")
        IFS=$'\t' read -r parsed_component parsed_variant parsed_domain <<< "$line"
        manifest_domains["$parsed_domain"]=1
    done <<< "$entries"

    if [[ "$clean_outputs" == true ]]; then
        for domain in "${!manifest_domains[@]}"; do
            reset_component_directories "$domain"
        done
    else
        for domain in "${!manifest_domains[@]}"; do
            ensure_domain_structure "$domain"
        done
    fi

    local manifest_rel="${manifest_path#${PROJECT_ROOT}/}"
    log_info "Running component manifest from ${manifest_rel}"

    for line in "${entry_lines[@]}"; do
        IFS=$'\t' read -r component variant domain <<< "$line"
        [[ -z "$component" ]] && continue

        local extra_args=()
        [[ "$clean_outputs" == true ]] && extra_args+=(--clean)
        [[ "$dry_run" == true ]] && extra_args+=(--dry-run)
        run_component_build --component "$component" --variant "$variant" --domain "$domain" "${extra_args[@]}"
    done
}

COMMAND="${1:-help}"
shift || true

case "$COMMAND" in
    help|-h|--help)
        usage
        ;;
    component)
        run_component_build "$@"
        ;;
    component-manifest|manifest)
        run_manifest_build "$@"
        ;;
    all)
        "$BUILD_ALL" "$@"
        ;;
    *)
        log_error "Unknown command: $COMMAND"
        usage
        exit 1
        ;;
esac