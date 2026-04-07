
// const fs = require("fs");
// const path = require("path");

// // Node fetch (safe)
// const fetch = (...args) =>
//   import("node-fetch").then(({ default: fetch }) => fetch(...args));

// // Languages
// const LANGUAGES = {
//   hi: "Hindi",
//   mr: "Marathi",
//   es: "Spanish",
//   fr: "French",
// };

// const SCRIPTS_DIR = path.join(__dirname);
// const BASE_FILE = path.join(SCRIPTS_DIR, "language.json");
// function getMissingKeys(base, existing) {
//   const missing = {};

//   for (const key in base) {
//     if (
//       typeof base[key] === "object" &&
//       base[key] !== null &&
//       !Array.isArray(base[key])
//     ) {
//       const nested = getMissingKeys(base[key], existing?.[key] || {});
//       if (Object.keys(nested).length > 0) {
//         missing[key] = nested;
//       }
//     } else {
//       if (!(key in (existing || {}))) {
//         missing[key] = base[key];
//       }
//     }
//   }

//   return missing;
// }

// // ✅ Deep merge
// function deepMerge(target, source) {
//   const output = { ...target };

//   for (const key in source) {
//     if (
//       typeof source[key] === "object" &&
//       source[key] !== null &&
//       !Array.isArray(source[key])
//     ) {
//       output[key] = deepMerge(target[key] || {}, source[key]);
//     } else {
//       output[key] = source[key];
//     }
//   }

//   return output;
// }

// // 🚀 MAIN
// async function translateWithClaude(jsonString, targetLanguage) {
//   try {
//     const response = await fetch("https://api.anthropic.com/v1/messages", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-key": process.env.ANTHROPIC_API_KEY,
//         "anthropic-version": "2023-06-01",
//       },
//       body: JSON.stringify({
//         model: "claude-sonnet-4-6",
//         max_tokens: 8000,
//         messages: [
//           {
//             role: "user",
//             content: `You are a professional translator for a Mumbai island tours travel website.

// Translate ALL string values in this JSON to ${targetLanguage}.

// STRICT RULES:
// - Return ONLY valid JSON (no markdown, no explanation)
// - Keep keys same
// - Only translate values
// - Do NOT translate "Mumbai", "Island Mumbai Tours"

// JSON:
// ${jsonString}`,
//           },
//         ],
//       }),
//     });

//     const data = await response.json();

//     if (!data?.content?.[0]?.text) {
//       throw new Error("Invalid API response");
//     }

//     const raw = data.content[0].text
//       .trim()
//       .replace(/^```json/i, "")
//       .replace(/```$/i, "")
//       .trim();

//     return JSON.parse(raw);

//   } catch (err) {
//     console.error("❌ Translation Error:", err.message);
//     return null;
//   }
// }c

// main();