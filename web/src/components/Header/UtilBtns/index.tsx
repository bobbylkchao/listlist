import styles from "./index.module.scss";
import PostAdBtn from "./PostAdBtn";
import LoginAndRegBtn from "./LoginAndRegBtn";

const UtilBtns = () => {
  return(
    <div className={styles.header_component_utilbtns}>
      <LoginAndRegBtn/>
      <PostAdBtn onClick={e => console.log(e)}>Post Ad</PostAdBtn>
    </div>
  );
};

export default UtilBtns;