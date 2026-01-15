# Horse Racing Game

Vue 3, Vuex ve Vite ile oluşturulmuş interaktif at yarışı simülasyonu.

## 🌟 Özellikler

- **20 Benzersiz At**: Her birinin kendine has kondisyon ve renkleri vardır.
- **6 Rauntluk Yarış Programı**: Artan mesafeler (1200m - 2200m) ile heyecan dolu bir seri.
- **Gerçek Zamanlı Animasyon**: `requestAnimationFrame` kullanılarak optimize edilmiş pürüzsüz yarış deneyimi.
- **Duyarlı (Responsive) Tasarım**: Mobil, tablet ve masaüstü cihazlar için tam uyumlu arayüz.
- **Kapsamlı Testler**: Unit, Integration ve E2E testleri ile yüksek güvenilirlik.
- **Yarış Sonuçları**: Her raunt sonrası kazanan takibi ve detaylı sıralama.

## 🛠️ Teknoloji Yığını

- **Frontend**: Vue 3 (Composition API)
- **State Management**: Vuex 4
- **Build Tool**: Vite 5
- **Testing**: Vitest (Unit/Integration), Playwright (E2E)
- **Styling**: Modern CSS (Responsive Design Focus)
- **Routing**: Vue Router 4

## 📦 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v16+)
- npm veya yarn

### Adımlar

1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/kullanici-adiniz/horse-racing.git
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
   *Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışacaktır.*

## 🧪 Testler

Projede güvenilirliği sağlamak için farklı seviyelerde testler bulunmaktadır. Tüm testleri veya spesifik modülleri aşağıdaki komutlarla çalıştırabilirsiniz:

### Tüm Testleri Çalıştır
Hem Unit hem de E2E testlerini sırayla çalıştırır:
```bash
npm test
```

### Unit ve Integration Testleri (Vitest)
Mantıksal fonksiyonları ve bileşen etkileşimlerini test eder:
```bash
npm run test:unit
```

### E2E Testleri (Playwright)
Gerçek tarayıcı üzerinde uçtan uca kullanıcı senaryolarını test eder:
```bash
# Arka planda (headless) çalıştırma
npm run test:e2e

# Playwright UI modunda çalıştırma (Görsel arayüz ile)
npm run test:e2e:ui
```

### Lint Kontrolü
Kod stilini ve hataları denetler:
```bash
npm run lint
```

## 📂 Proje Yapısı

```
horse-racing/
├── src/
│   ├── components/         # Tekrar kullanılabilir Vue bileşenleri
│   ├── store/              # Vuex store ve modülleri
│   ├── views/              # Sayfa görünümleri (HomeView vb.)
│   ├── constants/          # Sabit değerler ve konfigürasyonlar
│   ├── utils/              # Yardımcı mantıksal fonksiyonlar
│   ├── assets/             # Görsel ve statik dosyalar
│   ├── App.vue             # Ana uygulama bileşeni
│   └── main.js             # Giriş noktası
├── tests/                  # Test klasörleri
└── ...
```

## 🎮 Nasıl Oynanır?

1. **"Generate Horses"** butonuna basarak 20 adet at oluşturun.
2. **"Generate Race Schedule"** butonu ile 6 rauntluk yarış programını hazırlayın.
3. **"Start Race"** butonuna basarak yarışları başlatın.
4. Yarışlar tamamlandıkça sağ taraftaki panelden sonuçları ve kazananları takip edin.

## 📄 Lisans

Bu proje MIT lisansı altındadır.
