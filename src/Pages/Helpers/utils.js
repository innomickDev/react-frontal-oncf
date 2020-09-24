import moment from "moment";
import namor from "namor";
import _ from "lodash";

import { toast } from "react-toastify";

export const INDEX_PAGE_SIZE_DEFAULT = 10;
export const INDEX_PAGE_SIZE_OPTIONS = [5, 10, 20, 30, 50];
// Regex
export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const ARABIC_REGEX = /^[\u0600-\u06FF\s 0-9 !@#$%^&*.,:'_-]*$/;
export const FRENCH_REGEX = /^[a-zA-ZàâçéèêëîïôûùüÿñæœÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ 0-9!@#$%^&*.,:'-_]*$/;
export const ENG_REGEX = /^[a-zA-Z. 0-9!@#$%^&*.,:'-_]*$/;
export const PHONE_REGEX = /^[0-9]*$/;

export const defaultDateFormat = "dd/MM/YYYY";

// React table dumy data
const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export const required = (value) => {
  return value ? undefined : "required";
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    prenom: namor.generate({
      words: 1,
      numbers: 0,
    }),
    nom: namor.generate({
      words: 1,
      numbers: 0,
    }),
    role:
      statusChance > 0.66
        ? "Agent"
        : statusChance > 0.33
        ? "ONCF user"
        : "Client",
    via:
      statusChance > 0.66
        ? "Facebook"
        : statusChance > 0.33
        ? "Twitter"
        : "Direct",
    date: Math.floor(Math.random() * 100),
  };
};

export function makeData(len = 5553) {
  return range(len).map((d) => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson),
    };
  });
}

// Specific function for getting time
export function dateFormat(date) {
  //console.log(date);
  let formatedDate = new Date(date);
  formatedDate = moment(formatedDate).format("DD/MM/YYYY ");
  return formatedDate !== "01/01/1753" &&
    formatedDate !== "01/01/1900" &&
    formatedDate !== "01/01/1970"
    ? formatedDate
    : "";
}

// Specific function for getting date without time
export function simpleDateFormat(date) {
  let formatedDate = new Date(parseInt(date) * 1000);
  formatedDate = moment(formatedDate).format("DD/MM/YYYY");
  return formatedDate !== "01/01/1753" &&
    formatedDate !== "01/01/1900" &&
    formatedDate !== "01/01/1970"
    ? formatedDate
    : "";
}
// Converting Timestamps
export function dateTimeFormat(date) {
  // console.log(date);
  let formatedDate = new Date(parseInt(date) * 1000);
  formatedDate = moment(formatedDate).format("DD/MM/YYYY HH:mm");
  // console.log(formatedDate);
  return formatedDate !== "01/01/1753" &&
    formatedDate !== "01/01/1900" &&
    formatedDate !== "01/01/1970"
    ? formatedDate
    : "";
}
//convert UTC to Local time
export function dateTimeUtcFormat(date) {
  // console.log;
  let formatedDate = new Date(date);
  formatedDate = moment
    .utc(date)
    .local()
    .format("DD/MM/YYYY HH:mm");
  return formatedDate !== "01/01/1753" &&
    formatedDate !== "01/01/1900" &&
    formatedDate !== "01/01/1970"
    ? formatedDate
    : "";
}
// Settin specific year for calender
export function dateFormatYMD(date) {
  let formatedDate = new Date(date);
  formatedDate = moment(formatedDate).format("YYYY/MM/DD");
  return formatedDate !== "1753/01/01" && formatedDate !== "1970/01/01"
    ? formatedDate
    : "";
}

export function requestDateFormat(date) {
  let formatedDate = new Date(date);
  formatedDate = moment(formatedDate).format("YYYY/MM/DD H:m:s");
  return formatedDate !== "1753/01/01" && formatedDate !== "1970/01/01"
    ? formatedDate
    : "";
}

export const createQueryString = (objParam) => {
  const queryString = Object.keys(objParam)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(objParam[k])}`)
    .join("&");
  return queryString;
};
/**
 *
 * @param {*} msg
 */
export const showError = (msg) => toast.error(msg);
/**
 *
 * @param {*} msg
 */
export const showSuccess = (msg) => toast.success(msg);
/**
 *
 * @param {*} stringdata
 * @param {*} charLength
 */
export const ellipseText = (stringdata, charLength) => {
  let str = stringdata;
  if (str && str.length > charLength) {
    let str2 = str.substring(0, charLength) + "...";
    return str2;
  } else {
    return str;
  }
};
/**
 *
 * @param {*} x
 */
export const numberWithCommas = (x) => {
  if (!x) return 0;
  //return  parseFloat(x.toString().replace('.',',').replace(' ','.'))
  //  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return x.toLocaleString("fr-FR");
};
export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function() {
    cb(reader.result);
  };
  reader.onerror = function(error) {};
};
/*const for Country name */
export const countryName = "Maroc";

export const phoneReg = /^[0-9]{10}$/;

// /*call this function to get select items based on particular language */

// getting label with language
export const getLangBasedItems = (selectArray, placeholder) => {
  // console.log(selectArray, "hello");
  const dataList = selectArray;
  let finalData = [];
  // finalData.push({
  //   label: placeholder,
  //   value: 0
  // });
  if (dataList) {
    // console.log(dataList);
    // console.log(localStorage.getItem("lang"));
    switch (localStorage.getItem("lang")) {
      case "en-US":
        for (let i = 0; i < dataList.length; i++) {
          finalData.push({
            label: dataList[i].labelEn,
            value: dataList[i].code,
          });
        }
        break;
      case "fr-FR":
        for (let i = 0; i < dataList.length; i++) {
          finalData.push({
            label: dataList[i].labelFr,
            value: dataList[i].code,
          });
        }
        // return dataList.map((item, key) => {
        //   console.log(dataList);
        //   finalData.push({
        //     label: item.labelFr,
        //     value: item.id
        //   });
        // });
        break;

      case "ar-MA":
        for (let i = 0; i < dataList.length; i++) {
          finalData.push({
            label: dataList[i].labelAr,
            value: dataList[i].code,
          });
        }
        // console.log(finalData);
        break;
      default:
    }
  }
  // dataList.map((data, key) => {

  // });
  return finalData;
};

// export const getLabel = (indicativeArray, indicativeId) => {
//   console.log(indicativeArray, indicativeId);
//   const indicative = _.find(indicativeArray, { value: indicativeId }).label;
//   return indicative;
// };

/*call this function to get particular language name based on selected language*/
export const getLangBasedItem = (languageData) => {
  const dataList = languageData;
  if (dataList) {
    let Item = {};
    dataList.translations.map((translation, key) => {
      if (translation.code === localStorage.getItem("lang")) {
        Item = {
          label: translation.name,
        };
      }
    });
    return Item;
  } else {
    return {
      label: "  ",
    };
  }
};

export const LANG_CODES = {
  french: "fr-FR",
  english: "en-US",
  arabic: "ar-MA",
};

export const getLangBasedValues = (languageData, langCode) => {
  for (let i = 0; i < languageData.length; i++) {
    if (languageData[i].code === langCode) {
      return languageData[i].name;
    }
  }
  return "";
};

export const CURRENT_USER_ID = JSON.parse(localStorage.getItem("foUserProfile"))
  ? JSON.parse(localStorage.getItem("foUserProfile")).data.id
  : null;
/**
 *
 * @param {*} permissionName
 */
export const canManage = (permissionName) => {
  const userData = JSON.parse(localStorage.getItem("foUserProfile"));
  // console.log(userData);
  let permissonArray = [];
  // if (!userData.data.roles) return true;
  userData.data.roles.map((role) => {
    permissonArray.push(role.permissions);
  });
  let permissionUnion = [...new Set(permissonArray)];
  return permissionUnion[0] ? permissionUnion[0].includes(permissionName) : ""; //todo

  //console.log(permissionUnion);
};
export const permissions = {
  canNotify: "CanNotify",
  canManageUsers: "CanManageUsers",
  canManageRoles: "CanManageRoles",
  deletable: "Deletable",
  canClaimCreate: "CanClaimCreate",
  canViewCustomerClaims: "CanViewCustomerClaims",
  canChangeClaimStatus: "CanChangeClaimStatus",
  canManageClaimCategories: "CanManageClaimCategories",
  canManageEmailTemplate: "CanManageEmailTemplate",
  canGenerateReports: "CanGenerateReports",
  canImportingDataFiles: "CanImportingDataFiles",
  canViewArchivedCustomerClaims: "CanViewArchivedCustomerClaims",
  canManageStation: "CanManageStation",
  canCreateCustomerClaim: "CanCreateCustomerClaim",
  canManageResponse: "CanManageResponse",
  canChangeClaimAssignment: "CanChangeClaimAssignment",
  canManageGroups: "CanManageGroups",
  canAddRemoveUsersFromGroup: "CanAddRemoveUsersFromGroup",
};

export const getFileExtension = (base64String) => {
  //const data = base64String.slice(0, 5);

  // console.log(base64String);
  switch (base64String.toUpperCase()) {
    case "/9J/4":
      return "data:image/jpeg;base64,";
    case "IVBOR":
      return "data:image/png;base64,";
    case "/9j/2":
      return "data:image/jpg;base64,";
    case "R0lGO":
      return "data:image/gif;base64,";
    case "JVBER":
      return "data:application/pdf;base64,";
    case "Qk06A":
      return "data:image/bmp;base64,";
    default:
      return false;
  }
};

export const colourOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", disabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

export const ReactTableTranslation = () => {
  return (this.translations = {
    previousText: this.props.t("CIList.PREVIOUS"),
    pageText: this.props.t("CIList.PAGE"),
    rowsText: this.props.t("CIList.ROWS"),
    nextText: this.props.t("CIList.NEXT"),
    ofText: this.props.t("CIList.OF"),
    loadingText: "LOADING...",
    noDataText: this.props.t("CIList.NO_RECORD_FOUND"),
  });
};

export const getLangBasedDataLabel = (langType) => {
  // console.log(langType);
  switch (localStorage.getItem("lang")) {
    case "ar-MA":
      return langType ? langType.labelAr : "none";
    case "fr-FR":
      return langType ? langType.labelFr : "none";
    case "en-US":
      return langType ? langType.labelEn : "none";
    default:
      return false;
  }
};

// For Azure server pass true for ONCF server pass false
// export const isBackOfficeUser = false;//

// Dev environment URL
// export const DEV_ENV_URL = "oncf-2255.azurewebsites.net";

export const DEV_ENV_URL = "localhost:3000";

// getting label with language
export const getLangBasedStationLabel = (langType) => {
  // console.log(langType);
  switch (localStorage.getItem("lang")) {
    case "en-US":
      return langType ? langType.descriptionEn : "none";
    case "fr-FR":
      return langType ? langType.descriptionFr : "none";
    case "ar-MA":
      return langType ? langType.descriptionAr : "none";
    default:
      return false;
  }
};
export const getTarifLabel = (langType) => {
  switch (localStorage.getItem("lang")) {
    case "en-US":
      return langType ? langType.designationEn : "none";
    case "fr-FR":
      return langType ? langType.designationFr : "none";
    case "ar-MA":
      return langType ? langType.designationAr : "none";
    default:
      return false;
  }
};

// getting label with language
export const getLangBasedStations = (selectArray, placeholder) => {
  // console.log(selectArray, "hello");
  const dataList = selectArray;
  let finalData = [];
  // finalData.push({
  //   label: placeholder,
  //   value: 0
  // });
  if (dataList) {
    // console.log(dataList);
    // console.log(localStorage.getItem("lang"));
    switch (localStorage.getItem("lang")) {
      case "en-US":
        for (let i = 0; i < dataList.length; i++) {
          finalData.push({
            label: dataList[i].descriptionEn,
            value: dataList[i].codeGare, //todo
          });
        }
        break;
      case "fr-FR":
        for (let i = 0; i < dataList.length; i++) {
          finalData.push({
            label: dataList[i].descriptionFr,
            value: dataList[i].codeGare,
          });
        }
        break;

      case "ar-MA":
        for (let i = 0; i < dataList.length; i++) {
          finalData.push({
            label: dataList[i].descriptionAr,
            value: dataList[i].codeGare,
          });
        }
        // console.log(finalData);
        break;
      default:
    }
  }
  // dataList.map((data, key) => {

  // });
  return finalData;
};
