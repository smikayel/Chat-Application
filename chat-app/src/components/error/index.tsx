import React from "react";

interface CustomErrorProps {
  errorMessage: string;
}

const CustomError: React.FC<CustomErrorProps> = ({ errorMessage }) => {
  return (
    <div className="p-2 text-red-500 font-FiraCode font-normal text-base">
      {errorMessage}
    </div>
  );
};

export default CustomError;
