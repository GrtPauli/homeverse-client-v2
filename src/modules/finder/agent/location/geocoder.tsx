import { GeoSearchControl, MapBoxProvider, OpenStreetMapProvider } from 'leaflet-geosearch'
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import 'leaflet-geosearch/dist/geosearch.css'
import L from 'leaflet'
import dynamic from 'next/dynamic'

// const L = dynamic(() => import('leaflet'), {
//   ssr: false
// });

const SearchField = ({ location, setLocation }: any) => {
  //   const provider = new MapBoxProvider({
  //     params: {
  //       access_token: apiKey,
  //     },
  //   });
  const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
  })

  const provider = new OpenStreetMapProvider()

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    style: 'bar',
    showMarker: true, // optional: true|false  - default true
    showPopup: false, // optional: true|false  - default false
    marker: {
      // optional: L.Marker    - default L.Icon.Default
      icon: icon,
      draggable: false,
    },
    popupFormat: ({ query, result }: any) => result.label, // optional: function    - default returns result label,
    resultFormat: ({ result }: any) => result.label, // optional: function    - default returns result label
    maxMarkers: 1, // optional: number      - default 1
    retainZoomLevel: false, // optional: true|false  - default false
    animateZoom: true, // optional: true|false  - default true
    autoClose: false, // optional: true|false  - default false
    searchLabel: 'Enter address', // optional: string      - default 'Enter address'
    keepResult: false, // optional: true|false  - default false
    updateMap: true, // optional: true|false  - default true
  })

  const map = useMap()
  map.on('geosearch/showlocation', (e) => {
    console.log(e)
    // console.log("jjh")
    // setLocation(e.location.label)
  })

  useEffect(() => {
    map.addControl(searchControl)
    return () => map.removeControl(searchControl)
  }, [])

  return null
}

export default SearchField
