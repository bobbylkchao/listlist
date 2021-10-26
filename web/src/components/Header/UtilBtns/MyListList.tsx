import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';
import styles from './index.module.scss';

const MyListListBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  margin-right: 20px;
`;

const MyHeadNav = styled.div`
  height: 35px;
  background-color: #c8e3ff;
  width: 35px;
  border-radius: 50%;
  line-height: 35px;
`;

const MyListList = () => {
  return(
    <MyListListBtnWrapper>
      <Dropdown>
        <Dropdown.Toggle className={styles.header_component_mylistlist_dropdown}>
          <MyHeadNav>B</MyHeadNav>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </MyListListBtnWrapper>
  );
};

export default MyListList;
