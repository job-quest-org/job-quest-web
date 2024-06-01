import React, { createContext, useState } from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./modules/User";
import Home from "./modules/Home";
import UserContextProvider from "./common/context/UserContextProvider";

function App() {
  return (
    //<UserContextProvider value={{ name: 'John Doe', setName: () => {}, email: 'john.doe@example.com', setEmail: () => {}, isAuthenticated: false, setIsAuthenticated: () => {} }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/User" element={<UserContextProvider><User /></UserContextProvider>} />
        <Route path="/about" element="#" />
        <Route path="/contact" element="#" />
      </Routes>
    </BrowserRouter>
    //</UserContextProvider>
  );
}
export default App;
