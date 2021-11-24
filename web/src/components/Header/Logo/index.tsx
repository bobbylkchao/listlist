import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import Image from 'next/image';
import logo from "../../../assets/images/logo.png";
import styles from "./index.module.scss";

const Logo = () => {
  const router = useHistory();

  return(
    <div className={styles.header_component_logo}>
      <Image
        src={logo}
        alt="ListList.ca"
        onClick={() => router.push('/')}
        placeholder="blur"
        blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0mPS+HgAE3QIyD41BUwAAAABJRU5ErkJggg==`}
        width={118}
        height={45}
        className="logoImage"
      />
    </div>
  );
};

export default Logo;
