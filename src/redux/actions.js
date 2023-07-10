// import axios from "axios";

export const GET_TOOLS_BY_NAME = 'GET_TOOLS_BY_NAME';

export const getToolsByName = (tool) => {
    return async function (dispatch) {
        let response = { data: 'vamos a buscar por nombre' }
        // todavía no sabemos cómo van a ser los nombres de las rutas en el back pero es un tentativo
        // let response = await axios.get(`http://localhost:3001/tools/name?name=${tool}`)

        return dispatch(
            {
                type: GET_TOOLS_BY_NAME,
                payload: response.data
            }
        )
    }
}