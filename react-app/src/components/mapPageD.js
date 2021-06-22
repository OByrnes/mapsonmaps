import React, { useState, useCallback } from 'react';
import { useSelector } from "react-redux";
import Geocode from 'react-geocode'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';



const MapPageD= () => {
    
const [currentPosition, setCurrentPosition] = useState(null)
const [address, setAddress] = useState('')

const k = useSelector(state => state.maps.markers.k)
const markers = useSelector(state => state.maps.markers.markers)

Geocode.setApiKey(k);
    
// set response language. Defaults to english.
Geocode.setLanguage("en");

Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();


// Get latitude & longitude from address
const makeMap = (e) => {
    e.preventDefault()
    Geocode.fromAddress(address).then(
        (response) => {
          const {lat, lng} = response.results[0].geometry.location
          setCurrentPosition({lat, lng})
          
        },
        (error) => {
          console.error(error);
        }
      );
       
        
}
const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: k
  })
  
  const containerStyle = {
    width: '800px',
    height: '800px'
  };

  const [map, setMap] = useState(null)
  
  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])
 
 
    return (
      // Important! Always set the container height explicitly
      <div className="map_page__container">
          <form onSubmit={(e)=>makeMap(e)}>
              <label>
                  Starting Point
                  <input type='text' value={address} onChange={(e)=>setAddress(e.target.value)} />
              </label>
              <button type="submit">Make Map</button>
          </form>
 
        <div style={{ height: '900px', width: '900px' }}>
        {isLoaded && currentPosition ?<GoogleMap
          mapContainerStyle={containerStyle}
          zoom={12}
          center={currentPosition}
          onUnmount={onUnmount}
          >
               {markers.map((marker) => (
            
              <Marker key={marker.id} 
              position={{lat:marker.lat, lng:marker.lng}}
              icon={{
                path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
                fillColor: marker.color,
                fillOpacity: 1,
                scale: .2,
                strokeColor: 'gold',
                strokeWeight: 2
              }}
              streetView={false} >
                 
              <InfoWindow position={{lat:marker.lat, lng:marker.lng}} >
                <div>
                  <span style={{color: `${marker.color}`}}>{marker.name}</span>
                </div>
              </InfoWindow>
              </Marker>
             
            
           ))}

        </GoogleMap>:null}
        </div>
       
      </div>
    );
          
}
 
export default MapPageD