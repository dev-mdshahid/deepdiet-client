"use server";
import { TResponse } from "@/types/types";
import { TRegisterFormSchema } from "../types";
import { AxiosError } from "axios";
import axiosInstance from "@/lib/axios-instance";
import { reasonForRequestingOtp } from "@/lib/constants";
import { apis } from "@/lib/apis";

export const registerAction = async (
  data: TRegisterFormSchema,
): Promise<TResponse> => {
  const requestData = {
    email: data.email,
    reason: reasonForRequestingOtp.VERIFY_EMAIL,
  };
  try {
    const response = await axiosInstance.post(apis.otp.requestOtp, requestData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
        error: error.response?.data || error,
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong during registration",
      error: {},
    };
  }
};
