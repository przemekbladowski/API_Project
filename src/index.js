// Import styles
import './styles/main.scss';

// Import Leaflet
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// DOM Elements
const ipAddressEl = document.getElementById('ip-address');
const locationEl = document.getElementById('location');
const latitudeEl = document.getElementById('latitude');
const longitudeEl = document.getElementById('longitude');
const mapContainer = document.getElementById('map');

// Map instance
let map = null;
let marker = null;

// Initialize map
function initMap(lat, lng) {
  if (map) {
    map.setView([lat, lng], 13);
  } else {
    map = L.map(mapContainer).setView([lat, lng], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);
  }
  
  // Add or update marker
  if (marker) {
    marker.setLatLng([lat, lng]);
  } else {
    marker = L.marker([lat, lng]).addTo(map);
  }
  
  return map;
}

// Fetch IP address
async function fetchIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) throw new Error('Nie udało się pobrać adresu IP');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('IP fetch error:', error);
    throw error;
  }
}

// Fetch geolocation data
async function fetchGeolocation(ip) {
  try {
    // Using ipapi.co instead of ip-api.com because it supports HTTPS on free tier
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!response.ok) throw new Error('Nie udało się pobrać lokalizacji');
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.reason || 'Błąd geolokalizacji');
    }
    
    return {
      city: data.city,
      country: data.country_name,
      lat: data.latitude,
      lon: data.longitude,
    };
  } catch (error) {
    console.error('Geolocation fetch error:', error);
    throw error;
  }
}

// Update UI with data
function updateUI(ip, geoData) {
  ipAddressEl.textContent = ip;
  ipAddressEl.classList.remove('loading');
  
  locationEl.textContent = `${geoData.city}, ${geoData.country}`;
  locationEl.classList.remove('loading');
  
  latitudeEl.textContent = `${geoData.lat.toFixed(5)}°`;
  longitudeEl.textContent = `${geoData.lon.toFixed(5)}°`;
  
  // Initialize map with location
  initMap(geoData.lat, geoData.lon);
  
  // Add popup to marker
  if (marker) {
    marker.bindPopup(`<b>${geoData.city}</b><br>${geoData.country}`).openPopup();
  }
}

// Show error state
function showError(message) {
  ipAddressEl.textContent = 'Błąd';
  ipAddressEl.classList.add('error');
  locationEl.textContent = message;
  locationEl.classList.add('error');
  latitudeEl.textContent = '--';
  longitudeEl.textContent = '--';
}

// Main initialization
async function init() {
  // Add loading state
  ipAddressEl.classList.add('loading');
  locationEl.classList.add('loading');
  
  try {
    // Fetch IP first
    const ip = await fetchIP();
    ipAddressEl.textContent = ip;
    
    // Fetch geolocation based on IP
    const geoData = await fetchGeolocation(ip);
    
    // Update entire UI
    updateUI(ip, geoData);
  } catch (error) {
    showError('Nie udało się załadować danych');
    console.error('Initialization error:', error);
  }
}

// Start application
document.addEventListener('DOMContentLoaded', init);
