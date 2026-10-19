import { PropsWithChildren } from "react";

export interface IModalProps extends PropsWithChildren {
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
}
