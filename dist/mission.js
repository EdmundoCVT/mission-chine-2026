function installMissionDashboard({pages,state,missionDays,primaryRoutes,secondaryRoutes,TENCENT_URL,esc,icons,render}) {
  const zh = localStorage.getItem('businessChine.language') === 'zh';
  const t = (fr,cn) => zh ? cn : fr;
  document.documentElement.lang=t('fr','zh-CN');
  const language=document.querySelector('#language');
  language.textContent=t('中文','Français');
  language.onclick=()=>{localStorage.setItem('businessChine.language',zh?'fr':'zh');location.reload()};
  const names=['首页','行程','采购','团队','管理','目标','财务','法国商机','萨尔岛商机','广州记录','联系人','路线图','日志','演示'];
  if(zh) [...primaryRoutes,...secondaryRoutes].forEach((r,i)=>{r[1]=names[i]});
  const doc=()=>`<section class="docband"><div><h2>📄 Tencent Docs</h2><p>${t('Document collaboratif distinct. Aucune synchronisation automatique.','独立协作文档。不会自动同步。')}</p></div><a href="${TENCENT_URL}" target="_blank" rel="noreferrer">${t('Ouvrir le document','打开协作文档')} ↗</a></section>`;
  pages.mission=()=>{
    const n=state.catalogue.filter(p=>p.product.trim()).length;
    return `<header class="brief"><div><small>BUSINESS CHINE / 2026</small><h1>${t('Tableau de bord','任务总览')}</h1></div><time>23 NOV — 06 DÉC</time></header>
    <section class="residence"><div><p>GUANGZHOU · FRANCE · SAL</p><h2>${t('Résidence de','住宅项目')}<br><b>${t('24 appartements','24 套公寓')}</b></h2><p>${t('Préparer les achats, comparer les options et coordonner les décisions de l’équipe.','筹备采购，比较方案，协调团队决策。')}</p><a href="#catalogue">${t('Ouvrir le catalogue','打开采购清单')} ↗</a></div><figure><img src="assets/architecture.jpg" alt=""><figcaption>${t('Photographie d’illustration','建筑示意照片')}</figcaption></figure></section>
    <div class="desk"><a href="#catalogue"><small>${t('Catalogue des achats','采购清单')}</small><strong>${n} <em>/ 25</em></strong><progress max="25" value="${n}"></progress><span>${t('Postes renseignés sur cet appareil','已在此设备填写')}</span></a><a href="#timeline"><small>${t('Planning Guangzhou','广州行程')}</small><strong>14 <em>${t('jours','天')}</em></strong><span>${t('Consulter les étapes','查看每日计划')} →</span></a><a href="#equipe"><small>${t('Équipe mission','项目团队')}</small><strong>3 <em>${t('personnes','人')}</em></strong><span>Edmond · Lourenco · Valencia</span></a></div>${doc()}`;
  };
  pages.equipe=()=>`<header class="brief"><h1>${t('Équipe et responsabilités','团队与分工')}</h1></header><div class="team-board">${[
    ['ET','Edmond Tavares',t('Pilotage des achats, suivi du budget et décisions.','统筹采购、跟踪预算与决策。')],
    ['LO','Lourenco',t('Rôle proposé, à confirmer : relire les besoins de la résidence.','建议职责，待确认：复核住宅项目需求。')],
    ['VA','Valencia',t('Suivi des informations de terrain dans Tencent Docs.','在腾讯文档中跟踪现场信息。')]
  ].map(([code,name,role])=>`<article><span class="team-code">${code}</span><div><h2>${name}</h2><p>${role}</p></div></article>`).join('')}</div>${doc()}`;
  const days=['出发准备','广州考察','第一轮采购调研','第二轮采购调研','样品与凭证','中期比较','每周复盘','候选清单','核实供应商','核算总成本','初步决策','方案与审核','整理记录','返程与交接'];
  const details=['检查访问权限与离线备份。','梳理考察区域与优先事项。','对比品类，保护谈判信息。','记录质量、合规与交期差异。','确定采购前需核实的事项。','比较需求、数量与物流条件。','备份并整理后续线索。','筛选可比较的选项。','在协作文档中核对凭证。','核算运输、税费与风险。','标记保留、待确认或排除的项目。','整理方案，核实需求与利润。','检查导出文件和下一步行动。','归档并准备后续跟进。'];
  const journeyKey='businessChine.journey.v22';
  const journey=JSON.parse(localStorage.getItem(journeyKey)||'{}');
  const plans={
    A:{label:['Équilibrée · recommandée','均衡 · 推荐'],days:[
      ['2026-11-27','Shanghai','Usine de maisons préfabriquées','Visite confirmée','🏭','confirmed'],
      ['2026-11-27','Shanghai → Guangzhou','Vol prévu à 22 h','Vol prévu · horaires à vérifier','✈️','organize'],
      ['2026-11-28','Guangzhou','Préparation avec Valencia','Rendez-vous proposé · à confirmer par Valencia','🤝','organize'],
      ['2026-11-29','Guangzhou → Jinan','Vol ou train · temps indicatif 3–8 h','航班或火车 · 参考时间 3–8 小时','✈️','organize'],
      ['2026-11-30','Jinan','Chargeuses et accessoires','装载机及配件','🚜','organize'],
      ['2026-12-01','Jinan → Guangzhou','Télescopiques · retour si possible','伸缩臂叉装车 · 如可行则返回广州','🚜','organize'],
      ['2026-12-02','Guangzhou → Foshan','Carrelage, sanitaires et cuisines · 1–2 h indicatif','瓷砖、卫浴及厨房 · 参考 1–2 小时','🚆','organize'],
      ['2026-12-03','Foshan','Mobilier et menuiseries','家具及门窗木作','🪑','organize'],
      ['2026-12-04','Foshan → Shenzhen','Informatique et électronique · 2–4 h indicatif','电脑及电子产品 · 参考 2–4 小时','💻','organize'],
      ['2026-12-05','Shenzhen → Guangzhou','Équipements techniques, logistique et bilan · 1–2 h indicatif','技术设备、物流及总结 · 参考 1–2 小时','📦','organize'],
      ['2026-12-06','Guangzhou','Départ · vol à confirmer','离开广州 · 航班待确认','✈️','organize']
    ]},
    B:{label:['Chantier prioritaire','工程优先'],days:[
      ['2026-11-27','Shanghai','Usine de maisons préfabriquées','Visite confirmée','🏭','confirmed'],['2026-11-27','Shanghai → Guangzhou','Vol prévu à 22 h','Vol prévu · horaires à vérifier','✈️','organize'],
      ['2026-11-28','Foshan','Équipements de la résidence','住宅设备采购','🏠','organize'],['2026-11-29','Foshan','Équipements de la résidence · suite','住宅设备采购 · 继续','🏠','organize'],['2026-11-30','Foshan','Équipements de la résidence · clôture','住宅设备采购 · 收尾','🏠','organize'],
      ['2026-12-01','Guangzhou → Jinan','Train ou vol · indicatif 3–8 h','火车或航班 · 参考 3–8 小时','🚆','organize'],['2026-12-02','Jinan','Engins de chantier','工程机械','🚜','organize'],['2026-12-03','Jinan → Guangzhou','Engins · retour vers Guangzhou','工程机械 · 返回广州','✈️','organize'],['2026-12-04','Guangzhou','Équipements techniques et logistique','技术设备及物流','📦','organize'],['2026-12-05','Guangzhou → Shenzhen → Guangzhou','Électronique · retour à Guangzhou · indicatif 1–2 h par trajet','电子产品 · 返回广州 · 参考每程 1–2 小时','🚄','organize'],['2026-12-06','Guangzhou','Départ','离开广州','✈️','organize']]},
    C:{label:['Électronique prioritaire','电子优先'],days:[
      ['2026-11-27','Shanghai','Usine de maisons préfabriquées','Visite confirmée','🏭','confirmed'],['2026-11-27','Shanghai → Guangzhou','Vol prévu à 22 h','Vol prévu · horaires à vérifier','✈️','organize'],
      ['2026-11-28','Guangzhou → Shenzhen','Train ou vol · indicatif 1–2 h','火车或航班 · 参考 1–2 小时','🚄','organize'],['2026-11-29','Shenzhen → Guangzhou','Électronique · retour · indicatif 1–2 h','电子产品 · 返回广州 · 参考 1–2 小时','💻','organize'],['2026-11-30','Guangzhou → Jinan','Train ou vol · indicatif 3–8 h','火车或航班 · 参考 3–8 小时','✈️','organize'],['2026-12-01','Jinan','Engins de chantier','工程机械','🚜','organize'],['2026-12-02','Jinan → Guangzhou','Engins · retour vers Guangzhou','工程机械 · 返回广州','🚆','organize'],['2026-12-03','Guangzhou → Foshan','Équipements de la résidence · indicatif 1–2 h','住宅设备 · 参考 1–2 小时','🚆','organize'],['2026-12-04','Foshan','Équipements de la résidence · suite','住宅设备 · 继续','🏠','organize'],['2026-12-05','Guangzhou','Logistique et bilan','物流及总结','📦','organize'],['2026-12-06','Guangzhou','Départ','离开广州','✈️','organize']]}
  };
  const cityClass=s=>s.includes('Shanghai')?'shanghai':s.includes('Jinan')?'jinan':s.includes('Foshan')?'foshan':s.includes('Shenzhen')?'shenzhen':'guangzhou';
  const labels={organize:['À organiser','待安排'],confirmed:['Confirmé','已确认'],done:['Réalisé','已完成'],cancelled:['Annulé','已取消']};
  const zhText={
    'Usine de maisons préfabriquées':'预制房屋工厂参观','Visite confirmée':'参观已确认','Vol prévu à 22 h':'计划22:00起飞','Vol prévu · horaires à vérifier':'计划航班 · 时间待核实','Préparation avec Valencia':'与 Valencia 准备','Rendez-vous proposé · à confirmer par Valencia':'建议会面 · 需由 Valencia 确认','Vol ou train · temps indicatif 3–8 h':'飞机或火车 · 参考时间3–8小时','Chargeuses et accessoires':'装载机及配件','Télescopiques · retour si possible':'伸缩臂叉装车 · 如可行则返回广州','Carrelage, sanitaires et cuisines · 1–2 h indicatif':'瓷砖、卫浴及厨房 · 参考1–2小时','Mobilier et menuiseries':'家具及门窗木作','Informatique et électronique · 2–4 h indicatif':'电脑及电子产品 · 参考2–4小时','Équipements techniques, logistique et bilan · 1–2 h indicatif':'技术设备、物流及总结 · 参考1–2小时','Départ · vol à confirmer':'离开广州 · 航班待确认','Équipements de la résidence':'住宅设备采购','Équipements de la résidence · suite':'住宅设备采购 · 继续','Équipements de la résidence · clôture':'住宅设备采购 · 收尾','住宅设备采购':'住宅设备采购','住宅设备采购 · 继续':'住宅设备采购 · 继续','住宅设备采购 · 收尾':'住宅设备采购 · 收尾','Train ou vol · indicatif 3–8 h':'火车或航班 · 参考3–8小时','Engins de chantier':'工程机械','Engins · retour vers Guangzhou':'工程机械 · 返回广州','Équipements techniques et logistique':'技术设备及物流','Train ou vol · indicatif 1–2 h':'火车或航班 · 参考1–2小时','Électronique · retour · indicatif 1–2 h':'电子产品 · 返回广州 · 参考1–2小时','Électronique · retour à Guangzhou · indicatif 1–2 h par trajet':'电子产品 · 返回广州 · 参考每程1–2小时','Équipements de la résidence · indicatif 1–2 h':'住宅设备采购 · 参考1–2小时','Logistique et bilan':'物流及总结','Départ':'离开广州','离开广州 · 航班待确认':'离开广州 · 航班待确认'
  };
  const localized=s=>zh?(zhText[s]||s):s;
  const statusLabel=s=>t(...labels[s]);
  const saveJourney=()=>localStorage.setItem(journeyKey,JSON.stringify(journey));
  const currentDate=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Shanghai'}).format(new Date());
  const photos=['assets/architecture.jpg','assets/architecture.jpg','assets/architecture.jpg'];
  pages.timeline=()=>{
    const selected=journey.plan||'A', plan=plans[selected], today=plan.days.findIndex(d=>d[0]===currentDate);
    const map=`<div class="journey-map" role="img" aria-label="${t('Carte schématique des villes du parcours','行程城市示意图')}"><svg viewBox="0 0 520 330" aria-hidden="true"><path class="route-line" d="M95 70 Q205 85 265 165 T210 245 Q330 235 405 185"/><g class="city shanghai" transform="translate(95 70)"><circle r="13"/><text y="-22">Shanghai</text></g><g class="city jinan" transform="translate(265 165)"><circle r="13"/><text y="-22">Jinan</text></g><g class="city guangzhou" transform="translate(210 245)"><circle r="13"/><text y="33">Guangzhou</text></g><g class="city foshan" transform="translate(175 272)"><circle r="10"/><text x="-4" y="30">Foshan</text></g><g class="city shenzhen" transform="translate(405 185)"><circle r="13"/><text y="-22">Shenzhen</text></g></svg><small>${t('Schéma indicatif · positions non destinées à la navigation','示意图 · 位置不可用于导航')}</small></div>`;
    const cards=plan.days.map((d,i)=>{
      const key=selected+'-'+d[0]+'-'+i, status=journey.status?.[key]||d[5], title=journey.title?.[key]||d[2], note=journey.note?.[key]||d[3], shownTitle=journey.title?.[key]?title:localized(title), shownNote=journey.note?.[key]?note:localized(note), stamp=d[0]===currentDate;
      const month=d[0].slice(5,7)==='11'?t('NOV','11月'):t('DÉC','12月');
      return `<article class="journey-day ${cityClass(d[1])} ${stamp?'is-today':''}" data-day="${key}"><div class="journey-date"><strong>${d[0].slice(8)}</strong><span>${month}</span></div><div class="journey-body"><small>${d[4]} · ${d[1]} ${stamp?'<b class="today-pill">'+t('AUJOURD’HUI','今天')+'</b>':''}</small><h2>${esc(shownTitle)}</h2><p>${esc(shownNote)}</p><div class="journey-actions"><select aria-label="${t('Statut','状态')}" data-status><option value="organize" ${status==='organize'?'selected':''}>${statusLabel('organize')}</option><option value="confirmed" ${status==='confirmed'?'selected':''}>${statusLabel('confirmed')}</option><option value="done" ${status==='done'?'selected':''}>${statusLabel('done')}</option><option value="cancelled" ${status==='cancelled'?'selected':''}>${statusLabel('cancelled')}</option></select><button type="button" data-edit>${t('Modifier','编辑')}</button></div></div></article>`;
    }).join('');
    return `<header class="brief"><div><small>BUSINESS CHINE / TRAVEL PLANNER</small><h1>${t('Planning de voyage','旅行计划')}</h1></div><time>27 NOV — 06 DÉC</time></header><div class="plan-picker">${Object.entries(plans).map(([id,p])=>`<button data-plan="${id}" class="${id===selected?'selected':''}"><b>${id}</b><span>${t(...p.label)}</span></button>`).join('')}</div><p class="journey-note">${t('Les visites futures sont des propositions à confirmer par Valencia. Durées de trajet indicatives, à vérifier avant réservation.','未来行程为建议方案，需由 Valencia 确认。交通时间仅供参考，预订前请核实。')}</p><section class="family-strip">${[['assets/construction.jpg','🚜',t('Engins de chantier','工程机械')],['assets/residence.jpg','🏠',t('Équipements résidence','住宅设备')],['assets/electronics.jpg','💻',t('Électronique','电子产品')]].map(([src,icon,name])=>`<figure><img src="${src}" alt=""><figcaption>${icon} ${name} · ${t('illustration','示意图')}</figcaption></figure>`).join('')}</section>${map}<div class="journey-list">${cards}</div><div class="journey-tools"><button id="copyJourneyFr">${t('Copier en français pour WeChat','复制法语行程到微信')}</button><button id="copyJourneyZh">${t('Copier en chinois pour WeChat','复制中文行程到微信')}</button></div>${doc()}`;
  };
  document.querySelector('#page').addEventListener('change',e=>{
    const card=e.target.closest('[data-day]');if(!card)return;
    if(e.target.matches('[data-status]')){journey.status??={};journey.status[card.dataset.day]=e.target.value;saveJourney()}
  });
  document.querySelector('#page').addEventListener('click',async e=>{
    const planButton=e.target.closest('[data-plan]');if(planButton){journey.plan=planButton.dataset.plan;saveJourney();render();return}
    const card=e.target.closest('[data-day]');
    if(card&&e.target.closest('[data-edit]')){journey.title??={};journey.note??={};const title=prompt(t('Modifier le programme du jour','编辑当天安排'),card.querySelector('h2').textContent);if(title===null)return;const note=prompt(t('Détail ou rendez-vous proposé','详情或建议会面'),card.querySelector('p').textContent);if(note===null)return;journey.title[card.dataset.day]=title;journey.note[card.dataset.day]=note;saveJourney();render();return}
    const copy=e.target.closest('#copyJourneyFr,#copyJourneyZh');if(copy){const isChinese=copy.id.endsWith('Zh');const program=plans[journey.plan||'A'].days.map(d=>isChinese?`${d[0]} · ${d[1]} — ${d[4]} ${zhText[d[2]]||d[2]}（${zhText[d[3]]||d[3]}）`:`${d[0]} · ${d[1]} — ${d[4]} ${d[2]} (${d[3]})`).join('\n');try{await navigator.clipboard.writeText(program);alert(t('Programme copié','行程已复制'))}catch{alert(program)}}
  });
  const catalogue=pages.catalogue;
  pages.catalogue=()=>{
    const n=state.catalogue.filter(p=>p.product.trim()).length;
    return `<div class="catalogue-progress"><span>${t('Résidence · postes renseignés','住宅项目 · 已填写项目')}</span><progress max="25" value="${n}"></progress><b>${n}/25</b></div>`+catalogue();
  };
  if(zh){
    const dict={'Catalogue · 25 achats':'采购清单 · 25 项','25 emplacements locaux pour qualifier les achats. Aucun contenu de ce catalogue n’est envoyé au serveur.':'本设备上的 25 个采购项目。内容保存在本地。','Exporter CSV':'导出 CSV','renseignés':'已填写','à qualifier':'待评估','Poste':'项目','Désignation locale':'采购名称','Catégorie':'类别','Quantité':'数量','Statut':'状态','Note publique sûre':'公开备注','Enregistrer sur cet appareil':'保存到此设备','À qualifier':'待评估','À comparer':'待比较','À valider':'待确认','Retenu':'已选','Écarté':'已排除','Pilotage existant':'管理工具','Toutes les fonctions de la V1 sont conservées. Elles utilisent le stockage local de ce navigateur.':'以下业务工具保留法语界面，数据存储在当前浏览器中。','Imprimer':'打印','Exporter le projet':'导出项目','Mode présentation':'演示模式','Données enregistrées localement':'数据保存在本地'};
    const translate=()=>{for(const el of document.querySelectorAll('.page-head h1,.page-head p,.page-actions button,.catalogue-editor label,.catalogue-editor button,.catalogue-editor option,.catalogue-summary span,#printPresentation,#exportProject,#modeToggle span:last-child,#saveStatus')){
      for(const node of el.childNodes)if(node.nodeType===3 && dict[node.textContent.trim()]){
        if(el.tagName==='OPTION'&&!el.hasAttribute('value'))el.value=el.textContent;
        node.textContent=dict[node.textContent.trim()];
      }
    }};
    new MutationObserver(translate).observe(document.querySelector('#page'),{childList:true});translate();
  }
}
