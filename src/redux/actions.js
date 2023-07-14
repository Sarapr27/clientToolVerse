import axios from "axios";

import {
  GET_TOOLS,
  GET_TOOLS_BY_NAME,
  GET_TOOLS_BY_ID,
  CREATE_USER,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ERROR_404,
} from "./type";

export const getToolsByName = (tool) => {
  return async function (dispatch) {
    let response = await axios.get(`http://localhost:3001/products?name=${tool}`);
    return dispatch({
      type: GET_TOOLS_BY_NAME,
      payload: response.data,
    });
  };
};

export const getTools = () => {
  return async function (dispatch) {
    const tools = await axios.get(`http://localhost:3001/products`)
    dispatch({ type: GET_TOOLS, payload: tools.data });
  };
};

export const getToolById = (id) => {
  return async function (dispatch) {
    const tools = await axios.get(`http://localhost:3001/products/${id}`)
    dispatch({ type: GET_TOOLS_BY_ID, payload: tools.data });
  };
};

export const createUser = () => {
  return async function (dispatch) {
    const create = await axios.post(`http://localhost:3001/user`);
    dispatch({ type: CREATE_USER, payload: create });
  };
};

export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const removeFromCart = (itemId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: itemId,
  };
};

export const errorNotFound404 = () => { // analizar si usaremos Esta logica en un componente si no se borra
  return {
    type: ERROR_404,
  }
}

