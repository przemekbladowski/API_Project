# 🌍 IP Geolocation Tracker

Nowoczesna aplikacja webowa do wykrywania lokalizacji użytkownika na podstawie adresu IP. Projekt zbudowany z wykorzystaniem Webpack, SCSS i Vanilla JavaScript, z pełną responsywnością i integracją z interaktywną mapą.

![Application Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![Webpack](https://img.shields.io/badge/Webpack-5.89.0-blue)
![Sass](https://img.shields.io/badge/Sass-1.83.0-pink)
![License](https://img.shields.io/badge/License-ISC-green)

## 📸 Zrzuty ekranu

Aplikacja prezentuje czysty, nowoczesny interfejs z niebieskim gradientem i białą kartą zawierającą wszystkie informacje o lokalizacji.

## ✨ Funkcje

- 🌐 **Automatyczne wykrywanie IP** - Pobiera publiczny adres IP użytkownika
- 📍 **Geolokalizacja** - Określa miasto i kraj na podstawie IP
- 🗺️ **Interaktywna mapa** - Wyświetla lokalizację na mapie Leaflet.js z OpenStreetMap
- 📱 **Pełna responsywność** - Działa na wszystkich urządzeniach (mobile, tablet, desktop)
- 🎨 **Nowoczesny design** - Zgodny z projektem Figma
- ⚡ **Szybkie ładowanie** - Optymalizacja Webpack
- 🔄 **Hot Reload** - Natychmiastowe odświeżanie podczas developmentu
- ❌ **Obsługa błędów** - Przyjazne komunikaty w przypadku problemów z API

## � Live Demo

**[Zobacz aplikację na żywo →](https://api-project-brown.vercel.app/*)**

Aplikacja jest automatycznie wdrażana na GitHub Pages przy każdym push do gałęzi `main`.

## �🛠️ Technologie

### Frontend
- **HTML5** - Semantyczna struktura
- **SCSS** - Zaawansowane style z preprocessorem
- **JavaScript (ES6+)** - Nowoczesny kod z async/await
- **Leaflet.js** - Biblioteka do map

### Build Tools
- **Webpack 5** - Bundler modułów
- **webpack-dev-server** - Serwer deweloperski z hot reload
- **sass-loader** - Kompilacja SCSS do CSS
- **css-loader** - Ładowanie CSS
- **style-loader** - Wstrzykiwanie CSS do DOM

### APIs
- **[ipify](https://www.ipify.org/)** - Wykrywanie adresu IP
- **[ipapi.co](https://ipapi.co/)** - Dane geolokalizacyjne (wspiera HTTPS)
- **[OpenStreetMap](https://www.openstreetmap.org/)** - Kafelki mapy

## 📁 Struktura projektu

```
API/
├── src/
│   ├── index.html              # Główny plik HTML
│   ├── index.js                # Logika aplikacji
│   └── styles/
│       └── main.scss           # Style SCSS z responsywnością
├── dist/                       # Build output (generowany automatycznie)
├── node_modules/               # Zależności npm
├── package.json                # Konfiguracja npm i skrypty
├── webpack.config.js           # Konfiguracja Webpack
├── .gitignore                  # Pliki ignorowane przez Git
└── README.md                   # Ten plik
```

## 🚀 Instalacja i uruchomienie

### Wymagania
- **Node.js** >= 14.0.0
- **npm** >= 6.0.0

### Kroki instalacji

1. **Sklonuj repozytorium** (lub pobierz pliki)
```bash
cd /Users/przemyslawbladowski/Desktop/API
```

2. **Zainstaluj zależności**
```bash
npm install
```

3. **Uruchom serwer deweloperski**
```bash
npm run dev
```

Aplikacja automatycznie otworzy się w przeglądarce pod adresem `http://localhost:8080`

### Dostępne skrypty

| Komenda | Opis |
|---------|------|
| `npm run dev` | Uruchamia serwer deweloperski z hot reload |
| `npm run build` | Tworzy zoptymalizowaną wersję produkcyjną w folderze `dist/` |
| `npm run watch` | Obserwuje zmiany i automatycznie przebudowuje projekt |
| `npm run deploy` | Buduje projekt (używane przez GitHub Actions) |

## 🎨 Design

Aplikacja została zaprojektowana zgodnie z dostarczonym projektem Figma:

### Paleta kolorów
- **Gradient tła**: `#2B5FE8` → `#4169E6`
- **Karta**: `#FFFFFF`
- **Sekcje informacyjne**: `#EFF1FE`
- **Tekst główny**: `#1A1A2E`
- **Tekst niebieski**: `#2B5FE8`
- **Tekst szary**: `#6B7280`

### Typografia
- **Font**: Poppins (Google Fonts)
- **Wagi**: 400, 500, 600, 700

### Responsywność

Aplikacja jest w pełni responsywna z następującymi breakpointami:

| Breakpoint | Urządzenie | Szerokość |
|------------|------------|-----------|
| Extra Small | Telefony (pionowo) | ≤ 480px |
| Small | Telefony (poziomo) | 481px - 767px |
| Medium | Tablety | 768px - 991px |
| Large | Desktopy | 992px - 1199px |
| Extra Large | Duże ekrany | ≥ 1200px |

Dodatkowo:
- **Landscape mode** - Specjalne dostosowania dla orientacji poziomej
- **High DPI** - Ulepszone cienie dla ekranów Retina

## 🔧 Konfiguracja

### Webpack

Plik `webpack.config.js` zawiera konfigurację:
- Entry point: `src/index.js`
- Output: `dist/bundle.js`
- Loadery dla SCSS, CSS, i obrazów
- HTML Webpack Plugin dla automatycznego generowania HTML
- Dev server na porcie 8080

### Sass

Konfiguracja sass-loader z wyciszeniem deprecation warnings:
```javascript
{
  loader: 'sass-loader',
  options: {
    sassOptions: {
      silenceDeprecations: ['legacy-js-api'],
    },
  },
}
```

## 📡 API Integration

### 1. Wykrywanie IP
```javascript
const response = await fetch('https://api.ipify.org?format=json');
const data = await response.json();
// data.ip zawiera adres IP użytkownika
```

### 2. Geolokalizacja
```javascript
const response = await fetch(`https://ipapi.co/${ip}/json/`);
const data = await response.json();
// data zawiera: city, country_name, latitude, longitude
```

### 3. Mapa Leaflet
```javascript
const map = L.map('map').setView([lat, lng], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
L.marker([lat, lng]).addTo(map);
```

## 🔒 Limity API

### ipify
- **Limit**: Brak (darmowe dla niekomercyjnego użytku)
- **Dokumentacja**: https://www.ipify.org/

### ipapi.co
- **Limit**: 1,000 zapytań/dzień (darmowa wersja), 30,000/miesiąc
- **HTTPS**: ✅ Wspierane na darmowym planie
- **Dokumentacja**: https://ipapi.co/api/

> ✅ **Uwaga**: ipapi.co wspiera HTTPS na darmowym planie, co jest wymagane dla GitHub Pages.

## 🐛 Rozwiązywanie problemów

### Ostrzeżenie Sass deprecation
Jeśli widzisz ostrzeżenie o "legacy JS API", upewnij się, że masz poprawną konfigurację w `webpack.config.js`:
```javascript
sassOptions: {
  silenceDeprecations: ['legacy-js-api'],
}
```

### Błąd CORS
Jeśli wystąpią problemy z CORS, upewnij się, że używasz `http://` (nie `https://`) dla ip-api.com w środowisku deweloperskim.

### Mapa się nie ładuje
Sprawdź, czy Leaflet CSS jest poprawnie załadowany:
```javascript
import 'leaflet/dist/leaflet.css';
```

## 🌐 Deployment na GitHub Pages

Projekt jest skonfigurowany do automatycznego wdrażania na GitHub Pages przy użyciu GitHub Actions.

### Automatyczne wdrożenie

1. **Push do GitHub**
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

2. **GitHub Actions automatycznie**:
   - Zainstaluje zależności
   - Zbuduje projekt (`npm run build`)
   - Wdroży na GitHub Pages

3. **Sprawdź status**:
   - Przejdź do zakładki **Actions** w repozytorium GitHub
   - Poczekaj na zakończenie workflow (zazwyczaj 1-2 minuty)
   - Aplikacja będzie dostępna pod: `https://przemekbladowski.github.io/API_Project/`

### Pierwsza konfiguracja GitHub Pages

Jeśli to pierwsze wdrożenie, musisz włączyć GitHub Pages w ustawieniach repozytorium:

1. Przejdź do **Settings** → **Pages**
2. W sekcji **Source** wybierz **GitHub Actions**
3. Zapisz ustawienia

### Lokalne testowanie buildu produkcyjnego

```bash
npm run build
```

Zoptymalizowane pliki znajdą się w folderze `dist/`:
- `index.html` - Główny plik HTML
- `bundle.js` - Zminifikowany JavaScript
- `*.png` - Obrazy (ikony Leaflet)

## 🌟 Funkcje zaawansowane (opcjonalnie)

Możliwe rozszerzenia projektu:

- [ ] Wyszukiwanie po własnym adresie IP
- [ ] Historia wyszukiwań (localStorage)
- [ ] Dodatkowe dane (ISP, strefa czasowa)
- [ ] Tryb ciemny (dark mode)
- [ ] Geolokalizacja GPS (navigator.geolocation)
- [ ] Animacje przejść między stanami
- [ ] Wsparcie dla wielu dostawców map
- [ ] Eksport danych do PDF/JSON
- [ ] Wielojęzyczność (i18n)

## 📄 Licencja

ISC License

## 👨‍💻 Autor

Projekt stworzony na podstawie projektu Figma.

## 🙏 Podziękowania

- [Leaflet.js](https://leafletjs.com/) - Biblioteka map
- [OpenStreetMap](https://www.openstreetmap.org/) - Dane map
- [ipify](https://www.ipify.org/) - API wykrywania IP
- [ipapi.co](https://ipapi.co/) - API geolokalizacji z HTTPS
- [Google Fonts](https://fonts.google.com/) - Font Poppins

## 📞 Wsparcie

W przypadku problemów:
1. Sprawdź sekcję [Rozwiązywanie problemów](#-rozwiązywanie-problemów)
2. Upewnij się, że masz najnowsze wersje Node.js i npm
3. Usuń `node_modules/` i uruchom `npm install` ponownie

---

**Status**: ✅ Projekt gotowy do użycia  
**Wersja**: 1.0.0  
**Ostatnia aktualizacja**: Styczeń 2026
