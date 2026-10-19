import { HTMLAttributes, PropsWithChildren, PropsWithoutRef } from "react";

export interface IContainerProps
  extends PropsWithoutRef<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> {}
