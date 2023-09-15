import React, { CSSProperties } from 'react';

interface CustomButtonProps {
  text: string;
  onClick: () => void;
  customStyles?: CSSProperties;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick, customStyles }) => {
  return (
    <div className="p-2">
      <button
        className="text-white text-lg font-FiraCode font-normal border rounded-lg border-gray-300 bg-blue-600 hover:bg-blue-700 focus:ring focus:ring-blue-200 p-3 cursor-pointer"
        onClick={() => onClick()}
        style={customStyles}
      >
        {text}
      </button>
    </div>
  );
};

export default CustomButton;