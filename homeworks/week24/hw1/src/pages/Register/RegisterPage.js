import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ERRMESSAGE from "../../constants/errorMessage";
import { setRegister, setLoginInfo } from "../../redux/reducers/userReducer";
import { getAuthToken } from "../../utills";
import { useSelector, useDispatch } from "react-redux";
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
  // UI state
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const password = "Lidemy";
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
      return setErrorMessage(ERRMESSAGE.BLANK_USER_INFO);
    }

    dispatch(setRegister(nickname, username, password)).then((res) => {
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
