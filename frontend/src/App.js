import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/header/Header.jsx";
import Body from "./components/body/Body.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DataProvider } from "./globalState.js";

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <Route>
          <Header/>
          <Body/>
          <ToastContainer/>
        </Route>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;