import {
  ADD_TO_CART,
  CLEAN_BDD,
  CREATE_USER,
  GET_USER,
  GET_TOOLS,
  GET_TOOLS_BY_ID,
  GET_TOOLS_BY_NAME,
  ORDER_BY_NAME,
  ORDER_BY_PRICE,
  REMOVE_FROM_CART,
  LESS_FROM_CART,
  SET_CURRRENT_PAGE,
  CHANGE_FILTER_CATEGORY,
  CHANGE_FILTER_BRAND,
  LOGIN,
  CERRAR_SESION,
  ERROR_LOGIN,
  ISAUTHENTICATED,
  UPDATE_TOOL_STOCK,
  // REGISTER_STOCK_ENTRY_SUCCESS,
  // REGISTER_STOCK_ENTRY_FAILURE,
  REGISTER_STOCK_EXIT_SUCCESS,
  REGISTER_STOCK_EXIT_FAILURE,
  ACTUAL_USER,
  ADD_REVIEW,
  UPDATE_REVIEW_COMMENTS,
  DELETE_REVIEW,
  DELETE_TROLLEY
} from "./type";

const initialState = {
  allTools: [], // guardamos aquí TODAS LAS TOOLS
  toolsShown: [], // éstas son las tools que van a renderizarse
  toolsDetail: {}, // Tendra la informacion detallada de cada tools.
  usersCreated: [], // Aca guardaremos nuestras User Creadas del FORM. npmbre del array MODIFICABLE
  actualUser: {}, // temporal -> el usuarui 
  // actualUser: {
  //   id: 9999,
  //   firstName: "Testing",
  //   lastName: "User",
  //   email: "iamatest@soyunaprueba.com",
  //   phone: 1234567890,
  //   address: "Una calle 99, Centro, Cba, Arg. 5000"
  // }, // esto es nada más para verlo renderizado en el carrito
  itemCart: [], // Aca almacenaremos todos los productos cargados en el carrito
  currentPage: 1,
  login: [], // aquí veremos el user una vez que haga hecho logIn
  errorLogin: "",
  isAuthenticated: false,
  reviews:[],
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
      return {
        ...state,
        usersCreated: [...state.usersCreated, payload],
      };
    case GET_USER:
      return {
        ...state,
        actualUser: payload,
      };

    case ADD_TO_CART:
      const itemId = payload.id;
      const existingItemIndex = state.itemCart.findIndex(
        (item) => item.id === itemId
      );

      // Si el elemento no existe, lo agrega con una quantity = 1
      if (existingItemIndex === -1) {
        payload.quantity = 1;
        return {
          ...state,
          itemCart: [...state.itemCart, payload],
        };
      }
      // Si el elemento existe, aumenta su cantidad en 1
      else {
        const updatedCart = state.itemCart.map((item) => {
          if (item.id === itemId) {
            if (item.quantity >= 5) return item
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
          else return item
        }
        );
        return {
          ...state,
          itemCart: updatedCart,
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        itemCart: state.itemCart.filter(prod => prod.id !== payload)
      };

    case LESS_FROM_CART:
      let resta = [];
      state.itemCart.forEach((item) => {
        if (item.id === payload) {
          if (item.quantity === 1) {
            return 0;
          }
          if (item.quantity > 1) {
            let lessItem = {
              ...item,
              quantity: item.quantity - 1,
            };
            return resta.push(lessItem);
          }
        } else {
          resta.push(item);
        }
      });
      return {
        ...state,
        itemCart: resta,
      };

    case SET_CURRRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case CLEAN_BDD:
      return {
        ...state,
        toolsShown: [],
      };

    case CHANGE_FILTER_CATEGORY:
      const categoryFiltered = state.allTools.filter((e) => e.category.includes(payload));
      return {
        ...state,
        toolsShown: categoryFiltered,
      };

    case CHANGE_FILTER_BRAND:
      const brandFiltered = state.allTools.filter((e) => e.brand === payload);
      return {
        ...state,
        toolsShown: brandFiltered,
      };

    case ORDER_BY_NAME:
      const productsName = [...state.toolsShown];
      const sortProductsName = productsName.sort((a, b) => {
        if (a.name > b.name) {
          return payload === "de A-Z" ? 1 : -1;
        }
        if (a.name < b.name) {
          return payload === "de A-Z" ? -1 : 1;
        } else return 0;
      });

      return {
        ...state,
        toolsShown: [...sortProductsName],
      };

    case ORDER_BY_PRICE:
      const productsPrice = [...state.toolsShown];
      const sortProductsPrice = productsPrice.sort((a, b) => {
        if (a.price < b.price) {
          return payload === "Ascendente" ? -1 : 1;
        }
        if (a.price > b.price) {
          return payload === "Ascendente" ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        toolsShown: [...sortProductsPrice],
      };

    case UPDATE_TOOL_STOCK:
      // Actualizar el estado de las herramientas después de registrar una entrada o salida de stock
      const { productId, newStock } = payload;
      const updatedAllTools = state.allTools.map((tool) =>
        tool.id === productId ? { ...tool, stock: newStock } : tool
      );
      return {
        ...state,
        allTools: updatedAllTools,
      };
    // case REGISTER_STOCK_ENTRY_SUCCESS:
    case REGISTER_STOCK_EXIT_SUCCESS:
      // Actualizar el estado de las herramientas después de registrar una entrada o salida de stock
      const updatedStock = state.allTools.map((tool) =>
        tool.id === payload.id ? { ...tool, stock: payload.stock } : tool
      );
      return {
        ...state,
        allTools: updatedStock,
      };
    // case REGISTER_STOCK_ENTRY_FAILURE:
    case REGISTER_STOCK_EXIT_FAILURE:
      return {
        ...state,
        error: payload,
      };
    case LOGIN:
      return {
        ...state,
        login: payload,
      };

    case ACTUAL_USER:
      return {
        ...state,
        actualUser: payload
      }

    case CERRAR_SESION:
      return {
        ...state,
        isAuthenticated: false,
      };
    case ISAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      };
    case ERROR_LOGIN:
      return {
        ...state,
        errorLogin: payload,
      };

    case ADD_REVIEW:
        return {
          ...state,
          reviews: [...state.reviews, payload],
        };

    case UPDATE_REVIEW_COMMENTS:
        const { id, comments } = payload;
        return {
          ...state,
          reviews: state.reviews.map((review) =>
            review.id === id ? { ...review, comments } : review
          ),
        };

    case DELETE_REVIEW:
        const reviewId = payload;
        return {
          ...state,
          reviews: state.reviews.filter((review) => review.id !== reviewId),
        };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
