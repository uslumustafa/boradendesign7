# Doğrulama — 1 Ekim 2026

Kullanıcının uzunluk, logo ve soluk renk geri bildiriminden sonra ana sayfa yeniden düzenlendi. Sabitlenen üç sahne ve tekrar eden tanıtım bölümleri kaldırıldı; tek açılış, altı uzmanlık bağlantısı, yayınlar/bilgi kısayolları ve kısa iletişim bölümü kaldı. Koyu lacivert başlık, canlı mavi açılış ve turuncu iletişim alanı kullanılır. Özgün logo ve favicon dosyaları korunmuş oranlarıyla gösterilir; logo resmi kaynakla birebir eşleşir.

`npm run check`: 5 kontrol geçti, 0 hata. 85 içerik sayfası ve 404, 47 hizmet, 6 uzmanlık grubu, 12 yayın ve 247 belge; bağlantılar, görseller, fontlar, tek H1, Türkçe dil, meta veri, canonical, yapılandırılmış veri ve benzersiz kimlikler doğrulandı. Türkçe arama, hesaplamalar, geçersiz girdiler, sunucu yöntemleri/yönlendirmeleri ve güvenlik kontrolleri geçti. Önizleme indekslenmez; üretimde indeksleme açıkça etkinleştirilir.

Tarayıcıda yeni ana sayfa:

- 406 × 844: önceki 9.734 piksel yerine 2.481 piksel; yaklaşık %75 kısalma.
- 390 × 844: 2.510 piksel. Menü, Escape ile odak dönüşü, logo oranı, fotoğraf çerçeveleri ve tam sayfa görünümü kontrol edildi.
- 1280 × 800: 2.224 piksel. Başlık, açılış ve bölüm yerleşimleri incelendi.
- Bu görünümlerde yatay taşma ve kırık görsel görülmedi. Türkçe karakter kullanmadan şirket değerlemesi araması iki doğru sonuç verdi. Hizmet detayının ortak görünümü ayrıca incelendi.

Azaltılmış hareket CSS ile desteklenir; uzun sahne akışı artık yoktur. Hareket durdurma düğmesi önceki sürümde denenmişti; yeni kodda sahneye ait davranış kaldırılmıştır. İşletim sistemi tercihi ayrıca taklit edilmedi.

Özgün PDF içerikleri değişmedi. Önceki doğrulamada örnek PDF indirildi, sayfa açık kaldı ve dosyanın özgün belgeyle birebir aynı olduğu görüldü. Hesaplamalar 2026 kapsamındadır.

Değişen kod ve yeni marka varlıkları incelendi; bağımsız Codex incelemesinde somut regresyon bulunmadı. `git diff --check` temizdir. Bu kayıt canlı alan adı yayını, sıralama garantisi veya tüm cihaz/tarayıcı birleşimlerinin testi anlamına gelmez.
