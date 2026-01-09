# 🌍 Lokalizacja IP - Aplikacja Geolokalizacji

Aplikacja webowa wyświetlająca lokalizację użytkownika na podstawie adresu IP z wykorzystaniem mapy interaktywnej Leaflet.

![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![Tests](https://img.shields.io/badge/tests-15%2F15%20passing-success)
![Build](https://img.shields.io/badge/build-webpack-blue)

## 📋 Spis Treści

- [Opis](#-opis)
- [Funkcjonalności](#-funkcjonalności)
- [Technologie](#-technologie)
- [Struktura Projektu](#-struktura-projektu)
- [Instalacja](#-instalacja)
- [Użycie](#-użycie)
- [Testy](#-testy)
- [Build Produkcyjny](#-build-produkcyjny)
- [Dokumentacja](#-dokumentacja)
- [API](#-api)

## 🎯 Opis

Aplikacja automatycznie wykrywa lokalizację użytkownika na podstawie jego adresu IP i wyświetla:
- Adres IP
- Miasto i kraj
- Koordynaty geograficzne (szerokość i długość)
- Interaktywną mapę z pinezką w lokalizacji użytkownika

## ✨ Funkcjonalności

- 🌐 **Automatyczna detekcja IP** - pobieranie lokalizacji bez interakcji użytkownika
- 🗺️ **Mapa interaktywna** - Leaflet z animacją flyTo i kontrolami zoom
- 📱 **Responsywny design** - działa na desktop, tablet i mobile
- 🎨 **Nowoczesny UI** - gradientowe tło, animacje hover, karty z danymi
- ⚡ **Szybkie ładowanie** - bundle Webpack ~1.5 KiB (zminifikowany)
- 🧪 **W pełni przetestowane** - 15 testów E2E Playwright (100% coverage)

## 🛠 Technologie

### Frontend
- **HTML5** - struktura semantyczna
- **CSS3** - stylowanie z SCSS (gradienty, animacje, flexbox)
- **JavaScript (ES6+)** - logika aplikacji
- **Leaflet.js** - biblioteka map interaktywnych
- **Font Awesome** - ikony

### Build & Development
- **Webpack 5** - bundling i optymalizacja
- **SCSS** - preprocesor CSS
- **Webpack Dev Server** - development server z hot reload

### Testing
- **Playwright** - testy E2E end-to-end
- **3 przeglądarki** - Chromium, Firefox, WebKit
- **Automatyczne screenshoty** - po każdym teście
- **Video recording** - nagrania wszystkich testów
- **Trace files** - debugowanie failed testów

### API
- **ipwho.is** - darmowe API do geolokalizacji po IP
- **OpenStreetMap** - kafelki mapy

## 📁 Struktura Projektu

```
ProjektAPI/
├── src/                          # Kod źródłowy
│   ├── index.html               # Główny plik HTML
│   ├── js/
│   │   └── app.js              # Logika aplikacji
│   ├── scss/                    # Style SCSS (źródłowe)
│   │   ├── main.scss
│   │   ├── _variables.scss
│   │   ├── _base.scss
│   │   ├── _layout.scss
│   │   ├── _cards.scss
│   │   ├── _map.scss
│   │   └── _animations.scss
│   └── css/                     # CSS skompilowany (build)
│       ├── main.css
│       └── main.css.map
├── tests/                       # Testy E2E
│   └── example.spec.js
├── dist/                        # Build output (Webpack)
│   ├── bundle.[hash].js        # Bundle JS (minified)
│   ├── index.html              # HTML z linkami
│   └── main.css                # Skompilowany CSS
├── docs/                        # Dokumentacja
│   ├── PLAYWRIGHT_SETUP.md     # Setup testów
│   ├── PLAYWRIGHT_RESULTS.md   # Wyniki testów
│   └── WEBPACK_INTEGRATION.md  # Integracja Webpack
├── test-results/                # Wyniki testów (gitignore)
├── playwright-report/           # Raporty HTML (gitignore)
├── playwright.config.js         # Konfiguracja Playwright
├── webpack.config.js            # Konfiguracja Webpack
├── package.json                 # Dependencies & scripts
├── .gitignore
└── README.md                    # Ten plik
```

## 📥 Instalacja

### Wymagania
- **Node.js** >= 16.x
- **npm** >= 8.x

### Kroki

1. **Sklonuj repozytorium** (jeśli w git)
   ```bash
   git clone <repository-url>
   cd ProjektAPI
   ```

2. **Zainstaluj zależności**
   ```bash
   npm install
   ```

3. **Zainstaluj przeglądarki Playwright** (dla testów)
   ```bash
   npx playwright install --with-deps
   ```

## 🚀 Użycie

### Development Mode

Uruchom serwer deweloperski z hot reload:

```bash
npm run dev
```

Aplikacja będzie dostępna pod: `http://localhost:8080`

### Production Build

Zbuduj wersję produkcyjną:

```bash
npm run build
```

Pliki zostaną wygenerowane w katalogu `dist/`.

Aby podejrzeć build produkcyjny lokalnie:

```bash
npx http-server dist -p 8080
```

## 🧪 Testy

### Uruchom wszystkie testy

```bash
npm test
```

**Wyniki**: 15/15 testów zaliczonych (100%)  
**Czas**: ~12s  
**Przeglądarki**: Chromium, Firefox, WebKit

### Testy z widoczną przeglądarką

```bash
npm run test:headed
```

### Otwórz raport HTML

```bash
npm run test:report
```

Raport zawiera:
- Screenshoty po każdym teście
- Nagrania video wszystkich testów
- Trace files do debugowania
- Szczegółowe logi

### Co jest testowane?

1. ✅ **Ładowanie strony** - tytuł, nagłówek, podstawowa struktura
2. ✅ **Karty z danymi** - widoczność 3 kart (IP, lokalizacja, koordynaty)
3. ✅ **Mapa** - inicjalizacja Leaflet, kontrolki zoom, warstwy mapy
4. ✅ **API** - ładowanie danych z ipwho.is, timeout handling
5. ✅ **Responsywność** - layout na 3 rozdzielczościach (desktop, tablet, mobile)

## 📦 Build Produkcyjny

### Komendy NPM

```json
{
  "scripts": {
    "build": "webpack --mode production",
    "dev": "webpack serve --mode development",
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:report": "playwright show-report"
  }
}
```

### Webpack Features

- ✅ **Minifikacja** - kod JavaScript zoptymalizowany
- ✅ **Cache busting** - hash w nazwie pliku (`bundle.[contenthash].js`)
- ✅ **Clean output** - automatyczne czyszczenie `dist/`
- ✅ **HTML injection** - automatyczne dodanie linków do bundle
- ✅ **CSS copy** - kopiowanie skompilowanego CSS
- ✅ **Performance budgets** - max 512KB na asset

### Wygenerowane pliki

```
dist/
├── bundle.5d3e2a4776f8b56e4d53.js  (1.48 KiB - minified)
├── index.html                       (1.62 KiB)
└── main.css                         (3.26 KiB)
```

## 📚 Dokumentacja

Szczegółowa dokumentacja znajduje się w katalogu `docs/`:

- **[PLAYWRIGHT_SETUP.md](docs/PLAYWRIGHT_SETUP.md)** - Konfiguracja testów Playwright
- **[PLAYWRIGHT_RESULTS.md](docs/PLAYWRIGHT_RESULTS.md)** - Wyniki testów i screenshoty
- **[WEBPACK_INTEGRATION.md](docs/WEBPACK_INTEGRATION.md)** - Integracja Webpack i poprawa wydajności

## 🌐 API

### ipwho.is

Aplikacja używa darmowego API ipwho.is do geolokalizacji:

```javascript
const response = await fetch('https://ipwho.is/');
const data = await response.json();
// Zwraca: ip, city, country, latitude, longitude, etc.
```

**Limit**: Bez ograniczeń dla małych projektów  
**Dokumentacja**: https://ipwho.is

### OpenStreetMap

Kafelki mapy pochodzą z OpenStreetMap:

```javascript
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
})
```

## 🎨 Design

- **Kolory**: Niebieskie gradienty (#007bff, #0b1a3a, #16325c)
- **Fonty**: Roboto (Google Fonts)
- **Ikony**: Font Awesome 6.4.0
- **Animacje**: Fade-in, slide-up, hover effects
- **Layout**: Flexbox, responsive (mobile-first)

## ⚡ Wydajność

### Metryki

- **Bundle size**: 1.48 KiB (JS minified)
- **Total assets**: ~6.5 KiB
- **Load time**: < 1s (lokalne)
- **Test execution**: 12.2s (15 testów × 3 przeglądarki)

### Optymalizacje

- Webpack production mode (minifikacja, tree shaking)
- Content hash cache busting
- CSS compiled z SCSS
- Lazy loading mapy Leaflet

## 🤝 Contributing

1. Fork projektu
2. Stwórz branch (`git checkout -b feature/AmazingFeature`)
3. Commit zmian (`git commit -m 'Add some AmazingFeature'`)
4. Push do brancha (`git push origin feature/AmazingFeature`)
5. Otwórz Pull Request

## 📝 Licencja

Ten projekt jest dostępny na licencji MIT.

## 👨‍💻 Autor

**Projekt studia** - Aplikacja lokalizacji IP

## 🙏 Podziękowania

- [Leaflet.js](https://leafletjs.com/) - wspaniała biblioteka map
- [ipwho.is](https://ipwho.is) - darmowe API geolokalizacji
- [OpenStreetMap](https://www.openstreetmap.org/) - dane map
- [Playwright](https://playwright.dev/) - narzędzie do testów E2E
- [Webpack](https://webpack.js.org/) - bundler
- [Font Awesome](https://fontawesome.com/) - ikony
# API_Project
