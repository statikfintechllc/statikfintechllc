# WWW Domain Component Cache

This directory is populated by the component builder to produce ready-to-ship modules for the public marketing site. Generated files mirror their global counterparts but include www-specific theme tokens pulled from `src/www/www.styles/`.

Rebuild the assets whenever a global component changes:

```bash
./build/build.sh component-manifest --clean
```

Avoid manual edits—any changes will be overwritten on the next build.
