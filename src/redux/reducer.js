import {
  ADD_TO_CART,
  CREATE_USER,
  GET_TOOLS,
  GET_TOOLS_BY_ID,
  GET_TOOLS_BY_NAME,
  REMOVE_FROM_CART,
} from "./type";

const initialState = {
  allTools: [], // guardamos aquí TODAS LAS TOOLS
  toolsShown: [], // éstas son las tools que van a renderizarse
  toolsDetail: {}, // Tendra la informacion detallada de cada tools.
  createUser: [], // Aca guardaremos nuestras Tools Creadas del FORM. npmbre del array MODIFICABLE
  itemCart: [], // Aca almacenaremos todos los productos cargados en el carrito
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TOOLS:
      return {
        ...state,
        allTools: payload,
      };
    case GET_TOOLS_BY_NAME:
      return {
        ...state,
        toolsShown: payload,
      };
    case GET_TOOLS_BY_ID:
      return {
        ...state,
        toolsDetail: payload,
      };
    case CREATE_USER:
      return {
        ...state,
        createUser: payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        itemCart: payload,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        itemCart: state.itemCart.filter((item) => item.id === payload),
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
