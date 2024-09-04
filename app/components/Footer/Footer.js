// "use client";
import React from "react";
import { fetchData } from "../../../src/services/dataService";
import api from "api/index.js";

const Footer = async (props) => {
  const data = await fetchData("/about-lab");

  return (
    <div className="mt-auto  bg-footer-bg text-custom-text-white   pt-6 pb-12 font-space-grotesk">
      <div className="w-5/6 m-auto flex md:flex-row flex-col md:justify-between">
        <div className="w-full md:w-2/5">
          <h3 className="text-lg underline">Contact Us</h3>
          <div className="flex-row flex items-center gap-x-2 md:mt-4 mt-3">
            <img src="/imgs/phone.png" alt="Phone" className="w-4 h-fit h-4" />
            <h5 className="text-base nav_menu_item  cursor-pointer">{data.mobile}</h5>
          </div>
          <div className="flex-row flex items-center gap-x-2 md:mt-3 mt-2">
            <img src="/imgs/mail-white.png" alt="Phone" className="w-4 h-fit h-4" />
            <h5 className="text-base nav_menu_item  cursor-pointer">{data.email}</h5>
          </div>
          <div className="flex-row flex items-start gap-x-2 md:mt-3 mt-2">
            <img src="/imgs/marker.png" alt="Phone" className="w-4 mt-1 h-fit h-4" />
            <h5 className="text-base nav_menu_item  cursor-pointer">{data.address} </h5>
          </div>
        </div>
        <div className="w-full  mt-8 md:w-3/5 md:mt-0">
          <h3 className="text-lg underline">Google Map Location</h3>
          <img src="/imgs/map-fake.png" alt="map" className="mt-3 w-full" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
