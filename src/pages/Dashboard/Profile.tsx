import {
  infoFields,
  passwordFields,
  profileSchema,
  type PasswordKey,
  type ProfileFormData,
} from "@/constants/profile";
import {
  useGetAdminByIdQuery,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
} from "@/redux/services/adminApi";
import { getAdminId } from "@/utils/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const ProfileAdmin = () => {
  const adminId = getAdminId();
  const { data, isLoading } = useGetAdminByIdQuery(adminId || "");

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [updatePassword, { isLoading: isUpdatingPassword }] =
    useUpdatePasswordMutation();

  const fileRef = useRef<HTMLInputElement>(null);
  const avatarUrlRef = useRef<string | null>(null);

  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
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
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      current: "",
      newPass: "",
      confirm: "",
    },
  });

  useEffect(() => {
    if (data?.admin) {
      reset({
        name: data.admin.name || "",
        email: data.admin.email || "",
        phone: data.admin.phone || "",
        current: "",
        newPass: "",
        confirm: "",
      });
    }
  }, [data, reset]);

  const toggle = (field: PasswordKey) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleAvatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (avatarUrlRef.current) URL.revokeObjectURL(avatarUrlRef.current);

      const url = URL.createObjectURL(file);
      avatarUrlRef.current = url;

      setAvatar(url);
      setAvatarFile(file);
    },
    []
  );

  const onSubmit = async (values: ProfileFormData) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);

      if (avatarFile) {
        formData.append("profileImage", avatarFile);
      }

      await updateProfile(formData).unwrap();

      if (values.current && values.newPass && values.confirm) {
        await updatePassword({
          oldPassword: values.current,
          newPassword: values.newPass,
          confirmPassword: values.confirm,
        }).unwrap();
      }
    } catch (err) {
      console.error(err);
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
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title Card */}
      <div className="mb-4 rounded-2xl bg-white px-6 py-4 shadow-sm">
        <h2 className="text-lg font-bold text-[#1e2d6b]">Profile admin</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Top Section: Avatar + Info Fields */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex gap-6">
            {/* Avatar */}
            <div
              onClick={() => fileRef.current?.click()}
              className="group relative flex-shrink-0 h-[300px] w-[280px] cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50"
            >
              {avatar || data?.admin?.profileImage ? (
                <img
                  src={avatar || data?.admin?.profileImage}
                  className="h-full w-full object-cover"
                  alt="Profile"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-sm text-gray-400">Upload Image</span>
                </div>
              )}

              <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100">
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

            {/* Info Fields */}
            <div className="flex flex-1 flex-col justify-center space-y-5">
              {infoFields.map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    {label}
                  </label>

                  <div className="relative">
                    <input
                      placeholder={placeholder}
                      {...register(key as any)}
                      disabled={editableField !== key}
                      onBlur={() => setEditableField(null)}
                      className={`w-full rounded-xl px-4 py-3 pr-10 text-sm outline-none transition-all
                        ${
                          editableField === key
                            ? "bg-white ring-2 ring-[#1e2d6b]"
                            : "cursor-not-allowed bg-gray-100 text-gray-500"
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setEditableField((p) => (p === key ? null : key))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <Pencil size={16} />
                    </button>
                  </div>

                  {errors[key as keyof ProfileFormData]?.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors[key as keyof ProfileFormData]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Password Fields — each in its own card */}
        <div className="rounded-2xl bg-white px-6 py-4 shadow-sm space-y-4">
          {passwordFields.map(({ label, key }) => (
            <div key={key}>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                {label}
              </label>

              <div className="relative">
                <input
                  type={show[key] ? "text" : "password"}
                  {...register(key)}
                  className="w-full rounded-xl bg-gray-100 px-4 py-3 pr-12 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#1e2d6b]"
                />

                <button
                  type="button"
                  onClick={() => toggle(key)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#1e2d6b] text-white"
                >
                  {show[key] ? (
                    <IoEyeOutline size={16} />
                  ) : (
                    <IoEyeOffOutline size={16} />
                  )}
                </button>
              </div>

              {errors[key]?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors[key]?.message}
                </p>
              )}
            </div>
          ))}

          {/* Save Button */}
          <button
            type="submit"
            disabled={isUpdating || isUpdatingPassword}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1e2d6b] py-4 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 mt-10"
          >
            {isUpdating || isUpdatingPassword ? (
              "Saving..."
            ) : (
              <>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white text-xs">
                  ✓
                </span>
                Save password
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileAdmin;
