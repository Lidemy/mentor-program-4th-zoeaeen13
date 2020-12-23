import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Tictactoe from "../pages/Tictactoe";
import Gobang from "../pages/Gobang";
import { useLocation } from "react-router-dom";
import gameList from "../constants/gameType";
import {
  AppWrapper,
  ArrowWrapper,
  Wrapper,
  Container,
  GameIntro,
} from "./Home";

function App() {
  let location = useLocation();
  let recentGame;
  switch (location.pathname) {
    case "/2":
      recentGame = gameList[1];
      break;
    default:
      recentGame = gameList[0];
      break;
  }

  return (
    <Router>
      <AppWrapper>
        <ArrowWrapper
          direction={"left"}
          to={location.pathname === "/2" && "/"}
        />
        <Wrapper>
          <Container>
            <Switch>
              <Route exact path="/">
                <Tictactoe />
              </Route>
              <Route path="/2">
                <Gobang />
              </Route>
            </Switch>
          </Container>
          <GameIntro
            num={recentGame.num}
            name={recentGame.name}
            desc={recentGame.desc}
          />
        </Wrapper>
        <ArrowWrapper
          direction={"right"}
          to={location.pathname !== "/2" && "/2"}
        />
      </AppWrapper>
    </Router>
  );
}

export default App;
