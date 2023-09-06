import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
} from "../constants/productConstants";
import axios from "axios";

export function getProduct({
  productName = "",
  page = 1,
  price = [0, 200000],
  category,
  ratings = 0,
}) {
  return async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });

      let url = `/eshop/api/v1/products?name=${productName}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${ratings}`;

      if (category) {
        url = `/eshop/api/v1/products?name=${productName}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${ratings}`;
      }
      const { data } = await axios.get(url);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
}

export function getProductDetails(id) {
  return async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_DETAILS_REQUEST,
      });

      const { data } = await axios.get(`/eshop/api/v1/product/${id}`);

      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
}

export function addReview(reviewData) {
  return async (dispatch) => {
    try {
      dispatch({
        type: NEW_REVIEW_REQUEST,
      });

      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.put(
        `/eshop/api/v1/product/review`,
        reviewData,
        config
      );

      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };
}

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("/eshop/api/v1/admin/products");

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export function deleteProduct(id) {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_PRODUCT_REQUEST,
      });

      const { data } = await axios.delete(`/eshop/api/v1/admin/product/${id}`);

      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
}

export function createProduct(productData) {
  return async (dispatch) => {
    try {
      dispatch({
        type: NEW_PRODUCT_REQUEST,
      });

      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        `/eshop/api/v1/admin/product/new`,
        productData,
        config
      );

      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
}

export function updateProduct(id, productData) {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PRODUCT_REQUEST,
      });

      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.put(
        `/eshop/api/v1/admin/product/${id}`,
        productData,
        config
      );

      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.message,
      });
    }
  };
}
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
