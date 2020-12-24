import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { AppWrapper } from "./Home";
import Header from "./Header";
import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import NewPostPage from "../pages/NewPost";
import PostPage from "../pages/Post";
import ArchivePage from "../pages/Archive";
import { AuthContext } from "../contexts";
import { getUserInfo } from "../WebAPI";
import { getAuthToken, setAuthToken } from "../utills";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // init login status
    if (getAuthToken()) {
      getUserInfo().then((response) => {
        if (!response.ok) {
          return setAuthToken(null);
        }
        setUser(response.data);
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <AppWrapper>
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
            <Route path="/post">
              <NewPostPage />
            </Route>
            <Route path="/archive">
              <ArchivePage />
            </Route>
            <Route path="/posts/:slug">
              <PostPage />
            </Route>
            <Route path="/user/:slug">
              <ArchivePage />
            </Route>
          </Switch>
        </Router>
      </AppWrapper>
    </AuthContext.Provider>
  );
}

export default App;
