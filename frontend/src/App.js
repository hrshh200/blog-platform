import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from "./components/SignUP/SignUp";
import Login from "./components/Login/Login";
import Section from "./components/Section/Section"


const App = () =>{
  return(
    <>
    <BrowserRouter>
        <Routes>
            <Route
                exact
                path="/"
                element={<Home />}
            />
            <Route
                exact
                path="/signup"
                element={<Signup />}
            />
             <Route
                exact
                path="/login"
                element={<Login />}
            />
             <Route
                exact
                path="/section"
                element={<Section />}
            />
        </Routes>
    </BrowserRouter>
</>
  );
}

export default App;