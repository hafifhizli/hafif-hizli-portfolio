// Build script — pre-compiles JSX to plain JS so the browser never has to
// load Babel standalone or compile JSX at runtime. Output goes to dist/.
//
// Usage:
//   npm run build      → one-shot compile
//   npm run watch      → recompile on file change (dev)

import * as esbuild from 'esbuild';

const entryPoints = ['tweaks-panel.jsx', 'portfolio.jsx', 'app.jsx'];

const config = {
  entryPoints,
  outdir: 'dist',
  bundle: false,             // keep 3 separate files, load order matters
  format: 'iife',            // wrap each file so top-level `const` doesn't leak
  jsx: 'transform',          // classic JSX → React.createElement
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  minify: true,
  sourcemap: true,           // .map files for debugging
  target: ['es2020'],        // covers all evergreen browsers
  logLevel: 'info',
};

const watch = process.argv.includes('--watch');

if (watch) {
  const ctx = await esbuild.context(config);
  await ctx.watch();
  console.log('👁  Watching for changes... (Ctrl+C to stop)');
} else {
  await esbuild.build(config);
  console.log('✓ Build complete → dist/');
}
