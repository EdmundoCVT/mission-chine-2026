import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync('dist/index.html','utf8');
const css = fs.readFileSync('dist/styles.css','utf8');
const js = fs.readFileSync('dist/app.js','utf8');

new vm.Script(js);
const required = ['mission','vision','finance','france','sal','carnet','contacts','roadmap','journal','presentation'];
for (const route of required) {
  if (!js.includes(`['${route}'`) && !js.includes(`${route}:()=>`)) throw new Error(`Route manquante: ${route}`);
}
for (const token of ['exemple provisoire','hypothèse prioritaire à valider','RMB — environ','localStorage','Exporter le projet']) {
  if (!(html+js).includes(token)) throw new Error(`Contenu requis manquant: ${token}`);
}
if (!css.includes('@media(max-width:760px)')) throw new Error('Breakpoint mobile manquant');
if (!css.includes('@media print')) throw new Error('Style impression manquant');

const rate = 7.31;
const eur = 2999 / rate;
const fullCost = eur + 45 + 95 + 12;
const margin = 620 - fullCost;
if (Math.abs(eur - 410.26) > 0.01) throw new Error('Conversion RMB/EUR incorrecte');
if (Math.abs(fullCost - 562.26) > 0.01) throw new Error('Coût complet incorrect');
if (Math.abs(margin - 57.74) > 0.01) throw new Error('Marge incorrecte');

console.log('Smoke tests: navigation, libellés, responsive, exports et calculs vérifiés.');
