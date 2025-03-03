"use server";
import { cookies } from "next/headers";
import { AxiosError } from "axios";
import { apis } from "@/lib/apis";
import { axiosWithCookies } from "@/lib/axios-with-cookies";
import { TLoginFormSchema } from "../types";

export const resetPasswordAction = async (data: TLoginFormSchema) => {
  try {
    const allCookies = (await cookies()).getAll();
    const axiosWithCookiesClient = await axiosWithCookies(allCookies);

    const response = await axiosWithCookiesClient.post(
      apis.auth.resetPassword,
      data,
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.response?.data?.message || "Reset password failed",
        error: error.response?.data || error,
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong while resetting password",
      error: {},
    };
  }
};
