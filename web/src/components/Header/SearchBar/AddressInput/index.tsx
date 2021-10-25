import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./index.module.scss";

const AddressInput = (props:{width?: number}) => {
  const getReduxStoreState = useSelector((state:any) => state);

  return(
    <div
      className={styles.searchBar_addressInput_wrapper}
      style={{
        flex: props.width ? props.width : 1,
      }}
      onClick={(e:any) => console.log(e)}
    >
      <div className={styles.searchBar_addressInput_inside_main}>
        <div><FontAwesomeIcon icon="map-marker-alt"/></div>
        <div>
          <span>
          {
            getReduxStoreState['userGeo']['state'] ? getReduxStoreState['userGeo']['state']['city'] : '...'
          }
          </span>
        </div>
        <div>
          <span>150km</span>
        </div>
      </div>
    </div>
  );
};

export default AddressInput;
