/**
 * Default wrapper container
 * @Author: Bobby Chao
 */
import styles from "./index.module.scss";

const Wrapper = (props:{children: any}) => (
  <div className={styles.container_wrapper}>
    { props.children }
  </div>
);

export default Wrapper;
