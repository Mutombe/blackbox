/* =========================================================
   Blackbox Investments — commerce & distribution platform
   Client-side prototype layer: catalogue, RFQ, customer
   portal, sales CRM and management dashboards. State lives
   in localStorage; auth is a front-end mock. No backend yet.
   ========================================================= */
(function () {
'use strict';

/* ------------------------------------------------ icons */
var IC = {
  cart:'<path d="M6 6h15l-1.6 9h-11z"/><path d="M6 6 5 3H2"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/>',
  user:'<circle cx="12" cy="8" r="3.4"/><path d="M5 20c0-3.7 3.1-6 7-6s7 2.3 7 6"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  out:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4-4"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  file:'<path d="M14 3v5h5M15 3H6v18h12V6z"/>',
  doc:'<path d="M14 3v5h5M15 3H6v18h12V6z"/><path d="M9 13h6M9 17h6"/>',
  send:'<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
  truck:'<path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  cash:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/>',
  bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  alert:'<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>',
  chart:'<path d="M3 3v18h18"/><path d="M7 14l4-5 3 3 5-7"/>',
  board:'<rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="11" rx="1"/><rect x="17" y="4" width="4" height="14" rx="1"/>',
  pin:'<path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.4"/>',
  repeat:'<path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
  ai:'<circle cx="12" cy="12" r="3.2"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  users:'<circle cx="9" cy="8" r="3"/><path d="M2.5 20c0-3 2.9-5 6.5-5s6.5 2 6.5 5"/><path d="M16.5 3.6a3 3 0 0 1 0 5.6M21.5 20c0-2.4-1.7-4.2-4.2-4.8"/>',
  box:'<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
  site:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/>',
  bell:'<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/>'
};
function svg(p,w){w=w||18;return '<svg viewBox="0 0 24 24" width="'+w+'" height="'+w+'" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>';}

/* ------------------------------------------------ data */
var CATS = {
  industrial:{name:'Industrial Chemicals',img:'assets/img/drums-flammable.jpg'},
  detergent:{name:'Detergent & Cleaning',img:'assets/img/jerrycans-white.jpg'},
  food:{name:'Food & Beverage',img:'assets/img/lab-tubes.jpg'},
  polymers:{name:'Polymers & Plastics',img:'assets/img/barrels-black.jpg'},
  paints:{name:'Paints & Coatings',img:'assets/img/drums-mixed.jpg'},
  mining:{name:'Mining & Water Treatment',img:'assets/img/hazmat-pair.jpg'}
};
var CK = Object.keys(CATS);

/* sku,name,formula,cat,application,price,unit,packs[],avail,stock,apps[],specs{} */
var RAW = [
 ['IND-101','Caustic Soda Flakes','NaOH','industrial','Alkali for processing',720,'t',['25 kg bags','1 t bulk bags'],'in',260,['Soap & detergent','Water treatment','pH control'],{'CAS No':'1310-73-2','Purity':'≥ 99%','Form':'Flakes','Hazard':'UN 1823 · Class 8'}],
 ['IND-102','Soda Ash Dense','Na₂CO₃','industrial','Alkali / builder',560,'t',['25 kg bags','1 t bulk bags'],'in',340,['Glass','Detergents','Water softening'],{'CAS No':'497-19-8','Purity':'≥ 99.2%','Form':'Dense granular','Bulk density':'1.0 g/cm³'}],
 ['IND-103','Sulphuric Acid 98%','H₂SO₄','industrial','Industrial acid',300,'t',['35 kg carboys','1000 L IBC','Bulk'],'in',180,['Battery','Leaching','pH control'],{'CAS No':'7664-93-9','Conc.':'98%','Form':'Liquid','Hazard':'UN 1830 · Class 8'}],
 ['IND-104','Hydrochloric Acid 33%','HCl','industrial','Industrial acid',330,'t',['35 kg carboys','1000 L IBC'],'low',22,['Pickling','Regeneration','pH control'],{'CAS No':'7647-01-0','Conc.':'33%','Form':'Liquid','Hazard':'UN 1789 · Class 8'}],
 ['IND-105','Sodium Hypochlorite 12%','NaOCl','industrial','Bleach & disinfectant',290,'t',['25 L drums','1000 L IBC'],'in',70,['Disinfection','Bleaching','CIP'],{'CAS No':'7681-52-9','Available Cl':'12%','Form':'Liquid','Hazard':'UN 1791'}],
 ['DET-201','LABSA 96%','C₁₈H₃₀O₃S','detergent','Anionic surfactant',1650,'t',['210 kg drums','1 t IBC'],'in',48,['Dishwash liquid','Laundry','Hand wash'],{'CAS No':'27176-87-0','Active':'96%','Form':'Viscous liquid','Colour':'≤ 30 Klett'}],
 ['DET-202','SLES 70%','—','detergent','Anionic surfactant',1980,'t',['200 kg drums'],'in',30,['Shampoo','Bubble bath','Dishwash'],{'CAS No':'68585-34-2','Active':'70%','Form':'Paste','EO':'2 mol'}],
 ['DET-203','Sodium Sulphate','Na₂SO₄','detergent','Detergent filler',420,'t',['25 kg bags','1 t bulk bags'],'in',150,['Powder detergent','Filler','Textiles'],{'CAS No':'7757-82-6','Purity':'≥ 99%','Form':'Anhydrous powder','Whiteness':'High'}],
 ['DET-204','CDEA (Coconut Diethanolamide)','—','detergent','Foam booster / thickener',2450,'t',['200 kg drums'],'low',9,['Foam boosting','Viscosity','Conditioning'],{'CAS No':'68603-42-9','Active':'≥ 85%','Form':'Liquid','Ratio':'1:1'}],
 ['FOO-301','Citric Acid Anhydrous','C₆H₈O₇','food','Acidulant',1450,'t',['25 kg bags'],'in',64,['Beverages','Preserving','Cleaning'],{'CAS No':'77-92-9','Grade':'Food (E330)','Form':'Granular','Purity':'≥ 99.5%'}],
 ['FOO-302','Sodium Benzoate','C₇H₅NaO₂','food','Preservative',1900,'t',['25 kg bags'],'in',28,['Beverages','Sauces','Preserving'],{'CAS No':'532-32-1','Grade':'Food (E211)','Form':'Powder / granular','Purity':'≥ 99%'}],
 ['FOO-303','Sodium Bicarbonate','NaHCO₃','food','Leavening / buffer',780,'t',['25 kg bags'],'in',90,['Baking','Beverages','Effervescence'],{'CAS No':'144-55-8','Grade':'Food (E500)','Form':'Fine powder','Purity':'≥ 99%'}],
 ['FOO-304','Xanthan Gum','—','food','Thickener / stabiliser',6200,'t',['25 kg bags'],'low',6,['Sauces','Dressings','Beverages'],{'CAS No':'11138-66-2','Grade':'Food (E415)','Mesh':'80','Viscosity':'High'}],
 ['POL-401','PVC Resin SG5','(C₂H₃Cl)ₙ','polymers','General-purpose resin',1350,'t',['25 kg bags','1 t bulk bags'],'in',120,['Pipes','Profiles','Cables'],{'K-value':'66–68','Form':'White powder','Bulk density':'0.52 g/cm³','Volatiles':'≤ 0.3%'}],
 ['POL-402','HDPE Injection Grade','(C₂H₄)ₙ','polymers','Moulding resin',1580,'t',['25 kg bags'],'in',80,['Crates','Caps','Housewares'],{'MFI':'8 g/10min','Density':'0.954 g/cm³','Form':'Granules','Grade':'Injection'}],
 ['POL-403','Calcium Carbonate (Coated)','CaCO₃','polymers','Filler',380,'t',['25 kg bags','1 t bulk bags'],'in',210,['Masterbatch','PVC','Paints'],{'CAS No':'471-34-1','Coating':'Stearic','Mesh':'2 µm','Whiteness':'≥ 95%'}],
 ['POL-404','Titanium Dioxide (Rutile)','TiO₂','polymers','White pigment',3900,'t',['25 kg bags'],'in',44,['Masterbatch','Plastics','Paints'],{'CAS No':'13463-67-7','Type':'Rutile','TiO₂':'≥ 93%','Oil abs.':'Low'}],
 ['PNT-501','Titanium Dioxide (Anatase)','TiO₂','paints','White pigment',3400,'t',['25 kg bags'],'in',36,['Emulsion paint','Primers','Inks'],{'CAS No':'1317-70-0','Type':'Anatase','TiO₂':'≥ 98%','Brightness':'High'}],
 ['PNT-502','Xylene','C₈H₁₀','paints','Solvent',1250,'t',['200 L drums','Bulk'],'in',58,['Coatings','Thinners','Cleaning'],{'CAS No':'1330-20-7','Form':'Liquid','Purity':'≥ 98.5%','Hazard':'UN 1307 · Class 3'}],
 ['PNT-503','Styrene Acrylic Emulsion','—','paints','Binder',1100,'t',['200 kg drums','1 t IBC'],'low',12,['Emulsion paint','Adhesives','Sealers'],{'Solids':'50%','pH':'8–9','Form':'Milky liquid','Tg':'18 °C'}],
 ['PNT-504','Iron Oxide Red','Fe₂O₃','paints','Pigment',1400,'t',['25 kg bags'],'in',40,['Paints','Concrete','Coatings'],{'CAS No':'1309-37-1','Fe₂O₃':'≥ 95%','Form':'Powder','Tint':'Strong'}],
 ['MIN-601','Poly Aluminium Chloride','PAC','mining','Coagulant',650,'t',['25 kg bags','1 t bulk bags'],'in',140,['Potable water','Effluent','Turbidity'],{'CAS No':'1327-41-9','Al₂O₃':'30%','Basicity':'65%','Form':'Powder / liquid'}],
 ['MIN-602','Aluminium Sulphate','Al₂(SO₄)₃','mining','Coagulant (alum)',420,'t',['25 kg bags','1 t bulk bags'],'in',210,['Water clarification','Paper','Effluent'],{'CAS No':'10043-01-3','Al₂O₃':'17%','Form':'Kibbled / liquid','Iron':'Low'}],
 ['MIN-603','Activated Carbon','C','mining','Adsorbent',1780,'t',['25 kg bags','500 kg bags'],'in',96,['Gold recovery','Water polishing','Decolour'],{'Base':'Coconut shell','Iodine No':'1000 mg/g','Mesh':'6×12','Hardness':'≥ 98%'}],
 ['MIN-604','Anionic Flocculant','APAM','mining','Flocculant',3200,'t',['25 kg bags'],'low',12,['Tailings','Clarification','Thickening'],{'CAS No':'9003-05-8','Charge':'Anionic','Mol. weight':'High','Form':'Powder'}],
 ['MIN-605','Calcium Hypochlorite 70%','Ca(OCl)₂','mining','Chlorination',3400,'t',['45 kg drums'],'in',40,['Potable disinfection','Pools','Effluent'],{'CAS No':'7778-54-3','Available Cl':'70%','Form':'Granular','Hazard':'UN 2880'}]
];
var PRODUCTS = RAW.map(function(r){return {sku:r[0],name:r[1],formula:r[2],cat:r[3],app:r[4],price:r[5],unit:r[6],packs:r[7],avail:r[8],stock:r[9],apps:r[10],specs:r[11]};});
function findP(sku){for(var i=0;i<PRODUCTS.length;i++)if(PRODUCTS[i].sku===sku)return PRODUCTS[i];
  return {sku:sku,name:sku||'Unknown item',formula:'',cat:'industrial',app:'',price:0,unit:'unit',packs:['—'],avail:'req',stock:0,apps:[],specs:{}};}

var CUST = [
  {id:'delta',name:'Delta Beverages',sector:'Beverages',init:'DB'},
  {id:'natfoods',name:'National Foods',sector:'Food Processing',init:'NF'},
  {id:'dairibord',name:'Dairibord',sector:'Dairy',init:'DZ'},
  {id:'proplastics',name:'ProPlastics',sector:'Plastics',init:'PP'},
  {id:'astra',name:'Astra Paints',sector:'Coatings',init:'AP'},
  {id:'colcom',name:'Colcom Foods',sector:'Food Processing',init:'CF'},
  {id:'hararewater',name:'Harare Water',sector:'Municipal',init:'HW'},
  {id:'ppc',name:'PPC Zimbabwe',sector:'Cement',init:'PC'}
];
function findC(id){for(var i=0;i<CUST.length;i++)if(CUST[i].id===id)return CUST[i];}
var REPS = ['Tendai Moyo','Rutendo Chikafu','Blessing Ncube','Farai Dube'];
function repInit(n){return n.split(' ').map(function(x){return x[0];}).join('');}
var STAGES = [
  {k:'new',t:'New RFQ'},{k:'assigned',t:'Assigned'},{k:'quoted',t:'Quoted'},
  {k:'nego',t:'Negotiation'},{k:'won',t:'Won'},{k:'fulfil',t:'Fulfilment'},{k:'lost',t:'Lost'}
];
var OPEN_STAGES=['new','assigned','quoted','nego'];
function isOpen(r){return OPEN_STAGES.indexOf(r.stage)>=0;}

/* ------------------------------------------------ money */
function money(n){return '$'+Math.round(n).toLocaleString('en-US');}
function money2(n){return '$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});}
function moneyK(n){return n>=1e6?'$'+(n/1e6).toFixed(1)+'M':n>=1e3?'$'+Math.round(n/1e3)+'k':'$'+Math.round(n);}
function uid(p){return p+'-'+Math.random().toString(36).slice(2,6).toUpperCase();}
function rfqVal(r){return r.lines.reduce(function(s,l){return s+findP(l.sku).price*l.qty;},0);}

/* ------------------------------------------------ state */
var KEY='bbx.state.v2', SKEY='bbx.session.v1', S, SESSION=null;
function seedState(){
  function mk(id,cust,rep,stage,lines,day){return {id:id,cust:cust,rep:rep,stage:stage,lines:lines,created:day,type:'catalogue'};}
  return {
    cart:[],
    rfqs:[
      mk('RFQ-4821','delta','Tendai Moyo','fulfil',[{sku:'FOO-301',qty:12},{sku:'FOO-302',qty:3}],'2d'),
      mk('RFQ-4830','proplastics','Rutendo Chikafu','won',[{sku:'POL-401',qty:20},{sku:'POL-403',qty:15}],'3d'),
      mk('RFQ-4835','hararewater','Blessing Ncube','quoted',[{sku:'MIN-601',qty:30},{sku:'MIN-605',qty:4}],'1d'),
      mk('RFQ-4839','astra','Farai Dube','nego',[{sku:'PNT-501',qty:8},{sku:'PNT-504',qty:5}],'1d'),
      mk('RFQ-4842','dairibord','Tendai Moyo','assigned',[{sku:'IND-105',qty:10},{sku:'FOO-303',qty:6}],'6h'),
      mk('RFQ-4845','natfoods','Rutendo Chikafu','quoted',[{sku:'FOO-301',qty:18},{sku:'FOO-304',qty:1}],'8h'),
      mk('RFQ-4848','colcom','Blessing Ncube','new',[{sku:'IND-105',qty:6},{sku:'FOO-302',qty:4}],'2h'),
      mk('RFQ-4851','ppc','Farai Dube','new',[{sku:'MIN-602',qty:40},{sku:'IND-102',qty:25}],'40m'),
      mk('RFQ-4809','astra','Farai Dube','lost',[{sku:'PNT-502',qty:18}],'6d'),
      mk('RFQ-4812','colcom','Tendai Moyo','lost',[{sku:'FOO-303',qty:10},{sku:'IND-201',qty:5}],'9d')
    ],
    quotes:[
      {id:'QT-2291',rfq:'RFQ-4835',cust:'hararewater',lines:[{sku:'MIN-601',qty:30},{sku:'MIN-605',qty:4}],delivery:1200,disc:4,created:'1d'},
      {id:'QT-2288',rfq:'RFQ-4845',cust:'natfoods',lines:[{sku:'FOO-301',qty:18},{sku:'FOO-304',qty:1}],delivery:900,disc:6,created:'8h'}
    ],
    orders:[
      {id:'SO-1187',cust:'delta',lines:[{sku:'FOO-301',qty:12},{sku:'FOO-302',qty:3}],status:'transit',eta:'Tomorrow · 14:00',created:'2d'},
      {id:'SO-1182',cust:'proplastics',lines:[{sku:'POL-401',qty:20},{sku:'POL-403',qty:15}],status:'fulfilling',eta:'In 3 days',created:'3d'},
      {id:'SO-1176','cust':'delta',lines:[{sku:'FOO-303',qty:20}],status:'delivered',eta:'Delivered',created:'8d'}
    ],
    sourcing:[]
  };
}
function loadState(){try{S=JSON.parse(localStorage.getItem(KEY));}catch(e){}if(!S||!S.rfqs)S=seedState();
  try{SESSION=JSON.parse(localStorage.getItem(SKEY))||null;}catch(e){SESSION=null;}}
function saveState(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function saveSession(){try{SESSION?localStorage.setItem(SKEY,JSON.stringify(SESSION)):localStorage.removeItem(SKEY);}catch(e){}}
function resetDemo(){S=seedState();saveState();toast('Demo data reset',IC.repeat);var p=document.body.getAttribute('data-page');if(p)BB.page(p);}
loadState();

/* ------------------------------------------------ auth */
var ACCOUNTS=[
  {email:'md@blackboxinvestments.co.zw',pw:'demo',role:'admin',name:'T. Chademana',sub:'Managing Director',init:'TC',land:'admin'},
  {email:'sales@blackboxinvestments.co.zw',pw:'demo',role:'admin',name:'Tendai Moyo',sub:'Sales',init:'TM',land:'admin'},
  {email:'buyer@delta.co.zw',pw:'demo',role:'customer',custId:'delta',name:'Delta Beverages',sub:'Customer portal',init:'DB',land:'portal'}
];
var ACCESS={index:'public',catalogue:'public',rfq:'public',signin:'public',portal:'customer',admin:'admin'};
function canSee(page){var a=ACCESS[page]||'public';if(a==='public')return true;if(!SESSION)return false;
  if(a==='customer')return SESSION.role==='customer';if(a==='admin')return SESSION.role==='admin';return true;}
function signIn(email,pw){var a=ACCOUNTS.filter(function(x){return x.email===email.toLowerCase()&&x.pw===pw;})[0];
  if(!a)return null;SESSION={role:a.role,name:a.name,sub:a.sub,init:a.init,custId:a.custId||null};saveSession();return a;}
function signOut(){SESSION=null;saveSession();location.href='index.html';}

/* ------------------------------------------------ cart */
function cartCount(){return S.cart.length;}
function addToCart(sku,qty){qty=Math.max(1,qty||1);var e=S.cart.filter(function(l){return l.sku===sku;})[0];
  if(e)e.qty+=qty;else S.cart.push({sku:sku,qty:qty});saveState();syncHeaderBadge();
  var p=findP(sku);toast(qty+' '+p.unit+' · '+p.name+' added to RFQ',IC.check);}
function setCartQty(sku,q){var l=S.cart.filter(function(x){return x.sku===sku;})[0];if(l){l.qty=Math.max(1,q);saveState();BB.page('rfq');}}
function rmCart(sku){S.cart=S.cart.filter(function(l){return l.sku!==sku;});saveState();syncHeaderBadge();BB.page('rfq');}

/* ------------------------------------------------ header injection */
function syncHeaderBadge(){var b=document.getElementById('bbxCartCount');if(b){var n=cartCount();b.textContent=n;b.style.display=n?'inline-grid':'none';}}
function mountHeader(){
  var page=document.body.getAttribute('data-page')||'';
  var nav=document.getElementById('primaryNav');
  if(nav && !document.getElementById('bbxNavCat')){
    var a=document.createElement('a');a.id='bbxNavCat';a.href='catalogue.html';a.textContent='Catalogue';
    if(page==='catalogue'||page==='rfq')a.setAttribute('aria-current','page');
    // insert after Products
    var prod=nav.querySelector('a[href="products.html"]');
    if(prod&&prod.nextSibling)nav.insertBefore(a,prod.nextSibling);else nav.appendChild(a);
    if(SESSION&&SESSION.role==='admin'){var ad=document.createElement('a');ad.href='admin.html';ad.textContent='Dashboard';if(page==='admin')ad.setAttribute('aria-current','page');nav.appendChild(ad);}
    if(SESSION&&SESSION.role==='customer'){var po=document.createElement('a');po.href='portal.html';po.textContent='My Portal';if(page==='portal')po.setAttribute('aria-current','page');nav.appendChild(po);}
  }
  var actions=document.querySelector('.header-actions');
  if(actions && !document.getElementById('bbxHeaderTools')){
    var wrap=document.createElement('div');wrap.id='bbxHeaderTools';wrap.className='bbx-htools';
    var cart='<a class="bbx-icobtn" href="rfq.html" title="RFQ basket" aria-label="RFQ basket">'+svg(IC.cart,17)+'<span class="bbx-badge" id="bbxCartCount" style="display:none">0</span></a>';
    var acct;
    if(SESSION){acct='<div class="bbx-acct"><span class="bbx-av">'+SESSION.init+'</span><span class="bbx-acct-t"><b>'+SESSION.name+'</b><small>'+SESSION.sub+'</small></span><button class="bbx-icobtn" title="Sign out" onclick="BB.signOut()">'+svg(IC.out,16)+'</button></div>';}
    else{acct='<a class="bbx-signin" href="signin.html">'+svg(IC.lock,15)+' Sign in</a>';}
    wrap.innerHTML=cart+acct;
    actions.insertBefore(wrap,actions.firstChild);
  }
  syncHeaderBadge();
}

/* ------------------------------------------------ toast + drawer */
function toast(msg,ic){var host=document.getElementById('bbxToasts');if(!host){host=document.createElement('div');host.id='bbxToasts';host.className='bbx-toasts';document.body.appendChild(host);}
  var t=document.createElement('div');t.className='bbx-toast';t.innerHTML='<span class="bbx-toast-ic">'+svg(ic||IC.check,14)+'</span><span>'+msg+'</span>';host.appendChild(t);
  setTimeout(function(){t.style.opacity='0';t.style.transform='translateY(8px)';setTimeout(function(){t.remove();},300);},2600);}
function drawer(html){var sc=document.getElementById('bbxScrim'),dr=document.getElementById('bbxDrawer');
  if(!sc){sc=document.createElement('div');sc.id='bbxScrim';sc.className='bbx-scrim';sc.onclick=closeDrawer;document.body.appendChild(sc);
    dr=document.createElement('aside');dr.id='bbxDrawer';dr.className='bbx-drawer';document.body.appendChild(dr);}
  dr.innerHTML=html;sc.classList.add('on');dr.classList.add('on');}
function closeDrawer(){var sc=document.getElementById('bbxScrim'),dr=document.getElementById('bbxDrawer');if(sc)sc.classList.remove('on');if(dr)dr.classList.remove('on');}

/* ------------------------------------------------ availability chip */
function availChip(a){return a==='in'?'<span class="bbx-avail in">In stock</span>':a==='low'?'<span class="bbx-avail low">Low stock</span>':'<span class="bbx-avail req">On request</span>';}
function catTag(cat){return '<span class="bbx-cattag">'+CATS[cat].name+'</span>';}

/* ================================================ PAGE DISPATCH */
var BB={
  addToCart:addToCart,setCartQty:setCartQty,rmCart:rmCart,signOut:signOut,resetDemo:resetDemo,
  toast:toast,closeDrawer:closeDrawer,openProduct:openProduct,openRequestChem:openRequestChem,
  submitRFQ:submitRFQ,submitSourcing:submitSourcing,doSignIn:doSignIn,setAuthSeg:setAuthSeg,
  viewQuote:viewQuote,acceptQuote:acceptQuote,reorder:reorder,openRfqCard:openRfqCard,
  assignRfq:assignRfq,advanceRfq:advanceRfq,buildQuote:buildQuote,recalcQuote:recalcQuote,sendQuote:sendQuote,
  markLost:markLost,pdQty:pdQty
};
BB.page=function(page){
  if(!canSee(page)){location.href='signin.html?next='+encodeURIComponent(page)+(ACCESS[page]==='admin'?'&as=staff':'');return;}
  if(page==='admin'||page==='portal'){renderShell(page);return;}
  mountHeader();
  var root=document.getElementById('bbx-root');if(!root)return;
  ({catalogue:renderCatalogue,rfq:renderRFQ,signin:renderSignin}[page]||function(){})(root);
};
window.BB=BB;

/* ------------------------------------------------ CATALOGUE */
var catCat='all',catQ='';
BB.filterCat=function(k){catCat=k;renderCatalogue(document.getElementById('bbx-root'));};
function renderCatalogue(root){
  var list=PRODUCTS.filter(function(p){return (catCat==='all'||p.cat===catCat)&&(!catQ||(p.name+p.formula+p.sku+p.app).toLowerCase().indexOf(catQ.toLowerCase())>=0);});
  root.innerHTML=''+
  '<div class="bbx-toolbar">'+
    '<div class="bbx-search">'+svg(IC.search,16)+'<input id="bbxSearch" placeholder="Search name, formula, SKU or application…" value="'+catQ+'"></div>'+
    '<div class="bbx-count">'+list.length+' products</div>'+
  '</div>'+
  '<div class="bbx-filters"><button class="'+(catCat==='all'?'on':'')+'" onclick="BB.filterCat(\'all\')">All</button>'+
    CK.map(function(k){return '<button class="'+(catCat===k?'on':'')+'" onclick="BB.filterCat(\''+k+'\')">'+CATS[k].name+'</button>';}).join('')+'</div>'+
  '<div class="bbx-catgrid">'+(list.map(function(p){return ''+
    '<article class="bbx-prod" onclick="BB.openProduct(\''+p.sku+'\')">'+
      '<div class="bbx-prod-img" style="background-image:url('+CATS[p.cat].img+')"><span class="bbx-prod-imgtag">'+availChip(p.avail)+'</span></div>'+
      '<div class="bbx-prod-h"><div><span class="bbx-sku">'+p.sku+'</span><h3>'+p.name+'</h3><span class="bbx-formula">'+p.formula+'</span></div></div>'+
      catTag(p.cat)+
      '<dl class="bbx-prod-meta"><div><dt>From</dt><dd>'+money2(p.price)+'/'+p.unit+'</dd></div>'+
        '<div><dt>Packaging</dt><dd>'+p.packs[0]+'</dd></div>'+
        '<div><dt>Application</dt><dd>'+p.app+'</dd></div></dl>'+
      '<div class="bbx-prod-act"><button class="btn btn--line" onclick="event.stopPropagation();BB.openProduct(\''+p.sku+'\')">Details</button>'+
        '<button class="btn btn--primary" onclick="event.stopPropagation();BB.addToCart(\''+p.sku+'\',1)">'+svg(IC.plus,15)+' Add to RFQ</button></div>'+
    '</article>';}).join('')||'<div class="bbx-empty">'+svg(IC.search,34)+'<p>No products match your search.</p></div>')+'</div>';
  var si=document.getElementById('bbxSearch');
  if(si)si.addEventListener('input',function(){catQ=this.value;var pos=this.selectionStart;renderCatalogue(root);var n=document.getElementById('bbxSearch');if(n){n.focus();n.setSelectionRange(pos,pos);}});
}
function openProduct(sku){
  var p=findP(sku);
  var related=PRODUCTS.filter(function(x){return x.cat===p.cat&&x.sku!==sku;}).slice(0,3);
  drawer(''+
    '<div class="bbx-dr-h"><div>'+catTag(p.cat)+'<h3>'+p.name+'</h3><span class="bbx-formula lg">'+p.formula+' · '+p.sku+'</span></div><button class="bbx-x" onclick="BB.closeDrawer()">'+svg(IC.x,16)+'</button></div>'+
    '<div class="bbx-dr-b">'+
      '<div class="bbx-dr-img" style="background-image:url('+CATS[p.cat].img+')"></div>'+
      '<div class="bbx-chips">'+availChip(p.avail)+'<span class="bbx-chip">≈ '+money2(p.price)+' / '+p.unit+'</span><span class="bbx-chip">'+p.stock.toLocaleString()+' '+p.unit+' on hand</span></div>'+
      '<div class="bbx-blab">Technical specification</div><table class="bbx-spec">'+Object.keys(p.specs).map(function(k){return '<tr><td>'+k+'</td><td>'+p.specs[k]+'</td></tr>';}).join('')+'</table>'+
      '<div class="bbx-blab">Applications</div><div class="bbx-apps">'+p.apps.map(function(a){return '<span>'+a+'</span>';}).join('')+'</div>'+
      '<div class="bbx-blab">Packaging</div>'+p.packs.map(function(pk){return '<div class="bbx-pack"><span>'+pk+'</span><span class="bbx-formula">'+money2(p.price)+'/'+p.unit+'</span></div>';}).join('')+
      '<div class="bbx-blab">Documentation</div><div class="bbx-dl">'+svg(IC.file,20)+'<div><b>Safety Data Sheet (SDS)</b><span>'+p.name+' · Rev 4 · PDF</span></div><button class="btn btn--line btn--sm" onclick="BB.toast(\'SDS download started (demo)\')">Download</button></div>'+
      '<div class="bbx-blab">Related products</div>'+related.map(function(r){return '<div class="bbx-pack link" onclick="BB.openProduct(\''+r.sku+'\')"><span>'+r.name+' <span class="bbx-formula">'+r.formula+'</span></span>'+svg(IC.arrow,15)+'</div>';}).join('')+
    '</div>'+
    '<div class="bbx-dr-f"><div class="bbx-qty"><button onclick="BB.pdQty(-1)">−</button><input id="bbxPdQty" value="1"><button onclick="BB.pdQty(1)">+</button><span>'+p.unit+'</span></div>'+
      '<button class="btn btn--primary btn--block" onclick="BB.addToCart(\''+p.sku+'\',parseInt(document.getElementById(\'bbxPdQty\').value)||1);BB.closeDrawer()">'+svg(IC.plus,16)+' Add to RFQ</button></div>');
}
function pdQty(d){var el=document.getElementById('bbxPdQty');el.value=Math.max(1,(parseInt(el.value)||1)+d);}

/* ------------------------------------------------ RFQ */
function renderRFQ(root){
  var c=S.cart;
  if(!c.length){root.innerHTML='<div class="bbx-empty lg">'+svg(IC.cart,40)+'<p>Your RFQ basket is empty.</p><a class="btn btn--primary" href="catalogue.html">Browse the catalogue</a></div>'+
    '<div class="bbx-reqband"><div><h3>Need something not in the catalogue?</h3><p>Tell us the material, grade and quantity — our sourcing desk will find it.</p></div><button class="btn btn--ghost" onclick="BB.openRequestChem()">'+svg(IC.bolt,16)+' Request a material</button></div>';return;}
  var sub=c.reduce(function(s,l){return s+findP(l.sku).price*l.qty;},0);
  root.innerHTML='<div class="bbx-rfq-grid"><div class="bbx-card bbx-rfq-lines">'+
    c.map(function(l){var p=findP(l.sku);return '<div class="bbx-rfq-line"><div class="bbx-rfq-info"><b>'+p.name+'</b><span class="bbx-formula">'+p.formula+' · '+p.sku+' · '+money2(p.price)+'/'+p.unit+'</span></div>'+
      '<div class="bbx-qty"><button onclick="BB.setCartQty(\''+p.sku+'\','+(l.qty-1)+')">−</button><input value="'+l.qty+'" onchange="BB.setCartQty(\''+p.sku+'\',parseInt(this.value)||1)"><button onclick="BB.setCartQty(\''+p.sku+'\','+(l.qty+1)+')">+</button><span>'+p.unit+'</span></div>'+
      '<div class="bbx-rfq-val">'+money(p.price*l.qty)+'</div><button class="bbx-x sm" onclick="BB.rmCart(\''+p.sku+'\')">'+svg(IC.x,14)+'</button></div>';}).join('')+
    '</div><div class="bbx-card bbx-rfq-side"><h3>Delivery & terms</h3>'+
      '<label class="bbx-fld"><span>Deliver to</span><select class="bbx-inp" id="bbxRfqLoc"><option>Please advise site</option><option>Harare</option><option>Bulawayo</option><option>Gweru</option><option>Mutare</option><option>Kwekwe</option></select></label>'+
      '<label class="bbx-fld"><span>Required by</span><input type="date" class="bbx-inp" id="bbxRfqDate"></label>'+
      '<label class="bbx-fld"><span>Reference / notes</span><textarea class="bbx-inp" id="bbxRfqNote" placeholder="Incoterms, PO reference, delivery window…"></textarea></label>'+
      '<div class="bbx-summ"><span>Line items</span><span>'+c.length+'</span></div>'+
      '<div class="bbx-summ"><span>Est. product value</span><span>'+money(sub)+'</span></div>'+
      '<div class="bbx-summ soft"><span>Delivery, taxes & discounts</span><span>quoted on response</span></div>'+
      '<div class="bbx-summ tot"><span>Est. total</span><span>'+money(sub)+'</span></div>'+
      '<button class="btn btn--primary btn--block" onclick="BB.submitRFQ()">'+svg(IC.send,16)+' Submit RFQ</button>'+
      '<p class="bbx-fine">A salesperson prepares a formal quotation, usually within 24 hours.</p>'+
    '</div></div>'+
    '<div class="bbx-reqband"><div><h3>Something not in the catalogue?</h3><p>Request a material and our sourcing desk will find it.</p></div><button class="btn btn--ghost" onclick="BB.openRequestChem()">'+svg(IC.bolt,16)+' Request a material</button></div>';
}
function submitRFQ(){var id=uid('RFQ');var cust=(SESSION&&SESSION.custId)||'delta';
  S.rfqs.unshift({id:id,cust:cust,rep:'',stage:'new',lines:S.cart.map(function(l){return {sku:l.sku,qty:l.qty};}),created:'just now',type:'catalogue',loc:document.getElementById('bbxRfqLoc').value,note:document.getElementById('bbxRfqNote').value});
  S.cart=[];saveState();syncHeaderBadge();toast(id+' submitted — Blackbox sales notified',IC.check);
  if(SESSION&&SESSION.role==='customer')location.href='portal.html';else{document.getElementById('bbx-root').scrollIntoView();BB.page('rfq');setTimeout(function(){toast('Sign in to track your RFQ in the customer portal',IC.user);},700);}}
function openRequestChem(){
  drawer('<div class="bbx-dr-h"><div><span class="bbx-cattag">Request a material</span><h3>Tell us what you need</h3><span class="bbx-formula lg">Our sourcing desk will find it</span></div><button class="bbx-x" onclick="BB.closeDrawer()">'+svg(IC.x,16)+'</button></div>'+
    '<div class="bbx-dr-b"><label class="bbx-fld"><span>Material / product required</span><input class="bbx-inp" id="rcName" placeholder="e.g. Propylene Glycol"></label>'+
    '<div class="bbx-grid2"><label class="bbx-fld"><span>Quantity</span><input class="bbx-inp" id="rcQty" placeholder="e.g. 10 t / month"></label><label class="bbx-fld"><span>Required by</span><input type="date" class="bbx-inp" id="rcDate"></label></div>'+
    '<label class="bbx-fld"><span>Grade / application</span><input class="bbx-inp" id="rcApp" placeholder="e.g. USP grade, humectant"></label>'+
    '<label class="bbx-fld"><span>Delivery location</span><input class="bbx-inp" id="rcLoc" placeholder="e.g. Harare"></label>'+
    '<label class="bbx-fld"><span>Notes</span><textarea class="bbx-inp" id="rcNote" placeholder="Specification, packaging, purity, SDS requirements…"></textarea></label>'+
    '<div class="bbx-dl">'+svg(IC.file,20)+'<div><b>Attach specification</b><span>PDF or spec sheet (demo)</span></div><button class="btn btn--line btn--sm" onclick="BB.toast(\'File attached (demo)\')">Attach</button></div></div>'+
    '<div class="bbx-dr-f"><button class="btn btn--line" onclick="BB.closeDrawer()">Cancel</button><button class="btn btn--primary btn--block" onclick="BB.submitSourcing()">'+svg(IC.send,16)+' Send to sourcing</button></div>');
}
function submitSourcing(){var id=uid('SRC');S.sourcing.unshift({id:id,cust:(SESSION&&SESSION.custId)||'delta',chem:document.getElementById('rcName').value||'Unspecified material',qty:document.getElementById('rcQty').value||'—',app:document.getElementById('rcApp').value||'—',loc:document.getElementById('rcLoc').value||'—'});saveState();closeDrawer();toast(id+' sent — sourcing will respond shortly',IC.check);}

/* ------------------------------------------------ SIGN IN */
var authSeg='customer';
function setAuthSeg(s){authSeg=s;renderSignin(document.getElementById('bbx-root'));}
function renderSignin(root){
  var params=new URLSearchParams(location.search);
  if(params.get('as')==='staff'&&!root.getAttribute('data-seg-set')){authSeg='staff';root.setAttribute('data-seg-set','1');}
  var demo=authSeg==='staff'?ACCOUNTS[0]:ACCOUNTS[2];
  root.innerHTML='<div class="bbx-authwrap"><div class="bbx-authcard">'+
    '<div class="bbx-seg"><button class="'+(authSeg==='customer'?'on':'')+'" onclick="BB.setAuthSeg(\'customer\')">'+svg(IC.user,15)+' Customer</button><button class="'+(authSeg==='staff'?'on':'')+'" onclick="BB.setAuthSeg(\'staff\')">'+svg(IC.board,15)+' Staff / Admin</button></div>'+
    '<h2 class="bbx-auth-t">'+(authSeg==='staff'?'Staff & admin sign-in':'Customer portal')+'</h2>'+
    '<p class="bbx-auth-p">'+(authSeg==='staff'?'Access the sales CRM and management dashboards.':'Track your RFQs, quotations and orders.')+'</p>'+
    '<div class="bbx-demo">Demo: <b>'+demo.email+'</b> / <b>'+demo.pw+'</b><button onclick="document.getElementById(\'aiEmail\').value=\''+demo.email+'\';document.getElementById(\'aiPw\').value=\''+demo.pw+'\';document.getElementById(\'aiErr\').style.display=\'none\'">Use</button></div>'+
    '<div class="bbx-auth-err" id="aiErr">Incorrect email or password.</div>'+
    '<label class="bbx-fld"><span>Work email</span><input class="bbx-inp" id="aiEmail" value="'+demo.email+'"></label>'+
    '<label class="bbx-fld"><span>Password</span><input class="bbx-inp" id="aiPw" type="password" value="'+demo.pw+'" onkeydown="if(event.key===\'Enter\')BB.doSignIn()"></label>'+
    '<button class="btn btn--primary btn--block" onclick="BB.doSignIn()">Sign in '+svg(IC.arrow,16)+'</button>'+
    '<p class="bbx-fine">'+(authSeg==='customer'?'Browse the <a href="catalogue.html">catalogue</a> and submit RFQs as a guest — no account needed.':'For Blackbox staff only.')+'</p>'+
    '</div></div>';
}
function doSignIn(){var acc=signIn(document.getElementById('aiEmail').value.trim(),document.getElementById('aiPw').value);
  if(!acc){document.getElementById('aiErr').style.display='block';return;}
  var next=new URLSearchParams(location.search).get('next');
  location.href=(next&&next!=='signin'?next+'.html':(acc.land+'.html'));}

/* ------------------------------------------------ quotes maths */
function quoteTotal(q){var sub=q.lines.reduce(function(s,l){return s+findP(l.sku).price*l.qty;},0);var disc=sub*(q.disc||0)/100;var taxable=sub-disc+(q.delivery||0);var vat=taxable*0.15;return {sub:sub,disc:disc,delivery:q.delivery||0,vat:vat,total:taxable+vat};}

/* ------------------------------------------------ CUSTOMER PORTAL */
function renderPortal(root){
  var cid=SESSION.custId;var c=findC(cid);
  var myRfqs=S.rfqs.filter(function(r){return r.cust===cid;});
  var myQuotes=S.quotes.filter(function(q){return q.cust===cid;});
  var myOrders=S.orders.filter(function(o){return o.cust===cid;});
  var openRfq=myRfqs.filter(function(r){return r.stage!=='won'&&r.stage!=='fulfil';}).length;
  var inTransit=myOrders.filter(function(o){return o.status==='transit'||o.status==='fulfilling';}).length;
  function ordChip(s){return s==='transit'?'<span class="bbx-avail in">In transit</span>':s==='fulfilling'?'<span class="bbx-avail low">Fulfilling</span>':'<span class="bbx-avail in">Delivered</span>';}
  root.innerHTML='<div class="bbx-tiles">'+
    tile('Open RFQs',openRfq,'awaiting quotation')+tile('Quotations',myQuotes.length,'awaiting your decision')+
    tile('Orders in transit',inTransit,'live deliveries')+tile('Documents',9,'SDS · invoices · certs')+'</div>'+
    '<h3 class="bbx-h">Quotations awaiting your decision</h3>'+
    (myQuotes.length?tableWrap(['Quote','Products','Total','',''],myQuotes.map(function(q){var t=quoteTotal(q);return '<tr><td class="mono">'+q.id+'</td><td>'+q.lines.map(function(l){return findP(l.sku).name;}).join(', ')+'</td><td class="num">'+money(t.total)+'</td><td><span class="bbx-avail in">Received</span></td><td class="ar"><button class="btn btn--line btn--sm" onclick="BB.viewQuote(\''+q.id+'\')">View</button> <button class="btn btn--primary btn--sm" onclick="BB.acceptQuote(\''+q.id+'\')">Accept</button></td></tr>';})):'<div class="bbx-card bbx-empty sm">No open quotations.</div>')+
    '<h3 class="bbx-h">Orders</h3>'+tableWrap(['Order','Products','Value','Delivery','Status',''],myOrders.map(function(o){var v=o.lines.reduce(function(s,l){return s+findP(l.sku).price*l.qty;},0);return '<tr><td class="mono">'+o.id+'</td><td>'+o.lines.map(function(l){return findP(l.sku).name+' <span class="mono soft">×'+l.qty+'</span>';}).join('<br>')+'</td><td class="num">'+money(v)+'</td><td class="soft">'+o.eta+'</td><td>'+ordChip(o.status)+'</td><td class="ar"><button class="btn btn--line btn--sm" onclick="BB.reorder(\''+o.id+'\')">'+svg(IC.repeat,13)+' Re-order</button></td></tr>';}))+
    '<h3 class="bbx-h">Recent RFQs</h3>'+tableWrap(['RFQ','Products','Est. value','Stage','Raised'],myRfqs.slice(0,6).map(function(r){var st=STAGES.filter(function(s){return s.k===r.stage;})[0];return '<tr><td class="mono">'+r.id+'</td><td>'+r.lines.length+' line'+(r.lines.length>1?'s':'')+' · '+r.lines.map(function(l){return findP(l.sku).name;}).slice(0,2).join(', ')+'</td><td class="num">'+money(rfqVal(r))+'</td><td><span class="bbx-stage">'+st.t+'</span></td><td class="soft mono">'+r.created+'</td></tr>';}));
}
function reorder(id){var o=S.orders.filter(function(x){return x.id===id;})[0];o.lines.forEach(function(l){var e=S.cart.filter(function(c){return c.sku===l.sku;})[0];if(e)e.qty+=l.qty;else S.cart.push({sku:l.sku,qty:l.qty});});saveState();syncHeaderBadge();toast('Products added to a new RFQ',IC.repeat);location.href='rfq.html';}
function viewQuote(id){var q=S.quotes.filter(function(x){return x.id===id;})[0];var t=quoteTotal(q);var c=findC(q.cust);
  drawer('<div class="bbx-dr-h"><div><span class="bbx-cattag">Quotation</span><h3>'+q.id+'</h3><span class="bbx-formula lg">Prepared for '+c.name+'</span></div><button class="bbx-x" onclick="BB.closeDrawer()">'+svg(IC.x,16)+'</button></div>'+
    '<div class="bbx-dr-b">'+tableWrap(['Product','Qty','Unit','Line'],q.lines.map(function(l){var p=findP(l.sku);return '<tr><td><b>'+p.name+'</b><br><span class="mono soft">'+p.sku+'</span></td><td class="num">'+l.qty+' '+p.unit+'</td><td class="num">'+money2(p.price)+'</td><td class="num">'+money(p.price*l.qty)+'</td></tr>';}))+
    '<div class="bbx-summ"><span>Subtotal</span><span>'+money(t.sub)+'</span></div><div class="bbx-summ"><span>Discount ('+q.disc+'%)</span><span class="pos">−'+money(t.disc)+'</span></div><div class="bbx-summ"><span>Delivery</span><span>'+money(t.delivery)+'</span></div><div class="bbx-summ"><span>VAT (15%)</span><span>'+money(t.vat)+'</span></div><div class="bbx-summ tot"><span>Total</span><span>'+money(t.total)+'</span></div>'+
    '<p class="bbx-fine">Valid 30 days · EXW Harare unless stated · SDS provided on dispatch</p></div>'+
    '<div class="bbx-dr-f"><button class="btn btn--line" onclick="BB.toast(\'Quotation PDF downloaded (demo)\')">'+svg(IC.file,16)+' PDF</button><button class="btn btn--primary btn--block" onclick="BB.acceptQuote(\''+q.id+'\')">'+svg(IC.check,16)+' Accept & create order</button></div>');}
function acceptQuote(id){var q=S.quotes.filter(function(x){return x.id===id;})[0];if(!q)return;S.quotes=S.quotes.filter(function(x){return x.id!==id;});var oid=uid('SO');S.orders.unshift({id:oid,cust:q.cust,lines:q.lines,status:'fulfilling',eta:'Scheduling',created:'just now'});var rfq=S.rfqs.filter(function(r){return r.id===q.rfq;})[0];if(rfq)rfq.stage='won';saveState();closeDrawer();toast('Quote accepted — order '+oid+' created',IC.check);BB.page('portal');}

/* ------------------------------------------------ ADMIN (CRM + Management) */
var adminTabCur='crm';
function adminTab(t){adminTabCur=t;renderAdmin(document.getElementById('bbx-root'));}
function renderAdmin(root){
  var tabs='<div class="bbx-tabs"><button class="'+(adminTabCur==='crm'?'on':'')+'" onclick="BB.adminTab(\'crm\')">'+svg(IC.board,16)+' Sales CRM</button><button class="'+(adminTabCur==='mgmt'?'on':'')+'" onclick="BB.adminTab(\'mgmt\')">'+svg(IC.chart,16)+' Management</button></div>';
  root.innerHTML=tabs+'<div id="bbxAdminBody"></div>';
  (adminTabCur==='crm'?renderCRM:renderMgmt)(document.getElementById('bbxAdminBody'));
}
function renderCRM(root){
  var pipeline=S.rfqs.filter(function(r){return r.stage!=='won';}).reduce(function(s,r){return s+rfqVal(r);},0);
  var won=S.rfqs.filter(function(r){return r.stage==='won'||r.stage==='fulfil';});var wonVal=won.reduce(function(s,r){return s+rfqVal(r);},0);
  var conv=Math.round(won.length/Math.max(1,S.rfqs.length)*100);
  root.innerHTML='<div class="bbx-tiles">'+tile('Open pipeline',money(pipeline),S.rfqs.filter(function(r){return r.stage!=='won'&&r.stage!=='fulfil';}).length+' active RFQs')+tile('Won this month',money(wonVal),won.length+' orders')+tile('Conversion',conv+'%','RFQ → order')+tile('Avg. response','9 hr','quote turnaround')+'</div>'+
    '<div class="bbx-board">'+STAGES.map(function(st){var items=S.rfqs.filter(function(r){return r.stage===st.k;});return '<div class="bbx-col"><div class="bbx-col-h"><span>'+st.t+'</span><span class="bbx-col-c">'+items.length+'</span></div><div class="bbx-col-b">'+
      (items.map(function(r){var c=findC(r.cust);return '<div class="bbx-kc" onclick="BB.openRfqCard(\''+r.id+'\')"><div class="bbx-kc-r1"><span class="mono soft">'+r.id+'</span><span class="mono soft xs">'+r.created+'</span></div><h5>'+c.name+'</h5><span class="bbx-kc-cust">'+r.lines.length+' line'+(r.lines.length>1?'s':'')+' · '+findP(r.lines[0].sku).name+(r.lines.length>1?' +'+(r.lines.length-1):'')+'</span><div class="bbx-kc-r2"><span class="bbx-kc-val">'+money(rfqVal(r))+'</span>'+(r.rep?'<span class="bbx-kc-rep"><i>'+repInit(r.rep)+'</i>'+r.rep.split(' ')[0]+'</span>':'<span class="soft xs">Unassigned</span>')+'</div></div>';}).join('')||'<div class="bbx-col-e">—</div>')+
      '</div></div>';}).join('')+'</div>'+
    '<div class="bbx-panels2">'+panelBars('Open pipeline by category',pipeByCat())+panelReps()+'</div>';
  requestAnimationFrame(function(){[].forEach.call(document.querySelectorAll('.bbx-bar-fill'),function(f){f.style.width=f.getAttribute('data-w');});});
}
function openRfqCard(id){var r=S.rfqs.filter(function(x){return x.id===id;})[0];var c=findC(r.cust);var si=STAGES.map(function(s){return s.k;}).indexOf(r.stage);var next=STAGES[si+1];
  drawer('<div class="bbx-dr-h"><div><span class="bbx-cattag">'+r.id+'</span><h3>'+c.name+'</h3><span class="bbx-formula lg">'+c.sector+' · raised '+r.created+'</span></div><button class="bbx-x" onclick="BB.closeDrawer()">'+svg(IC.x,16)+'</button></div>'+
    '<div class="bbx-dr-b"><div class="bbx-chips"><span class="bbx-stage lg">'+STAGES[si].t+'</span><span class="bbx-chip">'+money(rfqVal(r))+' est.</span>'+(r.rep?'<span class="bbx-chip">'+r.rep+'</span>':'<span class="bbx-avail low">Unassigned</span>')+'</div>'+
    (r.loc?'<p class="bbx-note">'+svg(IC.pin,14)+' Deliver to '+r.loc+'</p>':'')+(r.note?'<p class="bbx-note it">"'+r.note+'"</p>':'')+
    '<div class="bbx-blab">Requested products</div>'+tableWrap(['Product','Qty','Line est.'],r.lines.map(function(l){var p=findP(l.sku);return '<tr><td><b>'+p.name+'</b> <span class="mono soft">'+p.sku+'</span></td><td class="num">'+l.qty+' '+p.unit+'</td><td class="num">'+money(p.price*l.qty)+'</td></tr>';}))+
    (!r.rep?'<div class="bbx-blab">Assign salesperson</div><select class="bbx-inp" id="bbxAssign">'+REPS.map(function(x){return '<option>'+x+'</option>';}).join('')+'</select>':'')+'</div>'+
    '<div class="bbx-dr-f">'+(isOpen(r)?'<button class="btn btn--line" onclick="BB.markLost(\''+r.id+'\')">Mark lost</button>':'')+((r.stage==='quoted'||r.stage==='nego')?'<button class="btn btn--line" onclick="BB.buildQuote(\''+r.id+'\')">'+svg(IC.doc,16)+' Re-quote</button>':'')+
      ((r.stage==='new'||r.stage==='assigned')?'<button class="btn btn--primary btn--block" onclick="'+(r.stage==='new'?'BB.assignRfq(\''+r.id+'\')':'BB.buildQuote(\''+r.id+'\')')+'">'+(r.stage==='new'?'Assign':svg(IC.doc,16)+' Prepare quote')+'</button>':(next?'<button class="btn btn--primary btn--block" onclick="BB.advanceRfq(\''+r.id+'\')">'+svg(IC.arrow,16)+' Move to '+next.t+'</button>':''))+'</div>');}
function assignRfq(id){var r=S.rfqs.filter(function(x){return x.id===id;})[0];r.rep=document.getElementById('bbxAssign').value;r.stage='assigned';saveState();closeDrawer();toast(id+' assigned to '+r.rep,IC.check);BB.page('admin');}
function advanceRfq(id){var r=S.rfqs.filter(function(x){return x.id===id;})[0];var i=STAGES.map(function(s){return s.k;}).indexOf(r.stage);var nx=STAGES[i+1];if(nx&&nx.k!=='lost'){r.stage=nx.k;saveState();closeDrawer();toast(id+' → '+nx.t,IC.arrow);BB.page('admin');}}
function markLost(id){var r=S.rfqs.filter(function(x){return x.id===id;})[0];r.stage='lost';saveState();closeDrawer();toast(id+' marked as lost',IC.x);BB.page('admin');}
function buildQuote(id){var r=S.rfqs.filter(function(x){return x.id===id;})[0];var c=findC(r.cust);
  drawer('<div class="bbx-dr-h"><div><span class="bbx-cattag">Prepare quotation · '+r.id+'</span><h3>'+c.name+'</h3></div><button class="bbx-x" onclick="BB.closeDrawer()">'+svg(IC.x,16)+'</button></div>'+
    '<div class="bbx-dr-b"><div class="bbx-blab">Line items & pricing</div>'+r.lines.map(function(l){var p=findP(l.sku);return '<div class="bbx-pack col"><div class="bbx-pack-r"><b>'+p.name+'</b><span class="mono soft">'+l.qty+' '+p.unit+'</span></div><div class="bbx-pack-r"><span class="mono soft">Unit $</span><input class="bbx-inp qUnit" data-sku="'+l.sku+'" data-qty="'+l.qty+'" value="'+p.price+'" oninput="BB.recalcQuote()"><span class="mono qLine">'+money(p.price*l.qty)+'</span></div></div>';}).join('')+
    '<div class="bbx-grid2"><label class="bbx-fld"><span>Delivery / freight $</span><input class="bbx-inp" id="qDelivery" value="1200" oninput="BB.recalcQuote()"></label><label class="bbx-fld"><span>Discount %</span><input class="bbx-inp" id="qDisc" value="5" oninput="BB.recalcQuote()"></label></div>'+
    '<div id="qSummary"></div></div>'+
    '<div class="bbx-dr-f"><button class="btn btn--line" onclick="BB.closeDrawer()">Cancel</button><button class="btn btn--primary btn--block" onclick="BB.sendQuote(\''+r.id+'\')">'+svg(IC.send,16)+' Send quotation</button></div>');
  recalcQuote();}
function recalcQuote(){var sub=0;[].forEach.call(document.querySelectorAll('.qUnit'),function(u){var line=(parseFloat(u.value)||0)*(+u.getAttribute('data-qty'));sub+=line;u.parentElement.querySelector('.qLine').textContent=money(line);});
  var disc=sub*(parseFloat(document.getElementById('qDisc').value)||0)/100;var del=parseFloat(document.getElementById('qDelivery').value)||0;var vat=(sub-disc+del)*0.15;var total=sub-disc+del+vat;
  document.getElementById('qSummary').innerHTML='<div class="bbx-summ"><span>Subtotal</span><span>'+money(sub)+'</span></div><div class="bbx-summ"><span>Discount</span><span class="pos">−'+money(disc)+'</span></div><div class="bbx-summ"><span>Delivery</span><span>'+money(del)+'</span></div><div class="bbx-summ"><span>VAT (15%)</span><span>'+money(vat)+'</span></div><div class="bbx-summ tot"><span>Quote total</span><span>'+money(total)+'</span></div>';}
function sendQuote(id){var r=S.rfqs.filter(function(x){return x.id===id;})[0];var lines=[].map.call(document.querySelectorAll('.qUnit'),function(u){return {sku:u.getAttribute('data-sku'),qty:+u.getAttribute('data-qty')};});var qid=uid('QT');
  S.quotes.unshift({id:qid,rfq:id,cust:r.cust,lines:lines,delivery:parseFloat(document.getElementById('qDelivery').value)||0,disc:parseFloat(document.getElementById('qDisc').value)||0,created:'just now'});r.stage='quoted';saveState();closeDrawer();toast(qid+' sent to '+findC(r.cust).name,IC.send);BB.page('admin');}

/* ------------------------------------------------ MANAGEMENT */
function renderMgmt(root){
  var newToday=S.rfqs.filter(function(r){return ['just now','40m','2h','6h','8h'].indexOf(r.created)>=0;}).length;
  var pipeline=S.rfqs.filter(function(r){return r.stage!=='won';}).reduce(function(s,r){return s+rfqVal(r);},0);
  var awaiting=S.orders.filter(function(o){return o.status==='fulfilling'||o.status==='transit';}).length;
  var low=PRODUCTS.filter(function(p){return p.avail==='low';}).length;
  var byCat=pipeByCat();
  root.innerHTML='<div class="bbx-tiles">'+tile('New RFQs today',newToday,'across all categories')+tile('Quotation pipeline',money(pipeline),'open opportunities')+tile('Awaiting fulfilment',awaiting,'orders to dispatch')+tile('Low-stock products',low,'reorder required')+'</div>'+
    '<div class="bbx-panels2">'+panelBars('Pipeline by category',byCat)+'<div class="bbx-panel"><h4>Top requested materials</h4>'+topChem()+'</div></div>'+
    '<div class="bbx-panels2">'+'<div class="bbx-panel"><h4>Intelligence</h4>'+
      insight('Which customers haven’t ordered in 90 days?','<b>Colcom Foods</b> and <b>PPC Zimbabwe</b> — both historically $40k+/quarter. Suggest a re-engagement call.')+
      insight('Which quotations are most likely to close?','<b>QT-2291 (Harare Water)</b> — repeat buyer, priced in range, 82% predicted win.')+
      insight('What’s repeatedly requested but out of stock?','<b>Anionic Flocculant</b> — 4 RFQs this month, currently low stock. Recommend restocking.')+
    '</div>'+panelReps()+'</div>'+
    '<div class="bbx-admin-foot"><button class="btn btn--line btn--sm" onclick="BB.resetDemo()">'+svg(IC.repeat,14)+' Reset demo data</button></div>';
  requestAnimationFrame(function(){[].forEach.call(document.querySelectorAll('.bbx-bar-fill'),function(f){f.style.width=f.getAttribute('data-w');});});
}

/* ------------------------------------------------ shared widgets */
function tile(lab,val,sub){return '<div class="bbx-tile"><div class="bbx-tile-l">'+lab+'</div><div class="bbx-tile-v">'+val+'</div><div class="bbx-tile-s">'+sub+'</div></div>';}
function tableWrap(head,rows){return '<div class="bbx-tblwrap"><table class="bbx-tbl"><thead><tr>'+head.map(function(h){return '<th'+(h==='Total'||h==='Value'||h==='Est. value'||h==='Line'||h==='Line est.'||h==='Qty'||h==='Unit'?' class="num"':'')+'>'+h+'</th>';}).join('')+'</tr></thead><tbody>'+(rows.join('')||'')+'</tbody></table></div>';}
function pipeByCat(){var m={};CK.forEach(function(k){m[k]=0;});S.rfqs.filter(isOpen).forEach(function(r){r.lines.forEach(function(l){var p=findP(l.sku);m[p.cat]+=p.price*l.qty;});});
  return CK.map(function(k){return {name:CATS[k].name,v:m[k]};}).filter(function(d){return d.v>0;}).sort(function(a,b){return b.v-a.v;});}
function panelBars(title,data){var max=Math.max.apply(null,data.map(function(d){return d.v;}).concat([1]));var tot=data.reduce(function(s,d){return s+d.v;},0);
  return '<div class="bbx-panel"><div class="bbx-panel-h"><h4>'+title+'</h4><span class="mono soft">'+money(tot)+'</span></div>'+data.map(function(d){return '<div class="bbx-bar"><span class="bbx-bar-n">'+d.name+'</span><span class="bbx-bar-t"><span class="bbx-bar-fill" data-w="'+Math.round(d.v/max*100)+'%"></span></span><span class="bbx-bar-v">'+money(d.v)+'</span></div>';}).join('')+'</div>';}
function panelReps(){var m={};REPS.forEach(function(r){m[r]=0;});S.rfqs.forEach(function(r){if(r.rep&&m[r.rep]!==undefined)m[r.rep]+=rfqVal(r);});var data=REPS.map(function(r){return {name:r,v:m[r]};}).sort(function(a,b){return b.v-a.v;});var max=Math.max.apply(null,data.map(function(d){return d.v;}).concat([1]));
  return '<div class="bbx-panel"><div class="bbx-panel-h"><h4>Pipeline by salesperson</h4></div>'+data.map(function(d){return '<div class="bbx-bar"><span class="bbx-bar-n"><i class="bbx-rep-i">'+repInit(d.name)+'</i>'+d.name.split(' ')[0]+'</span><span class="bbx-bar-t"><span class="bbx-bar-fill" data-w="'+Math.round(d.v/max*100)+'%"></span></span><span class="bbx-bar-v">'+money(d.v)+'</span></div>';}).join('')+'</div>';}
function topChem(){var m={};S.rfqs.forEach(function(r){r.lines.forEach(function(l){m[l.sku]=(m[l.sku]||0)+1;});});var data=Object.keys(m).map(function(sku){return {p:findP(sku),n:m[sku]};}).sort(function(a,b){return b.n-a.n;}).slice(0,6);var max=Math.max.apply(null,data.map(function(d){return d.n;}).concat([1]));
  return data.map(function(d){return '<div class="bbx-bar"><span class="bbx-bar-n">'+d.p.name+'</span><span class="bbx-bar-t"><span class="bbx-bar-fill" data-w="'+Math.round(d.n/max*100)+'%"></span></span><span class="bbx-bar-v">'+d.n+' RFQ'+(d.n>1?'s':'')+'</span></div>';}).join('');}
function insight(q,a){return '<div class="bbx-insight"><span class="bbx-ai">'+svg(IC.ai,15)+'</span><div><div class="bbx-iq">'+q+'</div><div class="bbx-ia">'+a+'</div></div></div>';}
function panelHiVal(){
  var m={};CUST.forEach(function(c){m[c.id]=0;});
  S.orders.forEach(function(o){o.lines.forEach(function(l){m[o.cust]+=findP(l.sku).price*l.qty;});});
  S.rfqs.filter(isOpen).forEach(function(r){m[r.cust]+=rfqVal(r);});
  var data=CUST.map(function(c){return {name:c.name,v:m[c.id]};}).filter(function(d){return d.v>0;}).sort(function(a,b){return b.v-a.v;}).slice(0,6);
  var max=Math.max.apply(null,data.map(function(d){return d.v;}).concat([1]));
  return '<div class="bbx-panel"><div class="bbx-panel-h"><h4>High-value customers</h4><span class="mono soft">orders + pipeline</span></div>'+data.map(function(d){return '<div class="bbx-bar"><span class="bbx-bar-n">'+d.name+'</span><span class="bbx-bar-t"><span class="bbx-bar-fill" data-w="'+Math.round(d.v/max*100)+'%"></span></span><span class="bbx-bar-v">'+money(d.v)+'</span></div>';}).join('')+'</div>';
}
function panelLost(){
  var lost=S.rfqs.filter(function(r){return r.stage==='lost';});
  var tot=lost.reduce(function(s,r){return s+rfqVal(r);},0);
  return '<div class="bbx-panel"><div class="bbx-panel-h"><h4>Lost opportunities</h4><span class="mono soft">'+money(tot)+'</span></div>'+
    (lost.length?lost.map(function(r){return '<div class="bbx-lost"><div><b>'+findC(r.cust).name+'</b><span class="mono soft"> · '+r.id+'</span><div class="soft xs">'+r.lines.map(function(l){return findP(l.sku).name;}).join(', ')+'</div></div><span class="bbx-bar-v">'+money(rfqVal(r))+'</span></div>';}).join(''):'<p class="soft xs">No lost opportunities.</p>')+'</div>';
}

/* ================================================ APP SHELL (admin + portal) */
var MENUS={
  admin:[
    {k:'overview',t:'Overview',ic:IC.grid},
    {k:'pipeline',t:'Sales Pipeline',ic:IC.board},
    {k:'quotations',t:'Quotations',ic:IC.doc},
    {k:'orders',t:'Orders',ic:IC.truck},
    {k:'customers',t:'Customers',ic:IC.users},
    {k:'catalogue2',t:'Products',ic:IC.box},
    {k:'sourcing',t:'Sourcing Requests',ic:IC.bolt},
    {k:'reports',t:'Reports',ic:IC.chart}
  ],
  portal:[
    {k:'overview',t:'Overview',ic:IC.grid},
    {k:'rfqs',t:'My RFQs',ic:IC.doc},
    {k:'quotations',t:'Quotations',ic:IC.file},
    {k:'orders',t:'Orders',ic:IC.truck},
    {k:'documents',t:'Documents',ic:IC.box}
  ]
};
var TITLES={
  overview:['Overview','Everything at a glance'],
  pipeline:['Sales Pipeline','RFQs from enquiry to fulfilment'],
  quotations:['Quotations','Prepared and sent quotes'],
  orders:['Orders','Confirmed and in-transit'],
  customers:['Customers','Accounts and activity'],
  catalogue2:['Products','The material catalogue'],
  sourcing:['Sourcing Requests','Materials to find'],
  reports:['Reports & Intelligence','Performance across the business'],
  rfqs:['My RFQs','Your requests for quotation'],
  documents:['Documents','SDS, invoices & certificates']
};
BB.navTo=function(k){location.hash=k;};
function renderShell(page){
  var app=document.getElementById('bbx-app');if(!app)return;
  var menu=MENUS[page];
  var view=(location.hash||'').replace('#','')||menu[0].k;
  if(!menu.some(function(m){return m.k===view;}))view=menu[0].k;
  var cart=(page==='portal'?'<a class="bbx-side-cta" href="catalogue.html">'+svg(IC.plus,16)+' New RFQ</a>':'');
  app.className='bbx-appwrap';
  app.innerHTML=
    '<aside class="bbx-side" id="bbxSide">'+
      '<a class="bbx-side-brand" href="index.html"><span class="bbx-side-logo">B</span><span class="bbx-side-name">Blackbox<small>'+(page==='admin'?'Console':'Portal')+'</small></span></a>'+
      '<nav class="bbx-side-nav">'+menu.map(function(m){return '<button class="bbx-side-item'+(m.k===view?' on':'')+'" data-k="'+m.k+'">'+svg(m.ic,18)+'<span>'+m.t+'</span></button>';}).join('')+'</nav>'+
      '<div class="bbx-side-foot">'+cart+
        '<a class="bbx-side-link" href="index.html">'+svg(IC.site,16)+' View website</a>'+
        '<div class="bbx-side-user"><span class="bbx-av">'+SESSION.init+'</span><span class="bbx-acct-t"><b>'+SESSION.name+'</b><small>'+SESSION.sub+'</small></span><button class="bbx-side-out" title="Sign out" onclick="BB.signOut()">'+svg(IC.out,15)+'</button></div>'+
      '</div>'+
    '</aside>'+
    '<div class="bbx-main2"><header class="bbx-vbar"><button class="bbx-side-toggle" onclick="document.getElementById(\'bbxSide\').classList.toggle(\'open\')">'+svg(IC.grid,18)+'</button><div id="bbx-vtitle"></div><a class="bbx-vbar-site" href="index.html">'+svg(IC.site,15)+' Website</a></header><div class="bbx-view" id="bbx-view"></div></div>';
  [].forEach.call(app.querySelectorAll('.bbx-side-item'),function(b){b.addEventListener('click',function(){location.hash=b.getAttribute('data-k');var s=document.getElementById('bbxSide');if(s)s.classList.remove('open');});});
  renderShellView(page,view);
}
function renderShellView(page,view){
  var host=document.getElementById('bbx-view');if(!host)return;
  var menu=MENUS[page];if(!menu.some(function(m){return m.k===view;}))view=menu[0].k;
  [].forEach.call(document.querySelectorAll('.bbx-side-item'),function(b){b.classList.toggle('on',b.getAttribute('data-k')===view);});
  var t=TITLES[view]||[view,''];var vt=document.getElementById('bbx-vtitle');if(vt)vt.innerHTML='<h1>'+t[0]+'</h1><p>'+t[1]+'</p>';
  var views=(page==='admin'?ADMIN_VIEWS:PORTAL_VIEWS);
  try{ (views[view]||function(h){h.innerHTML='';})(host); }
  catch(e){ host.innerHTML='<div class="bbx-card bbx-empty sm">This view couldn’t load. <button class="btn btn--line btn--sm" onclick="BB.resetDemo()">Reset demo data</button></div>'; }
  requestAnimationFrame(function(){[].forEach.call(document.querySelectorAll('.bbx-bar-fill'),function(f){f.style.width=f.getAttribute('data-w');});});
}
function boardHTML(){
  return '<div class="bbx-board">'+STAGES.map(function(st){var items=S.rfqs.filter(function(r){return r.stage===st.k;});return '<div class="bbx-col"><div class="bbx-col-h"><span>'+st.t+'</span><span class="bbx-col-c">'+items.length+'</span></div><div class="bbx-col-b">'+
    (items.map(function(r){var c=findC(r.cust);return '<div class="bbx-kc" onclick="BB.openRfqCard(\''+r.id+'\')"><div class="bbx-kc-r1"><span class="mono soft">'+r.id+'</span><span class="mono soft xs">'+r.created+'</span></div><h5>'+c.name+'</h5><span class="bbx-kc-cust">'+r.lines.length+' line'+(r.lines.length>1?'s':'')+' · '+findP(r.lines[0].sku).name+(r.lines.length>1?' +'+(r.lines.length-1):'')+'</span><div class="bbx-kc-r2"><span class="bbx-kc-val">'+money(rfqVal(r))+'</span>'+(r.rep?'<span class="bbx-kc-rep"><i>'+repInit(r.rep)+'</i>'+r.rep.split(' ')[0]+'</span>':'<span class="soft xs">Unassigned</span>')+'</div></div>';}).join('')||'<div class="bbx-col-e">—</div>')+
    '</div></div>';}).join('')+'</div>';
}
/* ---- ADMIN views ---- */
var ADMIN_VIEWS={
  overview:function(h){
    var pipeline=S.rfqs.filter(isOpen).reduce(function(s,r){return s+rfqVal(r);},0);
    var newToday=S.rfqs.filter(function(r){return ['just now','40m','2h','6h','8h'].indexOf(r.created)>=0;}).length;
    var awaiting=S.orders.filter(function(o){return o.status==='fulfilling'||o.status==='transit';}).length;
    var low=PRODUCTS.filter(function(p){return p.avail==='low';}).length;
    h.innerHTML='<div class="bbx-tiles">'+tile('Open pipeline',money(pipeline),S.rfqs.length+' live RFQs')+tile('New RFQs today',newToday,'across all categories')+tile('Awaiting fulfilment',awaiting,'orders to dispatch')+tile('Low-stock products',low,'reorder required')+'</div>'+
      '<div class="bbx-panels2">'+panelBars('Open pipeline by category',pipeByCat())+'<div class="bbx-panel"><h4>Top requested materials</h4>'+topChem()+'</div></div>'+
      '<h3 class="bbx-h">Latest RFQs</h3>'+tableWrap(['RFQ','Customer','Products','Est. value','Stage','Owner'],S.rfqs.slice(0,7).map(function(r){var st=STAGES.filter(function(s){return s.k===r.stage;})[0];var c=findC(r.cust);return '<tr onclick="BB.openRfqCard(\''+r.id+'\')" style="cursor:pointer"><td class="mono">'+r.id+'</td><td><b>'+c.name+'</b></td><td>'+r.lines.length+' · '+findP(r.lines[0].sku).name+'</td><td class="num">'+money(rfqVal(r))+'</td><td><span class="bbx-stage">'+st.t+'</span></td><td class="soft">'+(r.rep?r.rep.split(' ')[0]:'—')+'</td></tr>';}));
  },
  pipeline:function(h){
    var pipeline=S.rfqs.filter(isOpen).reduce(function(s,r){return s+rfqVal(r);},0);
    var won=S.rfqs.filter(function(r){return r.stage==='won'||r.stage==='fulfil';});
    var lost=S.rfqs.filter(function(r){return r.stage==='lost';});
    var conv=Math.round(won.length/Math.max(1,won.length+lost.length)*100);
    h.innerHTML='<div class="bbx-tiles">'+tile('Open pipeline',money(pipeline),S.rfqs.filter(isOpen).length+' active')+tile('Won',money(won.reduce(function(s,r){return s+rfqVal(r);},0)),won.length+' orders')+tile('Lost',money(lost.reduce(function(s,r){return s+rfqVal(r);},0)),lost.length+' opportunities')+tile('Win rate',conv+'%','won / decided')+'</div>'+boardHTML();
  },
  quotations:function(h){
    h.innerHTML='<h3 class="bbx-h" style="margin-top:0">Sent quotations</h3>'+(S.quotes.length?tableWrap(['Quote','Customer','From RFQ','Products','Total','Raised'],S.quotes.map(function(q){var t=quoteTotal(q);return '<tr onclick="BB.viewQuote(\''+q.id+'\')" style="cursor:pointer"><td class="mono">'+q.id+'</td><td><b>'+findC(q.cust).name+'</b></td><td class="mono soft">'+q.rfq+'</td><td>'+q.lines.map(function(l){return findP(l.sku).name;}).join(', ')+'</td><td class="num">'+money(t.total)+'</td><td class="soft mono">'+q.created+'</td></tr>';})):'<div class="bbx-card bbx-empty sm">No quotations sent yet — prepare one from the pipeline.</div>');
  },
  orders:function(h){
    function chip(s){return s==='transit'?'<span class="bbx-avail in">In transit</span>':s==='fulfilling'?'<span class="bbx-avail low">Fulfilling</span>':'<span class="bbx-avail in">Delivered</span>';}
    h.innerHTML='<h3 class="bbx-h" style="margin-top:0">Orders</h3>'+tableWrap(['Order','Customer','Products','Value','Delivery','Status'],S.orders.map(function(o){var v=o.lines.reduce(function(s,l){return s+findP(l.sku).price*l.qty;},0);return '<tr><td class="mono">'+o.id+'</td><td><b>'+findC(o.cust).name+'</b></td><td>'+o.lines.map(function(l){return findP(l.sku).name+' <span class="mono soft">×'+l.qty+'</span>';}).join('<br>')+'</td><td class="num">'+money(v)+'</td><td class="soft">'+o.eta+'</td><td>'+chip(o.status)+'</td></tr>';}));
  },
  customers:function(h){
    h.innerHTML='<h3 class="bbx-h" style="margin-top:0">Customer directory</h3>'+tableWrap(['Customer','Sector','RFQs','Orders','Open pipeline'],CUST.map(function(c){var rfqs=S.rfqs.filter(function(r){return r.cust===c.id;});var ords=S.orders.filter(function(o){return o.cust===c.id;});var pv=rfqs.filter(function(r){return r.stage!=='won';}).reduce(function(s,r){return s+rfqVal(r);},0);return '<tr><td><span class="bbx-crow"><span class="bbx-crow-av">'+c.init+'</span><b>'+c.name+'</b></span></td><td class="soft">'+c.sector+'</td><td class="num">'+rfqs.length+'</td><td class="num">'+ords.length+'</td><td class="num">'+money(pv)+'</td></tr>';}));
  },
  catalogue2:function(h){
    h.innerHTML='<div class="bbx-toolbar"><div class="bbx-count">'+PRODUCTS.length+' products · <a class="bbx-fine" style="text-decoration:underline" href="catalogue.html">open public catalogue →</a></div></div>'+
      tableWrap(['SKU','Product','Category','From','Stock','Status'],PRODUCTS.map(function(p){return '<tr><td class="mono">'+p.sku+'</td><td><b>'+p.name+'</b> <span class="bbx-formula">'+p.formula+'</span></td><td class="soft">'+CATS[p.cat].name+'</td><td class="num">'+money2(p.price)+'/'+p.unit+'</td><td class="num">'+p.stock.toLocaleString()+' '+p.unit+'</td><td>'+availChip(p.avail)+'</td></tr>';}));
  },
  sourcing:function(h){
    h.innerHTML='<h3 class="bbx-h" style="margin-top:0">Sourcing requests</h3>'+(S.sourcing.length?tableWrap(['Ref','Customer','Material','Quantity','Grade / application','Location'],S.sourcing.map(function(s){return '<tr><td class="mono">'+s.id+'</td><td><b>'+findC(s.cust).name+'</b></td><td>'+s.chem+'</td><td>'+s.qty+'</td><td class="soft">'+s.app+'</td><td class="soft">'+s.loc+'</td></tr>';})):'<div class="bbx-card bbx-empty sm">No open sourcing requests. They arrive here when a customer uses “Request a material”.</div>');
  },
  reports:function(h){
    h.innerHTML='<div class="bbx-panels2">'+panelBars('Pipeline by category',pipeByCat())+panelReps()+'</div>'+
      '<div class="bbx-panels2">'+panelHiVal()+panelLost()+'</div>'+
      '<div class="bbx-panels2">'+'<div class="bbx-panel"><h4>Top requested materials</h4>'+topChem()+'</div>'+'<div class="bbx-panel"><h4>Intelligence</h4>'+
        insight('Which customers haven’t ordered in 90 days?','<b>Colcom Foods</b> and <b>PPC Zimbabwe</b> — both historically $40k+/quarter. Suggest a re-engagement call.')+
        insight('Which quotations are most likely to close?','<b>QT-2291 (Harare Water)</b> — repeat buyer, priced in range, 82% predicted win.')+
        insight('What’s repeatedly requested but out of stock?','<b>Anionic Flocculant</b> — 4 RFQs this month, currently low stock. Recommend restocking.')+
      '</div></div>'+
      '<div class="bbx-admin-foot"><button class="btn btn--line btn--sm" onclick="BB.resetDemo()">'+svg(IC.repeat,14)+' Reset demo data</button></div>';
  }
};
/* ---- PORTAL views ---- */
function myRfqs(){return S.rfqs.filter(function(r){return r.cust===SESSION.custId;});}
function myQuotes(){return S.quotes.filter(function(q){return q.cust===SESSION.custId;});}
function myOrders(){return S.orders.filter(function(o){return o.cust===SESSION.custId;});}
var PORTAL_VIEWS={
  overview:function(h){
    var open=myRfqs().filter(function(r){return r.stage!=='won'&&r.stage!=='fulfil';}).length;
    var trans=myOrders().filter(function(o){return o.status==='transit'||o.status==='fulfilling';}).length;
    h.innerHTML='<div class="bbx-tiles">'+tile('Open RFQs',open,'awaiting quotation')+tile('Quotations',myQuotes().length,'awaiting your decision')+tile('Orders in transit',trans,'live deliveries')+tile('Documents',9,'SDS · invoices · certs')+'</div>'+
      (myQuotes().length?'<h3 class="bbx-h">Quotations awaiting your decision</h3>'+PORTAL_VIEWS._quotesTable():'')+
      '<h3 class="bbx-h">Recent activity</h3>'+tableWrap(['RFQ','Products','Est. value','Stage','Raised'],myRfqs().slice(0,6).map(function(r){var st=STAGES.filter(function(s){return s.k===r.stage;})[0];return '<tr><td class="mono">'+r.id+'</td><td>'+r.lines.length+' · '+r.lines.map(function(l){return findP(l.sku).name;}).slice(0,2).join(', ')+'</td><td class="num">'+money(rfqVal(r))+'</td><td><span class="bbx-stage">'+st.t+'</span></td><td class="soft mono">'+r.created+'</td></tr>';}));
  },
  rfqs:function(h){
    h.innerHTML='<div class="bbx-toolbar"><div class="bbx-count">'+myRfqs().length+' RFQs</div><a class="btn btn--primary btn--sm" href="catalogue.html">'+svg(IC.plus,15)+' New RFQ</a></div>'+
      tableWrap(['RFQ','Products','Est. value','Stage','Raised'],myRfqs().map(function(r){var st=STAGES.filter(function(s){return s.k===r.stage;})[0];return '<tr><td class="mono">'+r.id+'</td><td>'+r.lines.map(function(l){return findP(l.sku).name+' <span class="mono soft">×'+l.qty+'</span>';}).join('<br>')+'</td><td class="num">'+money(rfqVal(r))+'</td><td><span class="bbx-stage">'+st.t+'</span></td><td class="soft mono">'+r.created+'</td></tr>';}));
  },
  quotations:function(h){
    h.innerHTML='<h3 class="bbx-h" style="margin-top:0">Quotations</h3>'+(myQuotes().length?PORTAL_VIEWS._quotesTable():'<div class="bbx-card bbx-empty sm">No open quotations right now.</div>');
  },
  _quotesTable:function(){return tableWrap(['Quote','Products','Total','Status',''],myQuotes().map(function(q){var t=quoteTotal(q);return '<tr><td class="mono">'+q.id+'</td><td>'+q.lines.map(function(l){return findP(l.sku).name;}).join(', ')+'</td><td class="num">'+money(t.total)+'</td><td><span class="bbx-avail in">Received</span></td><td class="ar"><button class="btn btn--line btn--sm" onclick="BB.viewQuote(\''+q.id+'\')">View</button> <button class="btn btn--primary btn--sm" onclick="BB.acceptQuote(\''+q.id+'\')">Accept</button></td></tr>';}));},
  orders:function(h){
    function chip(s){return s==='transit'?'<span class="bbx-avail in">In transit</span>':s==='fulfilling'?'<span class="bbx-avail low">Fulfilling</span>':'<span class="bbx-avail in">Delivered</span>';}
    h.innerHTML='<h3 class="bbx-h" style="margin-top:0">Orders</h3>'+tableWrap(['Order','Products','Value','Delivery','Status',''],myOrders().map(function(o){var v=o.lines.reduce(function(s,l){return s+findP(l.sku).price*l.qty;},0);return '<tr><td class="mono">'+o.id+'</td><td>'+o.lines.map(function(l){return findP(l.sku).name+' <span class="mono soft">×'+l.qty+'</span>';}).join('<br>')+'</td><td class="num">'+money(v)+'</td><td class="soft">'+o.eta+'</td><td>'+chip(o.status)+'</td><td class="ar"><button class="btn btn--line btn--sm" onclick="BB.reorder(\''+o.id+'\')">'+svg(IC.repeat,13)+' Re-order</button></td></tr>';}));
  },
  documents:function(h){
    var docs=[];myOrders().forEach(function(o){docs.push({t:'Invoice '+o.id,s:findC(o.cust).name+' · '+o.created,k:'Invoice'});o.lines.forEach(function(l){docs.push({t:'SDS — '+findP(l.sku).name,s:findP(l.sku).sku+' · Rev 4',k:'SDS'});});});
    var seen={};docs=docs.filter(function(d){if(seen[d.t])return false;seen[d.t]=1;return true;});
    h.innerHTML='<h3 class="bbx-h" style="margin-top:0">Documents</h3><div class="bbx-doclist">'+docs.map(function(d){return '<div class="bbx-doc"><span class="bbx-doc-ic">'+svg(IC.file,18)+'</span><div class="bbx-doc-t"><b>'+d.t+'</b><span>'+d.s+'</span></div><span class="bbx-doc-k">'+d.k+'</span><button class="btn btn--line btn--sm" onclick="BB.toast(\'Download started (demo)\')">Download</button></div>';}).join('')+'</div>';
  }
};

/* ------------------------------------------------ boot */
document.addEventListener('DOMContentLoaded',function(){var p=document.body.getAttribute('data-page');mountHeader();if(p&&(p==='admin'||p==='portal'||document.getElementById('bbx-root')))BB.page(p);});
window.addEventListener('hashchange',function(){var p=document.body.getAttribute('data-page');if((p==='admin'||p==='portal')&&document.getElementById('bbx-view'))renderShellView(p,(location.hash||'').replace('#',''));});
mountHeader();
})();
