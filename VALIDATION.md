# Doğrulama — 1 Ekim 2026

Ana sayfaya gerçek Design 6 kaynağından Türkiye merkezli gece küresi, ORBIST adı/İngiltere etiketi ve Dünyadan Perspektifler geri alındı. Küre ikinci ana sahnedir; 14 okuma notu portresiz dünya motifli kartlarla ve ayrı detay sayfalarıyla sunulur. Mevcut büyük fotoğraf açılışı, altı asimetrik uzmanlık kartı, iç sayfa dili, yayınlar, araçlar, 247 belge ve hesaplama mantığı korunur. Referans gözlemleri DESIGN_REFERENCES.md içinde kayıtlıdır.

`npm run check`: 5 kontrol geçti, 0 hata. 100 içerik sayfası ve 404, 47 hizmet, 6 uzmanlık grubu, 12 yayın, 14 perspektif ve 247 belge; bağlantılar, görseller, fontlar, tek H1, Türkçe dil, meta veri, canonical, yapılandırılmış veri ve benzersiz kimlikler doğrulandı. Perspektiflerin Article citation alanları ve tarih sınırları kontrol edilir. Türkçe arama, filtreli arşiv sayfalama sınırları, hesaplamalar, geçersiz girdiler ve sunucu güvenlik kontrolleri geçti. Önizleme indekslenmez; üretimde indeksleme açıkça etkinleştirilir.

## Dünya ve perspektifler: son kontroller

- Masaüstünde 1280 × 720, mobilde 320 × 780 ve 390 × 844 görünümler gerçek tarayıcıda incelendi; yatay taşma sıfır. Mobil okuma gövdesinin önceki makale stillerinden aldığı çift boşluk tek yerde düzeltilerek 320px ekranda panellerin 280px genişliği korundu. Sabit menü için yeni bağlantıların çift kaydırma payı giderildi.
- Gerçek NASA dokusu ve Three.js r186 ile WebGL görünür. Türkiye/İngiltere etiketleri, çizgi, Home düğmesi/tuşu, yön tuşları ve fareyle döndürme kontrol edildi. Durdurma koordinatları sabit tuttu; açık hizmet menüsü ve arama penceresi hareketi durdurdu. Küre ekran dışında durdu ve görünürken devam etti. Sistem hareket tercihi değiştirilmedi; azaltılmış hareket ve gizli sayfa kapıları kod/mantık incelemesiyle kontrol edildi.
- Mobil menünün yedi ana bağlantısı açıldı; dünya bağlantısı doğru bölüme ulaştı. Okuma kartı detay sayfasını açtı; bölüm menüsü, sorular, kaynak paneli ve ilgili hizmetler kontrol edildi. Küre metni ve kaynaklı okumalar JavaScript tarafından üretilmez; statik HTML’de yer alır.
- 14 özgün Design 6 okuması taşındı. Önceki yedi veri kökü değişmedi. 12 benzersiz birincil kaynak HTTP 200; dört PDF metni incelendi. Yalnız Buffett mektubunun doğrulanmış 2 Mart 1990 kaynak tarihi gösterilir. Kaynak tarihi Boraden yayın tarihi olarak kullanılmaz. Kişi, portre, biyografi ve doğrudan alıntı alanları taşınmadı.
- ORBIST’in ilişki türü, dış URL’si ve logosu kaynakta bulunmuyor. Panel yalnız kaynakta bulunan adı, İngiltere etiketini ve kurumsal iletişim yönlendirmesini içerir. Küre çizgisi şube ağı veya kesin ofis konumu olarak sunulmaz.
- Küre kodu, yerel vendor ve doku yaklaşık 2,67 MB; 3D motoru bölüm yaklaşınca başlatılır. Yeni npm bağımlılığı, uzak görsel isteği veya ziyaretçi takibi yok. NASA kaynak kaydı ve Three.js MIT lisansı varlıklarla saklanır.
- Son metin incelemesinde Codex üç `hâle` yazımını düzeltti. Ardından dünya ve 14 perspektifin 194 benzersiz yeni metin parçası Jev ile tarandı: 0,70 eşiğinde bulgu yok, en yüksek hata olasılığı 0,50. Bu sonuç yazım garantisi olarak sunulmaz.

Yeni gerçek ekran görüntüleri `../output/design7-world-review/` altında saklanır: dünya/ORBIST masaüstü ve mobil sahnesi, perspektif kartları ve okuma detayları. Önceki sürümün kontrolleri aşağıda korunur.

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
