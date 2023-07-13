import { React } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import About from "./components/views/About/about";
import Detail from "./components/views/Detail/detail";
import Form from "./components/views/Form/form";
import Home from "./components/views/Home/home";
import Landing from "./components/views/Landing/landing";
import NavBar from "./components/views/NavBar/navBar";
import Cart from "./components/views/Cart/cart";
import ProductCard from "./components/views/ProductCard/ProductCard";
import Error404 from "./components/Error404/Error404";

function App() {
  const location = useLocation();

  return (
    <div className="App">
    
      {location.pathname !== '/' && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/form" element={<Form />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/tools" element={<ProductCard/>} />
        <Route path="/error" element={<Error404/>}/>
      </Routes>
    </div>
  );
}

export default App;
