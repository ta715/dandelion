import React, { useState } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";
import TopPage from "./domain/top/routes/TopPage";
import Header from "./layout/Header";
import List from "./domain/list/routes/List";
import DetailPage from "./domain/detail/routes/DetailPage";
import FormPage from "./domain/form/routes/FormPage";
import Login from "./domain/Auth/routes/LoginPage";
import Signup from "./domain/Auth/routes/SginupPage";

const queryClient = new QueryClient();

const App: React.FC = (props: any) => {
  return (
    <div className="App">
      <HelmetProvider>
        <ChakraProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="" element={<Header />}>
                <Route path="/" element={<TopPage />} />
                <Route path="/list" element={<List />} />
                <Route path="/detail/:dandelionId" element={<DetailPage />} />
                {/* <Route path="/detail" element={<DetailPage />} /> */}
                <Route path="/form" element={<FormPage />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </QueryClientProvider>
        </ChakraProvider>
      </HelmetProvider>
    </div>
  );
};

export default App;
