import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters!"),
});

export const registerFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters!"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters!"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const forgotPasswordFormSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordFormSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters!"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters!"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const verifyOtpSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
