"use client";
import React, { useEffect, useState } from "react";
import FormDescriptionInput from "../admin-utils/FormDescrption";
import FormInput from "../admin-utils/form-input";
import FormSubmit from "../admin-utils/FormSubmit";
import { useFetchData } from "@/src/hooks/useFetchData";

const AdminGeneral = () => {
  const { data, putData } = useFetchData("about-lab");
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
    console.log(generalData);
    putData(generalData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput name="mobile" required placeholder="Mobile" value={generalData.mobile} onChange={onChange} />
      <FormInput name="email" required placeholder="Email" value={generalData.email} onChange={onChange} />
      <FormInput name="address" required placeholder="Address" value={generalData.address} onChange={onChange} />
      <FormDescriptionInput name="about" required placeholder="Experience" value={generalData.about} onChange={onChange} />
      <FormSubmit title="Update" />
    </form>
  );
};

export default AdminGeneral;
