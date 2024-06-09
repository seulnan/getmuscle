import React from "react";
import { ReactComponent as ChargeAd } from "./images/ChargeAd.svg";
import ChargePoint from "./ChargePoint";

const Charge: React.FC = () => {
  return (
    <div>
      <h1>포인트 충전</h1>
      <ChargeAd className="chargeAd" />
      <ChargePoint />
    </div>
  );
};

export default Charge;
