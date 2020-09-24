import { withRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

// For Azure server pass true for ONCF server pass false
export const isBackOfficeUser = false;
/**
 * @deprecated fuction to create constants to be used in actions
 * @param  {...any} constants
 */
export function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}
// global utility to create reducer in action.

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action.payload) : state;
  };
}
// gloabal Utility for checking response status in actions
export function checkHttpStatus(response) {
  // console.log(response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 401) {
    // localStorage.clear();
    localStorage.removeItem("foUserDetails");
    localStorage.removeItem("foAuthToken");
    localStorage.removeItem("foUserProfile");
    localStorage.removeItem("trainDetails");
    localStorage.removeItem("claimData");
    localStorage.removeItem("claimId");
    window.location.href = "/#/frontOffice/login";
  } else {
    console.log(response);
    var error = new Error(response.statusText);
    error.response = response;
    return error;
  }
}

export function handleLoginRedirect(token, userData) {
  console.log(token);
  localStorage.setItem("foAuthToken", JSON.stringify("Bearer " + token));
  localStorage.setItem("foUserDetails", JSON.stringify(userData));
  // this.props.history.push("/account");
  return;
}

export function handleLogoutRedirect() {

  localStorage.removeItem("foUserDetails");
  localStorage.removeItem("foAuthToken");
  localStorage.removeItem("foUserProfile");
  localStorage.removeItem("trainDetails");
  localStorage.removeItem("claimData");
  localStorage.removeItem("claimId");
  // createBrowserHistory.push("/pages/login-page");
  window.location.href = "/#/frontOffice/login";
}

export function parseJSON(response) {
  return response.data;
}

export function setModuleWeights(response) {
  localStorage.setItem("moduleWeights", JSON.stringify(response.data));
  return response;
}

export const errorCode = {
  authenticationError: 403,
  InternalServerError: 500,
};

export const successCode = {
  successStatusCode: 200,
};

export const fileName = "file";

// export function handleRedirect() {
//   localStorage.removeItem("authToken");
//   localStorage.removeItem("index");
//   browserHistory.push("/signin");
// }

export const START_DATE = "2019-03-01 12:00:00";
export const END_DATE = "2019-05-01 12:00:00";

//max length validation
export const maxLength = (max) => (value) => {
  return value && value.length > max
    ? `Must be ${max} characters or less`
    : undefined;
};
//min length validation
export const minLength = (min) => (value) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

// dropdown validation
export const required = (value) => {
  console.log(value);
  return value ? undefined : "Validate.REQUIRED";
};
