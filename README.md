# LUMIÈRE — Quiet Luxury E-Commerce

LUMIÈRE, modern web teknolojileriyle inşa edilmiş, **Sessiz Lüks** (Quiet Luxury) estetiğini odağına alan tam donanımlı bir e-ticaret platformudur. Müşterinin vitrin deneyiminden admin'in sipariş yönetimine kadar tüm süreci kapsayan bir Full-Stack projesidir.

---

## Öne Çıkan Özellikler

### Müşteri Deneyimi
- **Dinamik Mağaza** — Kategori, beden ve fiyat filtrelemeli ürün listeleme sistemi
- **Gelişmiş Sepet** — Zustand ile yönetilen, sayfa yenilense bile veriyi koruyan sepet yapısı
- **Iyzico Simülasyonu** — Gerçekçi bir ödeme deneyimi sunan güvenli Checkout süreci
- **Koleksiyonlar (Lookbook)** — Marka hikayesini anlatan estetik ve asimetrik görsel sayfalar

### Yönetim Paneli (Admin Console)
- **Analytics** — Recharts ile görselleştirilmiş haftalık ciro ve sipariş grafikleri
- **Ürün Yönetimi** — Tam kapsamlı CRUD (Ekleme, Silme, Güncelleme) sistemi
- **Sipariş Takibi** — Gelen siparişlerin durumunu (`Pending`, `Shipped`, `Delivered`) yönetme paneli

---

## 🛠️ Teknoloji Yığını

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16 (App Router) |
| Veritabanı | Neon DB (PostgreSQL) |
| ORM | Prisma |
| Kimlik Doğrulama | Auth.js (NextAuth v5) |
| State Management | Zustand |
| UI & Styling | Tailwind CSS, Shadcn/UI, Lucide React |
| Grafikler | Recharts |

---

## Kurulum

### 1. Projeyi klonlayın

```bash
git clone https://github.com/kullaniciadi/lumiere-boutique.git
cd lumiere-boutique
```

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. Ortam değişkenlerini tanımlayın

Projenin kök dizininde bir `.env` dosyası oluşturun:

```env
DATABASE_URL="postgresql://..."
AUTH_SECRET="gizli-anahtarınız"
```

### 4. Veritabanını hazırlayın

```bash
npx prisma db push
npx prisma db seed
```

### 5. Geliştirme sunucusunu başlatın

```bash
npm run dev
```

Uygulama varsayılan olarak [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

---

##  Proje Yapısı

```
lumiere-boutique/
├── app/                  # Next.js App Router sayfaları
│   ├── (store)/          # Müşteri arayüzü
│   └── admin/            # Yönetim paneli
├── components/           # Yeniden kullanılabilir UI bileşenleri
├── lib/                  # Yardımcı fonksiyonlar ve konfigürasyon
├── prisma/               # Veritabanı şeması ve seed dosyaları
└── public/               # Statik dosyalar
```

---

## 📄 Lisans

Bu proje [MIT](LICENSE) lisansı altında dağıtılmaktadır.
