"use server";

import { AxiosError } from "axios";
import { TResponse } from "@/types/types";
import { TForgotPasswordFormSchema } from "../types";
import axiosInstance from "@/lib/axios-instance";
import { apis } from "@/lib/apis";
import { reasonForRequestingOtp } from "@/lib/constants";

export const forgotPasswordAction = async (
  data: TForgotPasswordFormSchema,
): Promise<TResponse> => {
  const requestData = {
    email: data.email,
    reason: reasonForRequestingOtp.FORGOT_PASSWORD,
  };
  try {
    const response = await axiosInstance.post(apis.otp.requestOtp, requestData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to send OTP!",
        error: error.response?.data || error,
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong during forgot password",
      error: {},
    };
  }
};
