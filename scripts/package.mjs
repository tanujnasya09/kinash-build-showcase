import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { basename, join, relative } from "node:path";
import { tmpdir } from "node:os";

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
  ".next",
  "legacy-vite",
  "release",
  ".gemini",
  "scripts"
]);

const EXCLUDE_FILES = new Set([
  "bun.lockb",
  "package-lock.json",
  ".env",
  ".env.local",
  ".env.production",
  ".open-design.json",
  "GUMROAD-CONTENT-TAB.md",
  "GUMROAD-LISTING.md",
  "index.html",
  "vite.config.ts",
  "tsconfig.app.json",
  "tsconfig.node.json",
  "tsconfig.tsbuildinfo",
  "tsconfig.app.tsbuildinfo",
  "tsconfig.node.tsbuildinfo"
]);

// Excluded at any depth (e.g. studio/node_modules, studio/dist, marketing banners)
const EXCLUDE_NESTED = new Set(["node_modules", "dist", ".sanity", ".git"]);

const keep = (src) => {
  const name = basename(src);
  if (name.startsWith("gumroad-")) return false;
  if (name.startsWith(".open-design")) return false;
  if (name.endsWith(".tsbuildinfo")) return false;
  if (EXCLUDE_FILES.has(name)) return false;
  return !EXCLUDE_NESTED.has(name);
};

const entries = readdirSync(root).filter(
  (entry) =>
    !EXCLUDE_DIRS.has(entry) &&
    !EXCLUDE_FILES.has(entry) &&
    !entry.endsWith(".tsbuildinfo")
);

const stage = join(tmpdir(), `${name}-stage-${Date.now()}`);
const stageRoot = join(stage, name);
mkdirSync(stageRoot, { recursive: true });
for (const entry of entries) {
  cpSync(join(root, entry), join(stageRoot, entry), { recursive: true, filter: keep });
}

mkdirSync(join(root, "release"), { recursive: true });
const outPath = join(root, "release", `${name}-v${version}.zip`);

if (entries.length === 0) {
  console.error("Nothing to package.");
  process.exit(1);
}

if (process.platform === "win32") {
  const quote = (p) => `'${p.replace(/'/g, "''")}'`;
  const script = [
    "$ErrorActionPreference='Stop'",
    `if (Test-Path -LiteralPath ${quote(outPath)}) { Remove-Item -LiteralPath ${quote(outPath)} -Force }`,
    `Compress-Archive -Path ${quote(join(stageRoot, "*"))} -DestinationPath ${quote(outPath)} -Force`
  ].join("; ");
  execFileSync("powershell", ["-NoProfile", "-Command", script], {
    stdio: "inherit"
  });
} else {
  rmSync(outPath, { force: true });
  execFileSync("zip", ["-r", "-X", outPath, "."], { stdio: "inherit", cwd: stageRoot });
}

rmSync(stage, { recursive: true, force: true });
console.log(`\nSuccessfully packaged ${entries.length} entries -> ${relative(root, outPath)}`);
