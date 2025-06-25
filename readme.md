# 📸 PCAT - Photo Catalog App

PCAT (Photo Catalog App), kullanıcıların fotoğraf yükleyip düzenleyebildiği basit bir web uygulamasıdır. Express.js ve MongoDB kullanılarak geliştirilmiş, temel CRUD işlemlerini destekleyen bir Node.js projesidir.

## 🚀 Özellikler

- 📂 Fotoğraf yükleme (local veya bulut entegrasyonuna uygun)
- 📝 Fotoğraf bilgilerini güncelleme
- 🗑️ Fotoğraf silme
- 🔍 Tüm fotoğrafları listeleme
- 📁 Kategorilere göre filtreleme
- 📸 Multer ile dosya yükleme desteği

## 🛠️ Kullanılan Teknolojiler

- **Node.js** + **Express.js** – Sunucu tarafı
- **MongoDB** + **Mongoose** – Veritabanı yönetimi
- **EJS** – Sunucu taraflı şablon motoru
- **Multer** – Dosya yükleme yönetimi

## ⚙️ Kurulum

1. Bu repoyu klonlayın:

   ```bash
   git clone https://github.com/e-kose/PCAT.git
   cd PCAT
   npm start
   ```
2. Tarayıcıda açın:
   ```bash
   http://localhost:3000
   ```
## 📁 Proje Yapısı

```plaintext
PCAT/
│
├── controllers/         → Route handler dosyaları
├── models/              → Mongoose model tanımları
├── public/              → Statik dosyalar (CSS, JS, resimler)
├── routes/              → Tüm route tanımlamaları
├── views/               → EJS şablon dosyaları
├── uploads/             → Yüklenen fotoğraflar
├── .env                 → Ortam değişkenleri
├── app.js               → Ana uygulama dosyası
└── package.json         → Proje bağımlılıkları ve script’ler
```
