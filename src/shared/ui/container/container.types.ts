import type { HTMLAttributes, PropsWithChildren, PropsWithoutRef } from "react";

export type IContainerProps = PropsWithoutRef<
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
>;
