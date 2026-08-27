import fs from 'fs';
import path from 'path';

function getFiles(dir, exts) {
  let r = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory() && !['node_modules', '__tests__', '.next', 'ferrum-tokens'].includes(e.name))
      r = r.concat(getFiles(f, exts));
    else if (exts.some(x => e.name.endsWith(x))) r.push(f);
  }
  return r;
}

const files = getFiles('src', ['.ts', '.tsx']);
const exports = new Map();

for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const rel = f.replace('src/', '');
  const re1 = /export\s+(?:const|let|var|function|class|type|interface|enum)\s+(\w+)/g;
  let m;
  while ((m = re1.exec(c)) !== null) { exports.set(m[1], rel); }
  const re2 = /export\s+\{([^}]+)\}/g;
  while ((m = re2.exec(c)) !== null) {
    m[1].split(',').forEach(s => {
      const name = s.trim().split(/\s+as\s+/)[0].trim().replace(/^type\s+/, '');
      if (name && /^[A-Z]/.test(name)) exports.set(name, rel);
    });
  }
}

const imported = new Set();
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const re3 = /import\s+(?:type\s+)?\{([^}]+)\}/g;
  let m3;
  while ((m3 = re3.exec(c)) !== null) {
    m3[1].split(',').forEach(s => {
      const name = s.trim().split(/\s+as\s+/)[0].trim().replace(/^type\s+/, '');
      if (name) imported.add(name);
    });
  }
  const re4 = /import\s+(\w+)\s+from/g;
  let m4;
  while ((m4 = re4.exec(c)) !== null) {
    if (m4[1] !== 'default' && m4[1] !== 'dynamic' && m4[1] !== 'type') imported.add(m4[1]);
  }
}

for (const f of files) {
  if (!f.endsWith('.tsx')) continue;
  const c = fs.readFileSync(f, 'utf8');
  const re5 = /<(\w+)/g;
  let m5;
  while ((m5 = re5.exec(c)) !== null) {
    if (/^[A-Z]/.test(m5[1])) imported.add(m5[1]);
  }
}

let dead = [];
for (const [name, file] of exports) {
  if (!imported.has(name)) dead.push({ name, file });
}
dead.sort((a, b) => a.file.localeCompare(b.file));
console.log('Dead exports (exported but never imported anywhere): ' + dead.length);
dead.slice(0, 50).forEach(d => console.log('  ' + d.file + ': ' + d.name));
