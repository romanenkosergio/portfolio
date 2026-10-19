import type { FC } from "react";

import { cn } from "@/shared/lib";

import type { IContainerProps } from "./container.types";

const Container: FC<IContainerProps> = ({ children, className }) => {
  return <div className={cn("container", className)}>{children}</div>;
};

export default Container;
