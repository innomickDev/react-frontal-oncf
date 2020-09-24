import { CATEGORY_CONST } from "../actions/actionTypes";
export default function reducer(
  state = {
    getCategoriesData: null,
    isAddeCategoryNetworkError: null
  },
  action
) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    // Get category
    case CATEGORY_CONST.GET_CATEGORY_REQUEST:
      // console.log(action.payload);
      return {
        ...state,
        getCategoriesData: null,
        errorStatus: null
      };
    case CATEGORY_CONST.GET_CATEGORY_SUCCESS:
      // console.log(action.payload);

      return {
        ...state,
        getCategoriesData: action.payload.response.data.isSuccess
          ? action.payload.response.data.data
          : null,
        errorStatus: null
      };
    case CATEGORY_CONST.GET_CATEGORY_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        getCategoriesData: null,
        errorStatus: action.payload.response.error.errorDescription
      };

    // Delete category
    case CATEGORY_CONST.DELETE_CATEGORY_REQUEST:
      // console.log(action.payload);
      return {
        ...state,
        isDeleteSuccess: null,
        isDeleteFailure: null
      };
    case CATEGORY_CONST.DELETE_CATEGORY_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        isDeleteSuccess: action.payload.response.data.isSuccess ? true : false,
        isDeleteFailure: null
      };
    case CATEGORY_CONST.DELETE_CATEGORY_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        isDeleteSuccess: null,
        isDeleteFailure: action.payload.response.error.errorDescription
      };
    // Add category
    case CATEGORY_CONST.ADD_CATEGORY_REQUEST:
      // console.log(action.payload);
      return {
        ...state,
        isAddCategorySuccess: null,
        isAddCategoryFailure: null
      };
    case CATEGORY_CONST.ADD_CATEGORY_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        isAddCategorySuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isAddCategoryFailure: null
      };
    case CATEGORY_CONST.ADD_CATEGORY_FAILURE:
      // console.log(action.payload.error);
      return {
        ...state,
        isAddCategorySuccess: null,
        isAddCategoryFailure: action.payload.response.error.errorDescription
      };
    // Update category
    case CATEGORY_CONST.UPDATE_CATEGORY_REQUEST:
      // console.log(action.payload);
      return {
        ...state,
        isUpdateCategorySuccess: null,
        isUpdateCategoryFailure: null
      };
    case CATEGORY_CONST.UPDATE_CATEGORY_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        isUpdateCategorySuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isUpdateCategoryFailure: null
      };
    case CATEGORY_CONST.UPDATE_CATEGORY_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        isUpdateCategorySuccess: null,
        isUpdateCategoryFailure: action.payload.response.error.errorDescription
      };
  }

  // console.log(state);
  return state;
}
