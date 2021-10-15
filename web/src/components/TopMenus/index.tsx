import { useSelector } from "react-redux";
import styles from "./index.module.scss";
import TopMenuWrapper from "./styled";
import DropDown from "./DropDown";

const TopMenus = (props:{marginTop?: number}) => {
  const getReduxStoreState = useSelector((state:any) => state);
  
  return(
    <TopMenuWrapper style={{marginTop: props.marginTop ?? 0}}>
      {
        getReduxStoreState['categoryList']['state'] instanceof Array ? getReduxStoreState['categoryList']['state'].map((item:any, key:number) => (
          <DropDown
            key={key}
            name={item.name}
            categories={item.items}
          />
        )) : <></>
      }
    </TopMenuWrapper>
  );
};

export default TopMenus;