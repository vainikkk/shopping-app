import axios from "axios";
import { EDIT_CATEGORY, CATEGORY, PARENT_CATEGORY, PRODUCT, EDIT_PRODUCT } from "../util/endpoints";
export const getCategoryList = () => (dispatch) => {
  axios
    .get(CATEGORY)
    .then((res) => res.data)
    .then((res) => {
      if (res) dispatch({ type: "SET_CATEGORY_LIST", payload: res });
    })
    .catch((err) => {
      dispatch({ type: "SET_TOAST", payload: err.message, error: true });
    });
};

export const getParentCategoryList = () => (dispatch) => {
  axios
    .get(PARENT_CATEGORY)
    .then((res) => res.data)
    .then((res) => {
      if (res) dispatch({ type: "SET_PARENT_CATEGORY_LIST", payload: res });
    })
    .catch((err) => {
      dispatch({ type: "SET_TOAST", payload: err.message, error: true });
    });
};

export const createCategory = (body) => (dispatch) => {
  axios
    .post(CATEGORY, body)
    .then((res) => res.data)
    .then((res) => {
      if (res) dispatch(getCategoryList());
    })
    .catch((err) => {
      dispatch({ type: "SET_TOAST", payload: err.message, error: true });
    });
};

export const editCategoryData = (id, body) => (dispatch) => {
  axios
    .put(EDIT_CATEGORY + id, body)
    .then((res) => res.data)
    .then((res) => {
      if (res) dispatch(getCategoryList());
    })
    .catch((err) => {
      dispatch({ type: "SET_TOAST", payload: err.message, error: true });
    });
};

export const deleteCategoryData = (id) => (dispatch) => {
  axios
    .delete(EDIT_CATEGORY + id)
    .then((res) => res.data)
    .then((res) => {
      dispatch({ type: "SET_TOAST", payload: "Deleted Successfully!", error: false });
      dispatch(getCategoryList());
    })
    .catch((err) => {
      dispatch({ type: "SET_TOAST", payload: err.message });
    });
};

//products

export const getProductList = () => (dispatch) => {
  axios
    .get(PRODUCT)
    .then((res) => res.data)
    .then((res) => {
      if (res) dispatch({ type: "SET_PRODUCT_LIST", payload: res });
    })
    .catch((err) => {
      dispatch({ type: "SET_TOAST", payload: err.message, error: true });
    });
};

export const createProduct = (body) => (dispatch) => {
  axios
    .post(PRODUCT, body)
    .then((res) => res.data)
    .then((res) => {
      if (res) dispatch(getProductList());
    })
    .catch((err) => {
      dispatch({ type: "SET_TOAST", payload: err.message, error: true });
    });
};

export const editProductData = (id, body) => (dispatch) => {
  axios
    .put(EDIT_PRODUCT + id, body)
    .then((res) => res.data)
    .then((res) => {
      if (res) dispatch(getProductList());
    })
    .catch((err) => {
      dispatch({ type: "SET_TOAST", payload: err.message, error: true });
    });
};

export const deleteProductData = (id) => (dispatch) => {
  axios
    .delete(EDIT_PRODUCT + id)
    .then((res) => res.data)
    .then((res) => {
      dispatch({ type: "SET_TOAST", payload: "Deleted Successfully!", error: false });
      dispatch(getProductList());
    })
    .catch((err) => {
      dispatch({ type: "SET_TOAST", payload: err.message, error: true });
    });
};
