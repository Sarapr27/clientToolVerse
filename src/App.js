import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/views/About/about";
import Detail from "./components/views/Detail/detail";
import Form from "./components/views/Form/form";
import Home from "./components/views/Home/home";
import Landing from "./components/views/Landing/landing";

function App() {
  return (
    <div className="App">
      <h1>ToolVerse</h1>
      <Router>
        <Switch>
          <Route path="/landing" component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/detail" component={Detail} />
          <Route path="/form" component={Form} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
