/**
 * Divider Component
 * @version 1.0.0
 * @author [Bobby Chao](dev-bobby@cbrlife.com.au)
 * @desc Custom divider component
 * @param {number} height The height of this component, default is 10px
 */

import React from "react";
import { Divider } from "@ui-kitten/components";

const DividerHeight = (props: {height?: number}) => {
  return(
    <Divider style={{ height: props.height ? props.height : 10, backgroundColor: 'transparent' }}/>
  );
};

export default DividerHeight;
