import { useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import NewPostPage from "../pages/NewPost";
import PostPage from "../pages/Post";
import ArchivePage from "../pages/Archive";
import { setLoginInfo } from "../redux/reducers/userReducer";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoginInfo());
  }, [dispatch]);

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/post/:slug">
            <NewPostPage />
          </Route>
          <Route path="/post/">
            <NewPostPage />
          </Route>
          <Route path="/archive">
            <ArchivePage />
          </Route>
          <Route path="/article/:slug">
            <PostPage />
          </Route>
          <Route path="/user/:slug">
            <ArchivePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
