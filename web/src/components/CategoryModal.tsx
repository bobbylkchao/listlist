/**
 * Category Selection Modal
 * @desc Use `Ref` to call the function show() or hide()
 * @param onRef createRef
 * @param callback callback function
 * @returns {object}
 *  { 
 *    one: {id, index, title}, // This is finally selected level one category
 *    two: {id, index, title}, // This is finally selected level two category
 *    three: {id, index, title} // This is finally selected level three category
 *  }
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
    margin-bottom: 20px;
    border: 1px solid #dee2e6;
    border-radius: 5px;

    >option{
      padding: 10px;
    }
  }
`;

const CategoryModal = (props: { onRef: any, callback: () => void }) => {
  const categoryReducerState = useSelector((state:any) => state.categoryList.state);
  const [visible, setVisible] = React.useState<boolean>(false);
  
  // for first category select, record `value` and `index`
  const [selectdCategoryOneInfos, setSelectdCategoryOneInfos] = React.useState<{
    index: null | number,
    id: null | number,
    title: null | string,
  }>({
    index: null,
    id: null,
    title: null,
  });

  // for second category select, record `value` and `index`
  const [selectdCategoryTwoInfos, setSelectdCategoryTwoInfos] = React.useState<{
    index: null | number,
    id: null | number,
    title: null | string,
  }>({
    index: null,
    id: null,
    title: null,
  });

  // for third category select, record `value` and `index`
  const [selectdCategoryThreeInfos, setSelectdCategoryThreeInfos] = React.useState<{
    index: null | number,
    id: null | number,
    title: null | string,
  }>({
    index: null,
    id: null,
    title: null,
  });

  React.useImperativeHandle(props.onRef, () => {
    return {
      show: () => {
        setVisible(true);
        setSelectdCategoryOneInfos({index: null, id: null, title: null});
        setSelectdCategoryTwoInfos({index: null, id: null, title: null});
        setSelectdCategoryThreeInfos({index: null, id: null, title: null});
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
        value={selectdCategoryOneInfos.id}
        onChange={(e:any) => {
          // new
          setSelectdCategoryOneInfos({
            index: e.target.selectedOptions[0].attributes['attr-index'].value,
            id: e.target.value,
            title: e.target.selectedOptions[0].innerText
          });
          setSelectdCategoryTwoInfos({index: null, id: null, title: null});
        }}
        onFocus={(e:any) => {
          // if the selected option without `items`, set categoryId to this value
          if(e.target.selectedOptions[0]){
            if(categoryReducerState[e.target.selectedOptions[0].attributes['attr-index'].value].items.length === 0){
              setTimeout(() => {
                props.callback({
                  one:{
                    index: e.target.selectedOptions ? e.target.selectedOptions[0].attributes['attr-index'].value : null,
                    id: e.target.value,
                    title: e.target.selectedOptions ? e.target.selectedOptions[0].innerText : null,
                  },
                  two:{},
                  three:{},
                });
                setVisible(false);
              }, 100);
            }
          }
        }}
      >
        {
          categoryReducerState ? categoryReducerState.map((item:any, index:number) => {
            return(
              <option
                key={index}
                attr-index={index}
                value={item.id}
              >{ item.name }</option>
            );
          }) : null
        }
      </select>
    );
  };

  const CategoryLevelTwo = () => (
    <select
      name="categoryLevelTwo"
      id="categoryLevelTwo"
      size="10"
      value={selectdCategoryTwoInfos.id}
      onChange={(e:any) => {
        setSelectdCategoryTwoInfos({
          index: e.target.selectedOptions[0].attributes['attr-index'].value,
          id: e.target.value,
          title: e.target.selectedOptions[0].innerText,
        });
        setSelectdCategoryThreeInfos({index: null, id: null, title: null}); 
      }}
      onFocus={(e:any) => {
        // if the selected option without `items`, set categoryId to this value
        if(e.target.selectedOptions[0]){
          if(categoryReducerState[selectdCategoryOneInfos.index].items[e.target.selectedOptions[0].attributes['attr-index'].value].items.length === 0){
            setTimeout(() => {
              props.callback({
                one:selectdCategoryOneInfos,
                two:{
                  index: e.target.selectedOptions ? e.target.selectedOptions[0].attributes['attr-index'].value : null,
                  id: e.target.value,
                  title: e.target.selectedOptions ? e.target.selectedOptions[0].innerText : null,
                },
                three:{},
              });
              setVisible(false);
            }, 100);
          }
        }
      }}
    >
      {
        selectdCategoryOneInfos.id && selectdCategoryOneInfos.index ? categoryReducerState[selectdCategoryOneInfos.index].items.map((item:any, index:number) => {
          return(
            <option
              key={index}
              attr-index={index}
              value={item.id}
            >{ item.name }</option>
          );
        }) : null
      }
    </select>
  );

  const CategoryLevelThree = () => (
    <select
      name="categoryLevelThree"
      id="categoryLevelThree"
      size="10"
      value={selectdCategoryThreeInfos.id}
      onChange={(e:any) => {
        setSelectdCategoryThreeInfos({
          index: e.target.selectedOptions[0].attributes['attr-index'].value,
          id: e.target.value,
          title: e.target.selectedOptions[0].innerText,
        });
      }}
      onFocus={(e:any) => {
        if(e.target.selectedOptions[0]){
          setTimeout(() => {
            props.callback({
              one:selectdCategoryOneInfos,
              two:selectdCategoryTwoInfos,
              three:{
                index: e.target.selectedOptions ? e.target.selectedOptions[0].attributes['attr-index'].value : null,
                id: e.target.value,
                title: e.target.selectedOptions ? e.target.selectedOptions[0].innerText : null,
              },
            });
            setVisible(false);
          }, 100);
        }
      }}
    >
      {
        selectdCategoryTwoInfos.id && selectdCategoryTwoInfos.index ? categoryReducerState[selectdCategoryOneInfos.index]['items'][selectdCategoryTwoInfos.index].items.map((item:any, index:number) => <option key={index} attr-index={index} value={item.id}>{ item.name }</option>) : null
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
      <Modal.Header>
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
