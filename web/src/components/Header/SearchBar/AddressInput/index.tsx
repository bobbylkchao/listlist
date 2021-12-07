import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// listlist
import AddressSeletionModal from '../../../AddressSelectionModal';
import styles from "./index.module.scss";

const AddressInput = (props:{width?: number}) => {
  const addressSeletionModalRef = React.createRef<any>();
  const globalReducer = useSelector((state:any) => state.globalReducer);

  return(
    <>
      <div
        className={styles.searchBar_addressInput_wrapper}
        style={{
          flex: props.width ? props.width : 1,
        }}
        onClick={(e:any) => addressSeletionModalRef.current.show()}
      >
        <div className={styles.searchBar_addressInput_inside_main}>
          <div><FontAwesomeIcon icon="map-marker-alt"/></div>
          <div>
            <span>
            {
              globalReducer.searchArea.city ? globalReducer.searchArea.city : '...'
            }
            </span>
          </div>
          <div>
            <span>
              { globalReducer.searchArea.areaDistance ? globalReducer.searchArea.areaDistance : '...' }km
            </span>
          </div>
        </div>
      </div>
      <AddressSeletionModal onRef={addressSeletionModalRef}/>
    </>
  );
};

export default AddressInput;
