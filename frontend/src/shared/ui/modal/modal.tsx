"use client";

import { useCallback, useEffect } from "react";

import { cn } from "@/shared/lib/classnames";
import { Button } from "@/shared/ui/button";
import { CloseIcon } from "@/shared/ui/icons";

import type { ModalProps } from "./modal.types";

import styles from "./modal.module.scss";

export function Modal({
  children,
  className = "",
  closeClassName = "",
  contentClassName = "",
  isOpen,
  onClose,
  overlayClassName = "",
  title,
  titleClassName = "",
}: ModalProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(styles.overlay, overlayClassName)}
      data-open={isOpen}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={cn(styles.modal, className)}
        data-open={isOpen}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        <Button
          className={cn(styles.close, closeClassName)}
          variant="ghost"
          onClick={onClose}
          aria-label="Close modal"
        >
          <CloseIcon />
        </Button>

        {title && (
          <h2 id="modal-title" className={cn(styles.title, titleClassName)}>
            {title}
          </h2>
        )}

        <div className={cn(styles.content, contentClassName)}>{children}</div>
      </div>
    </div>
  );
}
