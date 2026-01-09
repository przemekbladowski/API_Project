// Inicjalizacja mapy (domyślny widok zanim załadują się dane)
// Ustawiamy lekki zoom oddalony
const map = L.map("map", {
	zoomControl: false, // Ukrycie domyślnych przycisków zoom
}).setView([52.237, 21.017], 6)

// Dodanie przycisków zoom w prawym dolnym rogu
L.control
	.zoom({
		position: "bottomright",
	})
	.addTo(map)

// --- ZMIANA WARSTWY MAPY ---
// Używamy standardowej warstwy OpenStreetMap, która jest bardziej "widoczna" i ma większy kontrast
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map)
// ---------------------------

// Zmienna na marker
let marker

// Własna, większa ikona pinezki (standardowa dla Leaflet, ale upewniamy się że działa)
const customIcon = L.icon({
	iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
	iconRetinaUrl:
		"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
	shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
})

// Funkcja pobierająca dane użytkownika
async function getUserLocation() {
	try {
		// Wywołanie darmowego API do geolokalizacji po IP
		const response = await fetch("https://ipwho.is/")
		const data = await response.json()

		if (!data.success) {
			throw new Error("Nie udało się pobrać lokalizacji.")
		}

		// 1. Aktualizacja danych tekstowych na stronie
		document.getElementById("ip-address").textContent = data.ip
		document.getElementById(
			"location-text"
		).textContent = `${data.city}, ${data.country}`
		// Formatowanie koordynatów
		document.getElementById("lat").textContent = data.latitude.toFixed(5) + "°"
		document.getElementById("lng").textContent = data.longitude.toFixed(5) + "°"

		// 2. Aktualizacja mapy
		const lat = data.latitude
		const lng = data.longitude

		// Płynne przesunięcie widoku mapy (flyTo)
		// Zwiększyłem zoom do 14, żeby mapa była jeszcze dokładniejsza po zbliżeniu
		map.flyTo([lat, lng], 14, {
			animate: true,
			duration: 1.5, // sekundy
		})

		// Usunięcie starego markera jeśli istnieje i dodanie nowego
		if (marker) {
			map.removeLayer(marker)
		}

		marker = L.marker([lat, lng], { icon: customIcon })
			.addTo(map)
			.bindPopup(
				`<div style="text-align: center;"><b>Twoja przybliżona lokalizacja</b><br>${data.city}</div>`
			)
			.openPopup()
	} catch (error) {
		console.error("Błąd:", error)
		document.getElementById("location-text").textContent =
			"Niedostępne (np. AdBlock)"
		document.getElementById("ip-address").textContent = "Błąd"
	}
}

// Uruchomienie funkcji po załadowaniu strony
window.addEventListener("load", getUserLocation)
