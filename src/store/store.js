import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

let initialState = {
  isLoggedIn: false,
  token: "",
  data: [],
  editData: null,
  editProductData: null,
  showToast: false,
  toastMessage: "",
  toastType: "",
  filteredData: [],
  parentCategories: [],
  productFilteredData: [],
  productData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CATEGORY_LIST":
      return {
        ...state,
        data: action.payload,
        filteredData: action.payload,
      };

    case "SET_PRODUCT_LIST":
      return {
        ...state,
        productData: action.payload,
        productFilteredData: action.payload,
      };
    case "SET_PARENT_CATEGORY_LIST":
      return {
        ...state,
        parentCategories: action.payload,
      };
    case "FILTERED_DATA":
      return {
        ...state,
        filteredData: action.payload,
      };
    case "PRODUCT_FILTERED_DATA":
      return {
        ...state,
        productFilteredData: action.payload,
      };
    case "EDIT":
      let arrayOfData = state.data;
      let editData = arrayOfData.find((v) => v._id === action.payload);
      return {
        ...state,
        editData: editData,
      };
    case "EDIT_PRODUCT":
      let arrayOfProductData = state.productData;
      let editProductData = arrayOfProductData.find((v) => v._id === action.payload);
      return {
        ...state,
        editProductData: editProductData,
      };
    case "REMOVE_PRODUCT_EDIT_DATA":
      return {
        ...state,
        editProductData: null,
      };
    case "REMOVE_CATEGORY_EDIT_DATA":
      return {
        ...state,
        editData: null,
      };
    case "CLOSE_TOAST":
      return {
        ...state,
        showToast: false,
        toastMessage: null,
      };
    case "SET_TOAST":
      return {
        ...state,
        showToast: true,
        toastType: action.error ? "Error!" : "Success!",
        toastMessage: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
