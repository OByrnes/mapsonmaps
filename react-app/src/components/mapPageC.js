import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';



const MapPageC= () => {
    
const [currentPosition, setCurrentPosition] = useState({lat:43.11016617798622,lng:-89.48826131670266})

const k = useSelector(state => state.maps.markers.k)
const markers = useSelector(state => state.maps.markers.markers)
const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: k
  })
  
  const containerStyle = {
    width: '800px',
    height: '800px'
  };

  const [map, setMap] = useState(null)
  
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
 
 
    return (
      // Important! Always set the container height explicitly
      <div className="map_page__container">
 
        <div style={{ height: '900px', width: '900px' }}>
        {isLoaded ?<GoogleMap
          mapContainerStyle={containerStyle}
          zoom={8}
          center={currentPosition}
          onUnmount={onUnmount}
          >
               {markers.map((marker) => (
              
              <Marker key={marker.id} 
              position={{lat:marker.lat, lng:marker.lng}}
              title={marker.name}
              icon={{
                path: 'M 100 100 L 300 100 L 200 300 z',
                fillColor: marker.color,
                fillOpacity: 1,
                scale: .2,
                strokeColor: 'gold',
                strokeWeight: 2
              }}
              streetView={false} />
              
             
           ))}

        </GoogleMap>:null}
        </div>
       
      </div>
    );
          
}
 
export default MapPageC