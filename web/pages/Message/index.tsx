import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { debugLog } from "../../src/utils";
import InsideWrapper from "../../src/containers/InsideWrapper";

const MessagePage = () => {
  const getReduxStoreState = useSelector((state:any) => state);
  const router = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    debugLog(`Message page, auth state: ${getReduxStoreState['userAuth']['state']}`);

    /*
    if(!getReduxStoreState['userAuth']['state']){
      return router.replace({
        pathname: "/login",
        search: `?from=${encodeURIComponent(location.pathname)}`,
      });
    }

    if(!getReduxStoreState['userAuth']['state']['auth']){
      return router.replace({
        pathname: "/login",
        search: `?from=${encodeURIComponent(location.pathname)}`,
      });
    }*/
  }, []);

  return(
    <InsideWrapper>
      {getReduxStoreState['userAuth']['state'] ? 'MESSAGE' : 'loading...'}
    </InsideWrapper>
  );
};

export default MessagePage;
