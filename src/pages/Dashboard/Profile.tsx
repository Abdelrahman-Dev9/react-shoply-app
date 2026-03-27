import { useRef, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

type PasswordKey = "current" | "newPass" | "confirm";

const initialForm = {
  name: "Ahmed Mohamed",
  email: "ahmedmohamed@gmail.com",
  phone: "0102467112",
};

const infoFields = [
  { label: "Name", key: "name", placeholder: "Ahmed Mohamed" },
  { label: "Email", key: "email", placeholder: "ahmedmohamed@gmail.com" },
  { label: "Phone", key: "phone", placeholder: "0102467112" },
] as const;

const passwordFields = [
  { label: "Current password", key: "current" },
  { label: "New Password", key: "newPass" },
  { label: "Confirm new password", key: "confirm" },
] as const;

export default function ProfileAdmin() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);
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
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const toggle = (field: PasswordKey) =>
    setShow((s) => ({ ...s, [field]: !s[field] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex justify-center bg-gray-100 h-screen">
      <div className="w-full  bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">Profile Admin</h2>

        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-6 h-[400px]">
          {/* Avatar */}
          <div
            onClick={() => fileRef.current?.click()}
            className="w-[315px] h-[336px]   rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden relative group"
          >
            {avatar ? (
              <img src={avatar} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400 text-sm">Upload</span>
            )}

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs">
              Change
            </div>

            <input
              ref={fileRef}
              type="file"
              hidden
              onChange={handleAvatarChange}
            />
          </div>

          {/* Info */}
          <div className="flex-1 ">
            {infoFields.map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="text-sm text-gray-600">{label}</label>
                <input
                  className="w-full mt-1 px-3 py-2  rounded-lg bg-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={form[key]}
                  placeholder={placeholder}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Password Section */}
        <div>
          {passwordFields.map(({ label, key }) => (
            <div key={key}>
              <label className="text-sm text-gray-600">{label}</label>
              <div className="relative mt-1">
                <input
                  type={show[key] ? "text" : "password"}
                  className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={passwords[key]}
                  onChange={(e) =>
                    setPasswords({ ...passwords, [key]: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => toggle(key)}
                  className="absolute right-2 top-2 text-xs text-gray-500"
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
          className={`w-full py-3 rounded-xl text-white font-medium transition ${
            saved ? "bg-green-500" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
