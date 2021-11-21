import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_OUT_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  
} from "../action/authAction";

const initState = {
  currentUser: null,
  token: null,
  error: "",
  loading: false,
  isAuth: false,
  expiredIn: null
};

const authReducer =  (state = initState, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
    case SIGN_UP_REQUEST:
    case SIGN_OUT_REQUEST:
      return {
        ...state,
        loading: true,
        isAuth: false,
        error: "",
      };
    case SIGN_IN_FAILURE:
    case SIGN_UP_FAILURE:
    case SIGN_OUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        currentUser: null,
        isAuth: false,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: false,
        error: "",
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.accessToken,
        currentUser: action.payload.currentUser,
        expiredIn: action.payload.expiredIn,
        isAuth: true,
        error: ""
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        token: null,
        error: "",
        loading: false,
        isAuth: false,
        expiredIn: null,
      };
    default:
      return state;
  }
};

export default authReducer;
