// 프로젝트 카드 및 상세 화면 기능
const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function renderCards(){document.getElementById('projectCards').innerHTML=PROJECTS.map((p,i)=>`<article class="card" tabindex="0" role="button" onclick="openDetail(${i})" onkeydown="if(event.key==='Enter')openDetail(${i})"><div class="num">PROJECT ${String(i+1).padStart(2,'0')}</div><h3>${escapeHtml(p.title)}</h3><div class="tag">${escapeHtml(p.category)}</div><p>${escapeHtml(p.summary)}</p><strong>CASE STUDY ↗</strong></article>`).join('')}

function openDetail(i){stopProject1Timer();const p=PROJECTS[i];document.getElementById('overview').classList.add('hidden');document.getElementById('detailView').classList.remove('hidden');document.getElementById('detailContent').innerHTML=`<div class="eyebrow" style="color:#42698f;margin-top:45px">PROJECT ${String(i+1).padStart(2,'0')} · ${escapeHtml(p.category)}</div><h2>${escapeHtml(p.title)}</h2><p class="lead">${escapeHtml(p.summary)}</p>${i===0?project1SliderMarkup():''}${[['SITUATION',p.situation],['KPI',p.kpi],['ACTION',p.action],['RESULT',p.result],['INSIGHT',p.insight]].map(([a,b])=>`<div class="detail"><h4>${a}</h4><p>${escapeHtml(b)}</p></div>`).join('')}<p class="note">※ 프로젝트 이미지와 수치는 공개 가능 여부 확인 후 추가하세요.</p>`;if(i===0){project1Index=0;restartProject1Timer()}location.hash='detailView';window.scrollTo({top:0,behavior:'smooth'})}

function closeDetail(){stopProject1Timer();closeProject1Image();stopProject1Timer();document.getElementById('overview').classList.remove('hidden');document.getElementById('detailView').classList.add('hidden');location.hash='projects'}

// PROJECT 01 전용: 중앙 이미지 슬라이더 (다른 프로젝트는 변경하지 않음)
let project1Timer = null;
let project1Index = 0;
const project1Slides = [
  {src:'project1_annual.png', title:'연간 광고 사업계획'},
  {src:'project1_monthly.png', title:'월간 광고비 계획'}
];
function project1SliderMarkup(){
  return `<section class="project1-gallery" aria-label="프로젝트 1 업무 자료">
    <div class="project1-slide-frame"><button class="project1-image-button" type="button" onclick="openProject1Image()" aria-label="이미지 크게 보기"><img id="project1SlideImage" src="project1_annual.png" alt="연간 광고 사업계획표"></button></div>
    <div class="project1-slide-controls">
      <button type="button" class="project1-arrow" onclick="changeProject1Slide(-1)" aria-label="이전 이미지">‹</button>
      <div class="project1-slide-center"><span id="project1SlideTitle">연간 광고 사업계획</span><div class="project1-dots"><button type="button" class="active" onclick="showProject1Slide(0)" aria-label="연간 광고 사업계획 보기" aria-current="true"></button><button type="button" onclick="showProject1Slide(1)" aria-label="월간 광고비 계획 보기"></button></div></div>
      <button type="button" class="project1-arrow" onclick="changeProject1Slide(1)" aria-label="다음 이미지">›</button>
    </div>
    <p class="project1-gallery-hint">이미지를 클릭하면 확대해서 볼 수 있습니다.</p>
  </section>`;
}
function showProject1Slide(index){
  project1Index=(index+project1Slides.length)%project1Slides.length;
  const slide=project1Slides[project1Index];
  const img=document.getElementById('project1SlideImage');
  if(!img)return;
  img.src=slide.src;img.alt=slide.title+' 이미지';
  document.getElementById('project1SlideTitle').textContent=slide.title;
  document.querySelectorAll('.project1-dots button').forEach((b,i)=>{b.classList.toggle('active',i===project1Index);if(i===project1Index)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current')});
}
function changeProject1Slide(delta){showProject1Slide(project1Index+delta);restartProject1Timer()}
function stopProject1Timer(){if(project1Timer!==null){clearInterval(project1Timer);project1Timer=null}}
function restartProject1Timer(){stopProject1Timer();if(document.querySelector('.project1-gallery')&&!document.hidden)project1Timer=setInterval(()=>showProject1Slide(project1Index+1),3000)}
function openProject1Image(){stopProject1Timer();const slide=project1Slides[project1Index];const dialog=document.createElement('div');dialog.className='project1-lightbox';dialog.id='project1Lightbox';dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');dialog.setAttribute('aria-label',slide.title);dialog.innerHTML=`<button type="button" class="project1-lightbox-close" aria-label="닫기">×</button><img src="${slide.src}" alt="${slide.title}">`;document.body.appendChild(dialog);dialog.querySelector('button').focus();dialog.addEventListener('click',e=>{if(e.target===dialog||e.target.closest('button'))closeProject1Image()})}
function closeProject1Image(){document.getElementById('project1Lightbox')?.remove();restartProject1Timer()}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeProject1Image()});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopProject1Timer();else if(document.querySelector('.project1-gallery'))restartProject1Timer()});
document.addEventListener('mouseover',e=>{if(e.target.closest('.project1-gallery'))stopProject1Timer()});
document.addEventListener('mouseout',e=>{const gallery=e.target.closest('.project1-gallery');if(gallery&&!gallery.contains(e.relatedTarget))restartProject1Timer()});

renderCards();
