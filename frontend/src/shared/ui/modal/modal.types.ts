import type { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  closeClassName?: string;
  titleClassName?: string;
}
