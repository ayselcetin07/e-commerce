# E-Commerce Uygulaması

Bu proje, ASP.NET Core Web API ve Next.js App Router kullanılarak geliştirilmiş tam işlevsel bir e-ticaret uygulamasıdır. PostgreSQL veritabanı, JWT ile kimlik doğrulama ve opsiyonel Redis cache desteği içerir.

---

## Gereksinimler

- [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download)
- [Node.js 18+](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- (Opsiyonel) [Redis](https://redis.io/) veya Docker

---

## Backend Kurulumu (`/backend`)

### 1. Veritabanı Ayarları

`appsettings.json` içinde aşağıdaki bağlantı bilgilerini düzenleyin:

````json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=ecommerce_db;Username=postgres;Password=1234"
}

### 2. JWT Ayarları

`appsettings.json` dosyasına aşağıdaki JWT yapılandırmasını ekleyin:

```json
"Jwt": {
  "Key": "Aysel$EComm_SecretKey_92x!Tg#L7vQpZ@fWm3RbYk",
  "Issuer": "ECommerceApp",
  "Audience": "ECommerceUsers",
  "ExpireMinutes": 60
}

### 3. Migration ve API Başlatma

Aşağıdaki komutları sırasıyla terminalde çalıştırarak veritabanını oluşturabilir ve backend API’yi başlatabilirsiniz:

```bash
cd backend
cd ECommerce.API
dotnet ef database update
dotnet run

##  4. Frontend Kurulumu (`/frontend`)

###  1.Ortam Değişkeni

`frontend/.env` dosyası oluşturun ve aşağıdaki satırı ekleyin:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5011/api

Bu değişken, frontend uygulamasının backend API ile iletişim kurmasını sağlar.

### 2. Paketleri Kurun ve Uygulamayı Başlatın

Terminalde aşağıdaki komutları sırasıyla çalıştırın:

```bash
cd frontend
npm install
npm run dev

### 5. Swagger Kurulumu ve API Testi

Swagger, API endpoint'lerini görsel olarak test etmek ve dökümantasyon sağlamak için kullanılır.

#### Gerekli Paketler

Proje zaten aşağıdaki NuGet paketlerini içeriyor olmalı:

```bash
dotnet add package Swashbuckle.AspNetCore
#### Program.cs Dosyasına Swagger Ayarları Ekleyin

`Program.cs` dosyasına aşağıdaki satırları ekleyin:

```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
````

{
app.UseSwagger();
app.UseSwaggerUI();
}

```
### 6. Gerekli NuGet Paketleri

Aşağıdaki NuGet paketleri backend projesinde kullanılmaktadır. Her biri terminal üzerinden aşağıdaki komutlarla yüklenebilir:


dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package MediatR.Extensions.Microsoft.DependencyInjection
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package StackExchange.Redis
dotnet add package Swashbuckle.AspNetCore

```
