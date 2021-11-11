/**
 * Notice Component
 * @desc Use `Ref` to call the function show(title?:string) or hide()
 */
import React from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';
  
const Notice = (props: { onRef: any, message?: string }) => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<boolean>(false);

  React.useImperativeHandle(props.onRef, () => {
    return {
      show: (title: string) => {
        setVisible(true);
        setTitle(title);
      },
      hide: () => setVisible(false),
    }
  });

  return(
    <Modal
      show={visible}
      animation={false}
      centered={true}
      onHide={() => setVisible(false)}
    >
    <Modal.Header closeButton>
      <Modal.Title>Notice</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div>{ title }</div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={() => setVisible(false)}>OK</Button>
    </Modal.Footer>
    </Modal>
  );
};

export default Notice;
  