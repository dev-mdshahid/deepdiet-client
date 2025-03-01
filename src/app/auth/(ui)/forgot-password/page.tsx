"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TForgotPasswordFormSchema } from "../../(lib)/types";
import { forgotPasswordFormSchema } from "../../(lib)/schemas";
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

export default function ForgotPasswordPage() {
  const form = useForm<TForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: TForgotPasswordFormSchema) => {
    console.log(values);
  };
  return (
    <AuthContainer
      title="Forgot your password?"
      subtitle="No problem, just put your email below!"
    >
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Confirm your email
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm">
        Haven&apos;t received an email?{" "}
      </div>
    </AuthContainer>
  );
}
