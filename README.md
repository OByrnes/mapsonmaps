# Example of Basic Usage of Google Maps with React

This project is only to demonstrate how to implement Google maps with React.


## Step One: Create a Google API key
to create an API key you must first create a project:


* Create a new Google Cloud [project](https://console.cloud.google.com/projectcreate) in the Cloud Console:
* Fill out required fields. hint: You can change the project name if needed but you can't change the project ID after you create it.

![](https://i.imgur.com/vkseMeL.png)


---
### Billing

Set up a billing account for your project. [THIS LINK](https://console.cloud.google.com/projectselector/billing)


**Billing setup is required for each project, but you will only be charged if a project exceeds its free quota.**

(HINT: This is a good reason to be mindful of how you are storing your api key AND how you write your code to minimize calls you don't need)

* If billing is already enabled for the selected Cloud project, then the details about the billing account are listed.

* If no billing account exists, you are prompted to create a billing account and associate it with the selected Cloud project.

* If a billing account exists, you are prompted to enable billing if the selected Cloud project is not already associated with a billing account. You can also click Cancel and then click Create account to create and associate a new billing account.



---
Next:

* Go to the [Credentials page](https://console.cloud.google.com/project/_/apiui/credential)

* On the Credentials page, click Create credentials > API key. The API key created dialog displays your newly created API key.

---
Once you have your API Key and your project made you can enable [products](https://cloud.google.com/maps-platform/products). 

If you want to display a map in your app: you will need the [maps javascript API](https://console.cloud.google.com/apis/library/maps-backend.googleapis.com?id=fd73ab50-9916-4cde-a0f6-dc8be0a0d425)
![](https://i.imgur.com/D0DHbcl.png)


Click Enable

Browse the other APIs you might need:

If you will be making addresses into markers on the map enable the [geocoding API](https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com?filter=category:maps&id=42fea2de-420b-4bd7-bd89-225be3b8b7b0) as well

For searching places you will need the [places API](https://console.cloud.google.com/apis/library/places-backend.googleapis.com?id=ecefdd63-ee2b-4751-b6c3-8e9113791baf) 

For getting directions you will need the [Directions API](https://console.cloud.google.com/apis/library/directions-backend.googleapis.com?id=c6b51d83-d721-458f-a259-fae6b0af35c5)

For getting commute distances you will need the [Distance Matrix](https://console.cloud.google.com/apis/library/distance-matrix-backend.googleapis.com?filter=category%3Amaps&id=82aa0d98-49bb-4855-9da9-efde390a3834)

---

## HOW TO STORE your API KEY!!!!

**THIS IS THE MOST IMPORTANT PART!!!!**

DO NOT PUSH YOUR API KEY TO GITHUB

This includes 'hiding it in a script tag' you are not hiding it. Bots can find it. This is not Sneaky.

### Two Options:
1) Store your API key in your backend .env file

This is what that would look like with a python / flask backend. 

.env
```
FLASK_APP=app
FLASK_ENV=development
SECRET_KEY=THISISSECRET
DATABASE_URL=postgresql://mapsonmaps_dev:password@localhost/mapsonmaps_app
REACT_APP_GOOGLE_MAPS_API=NOTMYREALAPIKEY
```
config.py
```
import os

class Config:
  SECRET_KEY=os.environ.get('SECRET_KEY')
  SQLALCHEMY_TRACK_MODIFICATIONS=False
  SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL')
  SQLALCHEMY_ECHO=True
  REACT_APP_GOOGLE_MAPS_API=os.environ.get("REACT_APP_GOOGLE_MAPS_API")
  ```
 
 OR
 
2) Store your API key in your frontend .env file

This is what that would look like
.env
```
REACT_APP_BASE_URL=http://localhost:5000
REACT_APP_MAPS_KEY=ALSONOTMYREALKEY
```

This is how you would access it in the map component
```
googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
```
Do you notice how those are the only 2? Thats right. Just those 2.
Either way add it to your Config variables when you deploy to heroku with the same key name that you use in your .env


## Now on to the CODE... 

I suggest using [@react-google-maps/api](https://react-google-maps-api-docs.netlify.app/#section-introduction)
```
npm install @react-google-maps/api
```
If you will need to translate an address into a marker you will also need [react-geocode](https://www.npmjs.com/package/react-geocode)
```
npm install react-geocode
```

This is a very basic map. 

```
import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';



const MapPageA= () => {


//This sets the center of the map. This must be set BEFORE the map loads
   
const [currentPosition, setCurrentPosition] = useState({lat:43.11016617798622,lng:-89.48826131670266})

// This is the equivalent to a script tag

const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
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
 
        <div style={{ height: '900px', width: '900px' }}>
            {isLoaded && <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={8}
              center={currentPosition}
              onUnmount={onUnmount}
              >
            </GoogleMap>}
        </div>
       
      </div>
    );
          
}
 
export default MapPageA

```


To add markers to your map import Marker from @react-google-maps/api
```
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

```

Add <Marker /> inside the GoogleMap component
the position prop must be set. 
There are many other customizable props that you can set on the Marker component. Check out the [docs ](https://react-google-maps-api-docs.netlify.app/#marker)

Such as Making a custom marker.
you can make a cusom marker by setting the path according to [SVG path notation](http://www.w3.org/TR/SVG/paths.html#PathData) like so:
```
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
```

![](https://i.imgur.com/4U1D78h.png)


Or you can specify the icon to be an image. Like if you wanted to make a Marker of Mark

```
            {isLoaded && <GoogleMap
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
        </GoogleMap>}
        
 ```
![](https://i.imgur.com/k0sBcX8.png)

You can Map over a list of places and make a marker for each place like so

```
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
```

You can add an InfoWindow as well, you add any jsx inside the infoWindow so its a nice way to customize the map
Import InfoWindow from @react-google-maps/api

```
import { GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';
```




ooooo..... So customizable

```
     <InfoWindow position={{lat:marker.lat, lng:marker.lng}} >
        <div>
          <span style={{color: `${marker.color}`}}>{marker.name}</span>
        </div>
      </InfoWindow>
```
![](https://i.imgur.com/cZbu3d2.png)

How to generate a map from address:

Use Geocode!

```
import Geocode from 'react-geocode'
```


```
//This is of course not the raw key but either from getting it from the backend and storing it in redux or in your frontend .env

Geocode.setApiKey(key);
    
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
```

Don't render the map until you have a starting location
```
 {isLoaded && currentPosition ?<GoogleMap
          mapContainerStyle={containerStyle}
          zoom={12}
          center={currentPosition}
          onUnmount={onUnmount}
          >
               {markers.map((marker) => (
              <>
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
             
             </>
           ))}

        </GoogleMap>:null}
        
```
![](https://i.imgur.com/MhgDOvq.png)

## Direction Instructions


In this example we will be getting directions from a preset origin point to one of the triangle markers when a user clicks on a triangle.

This isn't super relavent to many projects BUT it shows some important concepts. 

We will use the DirectionsService and the DirectionsRenderer from the @react-google-maps/api 
import the components you need like so. 

```
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

```


The DirectionsService needs a couple things to work
destination, origin and a callback.
> origins and destinations don't have to be coordinates

Set the destination and origin with useState. The destination we're going to set when a user clicks a triangle

The DirectionRenderer needs a response from the DirectionService
```
const [destination, setDestination] = useState('')
const [origin, setOrigin] = useState({lat:43.00952168472677, lng:-89.47153080578808})
const [response, setResponse] = useState(null)
```


How do we get the destination? 
We can get the destination by adding an onClick to the marker. 

```
<Marker 
  key={marker.id} 
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
  onClick={(e)=>makeDestination(e)}   <======= this is the onClick
  streetView={false} >
```
Notice that I'm passing e, the event object, to makeDestination

```
 const makeDestination = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    
    setDestination({lat, lng})
  }
```

Google map event objects have the latitude and longitude on the event. **Notice that lat/lng is invoked**

This is also true on click events on the map that aren't markers. You can add a onClick on the map component itself. 

**Directions Callback:**

```
const directionsCallback = (response) => {
    
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response)
    } else {
        console.log("Route: " + response.status);
    }
    } 
  }
```

So now we have all of the Required elements of the DirectionService 
* The origin (where to start)
* the destination (where to go)
* the callback (what to do with that information)

You can also change the travelMode in the options. If you want Bicycling directions, public transportation, driving. 

The component should look like this

```
{ (destination !== '' && response === null) && (
    <DirectionsService
      // required
      options={{ 
        destination: destination,
        origin: origin,
        travelMode: 'WALKING'
      }}
      // required
      callback={directionsCallback}

    />
  )
}
```
Wait... why are we making sure response is null? 
Because if we don't make sure response is null it will continue to ask for directions over and over and cause an error "over_query_limit". Google maps doesn't just check for how many queries you make cummulatively but also too many queries in a short period of time

Now you want to render the 'polyline' to the map with the DirectionsRenderer. Pass the response we just got to the DirectionRenderer component.

```
 {
  response !== null && (
    <DirectionsRenderer

      options={{ 
        directions: response
      }}

    />
  )
}
```

![](https://i.imgur.com/KdsvPYN.png)

**But wait there's more!** 
You can render the direction instructions by setting a dom element to the prop panel





```
  response !== null && (
        <DirectionsRenderer
          panel={document.getElementById("panel")}
          options={{ 
            directions: response
          }}

        />
      )
    }

</GoogleMap>:null}
</div>

<div id='panel'>

</div>
```

![](https://i.imgur.com/WQzefTp.png)






## Storing Latitude and Longitude / Locations in the database:

There are many ways of doing this. 

1) Store the address in the database and use the geocoding library to get the latitude and longitude to add the marker / infowindow / set the center of the map. I would suggest not doing it this way. It works. It is a possible solution... but it makes extra calls to the google maps api every time you render the map. 

2) When you add a new item to the database store the latitude and longitude to the database as well. [Faker has a library for seeding random coordinates](https://faker.readthedocs.io/en/master/providers/faker.providers.geo.html?highlight=coordinate#faker.providers.geo.Provider.coordinate).


ONE Possible way of storing coordinates (using Flask / Python Backend):

```
class Marker(db.Model):
    __tablename__ = 'markers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    color = db.Column(db.String(7))
    lat = db.Column(db.Numeric(scale=13, asdecimal=False))
    lng = db.Column(db.Numeric(scale=13, asdecimal=False))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "color": self.color,
            "lat": self.lat,
            "lng": self.lng
            }
```

Note: On how many decimal Places you might need
How exact do you need that marker?

| 0 | 1.0        | 1° 00′ 0″        | country or large region                             | 111.32 km | 102.47 km | 78.71 km | 43.496 km |
|:-:|------------|------------------|-----------------------------------------------------|-----------|-----------|----------|-----------|
| 1 | 0.1        | 0° 06′ 0″        | large city or district                              | 11.132 km | 10.247 km | 7.871 km | 4.3496 km |
| 2 | 0.01       | 0° 00′ 36″       | town or village                                     | 1.1132 km | 1.0247 km | 787.1 m  | 434.96 m  |
| 3 | 0.001      | 0° 00′ 3.6″      | neighborhood, street                                | 111.32 m  | 102.47 m  | 78.71 m  | 43.496 m  |
| 4 | 0.0001     | 0° 00′ 0.36″     | individual street, large buildings                  | 11.132 m  | 10.247 m  | 7.871 m  | 4.3496 m  |
| 5 | 0.00001    | 0° 00′ 0.036″    | individual trees, houses                            | 1.1132 m  | 1.0247 m  | 787.1 mm | 434.96 mm |
| 6 | 0.000001   | 0° 00′ 0.0036″   | individual humans                                   | 111.32 mm | 102.47 mm | 78.71 mm | 43.496 mm |
| 7 | 0.0000001  | 0° 00′ 0.00036″  | practical limit of commercial surveying             | 11.132 mm | 10.247 mm | 7.871 mm | 4.3496 mm |
| 8 | 0.00000001 | 0° 00′ 0.000036″ | specialized surveying (e.g. tectonic plate mapping) | 1.1132 mm | 1.0247 mm | 787.1 μm | 434.96 μm |


### This walkthrough does not cover all the things you can do with Google Maps. In order to correctly implement any features you should read the documentation!!! 


