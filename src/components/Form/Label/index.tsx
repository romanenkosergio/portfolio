import React, { FC, PropsWithChildren } from "react";

import { ILabelProps } from "./types";

import "components/Form/styles.scss";

const Label: FC<PropsWithChildren<ILabelProps>> = ({label, children}) => {
  return (
    <label className="form-item">
      <span className="form-item__text">{label}:</span>
      {children}
    </label>
  );
};

export default Label;
