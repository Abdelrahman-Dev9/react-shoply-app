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

      // password only if enabled
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
    <div className="flex min-h-screen justify-center bg-gray-100 p-6">
      <div className="w-full space-y-6 rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold">Profile Admin</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* AVATAR */}
          <div
            onClick={() => fileRef.current?.click()}
            className="group relative flex h-[336px] w-[315px] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed bg-gray-100"
          >
            {avatar || data?.admin?.profileImage ? (
              <img
                src={avatar || data?.admin?.profileImage}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm text-gray-400">Upload Image</span>
            )}

            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100">
              Change
            </div>

            <input
              ref={fileRef}
              type="file"
              hidden
              onChange={handleAvatarChange}
            />
          </div>

          {/* INFO FIELDS (RESTORED UI) */}
          <div className="space-y-4">
            {infoFields.map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="text-sm text-gray-600">{label}</label>

                <div className="relative">
                  <input
                    placeholder={placeholder}
                    {...register(key as any)}
                    disabled={editableField !== key}
                    onBlur={() => setEditableField(null)}
                    className={`mt-1 w-full rounded-lg px-3 py-2 pr-10 outline-none transition
                      ${
                        editableField === key
                          ? "bg-white ring-2 ring-indigo-500"
                          : "bg-gray-100 cursor-not-allowed"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setEditableField((p) => (p === key ? null : key))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <Pencil size={18} />
                  </button>
                </div>

                <p className="text-red-500 text-sm">
                  {errors[key as keyof ProfileFormData]?.message}
                </p>
              </div>
            ))}
          </div>

          {/* PASSWORD FIELDS */}

          <div className="space-y-4">
            {passwordFields.map(({ label, key }) => (
              <div key={key}>
                <label className="text-sm text-gray-600">{label}</label>

                <div className="relative mt-1">
                  <input
                    type={show[key] ? "text" : "password"}
                    {...register(key)}
                    className="w-full rounded-lg bg-gray-100 px-3 py-2"
                  />

                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    className="absolute right-3 top-3"
                  >
                    {show[key] ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </button>
                </div>

                <p className="text-red-500 text-sm">{errors[key]?.message}</p>
              </div>
            ))}
          </div>

          {/* SAVE BUTTON */}
          <button
            type="submit"
            disabled={isUpdating || isUpdatingPassword}
            className="w-full rounded-xl bg-indigo-600 py-3 text-white"
          >
            {isUpdating || isUpdatingPassword ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileAdmin;
