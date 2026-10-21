// 프로젝트 카드 및 상세 화면 기능
const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function renderCards(){document.getElementById('projectCards').innerHTML=PROJECTS.map((p,i)=>`<article class="card" tabindex="0" role="button" onclick="openDetail(${i})" onkeydown="if(event.key==='Enter')openDetail(${i})"><div class="num">PROJECT ${String(i+1).padStart(2,'0')}</div><h3>${escapeHtml(p.title)}</h3><div class="tag">${escapeHtml(p.category)}</div><p>${escapeHtml(p.summary)}</p><strong>CASE STUDY ↗</strong></article>`).join('')}

function openDetail(i){const p=PROJECTS[i];document.getElementById('overview').classList.add('hidden');document.getElementById('detailView').classList.remove('hidden');document.getElementById('detailContent').innerHTML=`<div class="eyebrow" style="color:#42698f;margin-top:45px">PROJECT ${String(i+1).padStart(2,'0')} · ${escapeHtml(p.category)}</div><h2>${escapeHtml(p.title)}</h2><p class="lead">${escapeHtml(p.summary)}</p>${[['SITUATION',p.situation],['KPI',p.kpi],['ACTION',p.action],['RESULT',p.result],['INSIGHT',p.insight]].map(([a,b])=>`<div class="detail"><h4>${a}</h4><p>${escapeHtml(b)}</p></div>`).join('')}<p class="note">※ 프로젝트 이미지와 수치는 공개 가능 여부 확인 후 추가하세요.</p>`;location.hash='detailView';window.scrollTo({top:0,behavior:'smooth'})}

function closeDetail(){document.getElementById('overview').classList.remove('hidden');document.getElementById('detailView').classList.add('hidden');location.hash='projects'}
renderCards();
