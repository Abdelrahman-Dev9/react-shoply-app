import {
  infoFields,
  passwordFields,
  profileSchema,
  type PasswordKey,
  type ProfileFormData,
} from "@/constant/constant";
import {
  useGetAdminByIdQuery,
  useUpdateProfileMutation,
} from "@/redux/services/authApi";
import { getAdminId } from "@/utils/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const ProfileAdmin = () => {
  const adminId = getAdminId();
  const { data, isLoading } = useGetAdminByIdQuery(adminId || "");
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const fileRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // ✅ EDIT MODE STATE
  const [editableField, setEditableField] = useState<string | null>(null);

  const [show, setShow] = useState<Record<PasswordKey, boolean>>({
    current: false,
    newPass: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (data?.admin) {
      reset({
        name: data.admin.name || "",
        email: data.admin.email || "",
        phone: data.admin.phone || "",
      });
    }
  }, [data, reset]);

  const toggle = (field: PasswordKey) => {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatar(URL.createObjectURL(file));
    setAvatarFile(file);
  };

  const onSubmit = async (values: ProfileFormData) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);

      if (avatarFile) {
        formData.append("profileImage", avatarFile);
      }

      const res = await updateProfile(formData).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 p-6">
      <div className="w-full space-y-6 rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800">Profile Admin</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* TOP SECTION */}
          <div className="flex flex-col gap-6 md:flex-row">
            {/* AVATAR */}
            <div
              onClick={() => fileRef.current?.click()}
              className="group relative flex h-[336px] w-[315px] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed bg-gray-100"
            >
              {avatar || data?.data?.profileImage ? (
                <img
                  src={avatar || data?.data?.profileImage}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm text-gray-400">Upload Image</span>
              )}

              <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm text-white opacity-0 transition group-hover:opacity-100">
                Change
              </div>

              <input
                ref={fileRef}
                type="file"
                hidden
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>

            {/* INFO FIELDS */}
            <div className="flex-1 space-y-4">
              {infoFields.map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="text-sm text-gray-600">{label}</label>

                  <div className="relative">
                    <input
                      placeholder={placeholder}
                      {...register(key as "name" | "email" | "phone")}
                      disabled={editableField !== key}
                      className={`mt-1 w-full rounded-lg px-3 py-2 pr-10 outline-none transition
                      ${
                        editableField === key
                          ? "bg-white ring-2 ring-indigo-500"
                          : "bg-gray-100 cursor-not-allowed"
                      }`}
                      onBlur={() => setEditableField(null)}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setEditableField((prev) => (prev === key ? null : key))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                    >
                      <Pencil size={18} />
                    </button>
                  </div>

                  {errors[key as keyof ProfileFormData] && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors[key as keyof ProfileFormData]?.message as string}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* PASSWORD SECTION */}
          <div className="space-y-4">
            {passwordFields.map(({ label, key }) => (
              <div key={key}>
                <label className="text-sm text-gray-600">{label}</label>

                <div className="relative mt-1">
                  <input
                    type={show[key] ? "text" : "password"}
                    {...register(key)}
                    className="w-full rounded-lg bg-gray-100 px-3 py-2 outline-none transition focus:bg-white focus:ring-2 focus:ring-indigo-500"
                  />

                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {show[key] ? (
                      <IoEyeOutline size={20} />
                    ) : (
                      <IoEyeOffOutline size={20} />
                    )}
                  </button>
                </div>

                {errors[key] && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors[key]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* SAVE BUTTON */}
          <button
            type="submit"
            disabled={!isDirty || isUpdating}
            className={`flex w-full items-center justify-center rounded-xl py-3 font-medium text-white transition ${
              !isDirty || isUpdating
                ? "cursor-not-allowed bg-gray-400"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileAdmin;
