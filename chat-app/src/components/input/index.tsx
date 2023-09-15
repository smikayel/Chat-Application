import React, { ChangeEvent } from "react";

interface CustomInputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  onChange: (value: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  type,
  onChange,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <div className="p-3">
      <input
        className="border rounded-lg border-gray-300 bg-white text-gray-700 text-lg font-FiraCode font-normal px-3 py-1 focus:ring focus:ring-blue-200 outline-none"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default CustomInput;
