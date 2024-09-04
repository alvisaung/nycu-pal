import React, { FC } from "react";

interface FormInputProps {
  title: string;
}
const FormSubmit: FC<FormInputProps> = ({ title }) => {
  return (
    <div className="mb-6">
      {/* <label htmlFor="title" className="block text-sm mb-1">
        {label}
      </label> */}
      <button type="submit" className="bg-[#0077B5] text-white py-1 pt-2 px-12 text-base rounded  focus:shadow-outline hover:bg-[#005f8a]">
        {title}
      </button>
    </div>
  );
};

export default FormSubmit;