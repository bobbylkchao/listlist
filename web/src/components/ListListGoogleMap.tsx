import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, Circle, useGoogleMap } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import webConfig from '../web.config';

const ListListGoogleMap = (params: { showExactLocation: boolean, lat: number, lng: number, circleMeters?: number, style: any }) => {
  // google map
  const [map, setMap] = React.useState<any>(null);
  const [zoom, setZoom] = React.useState<number>(14);

  const onLoad = React.useCallback(function callback(map:any) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map:any) {
    setMap(null);
  }, []);

  const zoomValue = () => {
    /**
     * These are relationships between circleMeters and zoom level;
    */
    if(params && params.circleMeters){
      if(params.circleMeters/1000 > 270) return setZoom(5);
      if(params.circleMeters/1000 > 120) return setZoom(6);
      if(params.circleMeters/1000 > 80) return setZoom(7);
      if(params.circleMeters/1000 >= 40) return setZoom(8);
      if(params.circleMeters/1000 >= 25) return setZoom(9);
      if(params.circleMeters/1000 >= 10) return setZoom(10);
      if(params.circleMeters/1000 >= 6) return setZoom(11);
      if(params.circleMeters/1000 >= 2) return setZoom(12);
      if(params.circleMeters/1000 > 1) return setZoom(13);
      if(params.circleMeters/1000 <= 1) return setZoom(14);
    }
  };

  React.useEffect(() => {
    zoomValue();
  }, [params, map]);

  return params && params.lat !== 0 && params.lng !== 0 ? (
    <>
      <GoogleMap
        mapContainerStyle={params.style}
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
          minZoom: 5,
          maxZoom: 14,
          scrollwheel: false,
          streetViewControl: false,
          zoom: zoom
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
              radius={params.circleMeters ? params.circleMeters : 450}
              options={{
                fillColor: '#007ae6',
                strokeColor: '#0055a0',
                strokeOpacity: 5,
                strokeWeight: 1,
              }}
            ></Circle>
        }
      </GoogleMap>
    </>
  ) : <></>
};

export default ListListGoogleMap;
