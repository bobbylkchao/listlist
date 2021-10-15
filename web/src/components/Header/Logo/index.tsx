import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import Image from 'next/image'
import logo from "../../../assets/images/logo.png";
import styles from "./index.module.scss";

const Logo = () => {
  const router = useHistory()

  return(
    <div className={styles.header_component_logo}>
      <Image
        src={logo}
        alt="ListList.ca"
        onClick={() => router.push('/')}
        placeholder="blur"
      />
    </div>
  );
};

export default Logo;
