# Copilot Instructions for statikfintechllc Repository

## Repository Overview

This is the main GitHub profile repository for **statikfintechllc** (Statik DK Smoke | SFTi | Sovereign Systems). It serves as a dynamic, automated profile page with custom badges, animated SVG statistics, and featured work showcases.

## Repository Structure

```
.
├── README.md                    # Main profile page with dynamic content
├── badges/                      # Custom SVG badges
│   ├── ai_architect.svg
│   ├── full_stack_dev.svg
│   └── prompt_blacksmith.svg
├── docs/                        # SVG generation workspace
│   ├── README.md               # Documentation for SVG animations
│   ├── c.svg/                  # Crimson Flow (GitHub activity charts)
│   │   ├── assets/
│   │   ├── package.json
│   │   └── scripts/generate-crimson-flow.mjs
│   ├── s.svg/                  # Streak statistics
│   │   ├── assets/
│   │   ├── package.json
│   │   └── scripts/build-streak.mjs
│   ├── t.svg/                  # Trophies/achievements
│   │   ├── assets/
│   │   ├── package.json
│   │   └── scripts/build-trophies.mjs
│   └── v.svg/                  # Profile view traffic
│       ├── assets/
│       ├── package.json
│       └── scripts/build-pv.mjs
└── .github/
    ├── workflows/              # Automated SVG generation
    │   ├── update-crimson-flow.yml
    │   ├── update-profile-streak.yml
    │   ├── update-profile-trophies.yml
    │   └── update-profile-views.yml
    └── FUNDING.yml             # Sponsorship configuration
```

## Core Components

### 1. Dynamic SVG Generation System

The repository features an automated SVG generation system with four main components:

- **Crimson Flow (`c.svg/`)**: Animated GitHub activity charts using GraphQL API
- **Streak (`s.svg/`)**: Contribution streak visualization with flame animations
- **Trophies (`t.svg/`)**: Achievement and trophy displays
- **Profile Views (`v.svg/`)**: Traffic and visitor statistics

Each component:
- Has its own Node.js package with `package.json`
- Contains a `scripts/` directory with generation logic
- Outputs to `assets/` directory
- Is automated via GitHub Actions

### 2. GitHub Actions Workflows

All SVG components are automatically updated via scheduled workflows:
- Run on cron schedules (typically every 5-6 hours)
- Use `PULL_STATIK_PAT` token for API access
- Automatically commit and push updates
- Handle dependencies and Node.js setup

### 3. Custom Badge System

Static SVG badges in `/badges/` for professional branding:
- `ai_architect.svg`
- `full_stack_dev.svg` 
- `prompt_blacksmith.svg`

## Technical Guidelines

### Working with SVG Generators

When modifying or debugging SVG generation:

1. **Environment Variables Required**:
   - `GH_TOKEN` or `GITHUB_TOKEN`: GitHub API access
   - `USER_LOGIN`: GitHub username (defaults to "statikfintechllc")
   - `PAT_GITHUB`: Personal access token for some components

2. **Local Development**:
   ```bash
   cd docs/{component}.svg/
   npm install
   npm run build:{component}
   ```

3. **GraphQL Integration**:
   - All components use GitHub GraphQL API
   - Implement proper error handling and retry logic
   - Use appropriate User-Agent headers

### Code Standards

- **JavaScript/Node.js**: Use ES modules (`.mjs` files)
- **Node Version**: Require Node.js >= 20
- **Error Handling**: Implement robust error handling for API calls
- **Environment**: All scripts should handle missing tokens gracefully

### GitHub Actions Maintenance

When updating workflows:
- Maintain Node.js version consistency (v20)
- Preserve secret token usage patterns
- Keep automated git configuration intact
- Test schedule changes carefully to avoid rate limits

## Contributing Guidelines

### For Issues and PRs

When working on this repository:

1. **Preserve Automation**: Never break the automated SVG generation system
2. **Minimal Changes**: Make surgical modifications to maintain stability
3. **Test Locally**: Test SVG generation scripts before pushing
4. **Respect Rate Limits**: Be mindful of GitHub API rate limiting
5. **Maintain Structure**: Follow the established directory structure

### Common Tasks

**Adding New SVG Component**:
1. Create new directory in `docs/`
2. Add `package.json` with appropriate scripts
3. Create generation script in `scripts/`
4. Add corresponding GitHub Action workflow
5. Update main README.md to reference new component

**Updating Existing Components**:
1. Test changes locally first
2. Verify API token requirements
3. Check that automated workflows still function
4. Ensure output SVG maintains expected format

**Modifying README.md**:
1. Preserve all external image references
2. Maintain the structured badge layout
3. Keep sponsorship links intact
4. Test that all links remain functional

## Key Features to Preserve

- **Dynamic Statistics**: All GitHub stats should remain live and updating
- **Professional Branding**: Consistent color scheme (`#e11d48` red, gold accents)
- **Sponsorship Integration**: Multiple funding platforms properly linked
- **Social Media Links**: Complete contact information preserved
- **Featured Projects**: Project showcases with live stats

## Security Considerations

- All API tokens are stored as GitHub secrets
- No sensitive data should be committed to the repository
- SVG generation scripts should handle authentication securely
- Rate limiting and error handling must be maintained

## Troubleshooting

**Common Issues**:
- **API Rate Limits**: Implement exponential backoff in scripts
- **Token Expiration**: Check `PULL_STATIK_PAT` secret validity
- **SVG Not Updating**: Verify workflow permissions and token scopes
- **Node Dependencies**: Ensure `package-lock.json` files are maintained

**Debug Steps**:
1. Check GitHub Actions logs for errors
2. Verify API token permissions
3. Test scripts locally with proper environment variables
4. Validate SVG output syntax

---

*This repository represents the professional profile and technical capabilities of statikfintechllc. Maintain the high standard of automation, visual appeal, and technical excellence when contributing.*