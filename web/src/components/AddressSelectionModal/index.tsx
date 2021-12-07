/**
 * Address Seletion Modal
 * @desc Use `Ref` to call the function show() or hide()
 * @param onRef createRef
 * @param callback callback function
 * @returns {object}
 */
 import React from 'react';
 import { useSelector, useDispatch } from 'react-redux';
 import Modal from 'react-bootstrap/Modal';
 import Button from 'react-bootstrap/Button';
 import styled from 'styled-components';
 import Slider from 'rc-slider';
 import '../../../node_modules/rc-slider/assets/index.css';

 // google map related
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';

 // listlist
 import webConfig from "../../web.config";
 import mapPlaceHolderImage from '../../assets/images/googleMapPlaceholder.png';
 import LazyImage from '../LazyImage';
 import ListListGoogleMap from '../ListListGoogleMap';
 import styles from './index.module.scss';
 
 const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
   position: relative;
 `;
 
const AddressSeletionModal = (props: { onRef: any }) => {
  const categoryReducerState = useSelector((state:any) => state.categoryList.state);
  const geoState = useSelector((state:any) => state.userGeo.state);
  const searchConfigState = useDispatch();

  const [visible, setVisible] = React.useState<boolean>(false);

  // hook to store google autocomplete input value
  const [googleMapInputValue, setGoogleMapInputValue] = React.useState<string | null>(null);

  // hook to store which city this post will be posted at
  const [adPostedInCity, setAdPostedInCity] = React.useState<string | null>(null);

  // hook to store lat and long of current selected address
  const [latAndLong, setLatAndLong] = React.useState<{lat: number, long: number}>({lat: 10, long: 10});

  // hook to handle distance change, unit: KM
  const [distance, setDistance] = React.useState<number>(50);

  // save new search configuation infos to redux
  const updateSearchConfig = () => {
    if(adPostedInCity){
      searchConfigState({
        type: "setSearchArea",
        value: {
          city: adPostedInCity,
          lat: latAndLong.lat,
          long: latAndLong.long,
          areaDistance: distance,
        }
      });
    }
    setVisible(false);
  };

  React.useImperativeHandle(props.onRef, () => {
    return {
      show: () => setVisible(true),
      hide: () => setVisible(false),
    }
  });

  return(
    <Modal
      size="lg"
      show={visible}
      animation={false}
      keyboard={false}
      centered={true}
      backdrop="static"
      onHide={() => {
        // set all state to default when hiding
        setGoogleMapInputValue(null);
        setAdPostedInCity(null);
        setLatAndLong({lat: 10, long: 10});
        setDistance(50);
        // set modal to hide
        setVisible(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title
        style={{
          fontSize: 15,
          margin: '0 auto'
        }}
        >Where do you want to search?</Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{padding: 0, width: 798, height: 300}}
      >
        <Wrapper>

          {
            !googleMapInputValue
            ?
              <LazyImage
                id="mapplaceholder"
                src={mapPlaceHolderImage}
                alt="map placeholder"
                width={798}
                height={300}
                className={styles.mapPlaceHolder}
              />
            : null
          }
          
          <ListListGoogleMap
            showExactLocation={false}
            lat={latAndLong.lat}
            lng={latAndLong.long}
            circleMeters={distance*1000}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 798,
              height: 300,
              zIndex: 1,
            }}
          />

          <div
            style={{
              position: 'absolute',
              top: 15,
              zIndex: 2,
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                width: '80%'
              }}
            >
              <GooglePlacesAutocomplete
                apiKey={webConfig.googleMapsJavaScriptAPIKey}
                selectProps={{
                  defaultInputValue: googleMapInputValue,
                  placeholder: '',
                  isClearable: true,
                  onChange: (e:any) => {
                    if(e && e.value.description){
                      setGoogleMapInputValue(e.value.description);
                      // check the city and region
                      if(e.value.description.split(',').length >= 3){
                        let region = e.value.description.split(',')[e.value.description.split(',').length-2];
                        let city = e.value.description.split(',')[e.value.description.split(',').length-3];
                        setAdPostedInCity(city);
                      }
                      
                      // get geocode infos
                      geocodeByPlaceId(e.value.place_id)
                      .then((res:any) => {
                        if(res && res[0] && res[0].geometry.location){
                          setLatAndLong({
                            lat: res[0].geometry.location.lat(),
                            long: res[0].geometry.location.lng(),
                          });
                        }
                      });
                    }
                  },
                  onBlur: () => { return; }
                }}
                autocompletionRequest={{
                  componentRestrictions: {country: ['ca']}
                }}
                onLoadFailed={(error: any) => console.log(error)}
              />
            </div>
          </div>

        </Wrapper>
      </Modal.Body>

      <Modal.Footer>
        {
          adPostedInCity ?
            <div className={styles.footer}>
              <div>
                <div><span>Distance</span></div>
                <div>
                  <Slider
                    min={1}
                    max={500}
                    value={distance}
                    trackStyle={{
                      backgroundColor: '#0f6dfd',
                    }}
                    handleStyle={{
                      width: 20,
                      height: 20,
                      borderColor: '#0f6dfd',
                      marginTop: -8
                    }}
                    railStyle={{
                      height: 6
                    }}
                    onChange={(e:any) => setDistance(e)}
                  />
                </div>
                <div><span>{ distance }km</span></div>
              </div>
              <div>
                <Button variant="primary" onClick={() => updateSearchConfig()}>Done</Button>
              </div>
            </div>
          : <></>
        }
      </Modal.Footer>
    </Modal>
  );
};

export default AddressSeletionModal;
 