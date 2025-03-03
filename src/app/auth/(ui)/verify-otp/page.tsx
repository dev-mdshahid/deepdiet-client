"use client";
import React, { useEffect } from "react";
import AuthContainer from "../_components/AuthContainer/AuthContainer";
import { useForm } from "react-hook-form";
import { TVerifyOtpSchema } from "../../(lib)/types";
import { SVerifyOtp } from "../../(lib)/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAction } from "@/hooks/useAction";
import { verifyOtpAction } from "../../(lib)/actions/verifyOtpAction";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate, isLoading, data } = useAction(verifyOtpAction);

  const form = useForm<TVerifyOtpSchema>({
    resolver: zodResolver(SVerifyOtp),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (formData: TVerifyOtpSchema) => {
    const email = searchParams.get("email");
    await mutate({
      otp: formData.otp,
      email: email as string,
    });
  };

  useEffect(() => {
    const redirect = searchParams.get("redirect");
    if (redirect && data) {
      router.push(redirect);
    }
  }, [data, router, searchParams]);
  return (
    <AuthContainer
      title="Verify OTP"
      subtitle="Enter the OTP sent to your email"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <div className="flex justify-center">
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            Verify
          </Button>
        </form>
      </Form>
    </AuthContainer>
  );
}
