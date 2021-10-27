import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';
import styles from './index.module.scss';
import { userAuthLSInfos } from '../../../utils';

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
  const reduxDispatch = useDispatch();
  const getReduxStoreState = useSelector((state:any) => state);
  const router = useHistory();

  const logOut = () => {
    reduxDispatch({
      type: "setGlobalNoticeMessage",
      value: {
        'type': 'success',
        'message': 'You have successfully signed out.',
      }
    });

    reduxDispatch({ type: "clearUserAuthState" });

    userAuthLSInfos.clear();
    
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  return(
    <MyListListBtnWrapper>
      <Dropdown>
        <Dropdown.Toggle className={styles.header_component_mylistlist_dropdown}>
          <MyHeadNav>
            { getReduxStoreState['userAuth']['state']['name'].substring(0,1).toUpperCase() }
          </MyHeadNav>
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.header_component_mylistlist_dropdown_items}>
          <Dropdown.Item href="#">My Ads</Dropdown.Item>
          <Dropdown.Item href="#">My Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#">Français</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => logOut()}>Log Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </MyListListBtnWrapper>
  );
};

export default MyListList;
