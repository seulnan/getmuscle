import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrderList from "./components/shopping/OrderList";
import "./App.css";
import ShoppingPage from "./components/shopping/ShoppingPage";
import Charge from "./components/shopping/Charge";
import GroupPage from "./components/groups/GroupPage";
import MyProfile from "./components/groups/MyProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShoppingPage />} />

        <Route path="/orders" element={<OrderList />} />
        <Route path="/charge" element={<Charge />} />
        <Route path="/groups" element={<GroupPage />} />
        <Route path="/myprofile" element={<MyProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
