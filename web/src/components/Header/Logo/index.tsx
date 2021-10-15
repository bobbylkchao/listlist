import styled from "styled-components";
import { useRouter } from "next/router";
import Image from 'next/image'
import logo from "../../../assets/images/logo.png";
import styles from "./index.module.scss";

const Logo = () => {
  const router = useRouter()

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
