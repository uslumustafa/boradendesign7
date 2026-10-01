# Doğrulama — 1 Ekim 2026

Beş yeni Dribbble referansı görselleriyle incelendi; OneText ana tasarım yönü olarak kullanıldı. Lacivert açılış, mavi ışık, katmanlı gerçek fotoğraflar, cam etkili menü, kısa sans başlıklar ve doğal radio alanlarıyla seçilen hizmet paneli uygulandı. Ortak iç sayfa başlıkları kısa fotoğraf/metin düzenine geçirildi. Özgün logo ve favicon değişmedi; kişi profili veya portre eklenmedi. Gözlemler DESIGN_REFERENCES.md içinde kayıtlıdır.

`npm run check`: 5 kontrol geçti, 0 hata. 85 içerik sayfası ve 404, 47 hizmet, 6 uzmanlık grubu, 12 yayın ve 247 belge; bağlantılar, görseller, fontlar, tek H1, Türkçe dil, meta veri, canonical, yapılandırılmış veri ve benzersiz kimlikler doğrulandı. Türkçe arama, filtreli arşiv sayfalama sınırları, hesaplamalar, geçersiz girdiler ve sunucu güvenlik kontrolleri geçti. Önizleme indekslenmez; üretimde indeksleme açıkça etkinleştirilir.

Gerçek tarayıcı kontrolleri:

- Ana sayfa 406 × 844: 2.698 piksel; 390 × 844: 2.692 piksel; 1280 × 800: 2.109 piksel. İlk uzun sürüm 406 piksel genişlikte 9.734 pikseldi.
- Bu boyutlarda yatay taşma görülmedi. Yüklenen ana görsellerde kırık dosya görülmedi. Logo oranı, toplantı fotoğrafı, el sıkışma kartı ve hizmet paneli görsel olarak incelendi.
- Hizmet seçimi tek panel gösterir. Danışmanlık seçimi ve klavyeyle sağ ok kullanarak insan kaynaklarına geçiş doğrulandı.
- Mobil menü açılır, Escape ile kapanır ve odak açan düğmeye döner. Türkçe karakter kullanmadan şirket değerlemesi araması iki doğru sonuç verdi.
- Hareket durdurma düğmesi ilk ekranın üç animasyonunu da durdurdu. İşletim sistemi tercihi ayrıca taklit edilmedi; azaltılmış hareket CSS kuralları incelendi.
- Arşivde 247 bağlantı HTML içinde korunur, aynı anda 12 belge görünür. Sonraki sayfa 2 / 21 gösterdi; 2022/13 araması tek belgeye dönüp 1 / 1 gösterdi. 2021 yıl filtresi bu aramada sıfır sonuç ve kapalı ileri/geri düğmeleri verdi.
- Arşiv 390 piksel genişlikte taşmadan çalıştı. Arama/yıl filtresi değiştiğinde sayfa sıfırlanır. JavaScript kapalıyken tüm belge bağlantıları erişilebilir.

Bağımsız Codex incelemesinin bulduğu açık mavi düğmelerdeki metin kontrastı koyu lacivert yazıyla düzeltildi. Native radio erişilebilirliği, arşiv sınırları ve hareket durdurma kuralları incelemeden geçti. Özgün PDF içerikleri ve hesaplama mantığı değişmedi.

Bu kayıt canlı alan adı yayını, sıralama garantisi veya tüm cihaz/tarayıcı birleşimlerinin testi anlamına gelmez.
