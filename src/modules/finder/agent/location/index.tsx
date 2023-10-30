import React from 'react'
// import { MapContainer, TileLayer } from 'react-leaflet'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import { Button } from '@/components'

const MapContainer = dynamic(() => import('react-leaflet').then((item) => item.MapContainer), {
  ssr: false,
})

const TileLayer = dynamic(() => import('react-leaflet').then((item) => item.TileLayer), {
  ssr: false,
})

const LeafletControlGeocoder = dynamic(() => import('./geocoder'), {
  ssr: false,
})

export const MapLocationSelector = ({ location, setLocation }: any) => {
  const position = [51.505, -0.09]

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}

        // style={{ height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LeafletControlGeocoder location={location} setLocation={setLocation} />
      </MapContainer>
    </div>
  )
}

// export default Map
