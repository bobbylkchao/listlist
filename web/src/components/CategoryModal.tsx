/**
 * Category Selection Modal
 * @desc Use `Ref` to call the function show() or hide()
 */
import React from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  >select{
    display: flex;
    flex: 1;
    margin-right: 10px;
  }
`;

const CategoryModal = (props: { onRef: any }) => {
  const categoryReducerState = useSelector((state:any) => state.categoryList.state);
  const [visible, setVisible] = React.useState<boolean>(false);

  const [selectedCategoryOneId, setSelectedCategoryOneId] = React.useState<number|null>();
  const [selectedCategoryOneIndex, setSelectedCategoryOneIndex] = React.useState<number|null>();

  const [selectedCategoryTwoId, setSelectedCategoryTwoId] = React.useState<number|null>();
  const [selectedCategoryTwoIndex, setSelectedCategoryTwoIndex] = React.useState<number|null>();

  const [selectedCategoryThreeId, setSelectedCategoryThreeId] = React.useState<number|null>();

  React.useImperativeHandle(props.onRef, () => {
    return {
      show: () => {
        setVisible(true);
        setSelectedCategoryOneId(null);
        setSelectedCategoryOneIndex(null);
        setSelectedCategoryTwoId(null);
        setSelectedCategoryTwoIndex(null);
        setSelectedCategoryThreeId(null);
      },
      hide: () => setVisible(false),
    }
  });

  const CategoryLevelOne = () => {
    return(
      <select
        name="categoryLevelOne"
        id="categoryLevelOne"
        size="10"
        value={selectedCategoryOneId}
        onChange={(e:any) => {
          setSelectedCategoryOneIndex(e.target.selectedOptions[0].attributes['attr-index'].value);
          setSelectedCategoryOneId(e.target.value);
          setSelectedCategoryTwoIndex(null);
          setSelectedCategoryTwoId(null);
        }}
      >
        {
          categoryReducerState.map((item:any, index:number) => <option key={index} attr-index={index} value={item.id}>{ item.name }</option>)
        }
      </select>
    );
  };

  const CategoryLevelTwo = () => (
    <select
      name="categoryLevelTwo"
      id="categoryLevelTwo"
      size="10"
      value={selectedCategoryTwoId}
      onChange={(e:any) => {
        setSelectedCategoryTwoIndex(e.target.selectedOptions[0].attributes['attr-index'].value);
        setSelectedCategoryTwoId(e.target.value);
        setSelectedCategoryThreeId(null);
      }}
    >
      {
        selectedCategoryOneId && selectedCategoryOneIndex ? categoryReducerState[selectedCategoryOneIndex].items.map((item:any, index:number) => <option key={index} attr-index={index} value={item.id}>{ item.name }</option>) : null
      }
    </select>
  );

  const CategoryLevelThree = () => (
    <select
      name="categoryLevelThree"
      id="categoryLevelThree"
      size="10"
      value={selectedCategoryThreeId}
      onChange={(e:any) => setSelectedCategoryThreeId(e.target.value)}
    >
      {
        selectedCategoryTwoId && selectedCategoryTwoIndex ? categoryReducerState[selectedCategoryOneIndex]['items'][selectedCategoryTwoIndex].items.map((item:any, index:number) => <option key={index} attr-index={index} value={item.id}>{ item.name }</option>) : null
      }
    </select>
  );

  return(
    <Modal
      size="lg"
      show={visible}
      animation={false}
      keyboard={false}
      backdrop="static"
      onHide={() => setVisible(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Select the Category</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Wrapper>
          <CategoryLevelOne/>
          <CategoryLevelTwo/>
          <CategoryLevelThree/>
        </Wrapper>
      </Modal.Body>

      <Modal.Footer style={{display: 'none'}}>
        <Button variant="secondary" onClick={() => setVisible(false)}>Close</Button>
        <Button variant="primary" onClick={() => setVisible(false)}>Done</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryModal;
