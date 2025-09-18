#!/usr/bin/env node
// Master Builder Script - handles both Medium and Zenodo paper generation
import { execSync } from "child_process";
import { join } from "path";

const buildType = process.argv[2] || "all";

console.log(`🏗️  SFTi Builder Script - Building ${buildType}`);

try {
  if (buildType === "medium" || buildType === "all") {
    console.log("\n📝 Building Medium article cards...");
    execSync("node medium-builder.mjs", { 
      cwd: join(process.cwd(), "docs", "builder.script"),
      stdio: "inherit" 
    });
  }

  if (buildType === "zenodo" || buildType === "all") {
    console.log("\n🎓 Building Zenodo research paper cards...");
    execSync("node zenodo-builder.mjs", { 
      cwd: join(process.cwd(), "docs", "builder.script"),
      stdio: "inherit" 
    });
  }

  if (!["medium", "zenodo", "all"].includes(buildType)) {
    console.log(`❌ Unknown build type: ${buildType}`);
    console.log("Usage: node builder.script.mjs [medium|zenodo|all]");
    process.exit(1);
  }

  console.log("\n✅ Build complete!");
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}