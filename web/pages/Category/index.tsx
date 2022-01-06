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
import {
  getCategoryTree,
  getListItemMainThumbNail,
  postTimeDiff,
} from "../../src/utils";
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
import LoadingPlaceHolder from "../../src/components/LoadingPlaceHolder";
import { getPostList } from "../../src/data-request";

const CategoryPage = () => {
  const router = useHistory();
  const routerParams:any = useParams();
  const categoryID = parseInt(routerParams.id)/1024;

  const categoryListState = useSelector((state:any) => state.categoryList.state);
  const globalSearchState = useSelector((state:any) => state.globalReducer.searchArea);

  const [breadCrumbs, setBreadCrumbs] = React.useState<any>(null);
  const [postList, setPostList] = React.useState<[any] | null>(null);

  React.useEffect(() => {
    // update bread crumbs
    if(categoryID && categoryListState){
      const categoryTree = getCategoryTree(categoryID, categoryListState);
      setBreadCrumbs(categoryTree);
    }

    // get user post list
    if(categoryID && globalSearchState && globalSearchState.city){
      getPostList({
        region: globalSearchState.region,
        city: globalSearchState.city,
        lat: globalSearchState.lat,
        long: globalSearchState.long,
        radius: globalSearchState.areaDistance,
        categoryID: categoryID,
      }, (res: any) => {
        if(res && res.data && res.data.posts){
          setPostList(res.data.posts);
        }
      });
    }
  }, [categoryID, categoryListState, globalSearchState]);

  // Render each list item
  const ListItem = (props: { item: any }) => {
    const [checked, setChecked] = React.useState<boolean>(false);

    return(
      <>
        <RightListItem
          onClick={() => router.push(`/post/${props.item.id}`)}
        >
          <div>
            <a
              title="Click to add to my favourites"
              onClick={(e: any) => {
                // TODO: to be implemented
                e.stopPropagation();
                setChecked(!checked);
              }}
            >
              {
                // TODO: to be implemented, get fav status
              }
              <FontAwesomeIcon
                icon="heart"
                className={`${styles.favHeart} ${checked ? styles.checked : styles.unchecked}`}
              />
            </a>
            <LazyImage
              src={`${getListItemMainThumbNail(props.item)}`}
              alt="thumbnail image"
              width={160}
              height={160}
              className={styles.itemThumbNailImage}
            />
          </div>
          <div>
            <div>
              <div>{ decodeURIComponent(props.item.title) }</div>
              <div>$1,399.00</div>
            </div>
            <div>
              <span>{ props.item.city }</span>
              <span>{ postTimeDiff(props.item.updatedAt) }</span>
            </div>
            <div>{ decodeURIComponent(props.item.description) }</div>
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
              {
                postList ? postList.map((item: any, index: number) => {
                  return(
                    <ListItem key={index} item={item}/>
                  )
                }): <LoadingPlaceHolder style={{marginTop: 20}}/>
              }
            </RightListWrapper>


          </Right>
        </Wrapper>
        
      </InsideWrapper>
      <Footer/>
    </>
  );
};

export default CategoryPage;
