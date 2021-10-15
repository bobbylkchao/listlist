import React from 'react'
import App from 'next/app';
import Head from 'next/head';
import { Provider, useDispatch } from 'react-redux';
import store from '../src/redux/store';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt, faEllipsisH, faCheck, faSearch, faHome, faBriefcase, faTools, faPaw, faUsers, faTag, faCar, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import '../global-styles/main.css';
import { preFetchExecute } from "../src/prefetch";
import HomePage from './Home';

// fix fontawesome icon so huge under next.js framework
config.autoAddCss = false;

const Main = () => {
  const reduxUseDispatch = useDispatch();
  library.add(faMapMarkerAlt, faEllipsisH, faCheck, faSearch, faHome, faBriefcase, faTools, faPaw, faUsers, faTag, faCar, faChevronRight);

  React.useEffect(() => {
    console.log(`[DEBUG]Main is loaded...`);
    preFetchExecute(reduxUseDispatch);
  }, []);

  return(
    <HomePage/>
  );
};

class MyApp extends App {
  render() {
    return(
      <React.StrictMode>
        <Provider store={store}>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet"/>
            <title>ListList in Winnipeg - Buy, Sell &amp; Save with ListList, Local Classifieds.</title>
          </Head>
          <Main />
        </Provider>
      </React.StrictMode>
    )
  }
}

export default MyApp