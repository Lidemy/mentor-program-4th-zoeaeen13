import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { login, getUserInfo } from "../../WebAPI";
import { setAuthToken } from "../../utills";
import { AuthContext } from "../../contexts";
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
  const { setUser } = useContext(AuthContext);
  const [account, setAccount] = useState("zoeaeen13");
  const [password, setPassword] = useState("Lidemy");
  const [isClicked, setClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();

  const handleInputChange = (e) => {
    setErrorMessage(null);
    if (e.target.name === "account") {
      setAccount(e.target.value);
    }

    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleButtonClick = () => {
    setClicked(true);
    setErrorMessage(null);
    if (!account || !password) {
      return setErrorMessage("Please fill in the blank input box.");
    }

    // call API
    login(account, password).then((response) => {
      if (!response.ok) {
        return setErrorMessage(response.message);
      }
      setAuthToken(response.token);
      getUserInfo().then((response) => {
        if (!response.ok) {
          return setErrorMessage(response.message);
        }
        setUser(response.data);
        history.push("/");
      });
    });
  };

  return (
    <LoginPageRoot>
      <LoginTitle>Sign in with Account</LoginTitle>
      <LoginDesc>Enter the account and password.</LoginDesc>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <LoginWrapper>
        <LoginInputHint verify={isClicked && !account}>
          Your account
        </LoginInputHint>
        <LoginInput
          name="account"
          type="text"
          value={account}
          onChange={handleInputChange}
          verify={isClicked && !account}
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
