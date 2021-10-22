import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import styles from './index.module.scss';

const SearchBtnComponent = styled.a`
  display: flex;
  width: 100%;
  height: 100%;
  color: #8d8d8d;
  background-color: #f8f9f9;
  justify-content: center;
  align-items: center;

  &:hover{
    background-color: #ebebed;
    cursor: pointer;
    color: #8d8d8d;
  }
`;

const SearchBtn = (props:{width?:number, passData:string}) => {
  const router = useHistory();
  const getReduxStoreState = useSelector((state:any) => state);

  const submitSearch = () => {
    if(!props.passData){
      return router.push(`/category/${getReduxStoreState['categorySelected']['state'] ? getReduxStoreState['categorySelected']['state']['id'] : 0}`);
    }
    router.push(`/search/${props.passData}`);
  };

  return(
    <div
      className={styles.searchbar_searchbtn}
      style={{ flex: props.width ? props.width : 1 }}
    >
      <SearchBtnComponent
        onClick={() => submitSearch()}
      >
        <FontAwesomeIcon icon="search"/>
      </SearchBtnComponent>
    </div>
  );
};

export default SearchBtn;
