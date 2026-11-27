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
  pages.timeline=()=>`<header class="brief"><div><small>GUANGZHOU / 2026</small><h1>${t('Planning de mission','任务行程')}</h1></div><time>23 NOV — 06 DÉC</time></header><p>${t('Programme prévisionnel · les rendez-vous sont à confirmer dans Tencent Docs.','预定计划 · 具体会面请在腾讯文档中确认。')}</p><div class="timeline-ledger">${missionDays.map((d,i)=>`<article class="day-row"><time datetime="${d.iso}"><strong>${d.day}</strong><span>${t(d.month,d.iso.slice(5,7)+'月')}</span></time><div class="day-index">${i+1}</div><div><h2>${t(d.title,days[i])}</h2><p>${t(d.text,details[i])}</p></div></article>`).join('')}</div>${doc()}`;
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
