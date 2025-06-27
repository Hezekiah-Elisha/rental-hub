import { z } from "zod";

const acceptedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const SignupFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const SigninFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(1, { message: "Password is required" }).trim(),
});

export const GoogleAuthFormSchema = z.object({
  username: z.string().min(1, { message: "Name is required" }).trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  photoURL: z
    .string()
    .url({ message: "Invalid photo URL" })
    .optional({ message: "Photo URL is optional" }),
});

export const PropertyFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).trim(),
  description: z.string().min(1, { message: "Description is required" }).trim(),
  category_id: z.string().min(1, { message: "Category is required" }).trim(),
  user_id: z.string().min(1, { message: "User is required" }).trim(),
  price: z.number().int().min(1, { message: "Price is required" }),
  location: z.string().min(1, { message: "Location is required" }).trim(),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => acceptedImageTypes.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  availability: z.boolean().default(true),
  tags: z.string().min(1, { message: "Tags is required" }).trim(),
  features: z.string().min(1, { message: "Features is required" }).trim(),
});

export const CategoryFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).trim(),
  description: z.string().min(1, { message: "Description is required" }).trim(),
});

function imageValidator(image) {
  if (!image) {
    return "Image is required";
  }

  console.log("info here " + image.type);

  if (!acceptedImageTypes.includes(image.type)) {
    return "Only .jpg, .jpeg, .png, .webp files are accepted.";
  }

  return null;
}

// image: z
//   .any()
//   .refine((files) => files?.length == 1, "Image is required.")
//   .refine(
//     (files) => acceptedImageTypes.includes(files?.[0]?.type),
//     "Only .jpg, .jpeg, .png, .webp files are accepted."
//   ),
