"use client";

import { motion } from "motion/react";

import { Button } from "../button";
import { CloseIcon, WarningIcon } from "../icons";
import type { Toast as ToastType } from "./toast.types";
import styles from "./toast.module.scss";

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

export function Toast({ toast, onClose }: ToastProps) {
  return (
    <motion.div
      className={styles.toast}
      data-type={toast.type}
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <span className={styles.icon}>
        <WarningIcon />
      </span>
      <p className={styles.message}>{toast.message}</p>
      <Button
        variant="ghost"
        size="sm"
        className={styles.close}
        onClick={() => onClose(toast.id)}
        aria-label="Close toast"
      >
        <CloseIcon />
      </Button>
    </motion.div>
  );
}
