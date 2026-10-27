
// 프로젝트 목록과 상세 내용을 한 페이지에 표시합니다.
const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const materialImages=[
 {src:'project1_material_1.png',title:'연간 광고 사업계획'},
 {src:'project1_material_2.png',title:'월간 매체별 광고 계획'},
 {src:'project1_material_3.png',title:'연간 광고 예산 산출'},
 {src:'project1_material_4.png',title:'월별 광고비 집행 계획'}
];
function projectMaterials(){
 return `<div class="portfolio-materials">${materialImages.map((m,i)=>`<figure><button type="button" class="material-button" onclick="openMaterial(${i})" aria-label="${escapeHtml(m.title)} 확대"><img src="${m.src}" alt="${escapeHtml(m.title)}" loading="lazy"></button><figcaption>${escapeHtml(m.title)}</figcaption></figure>`).join('')}</div><p class="note">※ 이해를 돕기 위해 실제 예산 및 내부 수치는 비식별화한 자료입니다.</p>`;
}
function renderCards(){
 const root=document.getElementById('projectCards');
 if(!root)return;
 root.innerHTML=PROJECTS.map((p,i)=>`<a class="card" href="#project-${i+1}"><div class="num">PROJECT ${String(i+1).padStart(2,'0')}</div><h3>${escapeHtml(p.title)}</h3><div class="tag">${escapeHtml(p.category)}</div><p>${escapeHtml(p.summary)}</p><strong>CASE STUDY ↘</strong></a>`).join('');
 let container=document.getElementById('projectCaseStudies');
 if(!container){container=document.createElement('div');container.id='projectCaseStudies';root.insertAdjacentElement('afterend',container)}
 container.innerHTML=PROJECTS.map((p,i)=>`<article class="case-study" id="project-${i+1}"><div class="eyebrow case-eyebrow">PROJECT ${String(i+1).padStart(2,'0')} · ${escapeHtml(p.category)}</div><h2>${escapeHtml(p.title)}</h2><p class="lead">${escapeHtml(p.summary)}</p>${i===0?projectMaterials():''}${[['SITUATION',p.situation],['KPI',p.kpi],['ACTION',p.action],['RESULT',p.result],['INSIGHT',p.insight]].map(([k,v])=>`<div class="detail"><h4>${k}</h4><p>${escapeHtml(v)}</p></div>`).join('')}<a class="case-top" href="#projects">↑ 프로젝트 목록으로</a></article>`).join('');
 const detail=document.getElementById('detailView');
 if(detail)detail.classList.add('hidden');
 const overview=document.getElementById('overview');
 if(overview)overview.classList.remove('hidden');
}
function openDetail(i){document.getElementById(`project-${i+1}`)?.scrollIntoView({behavior:'smooth'});}
function closeDetail(){location.hash='projects';}
function openMaterial(i){
 const item=materialImages[i];if(!item)return;
 closeMaterial();
 const overlay=document.createElement('div');
 overlay.id='materialLightbox';overlay.className='project1-lightbox';
 overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label',item.title);
 overlay.innerHTML=`<button class="project1-lightbox-close" type="button" aria-label="닫기">×</button><img src="${item.src}" alt="${escapeHtml(item.title)}">`;
 document.body.appendChild(overlay);
 overlay.querySelector('button').focus();
 overlay.addEventListener('click',e=>{if(e.target===overlay||e.target.closest('button'))closeMaterial()});
}
function closeMaterial(){document.getElementById('materialLightbox')?.remove();}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMaterial()});
renderCards();
