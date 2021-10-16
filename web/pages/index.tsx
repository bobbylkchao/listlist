import React from 'react'
import Head from 'next/head';
import { Provider, useDispatch } from 'react-redux';
import store from '../src/redux/store';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt, faEllipsisH, faCheck, faSearch, faHome, faBriefcase, faTools, faPaw, faUsers, faTag, faCar, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// listlist containers, components
import { preFetchExecute } from "../src/prefetch";
import Wrapper from "../src/containers/Wrapper";
import HeaderComponent from "../src/components/Header";
import TopMenus from "../src/components/TopMenus";
import Hline from "../src/components/Hline";

// listlist pages
import HomePage from "./Home";
import CategoryPage from "./Category";
import MessagePage from "./Message";
import PostPage from "./Post";
import SearchPage from "./Search";

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
    <Router>
      <div>
        <Wrapper>
          <HeaderComponent marginTop={15}/>
          <TopMenus marginTop={15}/>
        </Wrapper>
        <Hline marginTop="15px" marginBottom="15px"/>

        <Switch>
          <Route path="/category/:id">
            <CategoryPage />
          </Route>
          <Route path="/message">
            <MessagePage />
          </Route>
          <Route path="/post/:id">
            <PostPage />
          </Route>
          <Route path="/search/:key">
            <SearchPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

const MainEntry = () => {
  return(
    <Provider store={store}>
      <Head>
        <link rel='preconnect' href='https://api.listlist.ca' />
        <link rel='dns-prefetch' href='https://api.listlist.ca' />

        <link rel='preconnect' href='https://cdn.listlist.ca' />
        <link rel='dns-prefetch' href='https://cdn.listlist.ca' />

        <link rel="shortcut icon" href="/static/favicon.ico"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet"/>

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>

        <title>ListList in Winnipeg - Buy, Sell &amp; Save with ListList, Local Classifieds.</title>
      </Head>
      <Main />
    </Provider>
  );
};

export default MainEntry;