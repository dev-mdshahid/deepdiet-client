// Response types
import { AnyZodObject, z } from "zod";

export type TSuccessResponse = {
  success: true;
  message: string;
  data: Record<string, unknown>;
};

export type TErrorResponse = {
  success: false;
  message: string;
  error: Record<string, unknown>;
};

export type TResponse = TSuccessResponse | TErrorResponse;

export type TAnyZodData = z.infer<AnyZodObject>;

// User data types
export enum TGender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export enum TActivityLevel {
  SEDENTARY = "sedentary",
  LIGHTLY_ACTIVE = "lightly_active",
  MODERATELY_ACTIVE = "moderately_active",
  VERY_ACTIVE = "very_active",
  EXTRA_ACTIVE = "extra_active",
}

export enum TGoal {
  LOSE_WEIGHT = "lose_weight",
  MAINTAIN_WEIGHT = "maintain_weight",
  GAIN_WEIGHT = "gain_weight",
  INCREASE_MUSCLE = "increase_muscle",
}

export enum TDietType {
  KETO = "keto",
  PALEO = "paleo",
  VEGAN = "vegan",
  VEGETARIAN = "vegetarian",
  OMNIVORE = "omnivore",
}

export enum TCookingSkill {
  BEGINNER = 1,
  INTERMEDIATE = 2,
  ADVANCED = 3,
}

export type TDemographic = {
  height: number;
  weight: number;
  dob: Date;
  gender: TGender;
  activityLevel: TActivityLevel;
  goal: TGoal;
};

export type TMealFrequency = {
  breakfast: boolean;
  snackAfterBreakfast: boolean;
  lunch: boolean;
  snackAfterLunch: boolean;
  dinner: boolean;
  snackAfterDinner: boolean;
};

export type TFoodPreferences = {
  dietType: TDietType;
  availableFoods: string[];
  dislikedFoods: string[];
  allergies: string[];
  intolerances: string[];
  mealFrequency: TMealFrequency;
  cookingSkill: TCookingSkill;
};

export type TUser = {
  username: string;
  name: string;
  email: string;
  profilePicture: string;
  medicalConditions: string[];
  demographic: TDemographic;
  foodPreferences: TFoodPreferences;
};
