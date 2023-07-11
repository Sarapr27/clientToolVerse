// import axios from "axios";

import {
  GET_TOOLS,
  GET_TOOLS_BY_NAME,
  GET_TOOLS_BY_ID,
  CREATE_TOOLS,
} from "./type";

export const getToolsByName = (tool) => {
  return async function (dispatch) {
    let response = { data: "vamos a buscar por nombre" };
    // todavía no sabemos cómo van a ser los nombres de las rutas en el back pero es un tentativo
    // let response = await axios.get(`http://localhost:3001/tools/name?name=${tool}`)

    return dispatch({
      type: GET_TOOLS_BY_NAME,
      payload: response.data,
    });
  };
};

export const getTools = () => {
  return async function (dispatch) {
    const tools = { data: "Peticion que trae todas las CartTools" };
    // const tools = await axios.get(`http://localhost:3001/tool`)
    dispatch({ type: GET_TOOLS, payload: tools.data });
  };
};

export const getToolById = (id) => {
  return async function (dispatch) {
    const tools = { data: "Peticion que trae por Id las CartTools" };
    // const tools = await axios.get(`http://localhost:3001/tool/${id}`)
    dispatch({ type: GET_TOOLS_BY_ID, payload: tools.data });
  };
};

export const createTools = () => {
  return async function (dispatch) {
    const create = { data: "Peticion que te traera las Tools Creadas en Form" };
    // const create = await axios.post(`http://localhost:3001/"NOMBRE CREADO EN BACK"`)
    dispatch({ type: CREATE_TOOLS, payload: create });
  };
};
