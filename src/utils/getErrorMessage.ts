import { isAxiosError } from "axios";

export const getErrorMessage = (error: unknown) =>
  isAxiosError(error)
    ? (error.response?.data?.message ?? error.message)
    : "Something went wrong";