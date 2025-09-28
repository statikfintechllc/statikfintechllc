# Dev Domain Component Cache

Generated component bundles for the `dev.sfti-ai.org` experience. Files in the `desktop/` and `mobile/` folders are produced by `build/build.sh` and should not be edited manually. Regenerate them with:

```bash
./build/build.sh component-manifest --manifest src/build/components.manifest.json --clean
```

Each build pass keeps the directories in sync with the global primitives so downstream scripts can import a consistent API when targeting demo or production environments.
