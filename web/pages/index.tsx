import React from 'react';
import Head from 'next/head';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../src/redux/store';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt, faEllipsisH, faCheck, faSearch, faHome, faBriefcase, faTools, faPaw, faUsers, faTag, faCar, faChevronRight, faUserCircle, faUser, faEnvelope, faLock, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from 'styled-components';

// listlist containers, components
import { preFetchExecute } from "../src/prefetch";
import Wrapper from '../src/containers/Wrapper';
import HeaderComponent from "../src/components/Header";

// listlist pages
import HomePage from "./Home";
import CategoryPage from "./Category";
import MessagePage from "./Message";
import PostPage from "./Post";
import SearchPage from "./Search";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import MProfilePage from "./MProfile";
import OProfilePage from "./OProfile";
import NotFoundPage from "./404";

// fix fontawesome icon so huge under next.js framework
config.autoAddCss = false;

const Main = () => {
  const reduxUseDispatch = useDispatch();
  const getReduxStoreState = useSelector((state:any) => state);

  library.add(faMapMarkerAlt, faEllipsisH, faCheck, faSearch, faHome, faBriefcase, faTools, faPaw, faUsers, faTag, faCar, faChevronRight, faUserCircle, faUser, faEnvelope, faLock, faCheckCircle, faExclamationCircle);

  React.useEffect(() => {
    console.log(`[DEBUG]Main is loaded...`);
    preFetchExecute(reduxUseDispatch);
  }, []);

  return(
    <ThemeProvider theme={{ theme: getReduxStoreState['theme']['state'] && getReduxStoreState['theme']['state']['darkmode'] ? 'dark' : 'light' }}>
      <Router>
        <Wrapper>
          <HeaderComponent marginTop={15}/>

          <Switch>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
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
            <Route path="/m-profile">
              <MProfilePage />
            </Route>
            <Route path="/o-profile/:id">
              <OProfilePage />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </ThemeProvider>
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
