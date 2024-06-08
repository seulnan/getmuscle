import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/Shoppingpage";
import OrderList from "./components/OrderList";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/orders" element={<OrderList />} />
      </Routes>
    </Router>
  );
}

export default App;
