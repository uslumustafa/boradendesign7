# Doğrulama — 1 Ekim 2026

Ana sayfa tam genişlikte üç fotoğraf sahnesi, büyük sans/serif başlıklar, lacivert–kobalt–turuncu palet, altı alandan seçilen hizmet paneli, kısa yayın bölümü ve iletişimle yeniden kuruldu. Özgün logo, favicon, kurumsal bilgiler, belgeler ve hesaplama mantığı korundu. Kişi profili veya portre eklenmedi. Referans gözlemleri DESIGN_REFERENCES.md içinde kayıtlıdır.

`npm run check`: 5 kontrol geçti, 0 hata. 85 içerik sayfası ve 404, 47 hizmet, 6 uzmanlık grubu, 12 yayın ve 247 belge; bağlantılar, görseller, fontlar, tek H1, Türkçe dil, meta veri, canonical, yapılandırılmış veri ve benzersiz kimlikler doğrulandı. Türkçe arama, filtreli arşiv sayfalama sınırları, hesaplamalar, geçersiz girdiler ve sunucu güvenlik kontrolleri geçti. Önizleme indekslenmez; üretimde indeksleme açıkça etkinleştirilir.

Gerçek tarayıcı kontrolleri:

- Ana sayfa 320 × 740: 2.834 piksel; 390 × 844: 2.900 piksel; 1280 × 720: 2.527 piksel. Test edilen mobil açılışlar dört ekran uzunluğunun altında kaldı. Sayfa kaydırması bir animasyonu tamamlamaya bağlanmadı.
- Bu boyutlarda yatay taşma görülmedi. 320 pikselde ana başlığın ölçülen genişliği 274 piksel; 390 pikselde 344 piksel ve başlık her iki boyutta sığdı. Ana görseller ve özgün logo görsel olarak incelendi.
- Sahne düğmeleri yalnız bir etkin fotoğraf gösterdi; ikinci sahne seçimi 02 / 03, iki ileri hareketi 01 / 03 gösterdi. Durdurma etkin haldeyken elle sahne seçimi çalıştı ve fotoğraf hareketi durdu.
- Mobil menü açıkken fotoğraf hareketi durdu; Escape ile kapandı, odak açan düğmeye döndü ve hareket yeniden başladı. Açılış ekran dışında kaldığında fotoğraf hareketi durdu.
- Danışmanlık seçimi yalnız ilgili hizmet panelini gösterdi. Native radio seçimi korunur; klavye oklarıyla alan değiştirme önceki tarayıcı doğrulamasında kontrol edildi.
- Masaüstünde yayınlar, kaynak bağlantıları, hizmet fotoğrafı/metni ve iletişim bandı incelendi. İlgili ayrıntı sayfalarının içeriği korunur.

Hareket koşulu için çalışan kontrol: durdurma, gizli sayfa, açık iletişim penceresi ve yüzde 20 görünürlük sınırı. Yüzde 19’da hareket kapalı, yüzde 20’de diğer koşullar uygunsa açık. Bağımsız Codex incelemesinde fotoğrafın geçişte ölçek atlaması, ekran dışı/menü durumunda CSS hareketinin sürmesi ve hizmet numaralarının kontrastı düzeltildi. Turuncu düğmede lacivert metin kontrastı 6,96:1; kobalt zeminde beyaz metin 6,59:1. İşletim sistemi hareket tercihi ayrıca taklit edilmedi; azaltılmış hareket CSS/JavaScript kuralları incelendi. JavaScript olmadan ilk sahnenin sürekli hareketi devre dışıdır.

Korunan arşiv davranışı önceki tarayıcı doğrulamasında kontrol edildi: HTML içinde 247 belge bağlantısı, aynı anda 12 görünür belge, 21 sayfa, arama/yıl filtresinde sayfa sıfırlama ve sıfır sonuçta kapalı ileri/geri düğmeleri. Bu sürümde arşiv mantığı değiştirilmedi; ilgili otomatik kontroller yeniden geçti.

Bu kayıt canlı alan adı yayını, sıralama garantisi veya tüm cihaz/tarayıcı birleşimlerinin testi anlamına gelmez.
