import React from "react";
import { Routes, Route } from "react-router-dom";
import TransactionsList from "./components/TransactionList/TransactionsList";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import "./index.css";
import { ToastContainer } from "react-toastify";


const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Wrap all routes with the Layout component */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionsList />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
