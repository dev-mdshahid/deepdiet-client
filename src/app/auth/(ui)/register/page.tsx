"use client";
import React, { ChangeEvent } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registerFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters!"),
    confirmPassword: z.string().min(8),
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

type TRegisterFormSchema = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
  const form = useForm<TRegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "example@gmail.com",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    getValues,
    getFieldState,
    formState: { isDirty, dirtyFields, touchedFields, errors, submitCount },
  } = form;

  console.log(errors);
  const onSubmit = (data: TRegisterFormSchema) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              onChange={field.onChange}
              placeholder="Enter your email"
              type="text"
              defaultValue={"example@gmail.com"}
            />
          )}
        />

        <Input
          {...register("password")}
          placeholder="Enter your password"
          type="password"
        />
        <Input
          {...register("confirmPassword")}
          placeholder="Confirm your password"
          type="password"
        />
        <Input {...register("img")} type="range" />

        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
}
