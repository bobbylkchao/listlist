import { useHistory } from "react-router-dom";
import { BreadCrumbsWrapper } from "../../src/styled/CategoryStyled";
import Link from "../../src/components/Link";

const BreadCrumbsItem = (params: { id: number, name: string, end: boolean }) => {
  const router = useHistory();

  if(params.end){
    return <span>{ params.name }</span>;
  }else{
    return(
      <span>
        <Link onClick={() => router.push(`/category/${(params.id*1024)}`)}>{ params.name }</Link>
      </span>
    );
  }
};

const Breadcrumbs = (params:{ categoryTree: any }) => {
  const router = useHistory();
  
  return params.categoryTree && params.categoryTree.one.id ? (
    <BreadCrumbsWrapper>
      <span>
        <Link onClick={() => router.push('/')}>Home</Link>
      </span>
      {
        params.categoryTree.one.id ? <BreadCrumbsItem id={params.categoryTree.one.id} name={params.categoryTree.one.name} end={params.categoryTree.two.id ? false : true}/> : null
      }
      {
        params.categoryTree.two.id ? <BreadCrumbsItem id={params.categoryTree.two.id} name={params.categoryTree.two.name} end={params.categoryTree.three.id ? false : true}/> : null
      }
      {
        params.categoryTree.three.id ? <BreadCrumbsItem id={params.categoryTree.three.id} name={params.categoryTree.three.name} end={true}/> : null
      }
    </BreadCrumbsWrapper>
  ) : <></>;
};

export default Breadcrumbs;
