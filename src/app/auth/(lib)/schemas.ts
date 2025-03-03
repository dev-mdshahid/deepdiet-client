import { TGender } from "@/types/types";
import { z } from "zod";

export const SLoginForm = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters!"),
});

export const SRegisterForm = z
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

const SDemographicValidaiton = z.object({
  height: z.string(),
  weight: z.string(),
  dob: z.string(),
  gender: z.enum(Object.values(TGender) as [string, ...string[]]),
  // activityLevel: z.enum(
  //     Object.values(TActivityLevel) as [string, ...string[]]
  // ),
  // goal: z.enum(Object.values(TGoal) as [string, ...string[]]),
});

export const SCompleteResgistrationForm = z
  .object({
    username: z.string().min(3).max(30).trim(),
    name: z.string().min(3).max(20).trim(),
    demographic: SDemographicValidaiton,
    agreeWithTerms: z.boolean(),
  })
  .superRefine(({ agreeWithTerms, demographic }, ctx) => {
    const { dob } = demographic;
    if (!agreeWithTerms) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You must agree with terms and conditions",
        path: ["agreeWithTerms"],
      });
    }
    if (
      new Date().getTime() - new Date(dob).getTime() <
      18 * 365 * 24 * 60 * 60 * 1000
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You must be at least 18 years old",
        path: ["demographic.dob"],
      });
    } else if (
      new Date().getTime() - new Date(dob).getTime() >
      60 * 365 * 24 * 60 * 60 * 1000
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You cannot be older than 60 years old",
        path: ["demographic.dob"],
      });
    }
  });

export const SForgotPasswordForm = z.object({
  email: z.string().email(),
});

export const SResetPasswordForm = z
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

export const SVerifyOtp = z.object({
  email: z.string().email().optional(),
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
