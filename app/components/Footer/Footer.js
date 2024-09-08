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
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d985.1767086437816!2d120.99557338298811!3d24.786939291709707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468360f0ca966fb%3A0xf06bae48eca3bbb3!2sTin%20Ka-Ping%20Photonic%20Bldg!5e0!3m2!1sen!2stw!4v1725801598430!5m2!1sen!2stw" width="100%" height="300" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          {/* <img src="/imgs/map-fake.png" alt="map" className="mt-3 w-full" /> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
