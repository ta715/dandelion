import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";
import TopPage from "./domain/top/routes/TopPage";
import Header from "./layout/Header";
import List from "./domain/list/routes/List";
import DetailPage from "./domain/detail/routes/DetailPage";
import FormPage1 from "./domain/form/routes/FormPage1";
import FormPage2 from "./domain/form/routes/FormPage2";

const App: React.FC = (props: any) => (
  <div className="App">
    <HelmetProvider>
      <ChakraProvider>
        <Routes>
          <Route path="" element={<Header />}>
            <Route path="/" element={<TopPage />} />
            <Route path="/list" element={<List />} />
            <Route path="/detail" element={<DetailPage />} />
            <Route path="/form1" element={<FormPage1 />} />
            <Route path="/form2" element={<FormPage2 />} />
          </Route>
        </Routes>
      </ChakraProvider>
    </HelmetProvider>
  </div>
);

export default App;
