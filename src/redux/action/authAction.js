import axios from "axios";
import { toastError, toastSuccess } from "../../utility/myToast";

export const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";

export const AUTH_CHECKED = "AUTH_CHECKED";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SIGN_OUT_FAILURE = "SIGN_OUT_FAILURE";

//Sign up action creators
const signUpRequest = () => {
  return {
    type: SIGN_UP_REQUEST,
  };
};

const signUpSuccess = (user) => {
  toastSuccess("Sign Up Success");
  return {
    type: SIGN_UP_SUCCESS,
    payload: {
      user,
    },
  };
};

const signUpFailure = (error) => {
  toastError(error);
  return {
    type: SIGN_UP_FAILURE,
    payload: error,
  };
};

export const signUp = (user, navigate) => {
  return async (dispatch) => {
    dispatch(signUpRequest());
    try {
      const response = await axios({
        method: "post",
        url: process.env.REACT_APP_API_BASE + "/user/register",
        data: user,
      });
      const { message } = response.data;
      dispatch(signUpSuccess(message));
      navigate("/signin");
    } catch (error) {
      if (error.response) {
        if (!!error?.response?.data?.error) {
          let message = error.response.data.error.message;
          dispatch(signUpFailure(message));
        } else {
          let message = "Server Respone Status Code: " + error.response.status;
          dispatch(signUpFailure(message));
        }
      } else if (error.request) {
        console.log(error.request);
        let message = "Internal Error";
        dispatch(signInFailure(message));
      } else {
        let message = "Internal Error";
        dispatch(signUpFailure(message));
      }
    }
  };
};

//Sign in action creators
const signInRequest = () => {
  return {
    type: SIGN_IN_REQUEST,
  };
};

const signInSuccess = (accessToken, expiredIn, currentUser) => {
  toastSuccess("Sign In Success");
  return {
    type: SIGN_IN_SUCCESS,
    payload: {
      accessToken,
      expiredIn,
      currentUser,
    },
  };
};

const signInFailure = (error) => {
  toastError(error);
  return {
    type: SIGN_IN_FAILURE,
    payload: error,
  };
};

export const signIn = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(signInRequest());
    try {
      const response = await axios({
        method: "post",
        url: process.env.REACT_APP_API_BASE + "/user/login",
        data: payload,
      });
      const { accessToken, expiredIn } = response.data;

      const resProfile = await axios({
        method: "get",
        url: process.env.REACT_APP_API_BASE + "/user/me",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(signInSuccess(accessToken, expiredIn, resProfile.data));
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.log(1)
        if (!!error?.response?.data?.error) {
          let message = error.response.data.error.message;
          dispatch(signInFailure(message));
        } else {
          let message = "Server Respone Status Code: " + error.response.status;
          dispatch(signInFailure(message));
        }
      } else if (error.request) {
        let message = "Internal Error";
        dispatch(signInFailure(message));
      } else {
        console.log(3)
        let message = "Internal Error";
        dispatch(signInFailure(message));
      }
    }
  };
};

//sign out action creators
export const signOutRequest = () => {
  return {
    type: SIGN_OUT_REQUEST,
  };
};

export const signOutSuccess = () => {
  return {
    type: SIGN_OUT_SUCCESS,
  };
};

export const signOutFailure = () => {
  return {
    type: SIGN_OUT_FAILURE,
  };
};

export const signOut = (navigate) => {
  return (dispatch) => {
    dispatch(signOutRequest());
    localStorage.removeItem("persist:root");
    localStorage.clear();
    navigate("/signin");
    if (localStorage.getItem("persist:root")) {
      dispatch(signOutFailure());
    } else {
      dispatch(signOutSuccess());
    }
  };
};

export const authCheck = (expiredIn, navigate) => {
  return (dispatch) => {
    let currentDate = new Date();
    if (expiredIn * 1000 < currentDate.getTime()) {
      dispatch(signOut(navigate));
    }
  };
};
