import React from "react";
import ChargeAd from "../../assets/images/ChargeAd.png";
import ChargePoint from "./ChargePoint";
import Toolbar from "../Toolbar";

const Charge: React.FC = () => {
  return (
    <div>
      <h1>포인트 충전</h1>
      <img src={ChargeAd} alt="ChargeAd" />
      <ChargePoint />
      <Toolbar />
    </div>
  );
};

export default Charge;
