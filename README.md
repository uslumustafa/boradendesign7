# Boraden Design 7

Yeni kurumsal site. İçerik kaynağı Design 6; tasarım ve sayfa üretimi sıfırdan hazırlanmıştır. Kişi profilleri veya tek kişilik portreler içermez.

Node.js 20 veya sonrası yeterlidir. Haricî paket kurulumu gerekmez.

```sh
npm run build
npm run check
npm start
```

Önizleme: http://127.0.0.1:4177/. Yerel sunucu yalnız bilgisayardan erişilir ve daima `noindex` başlığı gönderir.

## Yapı

- `data/content.json`: kurumsal bilgiler, hizmetler, yayınlar ve resmî kaynaklar.
- `data/archive.json`: 247 tarihî sirkülerin belge bilgileri.
- `data/photos.json`: seçilmiş kurumsal fotoğrafların kaynak kaydı.
- `src/site.mjs`: ortak sayfa düzeni, semantik HTML ve yapılandırılmış veri.
- `src/build.mjs`: bağımsız statik site, sitemap ve robots üretimi.
- `public/`: hareket, erişilebilir etkileşimler, hesaplamalar ve optimize edilmiş varlıklar.
- `check.mjs`: içerik, bağlantı, meta veri, arama ve hesaplama kontrolleri.

Ana sayfa büyük fotoğraf açılışı, altı uzmanlık kartı, kurumsal yaklaşım, yayınlar ve bilgi araçları, sorular ve iletişimden oluşur. Lacivert, kobalt ve yeşil vurgu; güçlü Manrope başlıklar ve gerçek kurumsal fotoğraflar kullanılır. İç sayfalarda aynı navigasyon ve kart dili; hizmetlerde bölüm menüsü, kapsam panelleri ve görüşme alanı bulunur.

Ortak stil `public/style.css`; ana sayfa `public/home.css`, iç sayfalar `public/interior.css` dosyasındadır. Her sayfa yalnız ilgili stil dosyasını yükler. Haricî animasyon veya arayüz paketi yoktur: kart ışığı ve sınırlı derinlik CSS/Pointer Events, geniş hizmet menüsü HTML details, mobil menü ve arama HTML dialog ile çalışır.

Açılışta üç kurumsal sahne yedi saniye arayla değişir; metinli sahne seçimi ve durdurma düğmeleri bulunur. Hareket; sayfa gizlendiğinde, açılış ekran dışında kaldığında veya menü/arama açıldığında durur. Azaltılmış hareket tercihi ve klavye odakları desteklenir. JavaScript olmadan ilk fotoğraf sabit kalır ve içerik okunur. Arşivde arama/yıl filtresiyle 12 belge gösterilir; JavaScript kapalıyken 247 özgün belge bağlantısı okunabilir. Metinler animasyon beklerken gizlenmez. Özgün Boraden logosu ve favicon korunur.

## Yayına hazırlık

Varsayılan çıktı önizlemedir. Onaylı gerçek alan adıyla indekslenebilir çıktı:

```sh
SITE_ORIGIN=https://boraden.com.tr SITE_INDEXABLE=1 npm run build
```

`dist/` statik sunucuya yüklenir. Sunucu bilinmeyen adresleri `404.html` ile **404 durum kodu** olarak sunmalıdır. Sitemap ve canonical aynı alan adını kullanır. Alan adı bu komutta açıkça ayarlanır; kod GitHub’a kaydedildiğinde otomatik canlı yayına geçmez. Üretim sunucusunda HTTPS, yönlendirme kuralları ve güvenlik başlıkları ayrıca uygulanır.

SEO/GEO: JavaScript olmadan okunabilen ana içerik, açık kurum bilgileri, kaynak bağlantıları, doğru tarih kullanımı, Organization/WebSite/WebPage/Service/Article/BreadcrumbList verileri. Gizli metin, uydurma müşteri sayısı, sahte değerlendirme ve doğrulanmamış yayın tarihi yoktur. Arama sıralaması veya yapay zekâ görünürlüğü garanti edilmez. Google’ın AI özellikleri için özel dosya veya ayrı şema gerekmiyor: https://developers.google.com/search/docs/appearance/ai-features

Hesaplamalar Design 6’daki sayısal mantığı kullanır. 2026 parametreleri 1 Ekim 2026’da GİB, ÇSGB ve SGK kaynaklarıyla kontrol edilmiştir. Yıl değişiminde profesyonel parametre kontrolü gerekir. Kullanıcı girdileri tarayıcıdan çıkmaz. İletişim/kariyer için e-posta ve telefon bağlantıları kullanılır; çalışan bir başvuru sunucusu veya e-posta teslim sistemi olduğu iddia edilmez.

Fotoğraflar kullanıcının `boradenphoto` arşivinden seçilmiştir; orijinaller değiştirilmez. Web sürümleri WebP olarak ölçeklenmiştir. Sadece toplantı, el sıkışma, belge çalışması ve ofis sahneleri kullanılır. Tipografi: ana tasarım Manrope kullanır; mevcut yerel Manrope ve Instrument Serif varlıkları korunur.

Tasarım referansları: https://www.youtube.com/watch?v=39IlNR-P3-Q ve kullanıcının beş Dribbble örneği. Somut gözlemler ve uygulamalar [DESIGN_REFERENCES.md](DESIGN_REFERENCES.md) içinde kayıtlıdır. Büyük fotoğraf kartları, asimetrik uzmanlık düzeni, belirgin içerik grupları ve içerikle bağlantılı geçişler kullanılır; referans görselleri kopyalanmamıştır. Jev, tasarım seçeneklerini sınıflandırmada ve 953 ayrı metin parçasının yazım kontrolünde yardımcı olarak kullanılmıştır.

Özgün marka varlıkları: https://boraden.com.tr/upload/logo.png ve https://boraden.com.tr/favicon-96x96.png . Tam logo şeffaf zeminde beyaz yazı içerir; koyu başlık, menü ve alt bilgide doğal oranıyla kullanılır.
