import React, { FC } from "react";

import { IButtonProps } from "./types";

import "./styles.scss";

const Button: FC<IButtonProps> = ({text, type = "default", action, disabled = false, className, buttonType = "button", id}) => {
  return (
    <button disabled={disabled} type={buttonType} className={`button button--${type} ${className ? className : ''}`} onClick={action && action} id={id}>
      <span className="button__text">{text}</span>
    </button>
  );
};

export default Button;
