import React, { FC, ReactNode } from "react";

const FormBox: FC<{ children: ReactNode; title: string }> = ({ children, title }) => {
  return (
    <div className="relative p-4 rounded mb-8" style={{ boxShadow: "2px 2px 4px 1px rgba(0,0,0,0.25)" }}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      {children}
    </div>
  );
};

export default FormBox;
