import React from "react";
import AuthorizedWrapper from "../../src/components/AuthorizedWrapper";
import InsideWrapper from "../../src/containers/InsideWrapper";

const MessagePage = () => {
  return(
    <AuthorizedWrapper>
      <InsideWrapper>
        <div>authed</div>
      </InsideWrapper>
    </AuthorizedWrapper>
  );
};

export default MessagePage;
