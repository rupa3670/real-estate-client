import { toast } from "react-toastify";
import { getErrorMessage } from "./getErrorMessage";

export const handleError = (error: unknown, toastId?: string) => {
  toast.error(getErrorMessage(error), toastId ? { toastId } : undefined);
};