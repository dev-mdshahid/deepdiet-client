import { TAnyZodData } from "@/types/types";

export const TryCatch = (fn: (data: TAnyZodData) => void) => {
  return async (data: TAnyZodData) => {
    Promise.resolve(fn(data)).catch((error) => {
      console.log(error);
    });
  };
};
