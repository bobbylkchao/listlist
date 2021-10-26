import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AlertComponent = (props: { variant: string, message: string }) => {
  const [alertVisible, setAlertVisible] = React.useState(true);
  const reduxDispatch = useDispatch();

  const hideAlert = () => {
    setAlertVisible(false);
    reduxDispatch({
      type: "setGlobalNoticeMessage",
      value: {
        'type': '',
        'message': '',
      }
    });
  };

  return(
    <Alert
      variant={ props.variant }
      dismissible
      show={alertVisible}
      onClose={() => hideAlert()}
      transition={false}
    >
      <FontAwesomeIcon
        icon={ props.variant==='success' ? 'check-circle' : 'exclamation-circle' }
        style={{ marginRight: 10 }}
      />
      { props.message }
    </Alert>
  );
};

const GlobalNoticeMsg = () => {
  const getReduxStoreState = useSelector((state:any) => state);
  return(
    getReduxStoreState['globalReducer'] && getReduxStoreState['globalReducer']['noticeMessage']['message'] ? <AlertComponent
      variant={ getReduxStoreState['globalReducer']['noticeMessage']['type'] }
      message={ getReduxStoreState['globalReducer']['noticeMessage']['message'] }
    /> : null
  );
};

export default GlobalNoticeMsg;
