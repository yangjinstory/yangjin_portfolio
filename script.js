
// 프로젝트 목록과 상세 내용을 한 페이지에 표시합니다.
const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const materialImages=[
 {src:'project1_material_1.png',title:'연간 광고 사업계획'},
 {src:'project1_material_2.png',title:'월간 매체별 광고 계획'},
 {src:'project1_material_3.png',title:'연간 광고 예산 산출'},
 {src:'project1_material_4.png',title:'월별 광고비 집행 계획'}
];
const project3Images=[
 {src:'project3_material_1.png',title:'모집 홈페이지 및 홍보영상'},
 {src:'project3_material_2.png',title:'합격생 인터뷰 및 홍보영상'},
 {src:'project3_material_3.png',title:'디스플레이 광고 소재'},
 {src:'project3_material_4.png',title:'온라인 프로모션·체험단·스터디·제휴 이벤트'}
];
const project2Images=[
 {src:'project2_material_1.png',title:'광고 운영 성과 지표'},
 {src:'project2_material_2.png',title:'광고 매체별 운영 현황'},
 {src:'project2_material_3.png',title:'광고 데이터 및 전환 분석'},
 {src:'project2_material_4.png',title:'캠페인별 광고 성과 비교'}
];
// PROJECT 3 첫 번째 이미지의 하단 영상 썸네일 3개에만 링크를 연결합니다.
const project3VideoLinks=[
 {title:'윈터스쿨 홍보영상',url:'https://naver.me/xnOyZQJf'},
 {title:'팀플 홍보영상',url:'https://naver.me/xiLpvcS8'},
 {title:'재수 우선선발반 홍보영상',url:'https://naver.me/F5slH4Ix'}
];
function project3VideoHotspots(){
 return project3VideoLinks.map((v,i)=>`<a href="${v.url}" target="_blank" rel="noopener noreferrer" aria-label="${v.title} 새 창에서 보기" title="${v.title} 보기" style="position:absolute;left:${[1.6,34.4,67.1][i]}%;top:81.9%;width:31.4%;height:15.9%;z-index:3;cursor:pointer;"></a>`).join('');
}
// PROJECT 3 두 번째 이미지: 2열 x 3행 영상 썸네일 클릭 영역
const project3InterviewLinks=[
 {title:'합격수기 1',url:'https://youtu.be/hZj9y7u5iME?si=LujAdqm17CH6BHCB'},
 {title:'합격수기 2',url:'https://youtu.be/TVeifL712Uk?si=t0dMCPjPTS8avWMk'},
 {title:'응원영상 3',url:'https://www.youtube.com/watch?v=DXxh--NlPaE'},
 {title:'학원영상 4',url:'https://youtu.be/WaW3T1D_78U?si=k45hRbAxDv_pPzUV'},
 {title:'유퀴즈 1',url:'https://youtu.be/6xYd5M3L7to?si=SQcXSoBYCwUih_yd'},
 {title:'유퀴즈 2',url:'https://youtu.be/UmQ1bO_FqY4?si=NVSrWj3TfjntcI4t'}
];
function project3InterviewHotspots(){
 return project3InterviewLinks.map((v,i)=>`<a href="${v.url}" target="_blank" rel="noopener noreferrer" aria-label="${v.title} 영상 보기" title="${v.title} 영상 보기" style="position:absolute;left:${i%2===0?3:50.8}%;top:${[2,2,33,33,65.2,65.2][i]}%;width:46%;height:30%;z-index:3;cursor:pointer;"></a>`).join('');
}
function projectMaterials(items=materialImages){
 return `<div class="portfolio-materials">${items.map((m,i)=>`<figure>${items===project3Images&&i===0?`<div style="position:relative;width:100%;line-height:0;"><button type="button" class="material-button" onclick="openMaterial('project3',0)" aria-label="${escapeHtml(m.title)} 확대" style="display:block;width:100%;"><img src="${m.src}" alt="${escapeHtml(m.title)}" loading="lazy" style="display:block;width:100%;height:auto;"></button>${project3VideoHotspots()}</div>`:items===project3Images&&i===1?`<div style="position:relative;width:100%;line-height:0;"><button type="button" class="material-button" onclick="openMaterial('project3',1)" aria-label="${escapeHtml(m.title)} 확대" style="display:block;width:100%;"><img src="${m.src}" alt="${escapeHtml(m.title)}" loading="lazy" style="display:block;width:100%;height:auto;"></button>${project3InterviewHotspots()}</div>`:`<button type="button" class="material-button" onclick="openMaterial('${items===project3Images?'project3':items===project2Images?'project2':'project1'}',${i})" aria-label="${escapeHtml(m.title)} 확대"><img src="${m.src}" alt="${escapeHtml(m.title)}" loading="lazy"></button>`}<figcaption>${escapeHtml(m.title)}</figcaption></figure>`).join('')}</div>${items===materialImages?'<p class="note">※ 이해를 돕기 위해 실제 예산 및 내부 수치는 비식별화한 자료입니다.</p>':''}`;
}
function renderCards(){
 const root=document.getElementById('projectCards');
 if(!root)return;
 root.innerHTML=PROJECTS.map((p,i)=>`<a class="card" href="#project-${i+1}"><div class="num">PROJECT ${String(i+1).padStart(2,'0')}</div><h3>${escapeHtml(p.title)}</h3><div class="tag">${escapeHtml(p.category)}</div><p>${escapeHtml(p.summary)}</p><strong>CASE STUDY ↘</strong></a>`).join('');
 let container=document.getElementById('projectCaseStudies');
 if(!container){container=document.createElement('div');container.id='projectCaseStudies';root.insertAdjacentElement('afterend',container)}
 container.innerHTML=PROJECTS.map((p,i)=>`<article class="case-study" id="project-${i+1}"><div class="eyebrow case-eyebrow">PROJECT ${String(i+1).padStart(2,'0')} · ${escapeHtml(p.category)}</div><h2>${escapeHtml(p.title)}</h2><p class="lead">${escapeHtml(p.summary)}</p>${i===0?projectMaterials():i===1?projectMaterials(project2Images):i===2?projectMaterials(project3Images):''}${[['SITUATION',p.situation],['KPI',p.kpi],['ACTION',p.action],['RESULT',p.result],['INSIGHT',p.insight]].map(([k,v])=>`<div class="detail"><h4>${k}</h4><p>${escapeHtml(v)}</p></div>`).join('')}<a class="case-top" href="#projects">↑ 프로젝트 목록으로</a></article>`).join('');
 const detail=document.getElementById('detailView');
 if(detail)detail.classList.add('hidden');
 const overview=document.getElementById('overview');
 if(overview)overview.classList.remove('hidden');
}
function openDetail(i){document.getElementById(`project-${i+1}`)?.scrollIntoView({behavior:'smooth'});}
function closeDetail(){location.hash='projects';}
function openMaterial(project,i){
 const item=(project==='project3'?project3Images:project==='project2'?project2Images:materialImages)[i];if(!item)return;
 closeMaterial();
 const overlay=document.createElement('div');
 overlay.id='materialLightbox';overlay.className='project1-lightbox';
 overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label',item.title);
 overlay.innerHTML=`<button class="project1-lightbox-close" type="button" aria-label="닫기">×</button>${project==='project3'&&i===0?`<div style="position:relative;width:min(96vw,calc((100vh - 80px)*1.5));max-height:calc(100vh - 80px);line-height:0;"><img src="${item.src}" alt="${escapeHtml(item.title)}" style="display:block;width:100%;height:auto;max-height:calc(100vh - 80px);object-fit:contain;">${project3VideoHotspots()}</div>`:project==='project3'&&i===1?`<div style="position:relative;width:min(96vw,calc((100vh - 80px)*1.5));max-height:calc(100vh - 80px);line-height:0;"><img src="${item.src}" alt="${escapeHtml(item.title)}" style="display:block;width:100%;height:auto;max-height:calc(100vh - 80px);object-fit:contain;">${project3InterviewHotspots()}</div>`:`<img src="${item.src}" alt="${escapeHtml(item.title)}">`}`;
 document.body.appendChild(overlay);
 overlay.querySelector('button').focus();
 overlay.addEventListener('click',e=>{if(e.target===overlay||e.target.closest('.project1-lightbox-close'))closeMaterial()});
}
function closeMaterial(){document.getElementById('materialLightbox')?.remove();}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMaterial()});
renderCards();

// CAREER: 기존 타임라인 스타일을 유지하며 경력 데이터를 표시합니다.
function renderCareers(){
 const root=document.getElementById('careerTimeline');
 if(!root || typeof CAREERS==='undefined')return;
 root.innerHTML=CAREERS.map(c=>`<div class="job"><h3>${escapeHtml(c.company)} · ${escapeHtml(c.department)} | ${escapeHtml(c.position)}</h3><small>${escapeHtml(c.period)}</small><p>${escapeHtml(c.description)}</p></div>`).join('');
}
renderCareers();
