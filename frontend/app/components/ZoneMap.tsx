"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

type ZoneData = {
  name: string;
  lat: number;
  lng: number;
  demand: string;
  tons: number;
};

const ZONE_COORDS: ZoneData[] = [
  { name: "Colombo", lat: 6.9271, lng: 79.8612, demand: "MEDIUM", tons: 0 },
  { name: "Kandy", lat: 7.2906, lng: 80.6337, demand: "MEDIUM", tons: 0 },
  { name: "Galle", lat: 6.0535, lng: 80.2210, demand: "MEDIUM", tons: 0 },
];

const demandColors: Record<string, string> = {
  HIGH: "#dc2626",
  MEDIUM: "#ca8a04",
  LOW: "#16a34a",
};

export default function ZoneMap({ zoneData }: { zoneData: Record<string, { demand: string; tons: number }> }) {
  return (
    <MapContainer
      center={[7.2, 80.3]}
      zoom={8}
      style={{ height: "400px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {ZONE_COORDS.map((zone) => {
        const data = zoneData[zone.name];
        const demand = data?.demand || "MEDIUM";
        const tons = data?.tons || 0;
        return (
          <CircleMarker
            key={zone.name}
            center={[zone.lat, zone.lng]}
            radius={15}
            pathOptions={{
              color: demandColors[demand],
              fillColor: demandColors[demand],
              fillOpacity: 0.6,
            }}
          >
            <Popup>
              <strong>{zone.name}</strong><br />
              Demand: {demand}<br />
              Estimated: {tons} tons
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}