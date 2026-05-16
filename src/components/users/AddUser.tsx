import { useAddUserMutation } from "@/redux/services/authApi";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

interface Props {
  onClose: () => void;
}

const AddUser = ({ onClose }: Props) => {
  const [addUser, { isLoading: isAdding }] = useAddUserMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [birthday, setBirthday] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleAddUser = async () => {
    try {
      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      formData.append("gender", gender);

      if (birthday) {
        formData.append("birthday", birthday);
      }

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const res = await addUser(formData).unwrap();

      console.log(res);

      // RESET
      setName("");
      setEmail("");
      setPhone("");
      setGender("male");
      setBirthday("");
      setProfileImage(null);

      onClose();
    } catch (err: any) {
      console.log(err);

      alert(
        err?.data?.errors?.[0]?.msg ||
          err?.data?.message ||
          "Failed to add user"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Add User</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <Input
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* GENDER */}
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full rounded-md border p-3 outline-none"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {/* BIRTHDAY */}
          <Input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />

          {/* IMAGE */}
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
          />

          {/* BUTTON */}
          <button
            onClick={handleAddUser}
            disabled={isAdding}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-900 py-3 text-white transition hover:bg-blue-800 disabled:opacity-50"
          >
            {isAdding ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Adding...
              </>
            ) : (
              "Add User"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
