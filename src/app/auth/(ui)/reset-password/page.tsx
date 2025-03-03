"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TResetPasswordFormSchema } from "../../(lib)/types";
import { SResetPasswordForm } from "../../(lib)/schemas";
import { Button } from "@/components/ui/button";
import AuthContainer from "../_components/AuthContainer/AuthContainer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAction } from "@/hooks/useAction";
import { useRouter } from "next/navigation";
import { resetPasswordAction } from "../../(lib)/actions/resetPasswordAction";

export default function ResetPasswordPage() {
  const { isLoading, mutate } = useAction(resetPasswordAction);
  const router = useRouter();
  const form = useForm<TResetPasswordFormSchema>({
    resolver: zodResolver(SResetPasswordForm),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (formData: TResetPasswordFormSchema) => {
    const localData = JSON.parse(
      sessionStorage.getItem("forgotPasswordData") || "{}",
    );
    const finalData = {
      email: localData.email,
      password: formData.password,
    };
    const result = await mutate(finalData);

    if (result?.success) {
      sessionStorage.removeItem("forgotPasswordData");
      router.push("/auth/login");
    }
  };

  return (
    <AuthContainer
      title="Reset your password!"
      subtitle="Enter your new password below!"
    >
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} id="password" type="password" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="confirmPassword"
                    type="password"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </AuthContainer>
  );
}
