import {vehicleSchedule} from './vehicle-core.js';
const form=document.querySelector('#calculator-form');
const result=document.querySelector('#calc-result');
const error=document.querySelector('#calc-error');
const money=n=>new Intl.NumberFormat('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2}).format(n)+' TL';
const row=(label,value)=>`<div><dt>${label}</dt><dd>${money(value)}</dd></div>`;
const C=window.BoradenCalc;
form.addEventListener('submit',event=>{
  event.preventDefault();error.textContent='';
  const fields=form.elements;
  try {
    if(form.dataset.mode==='vat') {
      const r=C.vat(fields.amount.value,fields.rate.value,fields.included.value==='included');
      result.innerHTML=`<h2>${money(r.total)}</h2><p>KDV DÂHİL TOPLAM</p><dl>${row('KDV hariç tutar',r.net)}${row('%'+r.rate+' KDV',r.tax)}</dl>`;
    } else if(form.dataset.mode==='income') {
      const r=C.income(fields.amount.value,fields.kind.value==='wage');
      result.innerHTML=`<h2>${money(r.tax)}</h2><p>HESAPLANAN GELİR VERGİSİ</p><dl>${row('Vergi matrahı',r.base)}${row('Tarife sonrası kalan',r.after)}</dl><div class="calc-table"><table><caption>2026 vergi dilimleri</caption><thead><tr><th scope="col">Oran</th><th scope="col">Dilime giren</th><th scope="col">Vergi</th></tr></thead><tbody>${r.rows.map(x=>`<tr><th scope="row">%${x.rate*100}</th><td>${money(x.base)}</td><td>${money(x.tax)}</td></tr>`).join('')}</tbody></table></div>`;
    } else if(form.dataset.mode==='salary') {
      const r=(fields.direction.value==='gross'?C.salary:C.grossForNet)(fields.amount.value,Number(fields.month.value),fields.previous.value);
      result.innerHTML=`<h2>${money(fields.direction.value==='gross'?r.net:r.gross)}</h2><p>${fields.direction.value==='gross'?'AYLIK NET ÜCRET':'HESAPLANAN BRÜT ÜCRET'}</p><dl>${row('Brüt ücret',r.gross)}${row('SGK işçi payı',r.sgk)}${row('İşsizlik sigortası',r.unemployment)}${row('Gelir vergisi matrahı',r.base)}${row('Hesaplanan gelir vergisi',r.calculated)}${row('Asgari ücret vergi istisnası',r.exemption)}${row('Kesilecek gelir vergisi',r.tax)}${row('Damga vergisi',r.stamp)}${row('Net ücret',r.net)}${row('Yeni kümülatif matrah',r.cumulative)}</dl>`;
    } else {
      const r=vehicleSchedule({cost:fields.cost.value,month:fields.month.value,kind:fields.kind.value});
      result.innerHTML=`<h2>${money(r.eligible)}</h2><p>GİDER KABUL EDİLEN AMORTİSMAN MATRAHI</p><dl>${row('Alış yılı sınırı',r.limit)}${row('Girilen maliyet',r.cost)}</dl><div class="calc-table" tabindex="0" role="region" aria-label="Amortisman planı"><table><caption>2026 alışı için normal amortisman planı</caption><thead><tr><th scope="col">Yıl</th><th scope="col">Amortisman</th><th scope="col">Gider kabul edilen</th><th scope="col">KKEG</th></tr></thead><tbody>${r.rows.map(x=>`<tr><th scope="row">${x.year}</th><td>${money(x.book)}</td><td>${money(x.deductible)}</td><td>${money(x.disallowed)}</td></tr>`).join('')}</tbody></table></div><p>KKEG: Kanunen kabul edilmeyen gider. İlk yıl ay kesri tam ay sayılır; kalan ilk yıl payı son yılda tamamlanır. Alış yılı sınırı sonraki yıllarda yükseltilmez.</p>`;
    }
  } catch(err) {error.textContent=err.message;result.textContent='Girdileri kontrol ederek yeniden hesaplayın.';}
});
form.addEventListener('input',()=>{error.textContent='';result.textContent='Girdiler değişti. Yeni sonuç için Hesapla’ya basın.';});
