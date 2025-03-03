"use server";
import { TResponse } from "@/types/types";
import { AxiosError } from "axios";
import { apis } from "@/lib/apis";
import { cookies } from "next/headers";
import { axiosWithCookies } from "@/lib/axios-with-cookies";

type TUserInfo = {
  username: string;
  name: string;
  email: string;
  demographic: {
    gender: string;
    dob: string;
    height: number;
    weight: number;
  };
};

type TCompleteRegistrationActionArgs = {
  role: "user";
  password: string;
  userInfo: TUserInfo;
};

export const completeRegistrationAction = async (
  data: TCompleteRegistrationActionArgs,
): Promise<TResponse> => {
  const cookiesStore = await cookies();
  const allCookies = cookiesStore.getAll();

  const axiosWithCookiesClient = await axiosWithCookies(allCookies);

  try {
    const response = await axiosWithCookiesClient.post(
      apis.auth.register,
      data,
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Alas! Something went wrong. Please try again later",
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
