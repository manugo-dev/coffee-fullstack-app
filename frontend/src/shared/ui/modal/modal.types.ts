import type { ReactNode } from "react";

export interface ModalProps {
  children: ReactNode;
  className?: string;
  closeClassName?: string;
  contentClassName?: string;
  isOpen: boolean;
  onClose: () => void;
  overlayClassName?: string;
  title?: string;
  titleClassName?: string;
}
