import { toast } from "react-hot-toast";

export const showSuccess = (message: string) => {
  toast.success(message, {
    position: "top-center",
    duration: 3000,
  });
};

export const showError = (message: string) => {
  toast.error(message, {
    position: "top-center",
    duration: 3000,
  });
};

export const showInfo = (message: string) => {
  toast(message, {
    position: "top-center",
    duration: 3000,
  });
};

export const showLoading = (message: string) => {
  return toast.loading(message, {
    position: "top-center",
  });
};

export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
};
