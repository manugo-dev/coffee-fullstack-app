"use client";

import { motion } from "motion/react";

import { Button } from "../button";
import { CloseIcon, WarningIcon } from "../icons";
import type { Toast as ToastType } from "./toast.types";

import styles from "./toast.module.scss";

interface ToastProps {
  onClose: (_id: string) => void;
  toast: ToastType;
}

export function Toast({ onClose, toast }: ToastProps) {
  return (
    <motion.div
      className={styles.toast}
      data-type={toast.type}
      initial={{ opacity: 0, scale: 0.95, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ damping: 30, stiffness: 500, type: "spring" }}
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
