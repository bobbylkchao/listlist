import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// listlist
import webConfig from "../../src/web.config";
import styles from "./index.module.scss";
import Footer from "../../src/components/Footer";
import GlobalNoticeMsg from "../../src/components/GlobalNoticeMsg";
import GrayBgWrapper from "../../src/containers/GrayBgWrapper";
import Hline from "../../src/components/Hline";
import InsideWrapper from "../../src/containers/InsideWrapper";
import TopMenus from "../../src/components/TopMenus";
import { getCategoryTree } from "../../src/utils";
import Breadcrumbs from "./Breadcrumbs";
import LeftFilter from "./LeftFilter";
import { 
  Wrapper,
  Left,
  Right,
  RightFilterWrapper,
  RightListWrapper,
  RightListItem,
  RightListItemDivider,
} from "../../src/styled/CategoryStyled";
import LazyImage from "../../src/components/LazyImage";

const CategoryPage = () => {
  const router = useHistory();
  const routerParams:{id: string} = useParams();
  const categoryID = parseInt(routerParams.id)/1024;// real category id
  const categoryListState = useSelector((state:any) => state.categoryList.state);
  const [breadCrumbs, setBreadCrumbs] = React.useState<any>(null);

  React.useEffect(() => {
    if(categoryListState){
      const categoryTree = getCategoryTree(categoryID, categoryListState);
      setBreadCrumbs(categoryTree);
    }
  }, [categoryID, categoryListState]);

  const ListItem = () => {
    const [checked, setChecked] = React.useState<boolean>(false);
    return(
      <>
        <RightListItem
          onClick={() => router.push('/post/1')}
        >
          <div>
            <a
              title="Click to add to my favourites"
              onClick={(e: any) => {
                e.stopPropagation();
                setChecked(!checked);
              }}
            >
              <FontAwesomeIcon
                icon="heart"
                className={`${styles.favHeart} ${checked ? styles.checked : styles.unchecked}`}
              />
            </a>
            <LazyImage
              src={`${webConfig.cdnURL}posts/16001009/4RR7PAQTT881-200.jpeg`}
              alt="uploaded image"
              width={160}
              height={160}
              className={styles.itemThumbNailImage}
            />
          </div>
          <div>
            <div>
              <div>Regent Uniway GAMING DESKTOP Core i5 16GB RAM Geforce GTX 1650 Regent Uniway GAMING DESKTOP Core i5 16GB RAM Geforce GTX 1650</div>
              <div>$1,399.00</div>
            </div>
            <div>
              <span>Winnipeg</span>
              <span>&lt; 17 minutes ago</span>
            </div>
            <div>
            UNIWAY REGENT Location Customized Ryzen 5 5600G 16GB RAM DDR4 RTX 3060 TI CPU: Ryzen 5 5600g Motherboard: ASUS Prime B550M-A (WIFI) RAM: TeamGroup16GB RAM DDR4 3200 Mhz(2*8GB) GPU: ASUS Geforce RTX...
            </div>
          </div>
        </RightListItem>
        <RightListItemDivider/>
      </>
    );
  };

  return(
    <>
      <InsideWrapper>
        <TopMenus marginTop={15}/>
      </InsideWrapper>
      <Hline marginTop="15px" marginBottom="15px"/>
      <InsideWrapper>
        <GlobalNoticeMsg />

        <Wrapper>
          <Left>
            <LeftFilter/>
          </Left>
          <Right>
            <Breadcrumbs categoryTree={breadCrumbs}/>

            <RightFilterWrapper>
              <Form.Control
                as="select"
                style={{ width: 200 }}
                onChange={(e:any) => console.log(e.target.value)}
              >
                <option value={1}>Posted: Newest First</option>
                <option value={2}>Posted: Oldest First</option>
              </Form.Control>
            </RightFilterWrapper>

            <RightListWrapper>
              <ListItem/>
            </RightListWrapper>


          </Right>
        </Wrapper>
        
      </InsideWrapper>
      <Footer/>
    </>
  );
};

export default CategoryPage;
