import React from "react";

export default function InputField({ label, type="text", name, value, onChange, placeholder, required=false }) {
  return (
    <label className="block mb-4">
      <div className="text-sm font-medium mb-2 text-gray-700">{label}</div>
      <input
        className="input"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}
