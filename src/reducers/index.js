import ThemeOptions from "./ThemeOptions";
import { reducer as form } from "redux-form"; // SAYING use redux form reducer as reducer
import Login from "./LoginReducer";
import Account from "./AccountReducer";
import Station from "./StationReducer";
import Category from "./CategoriesReducer";
import Claim from "./ClaimReducer";
import SubCategory from "./SubCategoryReducer";
import SubSubCategory from "./SubSubCategoryReducer";

export default {
  ThemeOptions,
  Login,
  Account,
  Station,
  form,
  Category,
  Claim,
  SubCategory,
  SubSubCategory,
};
