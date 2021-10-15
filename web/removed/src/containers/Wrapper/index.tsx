/**
 * Default wrapper container
 * @Author: Bobby Chao
 */
import "./index.scss";

const Wrapper = (props:{children: any}) => (
  <div className="container-wrapper">
    { props.children }
  </div>
);

export default Wrapper;
