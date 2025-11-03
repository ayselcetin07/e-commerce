# E-Commerce Uygulaması

Bu proje, **ASP.NET Core Web API** ve **Next.js App Router** kullanılarak geliştirilmiş tam işlevsel bir e-ticaret uygulamasıdır.  
Projede PostgreSQL veritabanı, JWT ile kimlik doğrulama ve opsiyonel Redis cache desteği bulunmaktadır.

---

## Gereksinimler

- [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download)
- [Node.js 18+](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- (Opsiyonel) [Redis](https://redis.io/) veya Docker

---

## 1. Backend Kurulumu (`/backend`)

### 1.1. Veritabanı Ayarları

`appsettings.json` dosyasını açın ve PostgreSQL bağlantı bilgilerini kendi sisteminize göre güncelleyin:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=ecommerce_db;Username=postgres;Password=1234"
}
1.2. JWT Ayarları
Aynı dosyaya aşağıdaki JWT yapılandırmasını ekleyin:

json
Kodu kopyala
"Jwt": {
  "Key": "Aysel$EComm_SecretKey_92x!Tg#L7vQpZ@fWm3RbYk",
  "Issuer": "ECommerceApp",
  "Audience": "ECommerceUsers",
  "ExpireMinutes": 60
}
1.3. Migration ve API Başlatma
Veritabanını oluşturmak ve backend API’yi başlatmak için terminalde aşağıdaki komutları çalıştırın:

bash

cd backend/ECommerce.API
dotnet ef database update
dotnet run
API artık http://localhost:5011 adresinde çalışıyor olacak.

2. Frontend Kurulumu (/frontend)
2.1. Ortam Değişkeni
frontend/.env dosyası oluşturun ve backend API URL’ini ekleyin:

env

NEXT_PUBLIC_API_BASE_URL=http://localhost:5011/api
2.2. Paketleri Kurun ve Uygulamayı Başlatın
Terminalde frontend klasörüne gidip gerekli paketleri yükleyin ve uygulamayı başlatın:

bash

cd frontend
npm install
npm run dev
Frontend artık http://localhost:3000 adresinde çalışıyor olacak.

3. Swagger Kurulumu ve API Testi
Swagger, backend API endpoint’lerini görsel olarak test etmek için kullanılır.

3.1. Gerekli NuGet Paketi
Backend projesinde Swashbuckle.AspNetCore paketinin yüklü olduğundan emin olun:

bash

dotnet add package Swashbuckle.AspNetCore
3.2. Program.cs Ayarları
Program.cs dosyasına aşağıdaki satırları ekleyin:

csharp

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
Swagger UI’ye artık http://localhost:5011/swagger adresinden erişebilirsiniz.

4. Kullanılan NuGet Paketleri
Backend projesinde aşağıdaki paketler kullanılmaktadır:

bash

dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package MediatR.Extensions.Microsoft.DependencyInjection
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package StackExchange.Redis
dotnet add package Swashbuckle.AspNetCore
```
