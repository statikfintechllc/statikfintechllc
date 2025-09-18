**SFTi-Web.Template Full Structure**

```txt
.
├── About Us
│   ├── CODE_OF_CONDUCT.md
│   ├── CONTRIBUTING.md
│   ├── Cover_Letter.docx
│   ├── FOUNDER_LOG.md
│   ├── FOUNDER_STATEMENT.md
│   ├── Final_Leg_v1.0.3.md
│   ├── GREMLINGPT-v1.0.3_PATCH_PLAN.md
│   ├── GREMLINGPT_AUTONOMY_REPORT.md
│   ├── LICENSE.md
│   ├── OPEN_FUNDING_PROPOSAL.md
│   ├── OpenAI.md
│   ├── Resume.pdf
│   ├── SECURITY.md
│   └── WHY_GREMLINGPT.md
├── DEVELOPMENT.md
├── LICENSE.md
├── README.md
├── SVG.README.md
├── ZMB.svg
│   ├── Medium.papers.svg
│   │   ├── README.md
│   │   ├── breaking-the-loop.svg
│   │   ├── building-an-autonomous-aidriven-ide-pipeline.svg
│   │   ├── burj-khalifa-and-the-resonant-lie.svg
│   │   ├── capital-capture.svg
│   │   ├── contribution-revolution.svg
│   │   ├── designing-gremlingpt.svg
│   │   ├── gremlingpts-structural-extraction.svg
│   │   ├── how-icann-stole-the-internet.svg
│   │   ├── its-not-the-ai-but-the-system.svg
│   │   ├── open-isnt-open.svg
│   │   ├── selfforking-ai-and-the-mechanic-from-kansas.svg
│   │   ├── the-disappearance-of-the-openai-mcp-repo.svg
│   │   ├── the-govseverance-doctrine.svg
│   │   ├── the-lessons-i-am-learning.svg
│   │   ├── the-pivot-that-broke-productmarket-fit.svg
│   │   ├── the-wealth-power-imbalance-and-economic-servitude.svg
│   │   └── while-dubai-built-control-i-built-an-autonomous-mind.svg
│   ├── README.md
│   ├── Zenodo.papers.svg
│   │   ├── README.md
│   │   ├── economic-sovereignty-through-decentralized-ai.svg
│   │   ├── rise-of-recursive-autonomous-cognitive-ai-systems.svg
│   │   └── the-gremlingpt-architecture-localized-recursive-ai.svg
│   ├── badges
│   │   ├── G.H.badge.svg
│   │   ├── G.I.badge.svg
│   │   ├── L.W.badge.svg
│   │   ├── M.P.badge.svg
│   │   ├── R.S.badge.svg
│   │   ├── README.md
│   │   ├── Z.P.badge.svg
│   │   ├── ai_architect.svg
│   │   ├── bitcoin.sponsor.svg
│   │   ├── cashapp.sponsor.svg
│   │   ├── chime.sponsor.svg
│   │   ├── ethereum.sponsor.svg
│   │   ├── full_stack_dev.svg
│   │   ├── g.h.svg
│   │   ├── git.sponsor.svg
│   │   ├── kofi.sponsor.svg
│   │   ├── patreon.sponsor.svg
│   │   ├── paypal.sponsor.svg
│   │   ├── prompt_blacksmith.svg
│   │   └── purdue.banner.svg
│   ├── builder.script
│   │   ├── README.md
│   │   └── builder.script.mjs
│   └── txt.txt
├── build.sh
├── build_dashboard_html.py
├── builder.script
│   └── BAi.script.mjs
├── components
│   └── ui
│       ├── card.tsx
│       └── mobile-navigation.tsx
├── components.json
├── custom.css
├── dev-server.js
├── dev.sfti-ai.org
│   ├── IB-G.Scanner
│   │   ├── Documentation
│   │   │   ├── ARCHITECTURE.md
│   │   │   ├── DEPLOYMENT.md
│   │   │   ├── MILESTONES.md
│   │   │   ├── PRD.md
│   │   │   ├── PWA-DEPLOYMENT.md
│   │   │   ├── README.md
│   │   │   └── SECURITY.md
│   │   ├── LICENSE.md
│   │   ├── README.md
│   │   ├── components.json
│   │   ├── eslint.config.js
│   │   ├── ibkr-gateway
│   │   │   └── clientportal.gw.zip
│   │   ├── index.html
│   │   ├── install.sh
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── public
│   │   │   ├── auth
│   │   │   │   └── callback.html
│   │   │   ├── manifest.json
│   │   │   └── sw.js
│   │   ├── runtime.config.json
│   │   ├── scripts
│   │   │   ├── README.md
│   │   │   ├── install.bat
│   │   │   ├── install.ps1
│   │   │   ├── server.js
│   │   │   ├── setup-docker.sh
│   │   │   └── update-sw.js
│   │   ├── src
│   │   │   ├── App.tsx
│   │   │   ├── ErrorFallback.tsx
│   │   │   ├── assets
│   │   │   │   ├── images
│   │   │   │   │   ├── graph-icon-512.png
│   │   │   │   │   └── icon.png
│   │   │   │   └── stock-chart-icon.svg
│   │   │   ├── components
│   │   │   │   ├── AISearch.tsx
│   │   │   │   ├── AITopPicks.tsx
│   │   │   │   ├── AlertsManager.tsx
│   │   │   │   ├── FilterPanel.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── IBKRChart.tsx
│   │   │   │   ├── IBKRSettings.tsx
│   │   │   │   ├── IBKRSettingsBrowser.tsx
│   │   │   │   ├── MarketInsights.tsx
│   │   │   │   ├── MarketStatus.tsx
│   │   │   │   ├── OfflineBanner.tsx
│   │   │   │   ├── SFTiTop10.tsx
│   │   │   │   ├── ScannerTable.tsx
│   │   │   │   ├── StockChart.tsx
│   │   │   │   ├── TabSelector.tsx
│   │   │   │   ├── TabSystem.tsx
│   │   │   │   ├── TradingViewChart.tsx
│   │   │   │   └── ui
│   │   │   │       ├── accordion.tsx
│   │   │   │       ├── alert-dialog.tsx
│   │   │   │       ├── alert.tsx
│   │   │   │       ├── aspect-ratio.tsx
│   │   │   │       ├── avatar.tsx
│   │   │   │       ├── badge.tsx
│   │   │   │       ├── breadcrumb.tsx
│   │   │   │       ├── button.tsx
│   │   │   │       ├── calendar.tsx
│   │   │   │       ├── card.tsx
│   │   │   │       ├── carousel.tsx
│   │   │   │       ├── chart.tsx
│   │   │   │       ├── checkbox.tsx
│   │   │   │       ├── collapsible.tsx
│   │   │   │       ├── command.tsx
│   │   │   │       ├── context-menu.tsx
│   │   │   │       ├── dialog.tsx
│   │   │   │       ├── drawer.tsx
│   │   │   │       ├── dropdown-menu.tsx
│   │   │   │       ├── form.tsx
│   │   │   │       ├── hover-card.tsx
│   │   │   │       ├── input-otp.tsx
│   │   │   │       ├── input.tsx
│   │   │   │       ├── label.tsx
│   │   │   │       ├── menubar.tsx
│   │   │   │       ├── navigation-menu.tsx
│   │   │   │       ├── pagination.tsx
│   │   │   │       ├── popover.tsx
│   │   │   │       ├── progress.tsx
│   │   │   │       ├── radio-group.tsx
│   │   │   │       ├── resizable.tsx
│   │   │   │       ├── scroll-area.tsx
│   │   │   │       ├── select.tsx
│   │   │   │       ├── separator.tsx
│   │   │   │       ├── sheet.tsx
│   │   │   │       ├── sidebar.tsx
│   │   │   │       ├── skeleton.tsx
│   │   │   │       ├── slider.tsx
│   │   │   │       ├── sonner.tsx
│   │   │   │       ├── switch.tsx
│   │   │   │       ├── table.tsx
│   │   │   │       ├── tabs.tsx
│   │   │   │       ├── textarea.tsx
│   │   │   │       ├── toggle-group.tsx
│   │   │   │       ├── toggle.tsx
│   │   │   │       └── tooltip.tsx
│   │   │   ├── hooks
│   │   │   │   └── use-mobile.ts
│   │   │   ├── index.css
│   │   │   ├── lib
│   │   │   │   ├── README.md
│   │   │   │   ├── aiPatterns.ts
│   │   │   │   ├── aiSearch.ts
│   │   │   │   ├── alerts.ts
│   │   │   │   ├── ibkr-browser.ts
│   │   │   │   ├── ibkr-gateway-browser.ts
│   │   │   │   ├── ibkr.ts
│   │   │   │   ├── market.ts
│   │   │   │   ├── offline.ts
│   │   │   │   └── utils.ts
│   │   │   ├── main.css
│   │   │   ├── main.tsx
│   │   │   ├── prd.md
│   │   │   ├── styles
│   │   │   │   └── theme.css
│   │   │   ├── types
│   │   │   │   └── index.ts
│   │   │   └── vite-end.d.ts
│   │   ├── tailwind.config.js
│   │   ├── theme.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   ├── Pilot-Server
│   │   ├── LICENSE
│   │   ├── PRD.md
│   │   ├── README.md
│   │   ├── SECURITY.md
│   │   ├── components.json
│   │   ├── docs
│   │   │   └── s
│   │   ├── eslint.config.js
│   │   ├── index.html
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── runtime.config.json
│   │   ├── scripts
│   │   │   ├── validate-api-usage.cjs
│   │   │   ├── validate-error-handling.cjs
│   │   │   └── validate-imports.cjs
│   │   ├── server.js
│   │   ├── src
│   │   │   ├── App.tsx
│   │   │   ├── ErrorFallback.tsx
│   │   │   ├── components
│   │   │   │   ├── AuthGuard.tsx
│   │   │   │   ├── ChatHeader.tsx
│   │   │   │   ├── ChatMessages.tsx
│   │   │   │   ├── ChatSidebar.tsx
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   ├── GitHubCallback.tsx
│   │   │   │   ├── MessageBubble.tsx
│   │   │   │   ├── MessageInput.tsx
│   │   │   │   ├── ModelBubble.tsx
│   │   │   │   ├── ModelPermissionStatus.tsx
│   │   │   │   ├── SettingsDialog.tsx
│   │   │   │   ├── ThemeProvider.tsx
│   │   │   │   ├── ThemeToggle.tsx
│   │   │   │   └── ui
│   │   │   │       ├── accordion.tsx
│   │   │   │       ├── alert-dialog.tsx
│   │   │   │       ├── alert.tsx
│   │   │   │       ├── aspect-ratio.tsx
│   │   │   │       ├── avatar.tsx
│   │   │   │       ├── badge.tsx
│   │   │   │       ├── breadcrumb.tsx
│   │   │   │       ├── button.tsx
│   │   │   │       ├── calendar.tsx
│   │   │   │       ├── card.tsx
│   │   │   │       ├── carousel.tsx
│   │   │   │       ├── chart.tsx
│   │   │   │       ├── checkbox.tsx
│   │   │   │       ├── collapsible.tsx
│   │   │   │       ├── command.tsx
│   │   │   │       ├── context-menu.tsx
│   │   │   │       ├── dialog.tsx
│   │   │   │       ├── drawer.tsx
│   │   │   │       ├── dropdown-menu.tsx
│   │   │   │       ├── form.tsx
│   │   │   │       ├── hover-card.tsx
│   │   │   │       ├── input-otp.tsx
│   │   │   │       ├── input.tsx
│   │   │   │       ├── label.tsx
│   │   │   │       ├── menubar.tsx
│   │   │   │       ├── navigation-menu.tsx
│   │   │   │       ├── pagination.tsx
│   │   │   │       ├── popover.tsx
│   │   │   │       ├── progress.tsx
│   │   │   │       ├── radio-group.tsx
│   │   │   │       ├── resizable.tsx
│   │   │   │       ├── scroll-area.tsx
│   │   │   │       ├── select.tsx
│   │   │   │       ├── separator.tsx
│   │   │   │       ├── sheet.tsx
│   │   │   │       ├── sidebar.tsx
│   │   │   │       ├── skeleton.tsx
│   │   │   │       ├── slider.tsx
│   │   │   │       ├── sonner.tsx
│   │   │   │       ├── switch.tsx
│   │   │   │       ├── table.tsx
│   │   │   │       ├── tabs.tsx
│   │   │   │       ├── textarea.tsx
│   │   │   │       ├── toggle-group.tsx
│   │   │   │       ├── toggle.tsx
│   │   │   │       └── tooltip.tsx
│   │   │   ├── hooks
│   │   │   │   ├── use-auth.ts
│   │   │   │   ├── use-chat.ts
│   │   │   │   ├── use-mobile.ts
│   │   │   │   └── use-theme.ts
│   │   │   ├── index.css
│   │   │   ├── lib
│   │   │   │   ├── types.ts
│   │   │   │   └── utils.ts
│   │   │   ├── main.css
│   │   │   ├── main.tsx
│   │   │   ├── prd.md
│   │   │   ├── styles
│   │   │   │   ├── lib
│   │   │   │   │   ├── types.ts
│   │   │   │   │   └── utils.ts
│   │   │   │   └── theme.css
│   │   │   └── vite-end.d.ts
│   │   ├── tailwind.config.js
│   │   ├── theme.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   ├── dev-script.js
│   ├── dev-styles.css
│   ├── dist
│   │   ├── mobile-navigation.js
│   │   └── styles.css
│   ├── index.html
│   └── styles
│       └── dev.tailwind.css
├── dist
│   ├── mobile-navigation.js
│   └── styles.css
├── index.html
├── index.html.save
├── lib
│   └── utils.ts
├── package-lock.json
├── package.json
├── parking-page.shtml
├── public_html
│   ├── dev.sfti-ai.org
│   │   └── styles
│   │       └── dev.tailwind.css
│   └── server.sfti-ai.org
│       └── styles
│           └── server.tailwind.css
├── script.js
├── scrollFX.js
├── server.sfti-ai.org
│   ├── IB-G.Scanner
│   │   ├── Documentation
│   │   │   ├── ARCHITECTURE.md
│   │   │   ├── DEPLOYMENT.md
│   │   │   ├── MILESTONES.md
│   │   │   ├── PRD.md
│   │   │   ├── PWA-DEPLOYMENT.md
│   │   │   ├── README.md
│   │   │   └── SECURITY.md
│   │   ├── LICENSE.md
│   │   ├── README.md
│   │   ├── components.json
│   │   ├── eslint.config.js
│   │   ├── ibkr-gateway
│   │   │   └── clientportal.gw.zip
│   │   ├── index.html
│   │   ├── install.sh
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── public
│   │   │   ├── auth
│   │   │   │   └── callback.html
│   │   │   ├── manifest.json
│   │   │   └── sw.js
│   │   ├── runtime.config.json
│   │   ├── scripts
│   │   │   ├── README.md
│   │   │   ├── install.bat
│   │   │   ├── install.ps1
│   │   │   ├── server.js
│   │   │   ├── setup-docker.sh
│   │   │   └── update-sw.js
│   │   ├── src
│   │   │   ├── App.tsx
│   │   │   ├── ErrorFallback.tsx
│   │   │   ├── assets
│   │   │   │   ├── images
│   │   │   │   │   ├── graph-icon-512.png
│   │   │   │   │   └── icon.png
│   │   │   │   └── stock-chart-icon.svg
│   │   │   ├── components
│   │   │   │   ├── AISearch.tsx
│   │   │   │   ├── AITopPicks.tsx
│   │   │   │   ├── AlertsManager.tsx
│   │   │   │   ├── FilterPanel.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── IBKRChart.tsx
│   │   │   │   ├── IBKRSettings.tsx
│   │   │   │   ├── IBKRSettingsBrowser.tsx
│   │   │   │   ├── MarketInsights.tsx
│   │   │   │   ├── MarketStatus.tsx
│   │   │   │   ├── OfflineBanner.tsx
│   │   │   │   ├── SFTiTop10.tsx
│   │   │   │   ├── ScannerTable.tsx
│   │   │   │   ├── StockChart.tsx
│   │   │   │   ├── TabSelector.tsx
│   │   │   │   ├── TabSystem.tsx
│   │   │   │   ├── TradingViewChart.tsx
│   │   │   │   └── ui
│   │   │   │       ├── accordion.tsx
│   │   │   │       ├── alert-dialog.tsx
│   │   │   │       ├── alert.tsx
│   │   │   │       ├── aspect-ratio.tsx
│   │   │   │       ├── avatar.tsx
│   │   │   │       ├── badge.tsx
│   │   │   │       ├── breadcrumb.tsx
│   │   │   │       ├── button.tsx
│   │   │   │       ├── calendar.tsx
│   │   │   │       ├── card.tsx
│   │   │   │       ├── carousel.tsx
│   │   │   │       ├── chart.tsx
│   │   │   │       ├── checkbox.tsx
│   │   │   │       ├── collapsible.tsx
│   │   │   │       ├── command.tsx
│   │   │   │       ├── context-menu.tsx
│   │   │   │       ├── dialog.tsx
│   │   │   │       ├── drawer.tsx
│   │   │   │       ├── dropdown-menu.tsx
│   │   │   │       ├── form.tsx
│   │   │   │       ├── hover-card.tsx
│   │   │   │       ├── input-otp.tsx
│   │   │   │       ├── input.tsx
│   │   │   │       ├── label.tsx
│   │   │   │       ├── menubar.tsx
│   │   │   │       ├── navigation-menu.tsx
│   │   │   │       ├── pagination.tsx
│   │   │   │       ├── popover.tsx
│   │   │   │       ├── progress.tsx
│   │   │   │       ├── radio-group.tsx
│   │   │   │       ├── resizable.tsx
│   │   │   │       ├── scroll-area.tsx
│   │   │   │       ├── select.tsx
│   │   │   │       ├── separator.tsx
│   │   │   │       ├── sheet.tsx
│   │   │   │       ├── sidebar.tsx
│   │   │   │       ├── skeleton.tsx
│   │   │   │       ├── slider.tsx
│   │   │   │       ├── sonner.tsx
│   │   │   │       ├── switch.tsx
│   │   │   │       ├── table.tsx
│   │   │   │       ├── tabs.tsx
│   │   │   │       ├── textarea.tsx
│   │   │   │       ├── toggle-group.tsx
│   │   │   │       ├── toggle.tsx
│   │   │   │       └── tooltip.tsx
│   │   │   ├── hooks
│   │   │   │   └── use-mobile.ts
│   │   │   ├── index.css
│   │   │   ├── lib
│   │   │   │   ├── README.md
│   │   │   │   ├── aiPatterns.ts
│   │   │   │   ├── aiSearch.ts
│   │   │   │   ├── alerts.ts
│   │   │   │   ├── ibkr-browser.ts
│   │   │   │   ├── ibkr-gateway-browser.ts
│   │   │   │   ├── ibkr.ts
│   │   │   │   ├── market.ts
│   │   │   │   ├── offline.ts
│   │   │   │   └── utils.ts
│   │   │   ├── main.css
│   │   │   ├── main.tsx
│   │   │   ├── prd.md
│   │   │   ├── styles
│   │   │   │   └── theme.css
│   │   │   ├── types
│   │   │   │   └── index.ts
│   │   │   └── vite-end.d.ts
│   │   ├── tailwind.config.js
│   │   ├── theme.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   ├── Pilot-Server
│   │   ├── LICENSE
│   │   ├── PRD.md
│   │   ├── README.md
│   │   ├── SECURITY.md
│   │   ├── components.json
│   │   ├── docs
│   │   │   └── s
│   │   ├── eslint.config.js
│   │   ├── index.html
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── runtime.config.json
│   │   ├── scripts
│   │   │   ├── validate-api-usage.cjs
│   │   │   ├── validate-error-handling.cjs
│   │   │   └── validate-imports.cjs
│   │   ├── server.js
│   │   ├── src
│   │   │   ├── App.tsx
│   │   │   ├── ErrorFallback.tsx
│   │   │   ├── components
│   │   │   │   ├── AuthGuard.tsx
│   │   │   │   ├── ChatHeader.tsx
│   │   │   │   ├── ChatMessages.tsx
│   │   │   │   ├── ChatSidebar.tsx
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   ├── GitHubCallback.tsx
│   │   │   │   ├── MessageBubble.tsx
│   │   │   │   ├── MessageInput.tsx
│   │   │   │   ├── ModelBubble.tsx
│   │   │   │   ├── ModelPermissionStatus.tsx
│   │   │   │   ├── SettingsDialog.tsx
│   │   │   │   ├── ThemeProvider.tsx
│   │   │   │   ├── ThemeToggle.tsx
│   │   │   │   └── ui
│   │   │   │       ├── accordion.tsx
│   │   │   │       ├── alert-dialog.tsx
│   │   │   │       ├── alert.tsx
│   │   │   │       ├── aspect-ratio.tsx
│   │   │   │       ├── avatar.tsx
│   │   │   │       ├── badge.tsx
│   │   │   │       ├── breadcrumb.tsx
│   │   │   │       ├── button.tsx
│   │   │   │       ├── calendar.tsx
│   │   │   │       ├── card.tsx
│   │   │   │       ├── carousel.tsx
│   │   │   │       ├── chart.tsx
│   │   │   │       ├── checkbox.tsx
│   │   │   │       ├── collapsible.tsx
│   │   │   │       ├── command.tsx
│   │   │   │       ├── context-menu.tsx
│   │   │   │       ├── dialog.tsx
│   │   │   │       ├── drawer.tsx
│   │   │   │       ├── dropdown-menu.tsx
│   │   │   │       ├── form.tsx
│   │   │   │       ├── hover-card.tsx
│   │   │   │       ├── input-otp.tsx
│   │   │   │       ├── input.tsx
│   │   │   │       ├── label.tsx
│   │   │   │       ├── menubar.tsx
│   │   │   │       ├── navigation-menu.tsx
│   │   │   │       ├── pagination.tsx
│   │   │   │       ├── popover.tsx
│   │   │   │       ├── progress.tsx
│   │   │   │       ├── radio-group.tsx
│   │   │   │       ├── resizable.tsx
│   │   │   │       ├── scroll-area.tsx
│   │   │   │       ├── select.tsx
│   │   │   │       ├── separator.tsx
│   │   │   │       ├── sheet.tsx
│   │   │   │       ├── sidebar.tsx
│   │   │   │       ├── skeleton.tsx
│   │   │   │       ├── slider.tsx
│   │   │   │       ├── sonner.tsx
│   │   │   │       ├── switch.tsx
│   │   │   │       ├── table.tsx
│   │   │   │       ├── tabs.tsx
│   │   │   │       ├── textarea.tsx
│   │   │   │       ├── toggle-group.tsx
│   │   │   │       ├── toggle.tsx
│   │   │   │       └── tooltip.tsx
│   │   │   ├── hooks
│   │   │   │   ├── use-auth.ts
│   │   │   │   ├── use-chat.ts
│   │   │   │   ├── use-mobile.ts
│   │   │   │   └── use-theme.ts
│   │   │   ├── index.css
│   │   │   ├── lib
│   │   │   │   ├── types.ts
│   │   │   │   └── utils.ts
│   │   │   ├── main.css
│   │   │   ├── main.tsx
│   │   │   ├── prd.md
│   │   │   ├── styles
│   │   │   │   ├── lib
│   │   │   │   │   ├── types.ts
│   │   │   │   │   └── utils.ts
│   │   │   │   └── theme.css
│   │   │   └── vite-end.d.ts
│   │   ├── tailwind.config.js
│   │   ├── theme.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   ├── dist
│   │   ├── mobile-navigation.js
│   │   └── styles.css
│   ├── index.html
│   ├── server-script.js
│   ├── server-styles.css
│   └── styles
│       └── server.tailwind.css
├── setup-dev.sh
├── setup.cfg
├── src
│   └── styles
│       ├── dev.css
│       ├── globals.css
│       ├── main.css
│       └── server.css
├── static-server.js
├── styles
│   └── main.tailwind.css
├── styles.css
├── tailwind.config.js
└── vite.config.ts

75 directories, 527 files
```
