// import Swagger from 'swagger-client'
import { LANG_CODES } from "../Pages/Helpers/utils.js";
import axios from "axios";

// creating global instance for the axios to call apis
export const AXIOS_INSTANCE = axios.create();
//AXIOS_INSTANCE.defaults.timeout = 100000;
AXIOS_INSTANCE.defaults.headers.common["Accept-Language"] = LANG_CODES.french;
//  export const  SWAGGER_INSTANCE = Swagger({ spec:specJson }
if (
  localStorage.getItem("foAuthToken") !== null &&
  localStorage.getItem("foAuthToken") !== undefined
) {
  const token = JSON.parse(localStorage.getItem("foAuthToken"));
  AXIOS_INSTANCE.defaults.headers.common["Authorization"] = token;
}
if (
  localStorage.getItem("lang") !== null &&
  localStorage.getItem("lang") !== undefined
) {
  const lang = localStorage.getItem("lang");
  AXIOS_INSTANCE.defaults.headers.common["Accept-Language"] = `${lang}`;
}

export const LOGIN_CONFIG = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Accept-Language": "fr-FR",
  },
};
export const CONFIG = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};
// base url
const BASE_URL = `${process.env.REACT_APP_SERVER_URL}`;

// Login
export const LOGIN_API = `${BASE_URL}/token`;
// Account todo
export const ACCOUNT_API = `${BASE_URL}`;
// Category
export const CATEGORY_API = `${BASE_URL}/Category`;
// Stations
export const STATION_API = `${BASE_URL}/Station`;
// Sub category
export const SUB_CATEGORY_API = `${BASE_URL}/SubCategory`;
// Sub sub category
export const SUB_SUB_CATEGORY_API = `${BASE_URL}/SubSubCategory`;
// Claims
export const CLAIM_API = `${BASE_URL}/Claim`;
// Role
export const ROLE_API = `${BASE_URL}/Role`;
// Account role
export const ACCOUNT_ROLE_API = `${BASE_URL}/AccountRole`;
// Group
export const GROUPS_API = `${BASE_URL}/Group`;
// Response
export const RESPONSE_API = `${BASE_URL}/Response`;
// Email temolate
export const EMAIL_TEMPLATE_API = `${BASE_URL}/EmailTemplate`;
// Statistics
export const STATISTICS_API = `${BASE_URL}/Statistics`;
