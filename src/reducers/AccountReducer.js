/* eslint-disable default-case */
import { ACCOUNT_CONST } from "../actions/actionTypes";
export default function reducer(
  state = {
    token: null,
    statusCode: null,
    statusText: null,
    emailSuccess: false,
    isRedirect: false,
    registerSuccess: false,
    profileData: null,
    usersData: [],
  },
  action
) {
  switch (action.type) {
    // Forgot password
    case ACCOUNT_CONST.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        emailSuccess: false,
        forgotPasswordNetworkErrorStatus: false,
        forgotPasswordErrorStatus: false,
      };
    case ACCOUNT_CONST.FORGOT_PASSWORD_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        emailSuccess: true,
        forgotPasswordNetworkErrorStatus: false,
        forgotPasswordErrorStatus: false,
      };
    case ACCOUNT_CONST.FORGOT_PASSWORD_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        emailSuccess: false,
        forgotPasswordNetworkErrorStatus: action.payload.error ? true : false,
        forgotPasswordErrorStatus: action.payload.response
          ? action.payload.response.data.error.errorDescription
          : false,
      };

    // Change password
    case ACCOUNT_CONST.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isRedirect: false,
        changePasswordData: null,
        errorStatus: null,
      };
    case ACCOUNT_CONST.CHANGE_PASSWORD_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        isRedirect: true,
        // changePasswordData: action.payload
        //   ? action.payload.response.data.data
        //   : null,
        changePasswordData: action.payload.response.data.isSuccess
          ? true
          : false,
        errorStatus: !action.payload.response.data.isSuccess
          ? action.payload.response.data.error.errorDescription
          : null,
      };
    case ACCOUNT_CONST.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isRedirect: false,
        changePasswordData: null,
        errorStatus: action.payload
          ? action.payload.response.error.errorDescription
          : null,
      };

    // Registration
    case ACCOUNT_CONST.CLIENT_REGISTRATION_REQUEST:
      return {
        ...state,
        registerSuccess: false,
        registerErrorStatus: null,
        registerNetworkErrorStatus: null,
      };
    case ACCOUNT_CONST.CLIENT_REGISTRATION_SUCCESS:
      return {
        ...state,
        registerSuccess: true,
        registerErrorStatus: null,
        registerNetworkErrorStatus: null,
      };
    case ACCOUNT_CONST.CLIENT_REGISTRATION_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        registerSuccess: false,
        registerErrorStatus: action.payload.response
          ? action.payload.response.error.errorDescription
          : null,
        registerNetworkErrorStatus: action.payload.error ? true : null,
      };
    // My profile
    case ACCOUNT_CONST.MY_PROFILE_REQUEST:
      // console.log(action.payload);

      return {
        ...state,
        profileData: null,
      };
    case ACCOUNT_CONST.MY_PROFILE_SUCCESS:
      // console.log(action.payload.response.data);
      return {
        ...state,
        profileData: action.payload ? action.payload.response.data : null,
      };
    case ACCOUNT_CONST.MY_PROFILE_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        profileData: null,
      };
    case ACCOUNT_CONST.GET_USER_DETAILS_REQUEST:
      // console.log(action.payload);
      return {
        ...state,
        profileData: null,
      };

    case ACCOUNT_CONST.GET_USERS_REQUEST:
      // console.log(action.payload);
      return {
        ...state,
        usersData: null,
      };
    case ACCOUNT_CONST.GET_USERS_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        usersData: action.payload.response.data.data,
      };
    case ACCOUNT_CONST.GET_USERS_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        usersData: null,
      };

    case ACCOUNT_CONST.ADD_USER_REQUEST:
      // console.log(action.payload);
      return {
        ...state,
        isUserAdded: null,
        errorMessage: null,
      };
    case ACCOUNT_CONST.ADD_USER_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        isUserAdded: true,
        errorMessage: null,
      };
    case ACCOUNT_CONST.ADD_USER_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        isUserAdded: false,
        errorMessage: action.payload.response.data.error.errorDescription,
      };

    case ACCOUNT_CONST.DELETE_USER_REQUEST:
      // console.log(action.payload);
      return {
        ...state,
        deleteSuccess: null,
      };
    case ACCOUNT_CONST.DELETE_USER_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        deleteSuccess: action.payload ? true : false,
      };
    case ACCOUNT_CONST.DELETE_USER_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        deleteSuccess: null,
      };

    case ACCOUNT_CONST.UPDATE_USER_REQUEST:
      // console.log(action.payload);
      return {
        ...state,
        updateMessage: null,
        updateFailure: null,
      };
    case ACCOUNT_CONST.UPDATE_USER_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        updateMessage: action.payload
          ? action.payload.response.data.data
          : null,
        updateFailure: null,
      };
    case ACCOUNT_CONST.UPDATE_USER_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        updateMessage: null,
        updateFailure: action.payload.response.data.error.errorDescription,
      };

    //Get agents
    case ACCOUNT_CONST.GET_AGENTS_REQUEST:
      // console.log(action.payload);
      return {
        ...state,
        agentsData: null,
      };
    case ACCOUNT_CONST.GET_AGENTS_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        agentsData: action.payload.response
          ? action.payload.response.data
          : null,
      };
    case ACCOUNT_CONST.GET_AGENTS_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        agentsData: null,
      };
    //Activate account
    case ACCOUNT_CONST.ACTIVATE_ACCOUNT_REQUEST:
      return {
        ...state,
        activationSuccess: null,
        activatioError: null,
      };
    case ACCOUNT_CONST.ACTIVATE_ACCOUNT_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        activationSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        activatioError: null,
      };
    case ACCOUNT_CONST.ACTIVATE_ACCOUNT_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        activationSuccess: null,
        activatioError: action.payload.response.data ?action.payload.response.data.error.errorDescription:"",
      };

      //Unlock account
    case ACCOUNT_CONST.UNLOCK_ACCOUNT_REQUEST:
      return {
        ...state,
        unlockSuccess: null,
        unlockError: null,
      };
    case ACCOUNT_CONST.UNLOCK_ACCOUNT_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        unlockSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
          unlockError: null,
      };
    case ACCOUNT_CONST.UNLOCK_ACCOUNT_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        unlockSuccess: null,
        unlockError: action.payload.response.data ?action.payload.response.data.error.errorDescription:"",
      };

    // Logout user
    case ACCOUNT_CONST.LOGOUT_REQUEST:
      return {
        ...state,
        logoutSuccess: null,
        logoutError: null,
      };
    case ACCOUNT_CONST.LOGOUT_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        logoutSuccess: action.payload.response.data.isSuccess ? true : false,
        logoutError: null,
      };
    case ACCOUNT_CONST.LOGOUT_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        logoutSuccess: null,
        logoutError: action.payload.data.error.errorDescription ? true : false,
      };

    // Logout user
    case ACCOUNT_CONST.GET_FRONT_CUSTOMERS_REQUEST:
      return {
        ...state,
        customerData: null,
      };
    case ACCOUNT_CONST.GET_FRONT_CUSTOMERS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        customerData: action.payload.response.data.data,
      };
    case ACCOUNT_CONST.GET_FRONT_CUSTOMERS_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        customerData: null,
      };
  }
  return state;
}
