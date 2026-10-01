# Doğrulama — 1 Ekim 2026

Ana sayfa büyük fotoğraf kartı, altı asimetrik uzmanlık kartı, yaklaşım ilkeleri, yayınlar ve kaynak araçları, sorular ve iletişimle yeniden kuruldu. Lacivert, kobalt ve yeşil vurgu; Manrope başlıklar ve aynı dili kullanan iç sayfa panelleri uygulandı. Geniş hizmet menüsü eklendi, dekoratif oklar kaldırıldı. Özgün logo, favicon, kurumsal bilgiler, belgeler ve hesaplama mantığı korundu. Referans gözlemleri DESIGN_REFERENCES.md içinde kayıtlıdır.

`npm run check`: 5 kontrol geçti, 0 hata. 85 içerik sayfası ve 404, 47 hizmet, 6 uzmanlık grubu, 12 yayın ve 247 belge; bağlantılar, görseller, fontlar, tek H1, Türkçe dil, meta veri, canonical, yapılandırılmış veri ve benzersiz kimlikler doğrulandı. Türkçe arama, filtreli arşiv sayfalama sınırları, hesaplamalar, geçersiz girdiler ve sunucu güvenlik kontrolleri geçti. Önizleme indekslenmez; üretimde indeksleme açıkça etkinleştirilir.

Gerçek tarayıcı kontrolleri:

- Ana sayfa 320 × 740, 390 × 844, 406 × 844 ve 1280 × 720 boyutlarında incelendi; ölçülen yatay taşma sıfırdı. Sayfa doğal içerik akışıyla uzar; sabitlenmiş animasyon veya dört ekran sınırı kullanılmaz.
- Özgün logo, başlıklar, gerçek toplantı fotoğrafı, uzmanlık kartları ve yayın kapakları görsel olarak incelendi. Yayın kapağının kartı tam doldurmaması düzeltildi; kategori/tarih 12px, açıklama 14px olarak doğrulandı.
- Durdurma etkin haldeyken elle sahne seçimi çalıştı; yalnız bir sahne etkin ve görünürdü. Üç fotoğrafın CSS hareketi durdu. Açılış ekran dışında kaldığında hareket durdu.
- Altı alanlı masaüstü hizmet menüsü açıldı; fotoğraf hareketi durdu. Escape menüyü kapattı. Mobil dialog menüsü Escape ile kapandı, odak açan düğmeye döndü ve fotoğraf hareketi yeniden başladı.
- Mobil aramada büyük harfli `DEĞERLEME` iki doğru sonuç verdi; hizmet sonucuna tıklama Şirket Değerlemesi ayrıntısını açtı. Hizmet sayfasında 390px genişlikte yatay taşma sıfırdı.
- Masaüstünde Bağımsız Denetim sayfasının fotoğrafı, içerik panelleri, sabit bölüm menüsü, kapsam accordionları ve görüşme paneli incelendi. Bölüm bağlantısı hedefi sabit menünün altında görünür kaldı. Yayın dizini ve makale görünümü bağımsız Codex incelemesinden geçti.
- Bir ilke kartında fare konumu değişkenleri ve ışık katmanı gerçek tarayıcıda gözlendi. Yayın kartının dış odak çizgisini kırpan taşma kuralı, içte görünen klavye odak çizgisiyle düzeltildi.
- Mobil KDV formunda 1.000 TL, %20 ve KDV hariç girdileri 200 TL KDV ve 1.200 TL toplam verdi; hata mesajı boştu ve sayfada yatay taşma görülmedi. Diğer hesaplamaların mevcut otomatik kontrolleri geçti.

Hareket koşulu için çalışan kontrol: durdurma, gizli sayfa, açık menü/arama ve yüzde 20 görünürlük sınırı. Yüzde 19’da hareket kapalı, yüzde 20’de diğer koşullar uygunsa açık. Yeni kart ışığı kontrolü merkez, sıfır boyut ve kart dışı konumları kapsar; yüzdeler 0–100, eğim en çok ±2 derecedir. İşletim sistemi hareket tercihi ayrıca taklit edilmedi; azaltılmış hareket CSS/JavaScript kuralları incelendi. JavaScript olmadan ilk sahnenin sürekli hareketi devre dışıdır. Kart eğimi yalnız fareli ve hover destekli ekranda kullanılır.

Arşiv davranışı bu sürümde mobil tarayıcıda yeniden kontrol edildi: HTML içinde 247 belge bağlantısı, aynı anda 12 görünür belge ve 21 sayfa. Sonraki sayfadan sıfır sonuçlu aramaya geçiş 1 / 1 gösterdi ve iki gezinme düğmesini kapattı. 2022 yıl filtresi 14 belge ve 1 / 2 gösterdi; sayfa sıfırlandı. Hesaplama input/select alanları ve özgün PDF bağlantıları önceki sürümle karşılaştırıldı; değerleri ve hedefleri korunur.

Jev ile 953 benzersiz metin parçası yazım/dil bilgisi ve yanlış kelime tekrarı için tarandı; 0,70 eşikte işaretlenen sonuç çıkmadı. Codex görsel incelemede mobil satır kırılmasının iki kelimeyi birleştirdiğini yakalayıp düzeltti. Bu tarama hatasızlık garantisi değildir.

Dosya incelemesi: ana sayfa ve iç sayfa CSS dosyaları ayrı ve yalnız ilgili sayfada yüklenir. Yeni paket eklenmedi. Eski açılış stilleri ve kullanılmayan parallax döngüsü kaldırıldı. Diff, yeni dosyalar, şablon kimlikleri, CSS ve JS; iki bağımsız Codex incelemesiyle kontrol edildi.

Bu kayıt canlı alan adı yayını, sıralama garantisi veya tüm cihaz/tarayıcı birleşimlerinin testi anlamına gelmez.
