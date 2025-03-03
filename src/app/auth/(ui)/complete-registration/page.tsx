"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AuthContainer from "../_components/AuthContainer/AuthContainer";
import { TCompleteRegistrationFormSchema } from "@/app/auth/(lib)/types";
import { SCompleteResgistrationForm } from "../../(lib)/schemas";
import { useAction } from "@/hooks/useAction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TGender } from "@/types/types";
import { Checkbox } from "@/components/ui/checkbox";
import { completeRegistrationAction } from "../../(lib)/actions/completeRegistrationAction";

export default function CompleteRegistrationForm() {
  const router = useRouter();
  const { mutate, isLoading } = useAction(completeRegistrationAction);

  const dataFromLocal = JSON.parse(
    sessionStorage.getItem("completeRegistrationData") || "{}",
  );

  const form = useForm<TCompleteRegistrationFormSchema>({
    resolver: zodResolver(SCompleteResgistrationForm),
    defaultValues: {
      username: dataFromLocal.username || "",
      name: dataFromLocal.name || "",
      demographic: {
        dob: dataFromLocal.demographic?.dob || "",
        height: dataFromLocal.demographic?.height || "",
        weight: dataFromLocal.demographic?.weight || "",
        gender: dataFromLocal.demographic?.gender || "",
      },
      agreeWithTerms: false,
    },
  });

  const onSubmit = async (formData: TCompleteRegistrationFormSchema) => {
    sessionStorage.setItem(
      "completeRegistrationData",
      JSON.stringify(formData),
    );
    const registerFormData = JSON.parse(
      sessionStorage.getItem("registerData") || "{}",
    );
    if (!registerFormData.email) {
      toast.error("Please provide your email & password again!");
      return router.push("/auth/register");
    }

    const finalData = {
      role: "user" as const,
      password: registerFormData.password,
      userInfo: {
        username: formData.username,
        name: formData.name,
        email: registerFormData.email,
        demographic: {
          gender: formData.demographic.gender,
          dob: new Date(formData.demographic.dob).toISOString(),
          height: Number(formData.demographic.height),
          weight: Number(formData.demographic.weight),
        },
      },
    };

    const result = await mutate(finalData);
    if (result?.success) {
      sessionStorage.removeItem("registerData");
      router.push("/auth/login");
    }
  };

  return (
    <AuthContainer
      title="Just one more step..."
      subtitle="Please provide the following information"
      className="max-w-lg"
    >
      <Form {...form}>
        <form
          className="grid grid-cols-2 gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    placeholder="Md. Shahidul Islam"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose a username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="username"
                    type="text"
                    placeholder="mdshahid"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="demographic.height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (cm)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="height"
                    type="number"
                    placeholder="170"
                    min={100}
                    max={200}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="demographic.weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="weight"
                    type="number"
                    placeholder="70"
                    min={40}
                    max={150}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="demographic.dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="dob"
                    type="date"
                    placeholder="01/01/2000"
                    // max={"2007-01-01"}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="demographic.gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="capitalize">
                    {Object.values(TGender).map((gender) => (
                      <SelectItem key={gender} value={gender}>
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-2">
            <FormField
              control={form.control}
              name="agreeWithTerms"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label htmlFor="agreeWithTerms" className="text-sm">
                        I agree with terms and conditions
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="col-span-2 w-full"
            disabled={isLoading}
          >
            Create your account
          </Button>
        </form>
      </Form>
    </AuthContainer>
  );
}
