import { infoFields, passwordFields } from "@/constant/constant";
import { useGetProfileQuery } from "@/redux/services/authApi";
import { useRef, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

type PasswordKey = "current" | "newPass" | "confirm";

const ProfileAdmin = () => {
  const { data, isLoading } = useGetProfileQuery(undefined);

  const fileRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [passwords, setPasswords] = useState<Record<PasswordKey, string>>({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [show, setShow] = useState<Record<PasswordKey, boolean>>({
    current: false,
    newPass: false,
    confirm: false,
  });

  const [saved, setSaved] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setAvatar(imageUrl);
  };

  const toggle = (field: PasswordKey) => {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleFormChange = (key: "name" | "email" | "phone", value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePasswordChange = (key: PasswordKey, value: string) => {
    setPasswords((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaved(true);

      // API CALL HERE

      setTimeout(() => {
        setSaved(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setSaved(false);
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
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800">Profile Admin</h2>

        {/* Top Section */}
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Avatar */}
          <div
            onClick={() => fileRef.current?.click()}
            className="group relative flex h-[336px] w-[315px] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed bg-gray-100"
          >
            {avatar || data?.admin?.profileImage ? (
              <img
                src={avatar || data?.admin?.profileImage}
                alt="profile"
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

          {/* Info */}
          <div className="flex-1 space-y-4">
            {infoFields.map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="text-sm text-gray-600">{label}</label>

                <input
                  className="mt-1 w-full rounded-lg bg-gray-100 px-3 py-2 outline-none transition focus:bg-white focus:ring-2 focus:ring-indigo-500"
                  value={
                    form[key as keyof typeof form] ||
                    data?.admin?.[key as keyof typeof data.admin] ||
                    ""
                  }
                  placeholder={placeholder}
                  onChange={(e) =>
                    handleFormChange(
                      key as "name" | "email" | "phone",
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Password Section */}
        <div className="space-y-4">
          {passwordFields.map(({ label, key }) => (
            <div key={key}>
              <label className="text-sm text-gray-600">{label}</label>

              <div className="relative mt-1">
                <input
                  type={show[key] ? "text" : "password"}
                  className="w-full rounded-lg bg-gray-100 px-3 py-2 outline-none transition focus:bg-white focus:ring-2 focus:ring-indigo-500"
                  value={passwords[key]}
                  onChange={(e) => handlePasswordChange(key, e.target.value)}
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
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={handleSave}
          className={`w-full rounded-xl py-3 font-medium text-white transition ${
            saved ? "bg-green-500" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {saved ? "Saved Successfully" : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default ProfileAdmin;
