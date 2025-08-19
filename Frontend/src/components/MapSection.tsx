// src/components/MapSection.tsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Perbaikan untuk ikon default Leaflet yang terkadang tidak muncul
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Market {
  id: number;
  nama_pasar: string;
  alamat: string;
  latitude?: number;
  longitude?: number;
}

interface MapProps {
  markets: Market[];
  selectedMarket: Market | null;
}

// Komponen kecil untuk mengubah pusat peta saat state berubah
function ChangeMapView({ center }: { center: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 15); // Angka 15 adalah level zoom
  }, [center, map]);

  return null;
}

export default function MapSection({ markets, selectedMarket }: MapProps) {
  // Tentukan posisi tengah awal, misalnya Semarang atau pasar pertama
  const initialCenter: LatLngExpression = selectedMarket && selectedMarket.latitude && selectedMarket.longitude
    ? [selectedMarket.latitude, selectedMarket.longitude]
    : [-6.9926, 110.4208]; // Koordinat default (Semarang)

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer center={initialCenter} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectedMarket && selectedMarket.latitude && selectedMarket.longitude && (
          <ChangeMapView center={[selectedMarket.latitude, selectedMarket.longitude]} />
        )}
        {markets.map(market => (
          market.latitude && market.longitude && (
            <Marker key={market.id} position={[market.latitude, market.longitude]}>
              <Popup>
                <b>{market.nama_pasar}</b><br />{market.alamat}
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}