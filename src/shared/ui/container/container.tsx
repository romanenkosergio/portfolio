import type { FC } from "react";

import { twMerge } from "tailwind-merge";

import type { IContainerProps } from "./container.types";

const Container: FC<IContainerProps> = ({ children, className }) => {
  const classes = twMerge("container", className);

  return <div className={classes}>{children}</div>;
};

export default Container;
