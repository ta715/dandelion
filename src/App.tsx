import React, { useState } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";
import TopPage from "./domain/top/routes/TopPage";
import Header from "./layout/Header";
import List from "./domain/list/routes/List";
import DetailPage from "./domain/detail/routes/DetailPage";
import FormPage from "./domain/form/routes/FormPage";
import ConfirmationPage from "./domain/confirmation/routes/ConfirmationPage";
import Login from "./domain/Auth/routes/LoginPage";
import Signup from "./domain/Auth/routes/SginupPage";

const App: React.FC = (props: any) => {
  return (
    <div className="App">
      <HelmetProvider>
        <ChakraProvider>
          <Routes>
            <Route path="" element={<Header />}>
              <Route path="/" element={<TopPage />} />
              <Route path="/list" element={<List />} />
              <Route path="/detail" element={<DetailPage />} />
              <Route path="/form" element={<FormPage />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </ChakraProvider>
      </HelmetProvider>
    </div>
  );
};

export default App;
