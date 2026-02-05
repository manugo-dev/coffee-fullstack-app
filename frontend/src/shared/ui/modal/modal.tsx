"use client";

import { useEffect, useCallback } from "react";

import { Button } from "../button/button";
import { CloseIcon } from "../icons";
import type { ModalProps } from "./modal.types";
import styles from "./modal.module.scss";

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  className,
}: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
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
      className={styles.overlay}
      data-open={isOpen}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`${styles.modal}${className ? ` ${className}` : ""}`}
        data-open={isOpen}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        <Button
          className={styles.close}
          variant="ghost"
          iconOnly
          onClick={onClose}
          aria-label="Close modal"
        >
          <CloseIcon />
        </Button>

        {title && (
          <h2 id="modal-title" className={styles.title}>
            {title}
          </h2>
        )}

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
