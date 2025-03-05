"use client"; 

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

interface MapProps {
  address: string;
}

export default function Map({ address }: MapProps) {
  const [coords, setCoords] = useState<[number, number]>([-23.55052, -46.633308])

  function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    map.setView(center, 15);
    return null;
  }

  useEffect(() => {
    if (!address) return;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      })
      .catch((err) => console.error("Erro ao buscar localização:", err));
  }, [address]);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-300 shadow-md">
      <MapContainer className="h-full w-full" >
        <ChangeView center={coords} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={coords} />
      </MapContainer>
    </div>
  );
}
