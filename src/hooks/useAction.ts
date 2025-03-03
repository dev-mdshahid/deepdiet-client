import { TResponse, TErrorResponse } from "@/types/types";
import { useState } from "react";
import { toast } from "sonner";

export const useAction = <TData extends Record<string, unknown>>(
  action: (data: TData, additionalData?: TData) => Promise<TResponse>,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<TErrorResponse | null>(null);
  const [data, setData] = useState<TResponse | null>(null);
  const [message, setMessage] = useState<string>("");

  const mutate = async (data: TData, additionalData?: TData) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    setMessage("");
    const toastId = toast.loading("Please wait...");
    try {
      const response = await action(data, additionalData);
      toast.dismiss(toastId);
      if (response.success) {
        setData(response);
        setMessage(response.message);
        toast.success(response.message);
      } else {
        setError(response);
        setMessage(response.message);
        toast.error(response.message);
      }
      return response;
    } catch (error) {
      toast.dismiss(toastId);
      const errorResponse: TErrorResponse = {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
        error: {},
      };
      setError(errorResponse);
      setMessage(errorResponse.message);
      toast.error(errorResponse.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, mutate, error, data, message };
};
