import React from "react";
import Layout from "./components/layout";
import Main from "./views/main";
import { Route, Routes } from "react-router-dom";
import Sales from "./views/sales";

function App() {
  return (
    <Routes>
      <Route
        exact
        path="/sales"
        element={
          <Layout>
            <Sales />
          </Layout>
        }
      />
      <Route
        exact
        path="/"
        element={
          <Layout>
            <Main />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
