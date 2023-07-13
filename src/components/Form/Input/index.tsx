import React, { FC } from "react";

import { IInputProps } from "./types";

import "components/Form/styles.scss";

const Input: FC<IInputProps> = ({register, type = "text", error}) => {
  console.log(register);
  return (
    <>
      <input type={type} {...register} className={`form-input ${error ? 'form-input--error' : ''}`}/>
      {error && <small  className="form-input__error">{error.message}</small>}
    </>
  );
};

export default Input;
