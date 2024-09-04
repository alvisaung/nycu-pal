import React, { FC } from "react";

interface FormInputProps {
  //   label: string;
  value: string;
  onChange: (val: string, name?: string, id?: number) => void;
  placeholder: string;
  isNumeric?: boolean;
  required?: boolean;
  name?: string;
  id?: number;
}
const FormInput: FC<FormInputProps> = ({ name, value, onChange, placeholder, isNumeric, required, id }) => {
  const isRequired = Boolean(required);
  return (
    <div className="mb-6">
      {/* <label htmlFor="title" className="block text-sm mb-1">
        {label}
      </label> */}
      <input name={name} id="title" required={isRequired} type={isNumeric ? "number" : "text"} placeholder={`${placeholder}${isRequired ? "*" : ""}`} value={value} onChange={(e) => onChange(e.target.value, name, id)} className="shadow  font-sans  border rounded w-full py-2 px-3  tracking-wide font-normal  focus:shadow-outline" />
    </div>
  );
};

export default FormInput;
