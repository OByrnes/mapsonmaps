import React, { useState } from 'react';

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';



const MapPageA= () => {
    
const [currentPosition, setCurrentPosition] = useState({lat:43.11016617798622,lng:-89.48826131670266})


const { isLoaded } =  {isLoaded: false}
//  useJsApiLoader({
//   id: 'google-map-script',
//   googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
// })
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
              position={currentPosition} />
        </GoogleMap>:null}
        </div>
       
      </div>
    );
          
}
 
export default MapPageA