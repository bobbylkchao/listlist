import { useSelector } from "react-redux";
import "./index.scss";
import DropDown from "./DropDown";

const TopMenus = () => {
  const getReduxStoreState = useSelector((state:any) => state);
  
  return(
    <div>
      {
        getReduxStoreState['categoryList']['state'] instanceof Array ? getReduxStoreState['categoryList']['state'].map((item:any, key:number) => (
          <DropDown
            key={key}
            name={item.name}
            categories={item.items}
          />
        )) : <></>
      }
    </div>
  );
};

export default TopMenus;