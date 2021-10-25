import React from "react";
import { useSelector } from "react-redux";
import InsideWrapper from "../../src/containers/InsideWrapper";

const MProfilePage = () => {
  const getReduxStoreState = useSelector((state:any) => state);

  return(
    <InsideWrapper>
      <p>My Profile Page (Private)</p>
      {
        getReduxStoreState['userAuth']['state'] ? <div>Logged</div> : <div>Not logged in</div>
      }
    </InsideWrapper>
  );
};

export default MProfilePage;
