/**
 * Toast Component
 * @desc Use `Ref` to call the function show(title?:string) or hide()
 */
import React from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  >div{
    margin-top: 10px;
    text-align: center;
  }
`;
 
const Toast = (props: { onRef: any, message?: string }) => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<boolean>(false);

  React.useImperativeHandle(props.onRef, () => {
    return {
      show: (title?: string) => {
        setVisible(true);
        setTitle(title ?? "Please wait...");
      },
      hide: () => setVisible(false),
    }
  });

  return(
    <Modal
      size="sm"
      show={visible}
      animation={false}
      keyboard={false}
      centered={true}
      backdrop="static"
      onHide={() => setVisible(false)}
      className="toastModal"
    >
      <Modal.Body>
        <Wrapper>
          <Spinner animation="border" variant="primary"/>
          { title ? <div>{ title }</div> : null }
        </Wrapper>
      </Modal.Body>
    </Modal>
  );
};
 
export default Toast;
 