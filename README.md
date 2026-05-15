# Labb 4 - Authentication Frontend

Detta är frontend-delen av Laboration 4.  
Webbplatsen använder HTML, CSS och JavaScript för att registrera användare, logga in och visa en skyddad sida med data från ett JWT-skyddat API.

## Publicerad webbplats
https://coco10023.github.io/labb4-auth-frontend/ 


## API som används

https://labb4-auth-api.onrender.com

## Funktioner

- Registrera användarkonto
- Logga in med användarkonto
- Spara JWT-token i sessionStorage
- Skicka JWT-token vid anrop till skyddad route
- Visa skyddad data på dashboard
- Logga ut användare
- Validering av formulär med JavaScript
- Tydliga felmeddelanden till användaren

## Tekniker

- HTML
- CSS
- JavaScript
- Fetch API
- sessionStorage
- GitHub Pages
- GitHub Actions

## Sidor

### index.html

Startsida med länkar till registrering, login och dashboard.

### register.html

Sida med formulär för att skapa användarkonto.

Anrop som görs:

```text
POST https://labb4-auth-api.onrender.com/api/auth/register
```

## login.html

Sida med formulär för att logga in.

Anrop som görs:

POST https://labb4-auth-api.onrender.com/api/auth/login 

Vid lyckad inloggning sparas JWT-token i sessionStorage.

## dashboard.html

Skyddad sida som kräver att användaren är inloggad.

Anrop som görs:

GET https://labb4-auth-api.onrender.com/api/products

JWT-token skickas med i headern:

Authorization: Bearer JWT_TOKEN_HÄR

## Filstruktur

labb4-auth-frontend/
│
├── index.html
├── register.html
├── login.html
├── dashboard.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── register.js
│   ├── login.js
│   └── dashboard.js
│
└── .github/
    └── workflows/
        └── deploy.yml

## Hur webbplatsen fungerar
Användaren registrerar ett konto via register.html.
Formuläret skickar data till backend-API:et med Fetch API.
Användaren loggar in via login.html.
Vid lyckad inloggning returnerar API:et en JWT-token.
Token sparas i sessionStorage.
Användaren skickas vidare till dashboard.html.
Dashboard hämtar skyddad data från API:et.
Token skickas med i Authorization-headern.
Om token är giltig visas skyddad data.
Användaren kan logga ut, vilket tar bort token från sessionStorage.

## Lokal körning

Klona repot:

git clone https://github.com/Coco10023/labb4-auth-frontend.git 

Öppna sedan index.html i webbläsaren.

Eftersom projektet använder statiska HTML-, CSS- och JavaScript-filer behövs ingen installation med npm.

## Deployment

Webbplatsen publiceras med GitHub Pages via GitHub Actions.

Workflow-filen finns här:

.github/workflows/deploy.yml

Vid push till main deployas webbplatsen automatiskt.

