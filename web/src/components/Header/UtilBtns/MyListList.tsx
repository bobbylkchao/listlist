import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';

const MyListListBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 2;
`;

const MyListList = () => {
  return(
    <MyListListBtnWrapper>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Bobby Chao
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
