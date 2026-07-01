import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/authApi";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [avatar, setAvatar] = useState(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(true);

  // =========================
  // Load Profile
  // =========================
  const fetchProfile = async () => {
    try {
      const res = await getProfile();

      setUser(res.data.user);

      setName(res.data.user.name);

      setPhone(res.data.user.phone || "");

      setPreview(res.data.user.avatar?.url || "");
    } catch (error) {
      console.log(error);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // =========================
  // Image Preview
  // =========================
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setAvatar(file);

    setPreview(URL.createObjectURL(file));
  };

  // =========================
  // Save Profile
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("phone", phone);

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const res = await updateProfile(formData);

      alert(res.data.message);

      fetchProfile();
    } catch (error) {
      console.log(error);

      alert("Profile update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          My Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Avatar */}

          <div className="flex flex-col items-center">

            <img
              src={
                preview ||
                "https://ui-avatars.com/api/?name=" + name
              }
              alt="avatar"
              className="w-36 h-36 rounded-full object-cover border-4 border-indigo-500"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="mt-4"
            />

          </div>

          {/* Name */}

          <div>

            <label className="font-semibold">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 border rounded-lg p-3"
            />

          </div>

          {/* Email */}

          <div>

            <label className="font-semibold">
              Email
            </label>

            <input
              type="email"
              value={user.email}
              disabled
              className="w-full mt-2 border rounded-lg p-3 bg-gray-100"
            />

          </div>

          {/* Phone */}

          <div>

            <label className="font-semibold">
              Phone
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mt-2 border rounded-lg p-3"
            />

          </div>

          {/* Role */}

          <div>

            <label className="font-semibold">
              Role
            </label>

            <input
              type="text"
              value={user.role}
              disabled
              className="w-full mt-2 border rounded-lg p-3 bg-gray-100 capitalize"
            />

          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold"
          >
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
};

export default Profile;