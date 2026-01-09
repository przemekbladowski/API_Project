# Konfiguracja GitHub Pages

## ✅ Projekt jest gotowy!

Wszystkie pliki aplikacji są już w folderze `docs/` i gotowe do wdrożenia na GitHub Pages.

### Co jest w folderze `docs/`:
- `index.html` - główna strona
- `bundle.[hash].js` - skompilowany JavaScript **wraz z CSS** (webpack automatycznie łączy wszystko w jeden plik)

## Instrukcja włączenia GitHub Pages

### 1. Wypchnij zmiany do repozytorium

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

### 2. Włącz GitHub Pages

1. Przejdź do swojego repozytorium na GitHub
2. Kliknij **Settings** (Ustawienia)
3. W lewym menu kliknij **Pages**
4. W sekcji **Source** (Źródło):
   - **Branch**: wybierz `main`
   - **Folder**: wybierz `/docs`
5. Kliknij **Save** (Zapisz)

### 3. Poczekaj kilka minut

GitHub Pages będzie budował stronę. Po zakończeniu zobaczysz adres URL w formacie:
```
https://[username].github.io/[repository-name]/
```

## Aktualizacja strony

Za każdym razem, gdy chcesz zaktualizować stronę:

```bash
# 1. Zbuduj projekt
npm run build

# 2. Zatwierdź zmiany
git add docs/
git commit -m "Update build"
git push origin main
```

Po kilku minutach zmiany będą widoczne na GitHub Pages.

## Szczegóły techniczne

### Webpack Configuration
- **Output folder**: `docs/` (zamiast standardowego `dist/`)
- **CSS**: automatycznie bundlowany z JavaScript przez `style-loader`
- **Assets**: tylko 2 pliki: `index.html` i `bundle.[hash].js`

### Dlaczego CSS jest w JavaScript?
Webpack używa `style-loader` i `css-loader`, które:
1. Importują CSS w pliku `app.js`
2. Wstawiają style do `<head>` za pomocą JavaScript
3. Zmniejszają liczbę requestów HTTP

### Testowanie lokalne

Przed wdrożeniem możesz przetestować lokalnie:

```bash
# Zbuduj projekt
npm run build

# Uruchom lokalny serwer (bez cache!)
npx http-server docs -p 8080 -c-1

# Otwórz http://localhost:8080 w przeglądarce
```

⚠️ **Uwaga o cache**: Jeśli widzisz błędy 404 dla `css/main.css` lub `js/app.js`, wyczyść cache przeglądarki (Cmd+Shift+R na Mac).

## Struktura projektu

```
├── docs/               # ← GitHub Pages serwuje stąd
│   ├── index.html
│   └── bundle.[hash].js
├── src/
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   └── app.js
│   └── index.html
├── webpack.config.js
└── package.json
```
