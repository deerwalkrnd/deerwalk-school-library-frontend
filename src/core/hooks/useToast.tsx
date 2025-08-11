import { toast } from "sonner";

export const useToast = (
  type: keyof typeof toast,
  message: any,
  duration: number | 3000,
) => {
  if (typeof toast[type] === "function") {
    toast[type](message, { duration });
  } else {
    toast(message, { duration });
  }
};
