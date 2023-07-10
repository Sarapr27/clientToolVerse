import { GET_TOOLS_BY_NAME } from "./actions";

const initialState = {
    allTools: [], // guardamos aquí TODAS LAS TOOLS
    toolsShown: [], // éstas son las tools que van a renderizarse
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TOOLS_BY_NAME:
            return {
                ...state,
                toolsShown: [...action.payload]
            }
        default: return {
            ...state
        };
    }
}

export default rootReducer;