import React, { FC } from "react";

import { ITextAreaProps } from "./types";

import "components/Form/styles.scss";

const TextArea: FC<ITextAreaProps> = ({register, error}) => {
  return (
    <>
      <textarea rows={8} {...register} className={`form-input ${error ? 'form-input--error' : ''}`}/>
      {error && <small className="form-input__error">{error.message}</small>}
    </>
  );
};

export default TextArea;
