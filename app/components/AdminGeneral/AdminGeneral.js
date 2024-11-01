"use client";
import React, { useEffect, useState } from "react";
import FormDescriptionInput from "../admin-utils/FormDescrption";
import FormInput from "../admin-utils/form-input";
import FormSubmit from "../admin-utils/FormSubmit";
import { useFetchData } from "@/src/hooks/useFetchData";
import UploadImgComponent from "../AdminHome/UploadImgComponent";

const AdminGeneral = () => {
  const { data, putData } = useFetchData("about-lab");
  const [banner_urls, setBannerUrls] = useState([]);
  const [generalData, setGeneralData] = useState({
    about: "",
    mobile: "",
    email: "",
    address: "",
  });
  useEffect(() => {
    if (data) {
      // Ensure data is not an array
      setGeneralData({
        about: data.about || "",
        mobile: data.mobile || "",
        email: data.email || "",
        address: data.address || "",
      });
      if (data.banner_urls) {
        setBannerUrls(data.banner_urls ?? []);
      }
    }
  }, [data]);
  const onChange = (val, name) => {
    if (name) {
      setGeneralData((prevData) => ({
        ...prevData,
        [name]: val,
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    putData({ ...generalData, banner_urls: banner_urls });
    window.alert("添加成功！");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Banner</h2>
        <UploadImgComponent multiple initialImages={banner_urls} setImages={(res) => setBannerUrls(res)} />
      </div>
      <FormInput name="mobile" required placeholder="Mobile" value={generalData.mobile} onChange={onChange} />
      <FormInput name="email" required placeholder="Email" value={generalData.email} onChange={onChange} />
      <FormInput name="address" required placeholder="Address" value={generalData.address} onChange={onChange} />
      <FormDescriptionInput name="about" required placeholder="Experience" value={generalData.about} onChange={onChange} />
      <FormSubmit title="Update" />
    </form>
  );
};

export default AdminGeneral;
