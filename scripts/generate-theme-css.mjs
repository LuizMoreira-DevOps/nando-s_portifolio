/**
 * Sincroniza as cores aprovadas com styles/approved-themes.css.
 * Edite apenas design/approved-themes.json e rode `npm run sync:themes`.
 * Depende somente do Node.js; não requer npm install.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(resolve(project, 'design/approved-themes.json'), 'utf8'));
const lines = [
  '/* Arquivo gerado automaticamente. Não edite à mão.',
  '   Fonte: design/approved-themes.json | npm run sync:themes */',
];

for (const [family, palette] of Object.entries(data.palettes)) {
  for (const mode of ['light', 'dark']) {
    lines.push(`html[data-theme-family="${family}"][data-site-mode="${mode}"] {`);
    for (const [key, hex] of Object.entries(palette[mode])) {
      const prop = key === 'onPrimary' ? 'on-primary' : key;
      lines.push(`  --color-${prop}: ${hex};`);
    }
    lines.push(`  color-scheme: ${mode};`, '}');
  }
}

lines.push('');
writeFileSync(resolve(project, 'styles/approved-themes.css'), lines.join('\n'));
console.log('Gerado styles/approved-themes.css a partir das paletas aprovadas.');
