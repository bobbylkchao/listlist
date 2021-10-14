import { useSelector } from "react-redux";
import "./index.scss";
import DropDown from "./DropDown";

const TopMenus = () => {
  const getReduxStoreState = useSelector((state:any) => state);
  
  return(
    <>
      <DropDown title="Menu"/>
      {/*<ul className="topMenu">
        {
          getReduxStoreState['categoryList']['state'] instanceof Array ? getReduxStoreState['categoryList']['state'].map((item:any, key:number) => (
            <li key={key} attr-id={item.id} className="levelOneItem">
              { item.name }
              <ul>
                {
                  item.items.map((lvltwo:any, lvltwokey:number) => (
                    <li key={lvltwokey} attr-id={lvltwo.id} className="levelTwoItem">
                      { lvltwo.name }
                      <ul>
                        {
                          lvltwo.items.map((lvlthree:any, lvlthreekey:number) => (
                            <li key={lvlthreekey} attr-id={lvlthree.id} className="levelThreeItem">{ lvlthree.name }</li>
                          ))
                        }
                      </ul>
                    </li>
                  ))
                }
              </ul>
            </li>
          )) : <></>
        }
      </ul>*/}
    </>
  );
};

export default TopMenus;