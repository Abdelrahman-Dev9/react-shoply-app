import { useAddUserMutation } from "@/redux/services/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";

const addUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  gender: z.enum(["male", "female"]),
  birthday: z.string().optional(),
  profileImage: z.instanceof(FileList).optional(),
});

type AddUserFormData = z.infer<typeof addUserSchema>;

interface Props {
  onClose: () => void;
}

const AddUser = ({ onClose }: Props) => {
  const [addUser, { isLoading }] = useAddUserMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
    defaultValues: { gender: "male" },
  });

  const onSubmit = async (data: AddUserFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name.trim());
      formData.append("email", data.email.trim());
      formData.append("phone", data.phone.trim());
      formData.append("gender", data.gender);
      if (data.birthday) formData.append("birthday", data.birthday);
      if (data.profileImage?.[0])
        formData.append("profileImage", data.profileImage[0]);

      await addUser(formData).unwrap();
      onClose();
    } catch (err: any) {
      const message =
        err?.data?.errors?.[0]?.msg ||
        err?.data?.message ||
        "Failed to add user";
      setError("root", { message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Add User</h2>
          <button type="button" onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input placeholder="Full name" {...register("name")} />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input placeholder="Email" type="email" {...register("email")} />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input placeholder="Phone number" {...register("phone")} />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <select
            {...register("gender")}
            className="w-full rounded-md border p-3 outline-none"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <Input type="date" {...register("birthday")} />

          <Input
            type="file"
            accept="image/*"
            {...register("profileImage")}
          />

          {errors.root && (
            <p className="text-sm text-red-500">{errors.root.message}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-900 py-3 text-white transition hover:bg-blue-800 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Adding...
              </>
            ) : (
              "Add User"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
