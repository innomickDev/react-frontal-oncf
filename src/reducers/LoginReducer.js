/* eslint-disable default-case */
import { AUTH_CONST } from "../actions/actionTypes";
export default function reducer(
  state = {
    token: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusCode: null,
    statusText: null,
    email: null,
    loginNetworkError: null,
    loginErrorStatus: null
  },
  action
) {
  switch (action.type) {
    case AUTH_CONST.LOGIN_REQUEST:
      console.log(action.payload);

      return {
        ...state,
        isAuthenticating: true,
        isAuthenticated: false,
        networkError: false,
        loginData: null,
        loginNetworkErrorStatus: false,
        loginErrorStatus: false,
        loginErrorDescription:false,
        loginNetworkError: null,
      };
    case AUTH_CONST.LOGIN_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        isAuthenticated: true,
        loginData: action.payload.response.data.isSuccess
          ? action.payload.response.data.data
          : null,
        isAuthenticating: false,
        networkError: false,
        loginErrorStatus: false,
        loginNetworkError: null,
        loginErrorDescription:false,
      };
    case AUTH_CONST.LOGIN_FAILURE:
      //console.log(action.payload.response.error.errorDescription);
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: false,
        loginData: null,
        loginErrorStatus: action.payload.response.data ? action.payload.response.data.error.error : action.payload.response.error.errorDescription,
        loginErrorDescription: action.payload.response ?  action.payload.response.data.error.errorDescription:"",
        // loginErrorCode:action.payload.response.data ? action.payload.response.data.error.error:"",

      };
  }
  return state;
}
