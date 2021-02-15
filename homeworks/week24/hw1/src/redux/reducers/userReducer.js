import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo, login, register } from "../../WebAPI";
import { setAuthToken } from "../../utills";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userInfo: null,
  },

  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },

    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setIsLogin, setUser } = userReducer.actions;

export const setLoginInfo = () => (dispatch) => {
  return getUserInfo().then((res) => {
    if (res.ok) {
      dispatch(setUser(res.data));
      dispatch(setIsLogin(true));
    } else {
      setAuthToken(null);
    }
    return res;
  });
};

export const setLogin = (username, password) => (dispatch) => {
  return login(username, password).then((res) => {
    if (res.ok) {
      setAuthToken(res.token);
    }
    return res;
  });
};

export const setRegister = (nickname, username, password) => (dispatch) => {
  return register(nickname, username, password).then((res) => {
    if (res.ok) {
      setAuthToken(res.token);
    }
    return res;
  });
};

export const setLoginOut = () => (dispatch) => {
  dispatch(setIsLogin(false));
  dispatch(setUser(null));
  setAuthToken(null);
};

export default userReducer.reducer;
