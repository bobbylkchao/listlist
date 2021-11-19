import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';

// listlist
import styles from "./index.module.scss";
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
  RightFilterWrapper
} from "./styled";

const CategoryPage = () => {
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

          </Right>
        </Wrapper>
        

      </InsideWrapper>
    </>
  );
};

export default CategoryPage;
