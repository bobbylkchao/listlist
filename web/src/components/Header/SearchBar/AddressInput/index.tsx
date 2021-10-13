import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.scss';

const AddressInput = (props:{width?: number}) => {
  const getReduxStoreState = useSelector((state:any) => state);

  return(
    <div
      className="searchBar-addressInput-wrapper"
      style={{
        flex: props.width ? props.width : 1,
      }}
      onClick={(e) => console.log(e)}
    >
      <div className="searchBar-addressInput-inside-main">
        <div><FontAwesomeIcon icon="map-marker-alt"/></div>
        <div>
          {
            getReduxStoreState['userGeo']['state'] ? getReduxStoreState['userGeo']['state']['city'] : '...'
          }
        </div>
        <div>150km</div>
      </div>
    </div>
  );
};

export default AddressInput;