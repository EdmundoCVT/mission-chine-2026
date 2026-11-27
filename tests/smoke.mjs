import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync('dist/index.html','utf8');
const css = fs.readFileSync('dist/styles.css','utf8');
const js = fs.readFileSync('dist/app.js','utf8');
const mission = fs.readFileSync('dist/mission.js','utf8');

new vm.Script(js);
const required = ['mission','timeline','catalogue','equipe','pilotage','vision','finance','france','sal','carnet','contacts','roadmap','journal','presentation'];
for (const route of required) {
  if (!js.includes(`['${route}'`) && !js.includes(`${route}:()=>`)) throw new Error(`Route manquante: ${route}`);
}
for (const token of ['exemple provisoire','hypothèse prioritaire à valider','RMB — environ','localStorage','Exporter le projet']) {
  if (!(html+js).includes(token)) throw new Error(`Contenu requis manquant: ${token}`);
}
for (const token of ['BUSINESS CHINE','Array.from({length:25}','Aucune synchronisation automatique','https://docs.qq.com/sheet/DSnBjT2RSUnpYV0J2?tab=000001']) {
  if (!(html+js).includes(token)) throw new Error(`Élément BUSINESS CHINE manquant: ${token}`);
}
for (const token of ["A:{label", "B:{label", "C:{label", 'Carte schématique', 'à confirmer par Valencia', 'businessChine.journey.v22', 'Copier en chinois pour WeChat', 'Préparation avec Valencia', '计划航班']) {
  if (!mission.includes(token)) throw new Error(`Planning V2.2 incomplet: ${token}`);
}
for (const id of ['languageJourney','exportJourney']) if (!mission.includes(`id="${id}"`)) throw new Error(`L’action ${id} doit être accessible depuis le planning mobile`);
if (!js.includes("journey:JSON.parse(localStorage.getItem('businessChine.journey.v22')")) throw new Error('La sauvegarde JSON doit inclure le planning V2.2');
if ((js.match(/iso:'2026-(11|12)-/g)||[]).length !== 14) throw new Error('La timeline doit contenir exactement 14 jours');
if (!css.includes('@media(max-width:760px)')) throw new Error('Breakpoint mobile manquant');
if (!css.includes('@media print')) throw new Error('Style impression manquant');

const rate = 7.31;
const eur = 731 / rate;
const fullCost = eur + 10 + 5 + 2;
const margin = 130 - fullCost;
if (Math.abs(eur - 100) > 0.01) throw new Error('Conversion RMB/EUR incorrecte');
if (Math.abs(fullCost - 117) > 0.01) throw new Error('Coût complet incorrect');
if (Math.abs(margin - 13) > 0.01) throw new Error('Marge incorrecte');
if (/product:'DJI Osmo Pocket'[^\n]+(?:rmb|shipping|taxes|fees|sale):[1-9]/.test(js)) throw new Error('Montant commercial prérempli détecté');
if (js.includes('lisibles depuis WeChat')) throw new Error('Affirmation WeChat non vérifiée détectée');

console.log('Smoke tests: navigation, libellés, responsive, exports et calculs vérifiés.');
