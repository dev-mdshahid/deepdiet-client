import { z } from "zod";
import {
  forgotPasswordFormSchema,
  loginFormSchema,
  registerFormSchema,
  resetPasswordFormSchema,
  verifyOtpSchema,
} from "./schemas";

export type TLoginFormSchema = z.infer<typeof loginFormSchema>;
export type TRegisterFormSchema = z.infer<typeof registerFormSchema>;
export type TForgotPasswordFormSchema = z.infer<
  typeof forgotPasswordFormSchema
>;
export type TResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;
export type TVerifyOtpSchema = z.infer<typeof verifyOtpSchema>;
