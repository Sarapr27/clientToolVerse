import {
  ADD_TO_CART,
  CLEAN_BDD,
  CREATE_USER,
  GET_USER,
  ERROR_404,
  GET_TOOLS,
  GET_TOOLS_BY_ID,
  GET_TOOLS_BY_NAME,
  ORDER_BY_NAME,
  ORDER_BY_PRICE,
  REMOVE_FROM_CART,
  SET_CURRRENT_PAGE,
  CHANGE_FILTER_CATEGORY,
  CHANGE_FILTER_BRAND,
  LOGIN,
  CERRAR_SESION,
  ERROR_LOGIN,
  ISAUTHENTICATED
} from "./type";

const initialState = {
  allTools: [], // guardamos aquí TODAS LAS TOOLS
  toolsShown: [], // éstas son las tools que van a renderizarse
  toolsDetail: {}, // Tendra la informacion detallada de cada tools.
  usersCreated: [], // Aca guardaremos nuestras User Creadas del FORM. npmbre del array MODIFICABLE
  actualUser: {}, // aquí veremos el user una vez que haga hecho logIn
  // actualUser: {
  //   id: 99,
  //   firstName: "Testing",
  //   lastName: "User",
  //   email: "iamatest@soyunaprueba.com",
  //   phone: 1234567890,
  //   address: "Una calle 99, Centro, Cba, Arg. 5000"
  // }, // esto es nada más para verlo renderizado en el carrito 
  itemCart: [], // Aca almacenaremos todos los productos cargados en el carrito
  error404: false,
  currentPage: 1,
  login:[],
  errorLogin:"",
  isAuthenticated:false
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TOOLS:
      return {
        ...state,
        allTools: payload,
        toolsShown: payload,
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
      // debería haber una comprobación para que no hayan dos usuarios con el mismo nombre (?)
      // no he chequeado aún si eso existe en el back
      return {
        ...state,
        usersCreated: [...state.usersCreated, payload],
      };
    case GET_USER:
      return {
        ...state,
        actualUser: payload
      }
    case ADD_TO_CART:
      return {
        ...state,
        itemCart: [...state.itemCart, payload]
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        itemCart: state.itemCart.filter((item) => item.id !== payload)
      };
    case ERROR_404:
      return {
        // analizar si usaremos Esta logica en un componente si no se borra
        ...state,
        error404: true,
      };
    case ORDER_BY_NAME:
      const productsName = [...state.toolsShown];
      const sortProductsName = productsName.sort((a, b) => {
        if (a.name > b.name) {
          return payload === "A-Z" ? 1 : -1;
        }
        if (a.name < b.name) {
          return payload === "A-Z" ? -1 : 1;
        } else return 0;
      });

      return {
        ...state,
        toolsShown: sortProductsName,
      };

    case ORDER_BY_PRICE:
      const productsPrice = [...state.toolsShown];
      const sortProductsPrice = productsPrice.sort((a, b) => {
        if (a.price > b.price) {
          return payload === "Mayor precio" ? -1 : 1;
        }
        if (a.price < b.price) {
          return payload === "Mayor precio" ? 1 : -1;
        } else return 0;
      });
      return {
        ...state,
        toolsShown: sortProductsPrice,
      };
    case SET_CURRRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case CLEAN_BDD:
      return {
        ...state,
        toolsShown: []
      };
    case CHANGE_FILTER_CATEGORY:
      const cat = [...state.allTools]
      return {
        ...state,
        toolsShown: cat.filter(e => e.category.includes(payload))
      };
    case CHANGE_FILTER_BRAND:
      const brn = [...state.allTools]
      return {
        ...state,
        toolsShown: brn.filter(e => e.brand === payload)
      };
      case LOGIN:
        return{
          ...state,
          login:payload
        }
      case CERRAR_SESION:
        return{
          ...state,
          isAuthenticated: false
        }
      case ISAUTHENTICATED:
        return{
          ...state,
          isAuthenticated:true
        }
      case ERROR_LOGIN:
        return{
          ...state,
          errorLogin:payload
        }
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
