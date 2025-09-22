import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, PluginOption } from "vite";
import { resolve } from "path";

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

// Placeholder functions to prevent build errors
function createIconImportProxy() {
  return {
    name: 'icon-import-proxy',
    // Empty plugin implementation
  };
}

function sparkPlugin() {
  return {
    name: 'spark-plugin',
    // Empty plugin implementation
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // DO NOT REMOVE - Spark plugins disabled for Pilot-Server
    // createIconImportProxy() as PluginOption,
    // sparkPlugin() as PluginOption,
  ],
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    }
  },
  server: {
    port: 4173,
    host: '0.0.0.0'
  },
  preview: {
    port: 4174,
    host: '0.0.0.0'
  }
});
