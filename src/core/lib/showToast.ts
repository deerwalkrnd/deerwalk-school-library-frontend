import { toast } from "sonner";

type ToastType = keyof typeof toast;

/**
 * Show a toast.
 *
 * This is a plain function, not a React hook — it is called from event
 * handlers and mutation callbacks. It used to be named `useToast`, which made
 * every call site look like a conditionally-called hook and produced 135
 * `react-hooks/rules-of-hooks` errors once linting was switched on.
 */
export const showToast = (
  type: ToastType,
  message: unknown,
  duration: number = 3000,
) => {
  const notify = toast[type];

  if (typeof notify === "function") {
    (notify as (m: unknown, o?: { duration?: number }) => void)(message, {
      duration,
    });
  } else {
    toast(message as string, { duration });
  }
};
