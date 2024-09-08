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
  multi?: boolean;
}
const FormInput: FC<FormInputProps> = ({ name, value, onChange, placeholder, isNumeric, required, id, multi }) => {
  const isRequired = Boolean(required);
  return (
    <div className="mb-6">
      {/* <label htmlFor="title" className="block text-sm mb-1">
        {label}
      </label> */}
      {multi ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value, name, id)} rows={5} name={name} required={isRequired} className="shadow  font-sans  border rounded w-full py-2 px-3  tracking-wide font-normal  focus:shadow-outline" placeholder={`${placeholder}${isRequired ? "*" : ""}`}></textarea>
      ) : (
        <input name={name} required={isRequired} type={isNumeric ? "number" : "text"} placeholder={`${placeholder}${isRequired ? "*" : ""}`} value={value} onChange={(e) => onChange(e.target.value, name, id)} className="shadow  font-sans  border rounded w-full py-2 px-3  tracking-wide font-normal  focus:shadow-outline" />
      )}
    </div>
  );
};

export default FormInput;
