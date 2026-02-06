export type ToastType = "error" | "info" | "success" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export interface ToastContextValue {
  showToast: (_message: string, _type?: ToastType) => void;
}
