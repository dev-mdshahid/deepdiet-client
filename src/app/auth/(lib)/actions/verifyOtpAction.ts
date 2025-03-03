"use server";

import { TResponse } from "@/types/types";
import { TVerifyOtpSchema } from "../types";
import { apis } from "@/lib/apis";
import axiosInstance from "@/lib/axios-instance";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { passCookiesThroughActions } from "@/lib/pass-cookies-through-actions";

export const verifyOtpAction = async (
  data: TVerifyOtpSchema,
): Promise<TResponse> => {
  try {
    const response = await axiosInstance.post(apis.otp.verifyOtp, data);
    await passCookiesThroughActions(
      response.headers["set-cookie"] as string[],
      cookies,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.response?.data?.message || "Verification failed",
        error: error.response?.data || error,
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong during verification",
      error: {},
    };
  }
};
