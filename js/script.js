/* ══ CONFIG — Replace these values ══════════════
   FORMSPREE_ID  : formspree.io → sign up → create form → get ID (e.g. 'xpwzgkab')
   EJS_PUBLIC_KEY: emailjs.com  → Account → Public Key
   EJS_SERVICE_ID: emailjs.com  → Email Services → Service ID
   EJS_TMPL_ID   : emailjs.com  → Email Templates → Template ID
   Template variables to use: {{to_name}}, {{to_email}}, {{ticket_tier}},
   {{ticket_price}}, {{event_date}}, {{event_venue}}, {{momo_number}}
════════════════════════════════════════════════ */
const CFG = {
  formspree  : 'movlynjz',
  ejsKey     : 'hiByjm866hgX_g-gE',
  ejsService : 'service_qglm8np',
  ejsTemplate: 'template_yvs893m',
  momo       : '653719589',
  email      : 'linkedinlocals@gmail.com'
};
try { emailjs.init(CFG.ejsKey); } catch(e){}

/* Form state */
const F = { name:'',email:'',phone:'',job:'',hear:'',ticket:'',tName:'',price:0,expect:'' };

/* ── CURSOR ── */
const $c=document.getElementById('cur'),$r=document.getElementById('cur-r');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
(function loop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;$c.style.left=mx+'px';$c.style.top=my+'px';$r.style.left=rx+'px';$r.style.top=ry+'px';requestAnimationFrame(loop);})();
document.querySelectorAll('a,button,.pc-inner,.tc,.spc,.ticket-opt').forEach(el=>{
  el.addEventListener('mouseenter',()=>{$c.classList.add('x');$r.classList.add('x');});
  el.addEventListener('mouseleave',()=>{$c.classList.remove('x');$r.classList.remove('x');});
});

/* ── NAV ── */
const navEl=document.getElementById('nav');
window.addEventListener('scroll',()=>navEl.classList.toggle('sc',scrollY>60),{passive:true});

/* ── HAMBURGER ── */
const ham=document.getElementById('ham'),mm=document.getElementById('mm');
function openMob(){ham.classList.add('o');mm.classList.add('o');document.body.style.overflow='hidden';}
function closeMob(){ham.classList.remove('o');mm.classList.remove('o');document.body.style.overflow='';}
ham.onclick=()=>mm.classList.contains('o')?closeMob():openMob();
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMob();closeModal();}});

/* ── MARQUEE ── */
const mqEl=document.getElementById('mq');
['Students','Entrepreneurs','Young Professionals','Industry Leaders','Changemakers','Bamenda','Beyond The Profile','30th May 2026','Alliance Francais','Networking','Career Growth','LinkedIn Locals'].forEach(t=>{
  const s=document.createElement('span');s.className='mq-i';s.innerHTML='<span class="mq-d"></span>'+t;mqEl.appendChild(s);
});
mqEl.innerHTML+=mqEl.innerHTML;

/* ── REVEALS ── */
const rObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis');}),{threshold:.1});
document.querySelectorAll('.rv,.tc,.spc,.ab-l,.stats').forEach(el=>rObs.observe(el));

/* ── COUNT UP ── */
const cObs=new IntersectionObserver(es=>{es.forEach(e=>{
  if(!e.isIntersecting)return;
  e.target.querySelectorAll('[data-t]').forEach(el=>{
    const t=parseInt(el.getAttribute('data-t'));
    const em=el.querySelector('em');let n=0,step=Math.max(1,Math.ceil(t/50));
    const iv=setInterval(()=>{n=Math.min(n+step,t);const tx=el.childNodes[0];if(tx&&tx.nodeType===3)tx.textContent=n;if(n>=t)clearInterval(iv);},30);
  });
  cObs.unobserve(e.target);
});},{threshold:.3});
const sEl=document.getElementById('stats');if(sEl)cObs.observe(sEl);

/* ── PILLARS TEXT CAROUSEL ── */
let pi=0;
const pt=document.getElementById('pcTrack'),pd=document.getElementById('pcDots');
const ps=pt.querySelectorAll('.pc-slide');
ps.forEach((_,i)=>{const d=document.createElement('div');d.className='pc-dot'+(i===0?' on':'');d.onclick=()=>pcGo(i);pd.appendChild(d);});
function pcGo(i){pi=i;pt.style.transform=`translateX(-${i*100}%)`;document.querySelectorAll('.pc-dot').forEach((d,j)=>d.classList.toggle('on',j===i));}
document.getElementById('pcPrev').onclick=()=>pcGo((pi-1+ps.length)%ps.length);
document.getElementById('pcNext').onclick=()=>pcGo((pi+1)%ps.length);
let pct=setInterval(()=>pcGo((pi+1)%ps.length),4200);
pt.parentElement.addEventListener('mouseenter',()=>clearInterval(pct));
pt.parentElement.addEventListener('mouseleave',()=>{pct=setInterval(()=>pcGo((pi+1)%ps.length),4200);});
let ptx=0;pt.addEventListener('touchstart',e=>{ptx=e.touches[0].clientX;},{passive:true});
pt.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-ptx;if(Math.abs(dx)>40)pcGo(dx<0?(pi+1)%ps.length:(pi-1+ps.length)%ps.length);});

/* ── PILLARS IMAGE GALLERY + LIGHTBOX ── */
(function(){
  const gTrack=document.getElementById('pcGTrack');
  if(!gTrack)return;
  const imgs=[...gTrack.querySelectorAll('img')];
  if(!imgs.length)return;
  const dotsWrap=document.getElementById('pcgDots');
  const pauseBtn=document.getElementById('pcgPause');
  const pauseIcon=document.getElementById('pcgPauseIcon');
  let gi=0,gPaused=false,gTimer;

  /* Build dots */
  imgs.forEach((_,i)=>{
    const d=document.createElement('div');
    d.className='pcg-dot'+(i===0?' on':'');
    d.onclick=()=>gGo(i);
    dotsWrap.appendChild(d);
  });

  function gGo(to){
    gi=to;
    gTrack.style.transform=`translateX(-${to*100}%)`;
    document.querySelectorAll('.pcg-dot').forEach((d,j)=>d.classList.toggle('on',j===to));
  }
  function gNext(){gGo((gi+1)%imgs.length);}
  function startTimer(){if(!gPaused)gTimer=setInterval(gNext,3400);}
  function stopTimer(){clearInterval(gTimer);}
  startTimer();

  document.getElementById('pcgPrev').onclick=(e)=>{e.stopPropagation();stopTimer();gGo((gi-1+imgs.length)%imgs.length);startTimer();};
  document.getElementById('pcgNext').onclick=(e)=>{e.stopPropagation();stopTimer();gGo((gi+1)%imgs.length);startTimer();};

  pauseBtn.onclick=(e)=>{
    e.stopPropagation();
    gPaused=!gPaused;
    pauseIcon.className=gPaused?'fas fa-play':'fas fa-pause';
    gPaused?stopTimer():startTimer();
  };

  /* Pause on hover */
  const gallery=document.getElementById('pcGallery');
  gallery.addEventListener('mouseenter',()=>stopTimer());
  gallery.addEventListener('mouseleave',()=>{if(!gPaused)startTimer();});

  /* Touch swipe */
  let gTx=0;
  gallery.addEventListener('touchstart',e=>{gTx=e.touches[0].clientX;stopTimer();},{passive:true});
  gallery.addEventListener('touchend',e=>{
    const dx=e.changedTouches[0].clientX-gTx;
    if(Math.abs(dx)>40)gGo(dx<0?(gi+1)%imgs.length:(gi-1+imgs.length)%imgs.length);
    if(!gPaused)startTimer();
  });

  /* ── LIGHTBOX ── */
  const lbOverlay=document.getElementById('lbOverlay');
  const lbImg=document.getElementById('lbImg');
  const lbCounter=document.getElementById('lbCounter');
  let lbIdx=0;

  function lbOpen(idx){
    lbIdx=idx;
    lbImg.src=imgs[idx].src;
    lbCounter.textContent=(idx+1)+' / '+imgs.length;
    lbOverlay.classList.add('open');
    document.body.style.overflow='hidden';
    stopTimer();
  }
  function lbClose(){
    lbOverlay.classList.remove('open');
    document.body.style.overflow='';
    if(!gPaused)startTimer();
  }
  function lbGoTo(idx){
    lbIdx=((idx%imgs.length)+imgs.length)%imgs.length;
    lbImg.src=imgs[lbIdx].src;
    lbCounter.textContent=(lbIdx+1)+' / '+imgs.length;
  }

  /* Click image to open */
  imgs.forEach((img,i)=>img.addEventListener('click',()=>lbOpen(i)));

  document.getElementById('lbClose').onclick=lbClose;
  document.getElementById('lbPrev').onclick=()=>lbGoTo(lbIdx-1);
  document.getElementById('lbNext').onclick=()=>lbGoTo(lbIdx+1);
  lbOverlay.addEventListener('click',e=>{if(e.target===lbOverlay)lbClose();});
  document.addEventListener('keydown',e=>{
    if(!lbOverlay.classList.contains('open'))return;
    if(e.key==='Escape')lbClose();
    if(e.key==='ArrowLeft')lbGoTo(lbIdx-1);
    if(e.key==='ArrowRight')lbGoTo(lbIdx+1);
  });
})();

/* ── HERO STACKED CARDS ── */
const cards=[...document.querySelectorAll('.hc')];
const dd=document.getElementById('hcDots');
cards.forEach((_,i)=>{const d=document.createElement('div');d.className='hc-dot'+(i===0?' on':'');d.onclick=()=>hcGo(i);dd.appendChild(d);});
let ha=0;
function hcGo(to){cards.forEach((c,i)=>c.setAttribute('data-pos',((i-to)%cards.length+cards.length)%cards.length));ha=to;document.querySelectorAll('.hc-dot').forEach((d,i)=>d.classList.toggle('on',i===to));}
let hct=setInterval(()=>hcGo((ha+1)%cards.length),4000);
document.getElementById('cardDeck').onclick=()=>{clearInterval(hct);hcGo((ha+1)%cards.length);hct=setInterval(()=>hcGo((ha+1)%cards.length),4000);};

/* ── MODAL ── */
function openModal(price=3000,name='VIP Pass'){
  F.price=price;F.tName=name;F.ticket=String(price);
  document.querySelectorAll('.ticket-opt').forEach(o=>o.classList.remove('sel'));
  const map={1500:'opt1500',3000:'opt3000',5000:'opt5000'};
  if(map[price]){document.getElementById(map[price]).classList.add('sel');document.getElementById('step2Btn').disabled=false;}
  document.getElementById('regModal').classList.add('open');
  document.body.style.overflow='hidden';
  goStep(1);
}
function closeModal(){document.getElementById('regModal').classList.remove('open');document.body.style.overflow='';}
document.getElementById('regModal').addEventListener('click',function(e){if(e.target===this)closeModal();});

function goStep(n){
  document.querySelectorAll('.step').forEach(s=>s.classList.remove('active'));
  document.getElementById(n==='Done'?'stepDone':'step'+n).classList.add('active');
  if(typeof n==='number')[1,2,3].forEach(i=>{
    const c=document.getElementById('sc'+i),l=document.getElementById('sl'+i);
    if(i<n){c.className='step-circle done';c.innerHTML='<i class="fas fa-check" style="font-size:10px"></i>';}
    else if(i===n){c.className='step-circle active';c.textContent=i;}
    else{c.className='step-circle';c.textContent=i;}
    l.classList.toggle('active',i===n);
  });
  if(n===3)buildSummary();
}

function validateStep1(){
  // Clear previous errors
  ['f-name','f-email','f-phone','f-job'].forEach(id=>{
    const el=document.getElementById(id);
    el.classList.remove('field-err');
    const err=el.parentElement.querySelector('.err-msg');
    if(err)err.classList.remove('show');
  });

  const name =document.getElementById('f-name').value.trim();
  const email=document.getElementById('f-email').value.trim();
  const phone=document.getElementById('f-phone').value.trim();
  const job  =document.getElementById('f-job').value.trim();
  const emailOk=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  let ok=true;

  function flag(id,msg){
    const el=document.getElementById(id);
    el.classList.add('field-err');
    let err=el.parentElement.querySelector('.err-msg');
    if(!err){err=document.createElement('div');err.className='err-msg';el.after(err);}
    err.textContent=msg;err.classList.add('show');
    ok=false;
  }

  if(!name)      flag('f-name','Please enter your full name.');
  if(!email)     flag('f-email','Please enter your email address.');
  else if(!emailOk) flag('f-email','Please enter a valid email address.');
  if(!phone)     flag('f-phone','Please enter your phone number.');
  if(!job)       flag('f-job','Please tell us what you do.');

  if(ok) goStep(2);
  else{
    // Scroll to first error inside modal
    const firstErr=document.querySelector('.modal-box .field-err');
    if(firstErr)firstErr.scrollIntoView({behavior:'smooth',block:'center'});
  }
}

function selTicket(p,n,el){
  F.price=p;F.tName=n;F.ticket=String(p);
  document.querySelectorAll('.ticket-opt').forEach(o=>o.classList.remove('sel'));
  el.classList.add('sel');
  document.getElementById('step2Btn').disabled=false;
}

function buildSummary(){
  F.name =document.getElementById('f-name').value.trim();
  F.email=document.getElementById('f-email').value.trim();
  F.phone=document.getElementById('f-phone').value.trim();
  F.job  =document.getElementById('f-job').value.trim();
  F.hear =document.getElementById('f-hear').value;
  F.expect=document.getElementById('f-exp').value.trim();
  document.getElementById('sum-name').textContent=F.name||'—';
  document.getElementById('sum-email').textContent=F.email||'—';
  document.getElementById('sum-ticket').textContent=F.tName;
  document.getElementById('sum-price').textContent=F.price.toLocaleString()+' XAF';
  const code=`*126*1*${F.price}*${CFG.momo}#`;
  document.getElementById('momoCode').textContent=code;
  document.getElementById('momoLink').href=`tel:*126*1*${F.price}*${CFG.momo}%23`;
}

async function submitReg(){
  const btn=document.getElementById('confirmBtn');
  btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin" style="margin-right:8px"></i>Submitting…';
  const data={
    name:F.name,email:F.email,phone:F.phone,occupation:F.job,
    how_heard:F.hear||'Not specified',
    ticket_tier:F.tName,ticket_price:F.price+' XAF',
    expectations:F.expect||'Not provided',
    event:'LinkedIn Locals Bamenda – 30th May 2026, Alliance Francais',
    _subject:`New Registration: ${F.name} – ${F.tName}`,
    _replyto:F.email
  };
  /* 1. Formspree → org email */
  if(CFG.formspree!=='YOUR_FORMSPREE_ID'){
    try{await fetch(`https://formspree.io/f/${CFG.formspree}`,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)});}
    catch(e){console.warn('Formspree:',e);}
  }
  /* 2. EmailJS → confirmation to registrant
     Tip to avoid spam: in EmailJS, use "Reply To" = {{to_email}} and
     set From Name = "LinkedIn Locals Bamenda" for a professional sender */
  if(CFG.ejsService!=='YOUR_EMAILJS_SERVICE_ID'){
    try{await emailjs.send(CFG.ejsService,CFG.ejsTemplate,{
      to_name:F.name,to_email:F.email,
      ticket_tier:F.tName,ticket_price:F.price.toLocaleString()+' XAF',
      event_date:'30th May 2026, 10:00 AM',
      event_venue:'Alliance Francais, Bamenda',
      momo_number:CFG.momo,
      whatsapp:'https://chat.whatsapp.com/F6aXCT0hxrzAaWEv1CfAn1?mode=gi_t'
    });}
    catch(e){console.warn('EmailJS:',e);}
  }
/* Build WhatsApp pre-filled message */
  const waMsg=encodeURIComponent(
    `Hi LinkedIn Locals Bamenda! 👋\n\nI just paid for my *${F.tName}* ticket.\n\nName: ${F.name}\nEmail: ${F.email}\nPhone: ${F.phone}\n\nPlease find my MoMo payment screenshot attached. Kindly confirm my seat. Thank you!`
  );
  // Direct WhatsApp to the team's phone number (not group link, so message is pre-filled)
  document.getElementById('waConfirmLink').href=`https://wa.me/237653719589?text=${waMsg}`;

  /* Show success */
  goStep('Done');
  document.getElementById('sucText').innerHTML=
    `Thank you, <strong style="color:var(--white)">${F.name}</strong>! Your <strong style="color:var(--lime)">${F.tName}</strong> details have been received. Tap the button below to send your payment screenshot on WhatsApp — your seat will be confirmed once payment is verified.`;
}

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}});
});
