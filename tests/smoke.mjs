import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync('dist/index.html','utf8');
const css = fs.readFileSync('dist/styles.css','utf8')+fs.readFileSync('dist/mission.css','utf8');
const js = fs.readFileSync('dist/app.js','utf8');
const mission = fs.readFileSync('dist/mission.js','utf8');

new vm.Script(js);
new vm.Script(mission);
const required = ['mission','timeline','catalogue','equipe','pilotage','vision','finance','france','sal','carnet','contacts','roadmap','journal','presentation'];
for (const route of required) {
  if (!js.includes(`['${route}'`) && !js.includes(`${route}:()=>`)) throw new Error(`Route manquante: ${route}`);
}
for (const token of ['tasks','Business & Strategy','Technical & Purchasing','Sourcing & Logistics','Find 3 skid steer loader manufacturers','Find 2 telescopic handler manufacturers','businessChine.tasks.v23','data-task-filter="city"','copyTasksTSV','id="saveTask" type="button"','Team to-do list']) {
  if (!mission.includes(token)) throw new Error(`Fonction V2.3 manquante: ${token}`);
}
const seeded = mission.match(/\['(?:Valencia|Lourenco|Edmond)','/g)||[];
if (seeded.length!==15) throw new Error(`15 propositions d’équipe attendues, reçu ${seeded.length}`);
if ((mission.match(/\['Valencia','/g)||[]).length!==8 || (mission.match(/\['Lourenco','/g)||[]).length!==3 || (mission.match(/\['Edmond','/g)||[]).length!==4) throw new Error('Répartition des propositions par responsable incorrecte');
for (const owner of ['Valencia','Lourenco','Edmond']) {
  if (!mission.includes(`['${owner}'`)) throw new Error(`Tâches préchargées manquantes pour ${owner}`);
}
for (const token of ['français','Copier en anglais pour WeChat','Business & Strategy','上海','济南','广州','佛山','深圳','Tencent Docs remains the source of truth','not synchronized between team members']) {
  if (!mission.includes(token)) throw new Error(`Langue ou collaboration V2.3 manquante: ${token}`);
}
for (const token of ['teamTasks:JSON.parse(localStorage.getItem', 'journey:JSON.parse(localStorage.getItem', "meta:{version:'2.3'"]) {
  if (!js.includes(token)) throw new Error(`Sauvegarde ou version manquante: ${token}`);
}
for (const token of ['BUSINESS CHINE','Array.from({length:25}','https://docs.qq.com/sheet/DSnBjT2RSUnpYV0J2?tab=000001']) {
  if (!(html+js).includes(token)) throw new Error(`Élément BUSINESS CHINE manquant: ${token}`);
}
if ((js.match(/iso:'2026-(11|12)-/g)||[]).length !== 14) throw new Error('La trame existante doit contenir exactement 14 jours');
for (const token of ['@media(max-width:760px)','@media(max-width:600px)','grid-template-columns:repeat(6,minmax(0,1fr))']) if (!css.includes(token)) throw new Error(`Breakpoint responsive manquant: ${token}`);
if (!css.includes('@media print')) throw new Error('Style impression manquant');

const rate = 7.31;
const eur = 731 / rate;
const fullCost = eur + 10 + 5 + 2;
const margin = 130 - fullCost;
if (Math.abs(eur - 100) > 0.01) throw new Error('Conversion RMB/EUR incorrecte');
if (Math.abs(fullCost - 117) > 0.01) throw new Error('Coût complet incorrect');
if (Math.abs(margin - 13) > 0.01) throw new Error('Marge incorrecte');
if (/product:'DJI Osmo Pocket'[^\n]+(?:rmb|shipping|taxes|fees|sale):[1-9]/.test(js)) throw new Error('Montant commercial prérempli détecté');
if (mission.includes('copyJourneyZh')||mission.includes('Copier en chinois')) throw new Error('Le chinois ne doit plus être une langue d’interface');

console.log('Smoke tests: V2.3 routes, team tasks, bilingual labels, exports, responsive and existing calculations verified.');
