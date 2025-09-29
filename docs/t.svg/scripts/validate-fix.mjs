#!/usr/bin/env node

/**
 * Validation script to test the trophy stats fix
 * This demonstrates the difference between old and new approaches
 */

const USER = process.env.GH_USER || "statikfintechllc";
const GH_TOKEN = process.env.PAT_GITHUB || process.env.GITHUB_TOKEN;

if (!GH_TOKEN) {
  console.log("ℹ️  No GitHub token provided - showing conceptual validation");
  showConceptualValidation();
  process.exit(0);
}

const gql = async (query, variables = {}) => {
  const r = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${GH_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "validate-trophies-fix"
    },
    body: JSON.stringify({ query, variables })
  });
  if (!r.ok) throw new Error(`GraphQL ${r.status}: ${await r.text()}`);
  const j = await r.json();
  if (j.errors) throw new Error(JSON.stringify(j.errors, null, 2));
  return j.data;
};

async function validateFix() {
  console.log("🔍 Validating Trophy Stats Fix");
  console.log(`👤 User: ${USER}\n`);

  // Get user creation time for old approach
  const qUser = `query($login:String!){ user(login:$login){ createdAt } }`;
  const who = await gql(qUser, { login: USER });
  const fromISO = new Date(who.user.createdAt).toISOString();
  const nowISO = new Date().toISOString();

  console.log(`📅 Account created: ${fromISO}`);
  console.log(`📅 Query range: ${fromISO} to ${nowISO}\n`);

  // Test both approaches
  const qComparison = `
    query($login:String!, $from:DateTime!, $to:DateTime!){
      user(login:$login){
        issues(first: 1) { totalCount }
        pullRequests(first: 1) { totalCount }
        contributionsCollection(from:$from, to:$to){
          totalIssueContributions
          totalPullRequestContributions
        }
      }
    }
  `;

  const result = await gql(qComparison, { login: USER, from: fromISO, to: nowISO });

  console.log("📊 COMPARISON RESULTS");
  console.log("=" .repeat(50));
  
  const oldIssues = result.user.contributionsCollection.totalIssueContributions;
  const newIssues = result.user.issues.totalCount;
  const oldPRs = result.user.contributionsCollection.totalPullRequestContributions;
  const newPRs = result.user.pullRequests.totalCount;

  console.log(`📋 Issues:`);
  console.log(`   Old method (contributionsCollection): ${oldIssues}`);
  console.log(`   New method (direct user.issues):      ${newIssues}`);
  console.log(`   Difference: ${newIssues - oldIssues > 0 ? '+' : ''}${newIssues - oldIssues}`);
  
  console.log(`\n🔀 Pull Requests:`);
  console.log(`   Old method (contributionsCollection): ${oldPRs}`);
  console.log(`   New method (direct user.pullRequests): ${newPRs}`);
  console.log(`   Difference: ${newPRs - oldPRs > 0 ? '+' : ''}${newPRs - oldPRs}`);

  console.log("\n" + "=".repeat(50));
  
  if (newIssues >= oldIssues && newPRs >= oldPRs) {
    console.log("✅ FIX VALIDATED: New method provides equal or higher counts");
    if (newIssues > oldIssues || newPRs > oldPRs) {
      console.log("✨ The fix revealed previously uncounted contributions!");
    }
  } else {
    console.log("⚠️  Unexpected: New method shows lower counts than old method");
    console.log("   This could indicate an edge case or API behavior change");
  }

  console.log(`\n🎯 Trophy values that will be displayed:`);
  console.log(`   Issues: ${newIssues.toLocaleString()}`);
  console.log(`   Pull Requests: ${newPRs.toLocaleString()}`);
}

function showConceptualValidation() {
  console.log("🔍 Conceptual Validation of Trophy Stats Fix");
  console.log("=" .repeat(50));
  
  console.log("\n📋 ISSUE: contributionsCollection API limitations");
  console.log("   • Large date ranges (user creation → now) can be inaccurate");
  console.log("   • May not include contributions to repos user no longer has access to");
  console.log("   • GitHub's contribution data has historical limitations");
  
  console.log("\n✅ SOLUTION: Direct user field queries");
  console.log("   • user.issues.totalCount - ALL issues ever created");
  console.log("   • user.pullRequests.totalCount - ALL PRs ever opened");
  console.log("   • These fields are always accurate regardless of date range");
  
  console.log("\n🔧 TECHNICAL CHANGES:");
  console.log("   Modified GraphQL query:");
  console.log("   + issues(first: 1) { totalCount }");
  console.log("   + pullRequests(first: 1) { totalCount }");
  console.log("   - totalIssueContributions (from contributionsCollection)");
  console.log("   - totalPullRequestContributions (from contributionsCollection)");
  
  console.log("\n📊 EXPECTED RESULT:");
  console.log("   Trophy stats should show higher, more accurate numbers");
  console.log("   reflecting the user's complete GitHub contribution history");
  
  console.log("\n💡 To run actual validation with live data:");
  console.log("   export PAT_GITHUB='your_token_here'");
  console.log("   node scripts/validate-fix.mjs");
}

// Run validation
if (GH_TOKEN) {
  validateFix().catch(console.error);
}