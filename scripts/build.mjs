import { readFile, writeFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';

const ROOT = new URL('../', import.meta.url);
const EXIT = Object.freeze({ FAILURE: 1, USAGE: 2, MISSING_DEPENDENCY: 3 });
const HELP = `Usage: node scripts/build.mjs [-c|--check] [-h|--help]

Render _templates/index.mustache and the card partial with _data/catalog.json
into index.html. See README.md for the catalog fields. Requires Node.js 22+
and dependencies installed with npm ci. No environment variables are required.

  -c, --check  Check generated HTML without writing files
  -h, --help   Show this help

Exit status: 0 success, 1 build failure or stale HTML, 2 invalid arguments,
3 missing Mustache dependency. Build and check status goes to stderr.
`;
const readText = (path) => readFile(new URL(path, ROOT), 'utf8');

let values;
try {
  ({ values } = parseArgs({
    options: {
      check: { type: 'boolean', short: 'c' },
      help: { type: 'boolean', short: 'h' },
    },
  }));
} catch (error) {
  console.error(`${error.message}\nRun node scripts/build.mjs --help for usage`);
  process.exit(EXIT.USAGE);
}

if (values.help) {
  console.log(HELP);
  process.exit(0);
}

try {
  const { default: Mustache } = await import('mustache');
  const [template, card, catalog] = await Promise.all([
    readText('_templates/index.mustache'),
    readText('_templates/card.mustache'),
    readText('_data/catalog.json'),
  ]);
  const html = Mustache.render(template, JSON.parse(catalog), { card });

  if (values.check) {
    const existing = await readText('index.html').catch((error) => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
    if (existing !== html) {
      throw new Error('index.html is missing or stale. Run npm run build and include index.html with the source changes');
    }
    console.error('index.html matches the templates and catalog');
  } else {
    await writeFile(new URL('index.html', ROOT), html);
    console.error('Built index.html');
  }
} catch (error) {
  const missingDependency = error.code === 'ERR_MODULE_NOT_FOUND';
  console.error(missingDependency ? 'Missing Mustache dependency. Run npm ci' : error.message);
  process.exitCode = missingDependency ? EXIT.MISSING_DEPENDENCY : EXIT.FAILURE;
}
