import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { mapIconProps } from './constants'
import type { MapComponentProps } from './types'

export function MapComponent({
  width = '100%',
  height = 350,
  center = [-10.914488888529405, -37.071479658303346],
  zoom = 13,
  markerText = 'Local selecionado',
}: MapComponentProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="z-0"
      style={{ width, height }}
      scrollWheelZoom
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={center} icon={mapIconProps}>
        <Popup>{markerText}</Popup>
      </Marker>
      <Marker
        position={[-10.913056157651361, -37.094267705762114]}
        icon={mapIconProps}
      >
        <Popup>{markerText}</Popup>
      </Marker>
      <Marker
        position={[-10.920556848588014, -37.04886327221902]}
        icon={mapIconProps}
      >
        <Popup>{markerText}</Popup>
      </Marker>
    </MapContainer>
  )
}
