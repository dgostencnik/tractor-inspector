export const ToastTypes = {
  info: "info",
  error: "error",
  success: "success",
} as const;

export type ToastType = typeof ToastTypes[keyof typeof ToastTypes];

export type Toast = {
  id: number;
  message: string;
  type: ToastType;
};
