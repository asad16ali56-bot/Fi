/* Sidebar active state */
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{
  document.querySelectorAll('.nav a').forEach(x=>x.classList.remove('active'));
  a.classList.add('active');
}));

/* Flags (inline SVG, internet ki zarurat nahi) */
const FLAGS={
  us:`<svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 60 40"><rect width="60" height="40" fill="#fff"/><g fill="#d22f3c"><rect y="0" width="60" height="5.71"/><rect y="11.43" width="60" height="5.71"/><rect y="22.86" width="60" height="5.71"/><rect y="34.29" width="60" height="5.71"/></g><rect width="27" height="22.86" fill="#3c3b6e"/><g fill="#fff"><circle cx="5" cy="5" r="1.6"/><circle cx="13" cy="5" r="1.6"/><circle cx="21" cy="5" r="1.6"/><circle cx="9" cy="11" r="1.6"/><circle cx="17" cy="11" r="1.6"/><circle cx="5" cy="17" r="1.6"/><circle cx="13" cy="17" r="1.6"/><circle cx="21" cy="17" r="1.6"/></g></svg>`,
  de:`<svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 60 40"><rect width="60" height="13.4" fill="#000"/><rect y="13.3" width="60" height="13.4" fill="#dd0000"/><rect y="26.6" width="60" height="13.4" fill="#ffce00"/></svg>`,
  gb:`<svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 60 40"><rect width="60" height="40" fill="#012169"/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" stroke-width="8"/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#c8102e" stroke-width="3"/><path d="M30,0 V40 M0,20 H60" stroke="#fff" stroke-width="13"/><path d="M30,0 V40 M0,20 H60" stroke="#c8102e" stroke-width="7"/></svg>`,
  au:`<svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 60 40"><rect width="60" height="40" fill="#00008b"/><g transform="scale(.5)"><path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" stroke-width="8"/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#c8102e" stroke-width="3"/><path d="M30,0 V40 M0,20 H60" stroke="#fff" stroke-width="13"/><path d="M30,0 V40 M0,20 H60" stroke="#c8102e" stroke-width="7"/></g><g fill="#fff"><circle cx="15" cy="30" r="3.6"/><circle cx="43" cy="8" r="2"/><circle cx="52" cy="17" r="2"/><circle cx="43" cy="31" r="2"/><circle cx="36" cy="19" r="2"/></g></svg>`,
  jp:`<svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 60 40"><rect width="60" height="40" fill="#fff"/><circle cx="30" cy="20" r="11" fill="#bc002d"/></svg>`,
  ca:`<svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 60 40"><rect width="60" height="40" fill="#fff"/><rect width="15" height="40" fill="#d52b1e"/><rect x="45" width="15" height="40" fill="#d52b1e"/><path d="M30,8 L33,16 L38,14 L35,22 L40,22 L31,30 L31,36 L29,36 L29,30 L20,22 L25,22 L22,14 L27,16 Z" fill="#d52b1e"/></svg>`,
  ch:`<svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 60 40"><rect width="60" height="40" fill="#d52b1e"/><path d="M30,9 V31 M19,20 H41" stroke="#fff" stroke-width="7"/></svg>`
};
const flagSrc=k=>'data:image/svg+xml;utf8,'+encodeURIComponent(FLAGS[k]||FLAGS.us);

/* Wallets */
const wallets=[
  {c:'USD',f:'us',v:'$24,678.00',l:'Limit is $10k a month',s:'Active'},
  {c:'EUR',f:'de',v:'€28,345.00',l:'Limit is €8k a month',s:'Active'},
  {c:'AUD',f:'au',v:'$20,517.52',l:'Limit is $10k a month',s:'Active'},
  {c:'GBP',f:'gb',v:'£25,000.00',l:'Limit is £7.5k a month',s:'Inactive'}
];
const wEl=document.getElementById('wallets');
function renderWallets(){
  wEl.innerHTML=wallets.map(w=>`
    <div class="wallet">
      <div class="top"><img src="${flagSrc(w.f)}" alt="${w.c}"> ${w.c}<i class="fa-solid fa-ellipsis-vertical"></i></div>
      <div class="val">${w.v}</div>
      <div class="lim">${w.l}</div>
      <div class="st ${w.s==='Inactive'?'off':''}">${w.s}</div>
    </div>`).join('');
}
renderWallets();
document.getElementById('addNew').onclick=()=>{
  const list=[['JPY','jp','¥1,200,000'],['CAD','ca','$9,800.00'],['CHF','ch','CHF 7,450.00']];
  const p=list[wallets.length%3];
  wallets.push({c:p[0],f:p[1],v:p[2],l:'Limit is 10k a month',s:'Active'});
  renderWallets();
};

/* Cash flow chart */
const data={
  monthly:{labels:['Jan','Feb','Mar','Apr','May','Jun','Jul'],vals:[30,25,47,27,35,20,29],cash:[28450,24100,33847,26200,31500,19800,27650],inf:[-5120,-4200,-7456,-4900,-6100,-3500,-4800],max:50,ticks:['50k','40k','30k','20k','10k','0k']},
  yearly:{labels:['2020','2021','2022','2023','2024','2025','2026'],vals:[22,31,38,29,44,41,48],cash:[220000,310000,380000,290000,440000,410000,480000],inf:[-30000,-42000,-51000,-39000,-60000,-55000,-65000],max:50,ticks:['500k','400k','300k','200k','100k','0']}
};
const bars=document.getElementById('bars'),tip=document.getElementById('tip'),yaxis=document.getElementById('yaxis');
const fmt=n=>(n<0?'-':'')+'$'+Math.abs(n).toLocaleString();
function draw(mode){
  const d=data[mode];
  yaxis.innerHTML=d.ticks.map(t=>`<span>${t}</span>`).join('');
  bars.innerHTML=d.vals.map((v,i)=>`<div class="col ${i===2?'active':''}" data-i="${i}"><div class="bar" style="height:0"></div><span class="lbl">${d.labels[i]}</span></div>`).join('');
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    bars.querySelectorAll('.col').forEach((c,i)=>{
      const pct=d.vals[i]/d.max*100;
      c.querySelector('.bar').style.height=`calc((100% - 22px) * ${pct/100})`;
      c.style.setProperty('--top',`calc(100% - 22px - (100% - 22px) * ${pct/100})`);
    });
  }));
  bars.querySelectorAll('.col').forEach(c=>{
    c.addEventListener('mouseenter',()=>{
      bars.querySelectorAll('.col').forEach(x=>x.classList.remove('active'));
      c.classList.add('active');
      const i=+c.dataset.i;
      tip.innerHTML=`<div class="d">${mode==='monthly'?'July 23, 2026':d.labels[i]}</div>
        <div class="r"><span>Cashflow</span><span class="g">${fmt(d.cash[i])}</span></div>
        <div class="r"><span>Inflow</span><span class="rd">${fmt(d.inf[i])}</span></div>`;
      tip.style.display='block';
      const rect=c.getBoundingClientRect(),par=c.closest('.chart').getBoundingClientRect();
      tip.style.left=Math.min(rect.left-par.left+rect.width+6,par.width-140)+'px';
      tip.style.top='34px';
    });
  });
  bars.addEventListener('mouseleave',()=>tip.style.display='none');
}
draw('monthly');
document.querySelectorAll('#toggle button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('#toggle button').forEach(x=>x.classList.remove('on','or'));
  b.classList.add('on'); if(b.dataset.m==='yearly')b.classList.add('or');
  draw(b.dataset.m);
});

/* Table */
const rows=[
  ['Software License','INV_000076','17 Apr, 2026','03:45 PM','$25,500','Completed','M'],
  ['Flight Ticket','INV_000075','16 Apr, 2026','11:20 AM','$1,240','Pending','F'],
  ['Cloud Hosting','INV_000074','15 Apr, 2026','09:10 AM','$890','Completed','C'],
  ['Office Supplies','INV_000073','14 Apr, 2026','02:30 PM','$320','Failed','O']
];
const tb=document.getElementById('tbody');
function renderRows(q=''){
  tb.innerHTML=rows.filter(r=>r.join(' ').toLowerCase().includes(q.toLowerCase())).map(r=>`
    <tr><td><span class="chk"></span></td>
    <td><div class="act"><span class="lg">${r[6]}</span>${r[0]}</div></td>
    <td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td>
    <td><span class="status ${r[5].toLowerCase()}">${r[5]}</span></td>
    <td><i class="fa-solid fa-ellipsis" style="color:#888"></i></td></tr>`).join('');
}
renderRows();
document.getElementById('tsearch').oninput=e=>renderRows(e.target.value);
document.getElementById('reset').onclick=()=>{draw('monthly');renderRows();document.getElementById('tsearch').value='';};