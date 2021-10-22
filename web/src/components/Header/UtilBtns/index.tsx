import styles from "./index.module.scss";
import Button from "../../Button";
import LoginAndRegBtn from "./LoginAndRegBtn";

const UtilBtns = () => {
  return(
    <div className={styles.header_component_utilbtns}>
      <LoginAndRegBtn/>
      <Button
        height="35px"
        width="82px"
        onClick={e => console.log(e)}
      >Post Ad</Button>
    </div>
  );
};

export default UtilBtns;
