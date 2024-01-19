import React from "react";
import "./quality.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Quality = () => {
  return (
    <section className="brandQuality">
      <h3 className="brandvalue">Brand Value</h3>
      <div className="qualityContainer">
        <div className="qualityLeft">
          <h5>Superior quailty</h5>
        <CheckCircleIcon/>
        </div>
        <div className="qualityCenter">
          <h5>High Durability</h5>
          <TimelapseIcon/>
        </div>
        <div className="qualityRight">
          <h5>Affordable Price</h5>
          <CurrencyRupeeIcon />
        </div>
      </div>
    </section>
  );
};

export default Quality;
