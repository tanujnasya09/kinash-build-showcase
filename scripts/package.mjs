import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const name = pkg.name || "template";
const version = pkg.version || "1.0.0";

const EXCLUDE_DIRS = new Set([
  "node_modules",
  ".git",
  ".vscode",
  ".agents",
  ".impeccable",
  "dist",
  "release",
  ".gemini"
]);

const EXCLUDE_FILES = new Set([
  "bun.lockb",
  "package-lock.json",
  ".env",
  ".env.local",
  "tsconfig.tsbuildinfo"
]);

const entries = readdirSync(root).filter(
  (entry) =>
    !EXCLUDE_DIRS.has(entry) &&
    !EXCLUDE_FILES.has(entry) &&
    !entry.endsWith(".tsbuildinfo")
);

mkdirSync(join(root, "release"), { recursive: true });
const outPath = join(root, "release", `${name}-v${version}.zip`);

if (entries.length === 0) {
  console.error("Nothing to package.");
  process.exit(1);
}

if (process.platform === "win32") {
  const quote = (p) => `'${p.replace(/'/g, "''")}'`;
  const paths = `@(${entries.map((e) => quote(join(root, e))).join(",")})`;
  const script = [
    "$ErrorActionPreference='Stop'",
    `if (Test-Path -LiteralPath ${quote(outPath)}) { Remove-Item -LiteralPath ${quote(outPath)} -Force }`,
    `Compress-Archive -Path ${paths} -DestinationPath ${quote(outPath)} -Force`
  ].join("; ");
  execFileSync("powershell", ["-NoProfile", "-Command", script], {
    stdio: "inherit"
  });
} else {
  execFileSync("zip", ["-r", "-X", outPath, ...entries], { stdio: "inherit" });
}

console.log(`\nSuccessfully packaged ${entries.length} entries -> ${relative(root, outPath)}`);
