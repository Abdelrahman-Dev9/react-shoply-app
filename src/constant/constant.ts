import z from "zod";

export type PasswordKey = "current" | "newPass" | "confirm";

export const infoFields = [
  { label: "Name", key: "name", placeholder: "Ahmed Mohamed" },
  { label: "Email", key: "email", placeholder: "ahmedmohamed@gmail.com" },
  { label: "Phone", key: "phone", placeholder: "0102467112" },
] as const;

export const passwordFields = [
  { label: "Current password", key: "current" },
  { label: "New Password", key: "newPass" },
  { label: "Confirm new password", key: "confirm" },
] as const;

export const profileSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.email("Invalid email"),
    phone: z.string().min(10, "Invalid phone number"),
    current: z.string().optional(),
    newPass: z.string().optional(),
    confirm: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPass && data.newPass !== data.confirm) return false;
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirm"],
    }
  );

export type ProfileFormData = z.infer<typeof profileSchema>;
