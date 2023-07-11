import {
  CREATE_TOOLS,
  GET_TOOLS,
  GET_TOOLS_BY_ID,
  GET_TOOLS_BY_NAME,
} from "./type";

const initialState = {
  allTools: [], // guardamos aquí TODAS LAS TOOLS
  toolsShown: [], // éstas son las tools que van a renderizarse
  toolsDetail: {}, // Tendra la informacion detallada de cada tools.
  createTools: [], // Aca guardaremos nuestras Tools Creadas del FORM. npmbre del array MODIFICABLE
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
    case CREATE_TOOLS:
      return {
        ...state,
        createTools: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
