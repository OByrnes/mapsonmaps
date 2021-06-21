import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import markMarker from "../images/mark.jpeg"

const MapPageB= () => {
    
const [currentPosition, setCurrentPosition] = useState({lat:43.11016617798622,lng:-89.48826131670266})

const k = useSelector(state => state.maps.markers.k)
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
        <Marker 
              position={currentPosition}
              title="Marker of Mark"
              icon={markMarker}
              streetView={false} />
        </GoogleMap>:null}
        </div>
       
      </div>
    );
          
}
 
export default MapPageB