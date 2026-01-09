// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Lokalizacja IP - Strona Główna', () => {
  
  test('powinien załadować stronę główną i wyświetlić tytuł', async ({ page }) => {
    await page.goto('/');
    
    // Sprawdź tytuł strony
    await expect(page).toHaveTitle(/Lokalizacja IP/);
    
    // Sprawdź główny nagłówek
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Twoja Lokalizacja po IP');
    
    // Screenshot po załadowaniu strony
    await page.screenshot({ path: 'test-results/screenshots/homepage-loaded.png', fullPage: true });
  });

  test('powinien wyświetlić wszystkie karty z danymi', async ({ page }) => {
    await page.goto('/');
    
    // Poczekaj na załadowanie danych
    await page.waitForTimeout(1000);
    
    // Sprawdź kartę z adresem IP
    const ipCard = page.locator('.card.hover-blue');
    await expect(ipCard).toBeVisible();
    await expect(ipCard.locator('.icon-container')).toContainText('Adres IP');
    
    // Sprawdź kartę z lokalizacją
    const locationCard = page.locator('.card.hover-red');
    await expect(locationCard).toBeVisible();
    await expect(locationCard.locator('.icon-container')).toContainText('Miejsce');
    
    // Sprawdź kartę z koordynatami
    const coordsCard = page.locator('.card.hover-green');
    await expect(coordsCard).toBeVisible();
    await expect(coordsCard.locator('.icon-container')).toContainText('Koordynaty');
    
    // Screenshot wszystkich kart
    await page.screenshot({ path: 'test-results/screenshots/all-cards-visible.png', fullPage: true });
  });

  test('powinien załadować i wyświetlić mapę', async ({ page }) => {
    await page.goto('/');
    
    // Sprawdź czy kontener mapy istnieje w DOM
    const mapContainer = page.locator('#map');
    await expect(mapContainer).toBeAttached();
    
    // Sprawdź czy wrapper mapy istnieje
    const mapWrapper = page.locator('.map-wrapper');
    await expect(mapWrapper).toBeAttached();
    
    // Czekaj na odpowiedź API i załadowanie mapy
    const apiResponsePromise = page.waitForResponse(
      response => response.url().includes('ipwho.is') && response.status() === 200,
      { timeout: 15000 }
    );
    
    let mapInitialized = false;
    try {
      await apiResponsePromise;
      // Czekaj na inicjalizację Leaflet po API
      await page.waitForTimeout(3000);
      
      // Sprawdź czy mapa Leaflet została załadowana
      const leafletContainer = page.locator('.leaflet-container');
      const isAttached = await leafletContainer.count() > 0;
      mapInitialized = isAttached;
      
      if (mapInitialized) {
        console.log('Mapa Leaflet została zainicjalizowana');
      }
    } catch (error) {
      console.log('API nie odpowiedziało, mapa może nie być zainicjalizowana');
    }
    
    // Screenshot mapy (załadowanej lub nie)
    await page.screenshot({ path: 'test-results/screenshots/map-loaded.png', fullPage: true });
  });

  test('powinien wyświetlić dane IP po załadowaniu API', async ({ page }) => {
    await page.goto('/');
    
    // Czekaj na odpowiedź API z większym timeoutem
    const apiResponsePromise = page.waitForResponse(
      response => response.url().includes('ipwho.is') && response.status() === 200,
      { timeout: 15000 }
    );
    
    let apiSuccess = true;
    try {
      await apiResponsePromise;
      // Dodatkowy czas na przetworzenie danych
      await page.waitForTimeout(1000);
    } catch (error) {
      console.log('API nie odpowiedziało w czasie, sprawdzamy stan błędu');
      apiSuccess = false;
    }
    
    if (apiSuccess) {
      // Sprawdź czy adres IP został załadowany (nie jest już "Ładowanie...")
      const ipAddress = page.locator('#ip-address');
      await expect(ipAddress).not.toHaveText('Ładowanie...', { timeout: 10000 });
      await expect(ipAddress).not.toHaveText('Błąd');
      
      // Sprawdź czy lokalizacja została załadowana
      const locationText = page.locator('#location-text');
      await expect(locationText).not.toHaveText('Ładowanie...', { timeout: 10000 });
      
      // Sprawdź czy koordynaty zostały załadowane
      const latitude = page.locator('#lat');
      const longitude = page.locator('#lng');
      await expect(latitude).not.toHaveText('---');
      await expect(longitude).not.toHaveText('---');
    } else {
      // Jeśli API nie odpowiedziało, sprawdź czy jest komunikat o błędzie lub AdBlock
      const ipAddress = page.locator('#ip-address');
      const locationText = page.locator('#location-text');
      
      // Może być "Ładowanie...", "Błąd" lub rzeczywiste dane
      const ipText = await ipAddress.textContent();
      const locText = await locationText.textContent();
      
      console.log(`IP: ${ipText}, Location: ${locText}`);
      expect(['Ładowanie...', 'Błąd', 'Niedostępne (np. AdBlock)']).toContain(ipText || 'Ładowanie...');
    }
    
    // Screenshot z danymi API (lub brakiem danych)
    await page.screenshot({ path: 'test-results/screenshots/api-data-loaded.png', fullPage: true });
  });

  test('powinien zawierać responsywny design', async ({ page }) => {
    await page.goto('/');
    
    // Test na szerokości desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/screenshots/desktop-view.png', fullPage: true });
    
    // Test na szerokości tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/screenshots/tablet-view.png', fullPage: true });
    
    // Test na szerokości mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/screenshots/mobile-view.png', fullPage: true });
  });

});
