/**
 * LoadingPlaceHolder
 * @desc Loading spinner placeholder. https://react-bootstrap.github.io/components/spinners
 * @param {object} props.style custom styles
 * @param {string} props.animation Corresponding to the parameter 'animation' of bootstrap spinners, default is 'border'
 */
import Spinner from "react-bootstrap/Spinner";

const LoadingPlaceHolder = (props: { style: any, animation: string, size: string}) => {
  return(
    <div style={{textAlign: 'center', ...props.style}}>
      <Spinner
        animation={ props.animation ? props.animation : 'border' }
        variant="primary"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingPlaceHolder;
