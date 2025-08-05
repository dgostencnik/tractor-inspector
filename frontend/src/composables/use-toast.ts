import { ref } from "vue";

import type { Toast, ToastType } from "../types";

import { ToastTypes } from "../types";

export function useToast() {
  let toastId = 0;
  const toasts = ref<Toast[]>([]);

  function showToast(message: string, type: ToastType = ToastTypes.info, ms: number = 2000) {
    const toast = {
      id: toastId++,
      message,
      type,
    };

    toasts.value.push(toast);

    setTimeout(() => {
      removeToast(toast.id);
    }, ms);
  };

  function removeToast(id: number) {
    const index = toasts.value.findIndex(t => t.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  return {
    showToast,
    removeToast,
    toasts,
  };
}
