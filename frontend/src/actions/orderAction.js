import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../constants/orderConstants";
import axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  const {
    userSignin: { userInfo },
  } = getState();
  await axios
    .post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
    .then((data) => {
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.data.Order });
      //   console.log(data);
      dispatch({ type: CART_EMPTY });
      localStorage.removeItem("cartItems");
    })
    .catch((err) => {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    });
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  await axios
    .get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
    .then((data) => {
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.data });
    })
    .catch((err) => {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    });
};
