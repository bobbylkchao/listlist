import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
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
  const router = useRouter()

  const submitSearch = () => {
    if(!props.passData){
      return router.push(`/category`);
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