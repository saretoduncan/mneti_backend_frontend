import React from "react";

interface IInputError {
  message: string;
}
const Input_error_component: React.FC<IInputError> = ({ message }) => {
  return <small className="text-destructive">{message}</small>;
};

export default Input_error_component;
