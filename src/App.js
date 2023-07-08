import { React } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import About from "./components/views/About/about";
import Detail from "./components/views/Detail/detail";
import Form from "./components/views/Form/form";
import Home from "./components/views/Home/home";
import Landing from "./components/views/Landing/landing";

function App() {
  return (
    <div className="App">
      <h1>ToolVerse</h1>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
