import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { register, getUserInfo } from "../../WebAPI";
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
} from "../../components/Login";

function RegisterPage() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const password = "Lidemy";
  const [isClicked, setClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();

  const handleInputChange = (e) => {
    setErrorMessage(null);
    if (e.target.name === "username") {
      setUsername(e.target.value);
    }

    if (e.target.name === "nickname") {
      setNickname(e.target.value);
    }
  };

  const handleButtonClick = () => {
    setClicked(true);
    setErrorMessage(null);
    if (!username || !nickname) {
      return setErrorMessage("Please fill in the blank input box.");
    }

    // call API
    register(nickname, username, password).then((response) => {
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
      <LoginTitle>Create a new account</LoginTitle>
      <LoginDesc>Enter the your nickname and username.</LoginDesc>
      <LoginDesc>
        For testing, the password is set as default value 'Lidemy'.
      </LoginDesc>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <LoginWrapper>
        <LoginInputHint verify={isClicked && !nickname}>
          Your nickname
        </LoginInputHint>
        <LoginInput
          name="nickname"
          type="text"
          value={nickname}
          onChange={handleInputChange}
          verify={isClicked && !nickname}
        />
        <LoginInputHint verify={isClicked && !username}>
          Your username
        </LoginInputHint>
        <LoginInput
          name="username"
          type="text"
          value={username}
          onChange={handleInputChange}
          verify={isClicked && !username}
        />
        <LoginInputHint>Your password</LoginInputHint>
        <LoginInput name="password" type="password" value={password} readonly />
        <BtnLogin onClick={handleButtonClick}>Continue</BtnLogin>
      </LoginWrapper>
    </LoginPageRoot>
  );
}

export default RegisterPage;
