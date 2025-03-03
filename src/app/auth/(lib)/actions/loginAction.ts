"use server";
import axiosInstance from "@/lib/axios-instance";
import { TLoginFormSchema } from "../types";
import { TResponse } from "@/types/types";
import { AxiosError } from "axios";
import { apis } from "@/lib/apis";

export const loginAction = async (
  data: TLoginFormSchema,
): Promise<TResponse> => {
  try {
    const response = await axiosInstance.post(apis.auth.login, data);
    return response.data;
  } catch (error) {
    console.log(error);

    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
        error: error.response?.data || {},
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong during login",
      error: {},
    };
  }
};
