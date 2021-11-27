import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import webConfig from '../web.config';

const ListListGoogleMap = (params: { showExactLocation: boolean, lat: number, lng: number }) => {
  // google map
  const [map, setMap] = React.useState<any>(null);

  const onLoad = React.useCallback(function callback(map:any) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map:any) {
    setMap(null);
  }, []);

  React.useEffect(() => {
    console.log(`ListListGoogleMap loaded...${JSON.stringify(params)}`);
  }, [params, map]);

  return params && params.lat !== 0 && params.lng !== 0 ? (
    <GoogleMap
      mapContainerStyle={{width: '390px', height: '256px'}}
      center={{
        lat: params.lat,
        lng: params.lng,
      }}
      clickableIcons={false}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDoubleClickZoom: true,
        draggable: false,
        fullscreenControl: false,
        keyboardShortcuts: false,
        mapTypeControl: false,
        minZoom: 10,// city level
        maxZoom: 14,// street level
        scrollwheel: false,
        streetViewControl: false,
        zoom: 14
      }}
    >
      {
        params.showExactLocation 
        ?
          <Marker
            position={{
              lat: params.lat,
              lng: params.lng,
            }}
          ></Marker>
        :
          <Circle
            center={{
              lat: params.lat,
              lng: params.lng,
            }}
            radius={450}
            options={{
              fillColor: '#007ae6',
              strokeColor: '#0055a0',
              strokeOpacity: 5,
              strokeWeight: 1,
            }}
          ></Circle>
      }
    </GoogleMap>
  ) : <></>
};

export default ListListGoogleMap;
