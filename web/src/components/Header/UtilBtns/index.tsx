import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./index.module.scss";
import Button from "../../Button";
import LoginAndRegBtn from "./LoginAndRegBtn";
import MyListList from "./MyListList";

const UtilBtns = () => {
  const getReduxStoreState = useSelector((state:any) => state);
  const router = useHistory();

  return(
    <div className={styles.header_component_utilbtns}>
      {
        getReduxStoreState['userAuth']['state'] && getReduxStoreState['userAuth']['state']['auth'] ? <MyListList/> : <LoginAndRegBtn/>
      }
      <Button
        height="35px"
        width="82px"
        onClick={e => router.push("/add-post")}
      >Post Ad</Button>
    </div>
  );
};

export default UtilBtns;
