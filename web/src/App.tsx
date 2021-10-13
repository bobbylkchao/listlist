import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt, faEllipsisH, faCheck, faSearch, faHome, faBriefcase, faTools, faPaw, faUsers, faTag, faCar } from '@fortawesome/free-solid-svg-icons';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useDispatch } from "react-redux";

// Prefetch
import { preFetchExecute } from "./prefetch/";

// Containers and Components
import Wrapper from "./containers/Wrapper";
import HeaderComponent from "./components/Header";
import TopMenus from "./components/TopMenus";

// Pages
import HomePage from './pages/Home';
import CategoryPage from './pages/Category';
import MessagePage from './pages/Message';
import PostPage from './pages/Post';
import SearchPage from './pages/Search';

// Fontawesome icons
library.add(faMapMarkerAlt, faEllipsisH, faCheck, faSearch, faHome, faBriefcase, faTools, faPaw, faUsers, faTag, faCar);

const App = () => {
  const reduxUseDispatch = useDispatch();

  React.useEffect(() => {
    preFetchExecute(reduxUseDispatch);
  }, []);

  return(
    <Router>
      <Wrapper>
        <HeaderComponent marginTop={15}/>
        <TopMenus/>

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
      </Wrapper>
    </Router>
  );
};

export default App;
