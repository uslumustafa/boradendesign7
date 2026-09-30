import {readFileSync} from 'node:fs';

export const content = JSON.parse(readFileSync(new URL('../data/content.json', import.meta.url), 'utf8'));
export const archive = JSON.parse(readFileSync(new URL('../data/archive.json', import.meta.url), 'utf8'));
export const kinds = {
  blog: {path: 'blog', name: 'Bakış Açısı'},
  news: {path: 'haberler', name: 'Haberler'},
  circulars: {path: 'sirkuler', name: 'Sirküler'},
  announcements: {path: 'duyurular', name: 'Duyurular'}
};
export const publications = Object.entries(kinds).flatMap(([kind, info]) =>
  (content.publications[kind] || []).filter(p => p.status === 'published').map(p => ({...p, kind, path: `/${info.path}/${p.id}/`}))
);
export const groupPath = g => `/hizmetler/alan/${g.id}/`;
export const servicePath = s => `/hizmetler/${s.id}/`;
export const servicePhotos = {vergi: 'table', denetim: 'signing', danismanlik: 'partnership', insan: 'meeting', sistem: 'working', akademi: 'office'};
export const photoAlts = {
  handshake: 'Toplantı masasında iki kişinin el sıkışması',
  meeting: 'Boraden toplantı odasında birlikte çalışan ekip',
  signing: 'Toplantı sırasında belgeler üzerinde birlikte çalışan katılımcılar',
  partnership: 'Toplantı odasında el sıkışan iki kişi',
  table: 'Belgeler, hesap makineleri ve bilgisayarlarla üzerinde çalışılan toplantı masası',
  office: 'Boraden ofisinde birlikte çalışan ekip',
  working: 'Toplantı masasındaki belge ve çalışma detayları'
};
export const dateTR = value => value && Number.isFinite(Date.parse(value)) ? new Intl.DateTimeFormat('tr-TR', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'}).format(new Date(value)) : 'Tarih belirtilmemiştir.';
export const calculatorPages = [
  {id: 'kdv', mode: 'vat', title: 'KDV Hesaplama', description: 'KDV dâhil veya hariç tutardan %1, %10 ve %20 oranlarıyla vergi ve toplam tutarı hesaplayın.'},
  {id: 'gelir-vergisi', mode: 'income', title: 'Gelir Vergisi Hesaplama', description: '2026 gelir yılı tarifesiyle ücret veya ücret dışı vergi matrahını dilimlere göre hesaplayın.'},
  {id: 'brut-net-maas', mode: 'salary', title: 'Brüt ve Net Ücret Hesaplama', description: '2026 standart ücret parametreleriyle brütten nete veya netten brüte ön hesap yapın.'},
  {id: 'binek-otomobil-amortismani', mode: 'vehicle', title: 'Binek Otomobil Amortismanı', description: '2026 alış yılı için normal amortisman, kıst uygulaması ve gider sınırlarını inceleyin.'}
];
