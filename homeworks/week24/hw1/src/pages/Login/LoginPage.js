import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { setLogin, setLoginInfo } from "../../redux/reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
import { getAuthToken } from "../../utills";
import ERRMESSAGE from "../../constants/errorMessage";
import {
  LoginPageRoot,
  LoginTitle,
  LoginDesc,
  ErrorMessage,
  LoginWrapper,
  LoginInputHint,
  LoginInput,
  BtnLogin,
  BtnBackToHome,
} from "../../components/Login";

function LoginPage() {
  // UI state
  const [username, setUsername] = useState("zoeaeen13");
  const [password, setPassword] = useState("Lidemy");
  const [isClicked, setClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((store) => store.user.isLogin);

  // init
  useEffect(() => {
    if (isLogin) {
      history.push("/");
    }
  }, [isLogin, history]);

  const handleInputChange = (e) => {
    setErrorMessage(null);
    if (e.target.name === "account") {
      setUsername(e.target.value);
    }

    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleButtonClick = () => {
    setClicked(true);
    setErrorMessage(null);
    if (!username || !password) {
      return setErrorMessage(ERRMESSAGE.BLANK_USER_INFO);
    }

    dispatch(setLogin(username, password)).then((res) => {
      if (!res.ok) {
        return setErrorMessage(res.message);
      }
      if (getAuthToken()) {
        dispatch(setLoginInfo()).then((res) => {
          if (!res.ok) {
            return setErrorMessage(res.message);
          }
        });
      }
    });
  };

  return (
    <LoginPageRoot>
      <LoginTitle>Sign in with Account</LoginTitle>
      <LoginDesc>Enter the account and password.</LoginDesc>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <LoginWrapper>
        <LoginInputHint verify={isClicked && !username}>
          Your account
        </LoginInputHint>
        <LoginInput
          name="account"
          type="text"
          value={username}
          onChange={handleInputChange}
          verify={isClicked && !username}
        />
        <LoginInputHint verify={isClicked && !password}>
          Your password
        </LoginInputHint>
        <LoginInput
          name="password"
          type="password"
          value={password}
          onChange={handleInputChange}
          verify={isClicked && !password}
        />
        <BtnLogin onClick={handleButtonClick}>Continue</BtnLogin>
        <BtnBackToHome to="/">back to Home</BtnBackToHome>
      </LoginWrapper>
    </LoginPageRoot>
  );
}

export default LoginPage;
