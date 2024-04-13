import React from "react";
import { BiStoreAlt } from "react-icons/bi";
import { BiDollarCircle } from "react-icons/bi";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaSackDollar } from "react-icons/fa6";
import "./WebsiteData.css";

const WebsiteData = () => {
  return (
    <div className="website-data">
      <div className="main-dets">
        <div className="circle-one">
          <div className="circle-two">
            <BiStoreAlt />
          </div>
        </div>
        <h4>15.5k</h4>
        <p>Sellers active our Sites</p>
      </div>
      <div className="main-dets">
        <div className="circle-one">
          <div className="circle-two">
            <BiDollarCircle />
          </div>
        </div>
        <h4>34k</h4>
        <p>Monthly Product Sale</p>
      </div>
      <div className="main-dets">
        <div className="circle-one">
          <div className="circle-two">
            <IoBagHandleOutline />
          </div>
        </div>
        <h4>60k</h4>
        <p>Coustomer active in our site</p>
      </div>
      <div className="main-dets">
        <div className="circle-one">
          <div className="circle-two">
            <FaSackDollar />
          </div>
        </div>
        <h4>30k</h4>
        <p>Annule gross sale in our site</p>
      </div>
    </div>
  );
};

export default WebsiteData;
