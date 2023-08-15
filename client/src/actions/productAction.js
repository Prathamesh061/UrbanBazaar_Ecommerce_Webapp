import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";
import axios from "axios";

export function getProduct({
  productName = "",
  page = 1,
  price = [0, 50000],
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
      console.error(error.message);
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.message,
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
      console.error(error.message);
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
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
