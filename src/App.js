import React, {useEffect, useState} from "react";
import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import About from "./components/views/Footer/About/About";
import ContactUs from "./components/views/Footer/ContactUs/ContactUs";
import Detail from "./components/views/Detail/detail";
import Form from "./components/views/Form/form";
import Login from "./components/views/Login/login"
import Home from "./components/views/Home/home";
import Landing from "./components/views/Landing/landing";
import NavBar from "./components/views/NavBar/navBar";
import Cart from "./components/views/Cart/cart";
import ProductCards from "./components/views/ProductCards/ProductCards";
import Error404 from "./components/Error404/Error404";
import Footer from "./components/views/Footer/Footer";
import Dashboard from "./components/views/Admin/Dashboard/Dashboard";
import ProductsList from "./components/views/Admin/ProductsList/ProductsList";
//import Protected from "./Protection";
import UserProfile from "./components/views/UserProfile/UserProfile"
import EditProducts from "./components/views/Admin/EditProducts/EditProducts";
import PurchaseOrder from "./components/views/PurchaseOrder/purchaseOrder";
import User from "./components/views/Admin/User/User"
import CreateProduct from "./components/views/Admin/CreateProduct/CreateProduct";

import MPFeedback from "./components/MPFeedback/MPFeedback";
import { useDispatch, useSelector} from "react-redux";
import { setIsAuthenticated, setLastVisitedRoute } from "./redux/actions";
import {persistor} from './redux/store';
import Order from "./components/views/Admin/Order/Order";


function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const lastVisitedRoute = useSelector((state) => state.setLastVisitedRoute);

  const [isLoginFormSubmitted, setIsLoginFormSubmitted] = useState(false); // Estado para rastrear si el formulario de inicio de sesión se envió

  useEffect(() => {
    // Verificar si hay un token almacenado en el Local Storage
    const storedToken = window.localStorage.getItem("token");
    if (storedToken) {
      dispatch(setIsAuthenticated(true));
    }

    // Configura Redux Persist para mantener el estado global después de un reinicio
    persistor.persist();
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      // Si no hay token, redirige al usuario a la última ruta visitada antes de iniciar sesión o a la página de inicio del perfil si se autenticó mediante el formulario
      const destination = isLoginFormSubmitted ? "/userprofile" : lastVisitedRoute;
      navigate(destination);
    }
  }, [isAuthenticated, isLoginFormSubmitted, lastVisitedRoute, navigate]);

  return (
    <div className="App">

      {location.pathname !== '/' && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/tools" element={<ProductCards />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/purchaseOrder" element={<PurchaseOrder />} />
        <Route path="/feedback" element={<MPFeedback />} />

        {/* Rutas para Admin */}
        {/* <Route element={<Protected />}> */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/productsList" element={<ProductsList />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/admin/user" element={<User />} />
          <Route path="/admin/order" element={<Order />} />
        {/* </Route> */}


        <Route path="/admin/editproducts" element={<EditProducts />} />

      </Routes>
    </div>
  );
}

export default App;
