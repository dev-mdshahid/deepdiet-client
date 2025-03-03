import { z } from "zod";
import {
  SCompleteResgistrationForm,
  SForgotPasswordForm,
  SLoginForm,
  SRegisterForm,
  SResetPasswordForm,
  SVerifyOtp,
} from "./schemas";

export type TLoginFormSchema = z.infer<typeof SLoginForm>;
export type TRegisterFormSchema = z.infer<typeof SRegisterForm>;
export type TForgotPasswordFormSchema = z.infer<typeof SForgotPasswordForm>;
export type TResetPasswordFormSchema = z.infer<typeof SResetPasswordForm>;
export type TVerifyOtpSchema = z.infer<typeof SVerifyOtp>;
export type TCompleteRegistrationFormSchema = z.infer<
  typeof SCompleteResgistrationForm
>;

// other types
export type TCompleteRegistrationActionData = {
  role: "user";
  password: string;
  userInfo: TCompleteRegistrationFormSchema;
};
