"use client";

import type { FC } from "react";
import { useCallback, useEffect, useRef } from "react";

import { twMerge } from "tailwind-merge";

import { useScrollLock } from "@/shared/lib";

import type { IModalProps } from "./modal.types";

const Modal: FC<IModalProps> = ({ onClose, children, className, isOpen }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { lock, unlock } = useScrollLock({
    autoLock: false,
    lockTarget: "#scrollable"
  });

  const handleOpen = useCallback(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
      lock();
    }
  }, [lock]);

  const handleClose = useCallback(() => {
    if (dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close();
      unlock();
      onClose?.();
    }
  }, [unlock, onClose]);

  useEffect(() => {
    if (isOpen) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [isOpen, handleOpen, handleClose]);

  return (
    <dialog
      ref={dialogRef}
      id="scrollable"
      className={twMerge(
        "bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black transition-opacity",
        className
      )}
    >
      <div
        className="rounded-lg bg-white p-6"
        onClick={e => {
          e.stopPropagation();
          handleClose();
        }}
      >
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
