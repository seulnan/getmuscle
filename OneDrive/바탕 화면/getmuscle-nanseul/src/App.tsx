import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrderList from "./components/OrderList";
import "./App.css";
import ShoppingPage from "./components/ShoppingPage";
import Charge from "./components/Charge";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShoppingPage />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/charge" element={<Charge />} />
      </Routes>
    </Router>
  );
}

export default App;
