import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/authApi";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [addresses, setAddresses] = useState([]);
  
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    isDefault: false,
  });

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================
  // Load Profile
  // =========================
  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      const user = res.data.user;

      setUser(user);
      setName(user.name || "");
      setPhone(user.phone || "");
      setGender(user.gender || "");
      
      // Defensive check to safely parse date string
      setDob(
        user.dateOfBirth && typeof user.dateOfBirth === "string"
          ? user.dateOfBirth.substring(0, 10)
          : ""
      );

      setAddresses(user.addresses || []);
      setPreview(user.avatar?.url || "");
    } catch (error) {
      console.error(error);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // =========================
  // Avatar Memory Cleanup Hook
  // =========================
  useEffect(() => {
    // Automatically releases object URL memory whenever preview changes or unmounts
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // =========================
  // Avatar Preview Handler
  // =========================
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  // =========================
  // Save Profile Handler
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("gender", gender);
      formData.append("dateOfBirth", dob);
      formData.append("addresses", JSON.stringify(addresses));

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const res = await updateProfile(formData);
      alert(res.data.message || "Profile updated successfully!");
      fetchProfile();
    } catch (error) {
      console.error(error);
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
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">My Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <img
              src={preview || `https://ui-avatars.com/api/?name=${name}`}
              alt="avatar"
              className="w-36 h-36 rounded-full object-cover border-4 border-indigo-500"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="mt-5"
            />
          </div>

          {/* Name */}
          <div>
            <label className="font-semibold">Name</label>
            <input
              type="text"
              className="w-full mt-2 border rounded-lg p-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              disabled
              value={user?.email || ""}
              className="w-full mt-2 border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="font-semibold">Phone</label>
            <input
              type="text"
              className="w-full mt-2 border rounded-lg p-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="font-semibold">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full mt-2 border rounded-lg p-3"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="font-semibold">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          {/* Role */}
          <div>
            <label className="font-semibold">Role</label>
            <input
              type="text"
              value={user?.role || ""}
              disabled
              className="w-full mt-2 border rounded-lg p-3 bg-gray-100 capitalize cursor-not-allowed"
            />
          </div>

          {/* Address Section */}
          <div className="border rounded-xl p-6 bg-gray-50">
            <h2 className="text-2xl font-bold mb-5">Saved Addresses</h2>

            {addresses.length === 0 && (
              <p className="text-gray-500">No addresses added.</p>
            )}

            {addresses.map((addr, index) => (
              <div key={index} className="border rounded-lg bg-white p-4 mb-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{addr.fullName}</h3>
                    <p>{addr.phone}</p>
                    <p>{addr.address}</p>
                    <p>{addr.city}, {addr.state}</p>
                    <p>{addr.pincode}, {addr.country}</p>
                    {addr.isDefault && (
                      <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                        Default Address
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800 font-semibold"
                    onClick={() => {
                      const copy = [...addresses];
                      copy.splice(index, 1);
                      setAddresses(copy);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {/* Add New Address Sub-Form */}
            <div className="mt-8 border-t pt-6">
              <h2 className="text-2xl font-bold mb-5">Add New Address</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border rounded-lg p-3"
                  value={newAddress.fullName}
                  onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Phone"
                  className="border rounded-lg p-3"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="border rounded-lg p-3 md:col-span-2"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="City"
                  className="border rounded-lg p-3"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="State"
                  className="border rounded-lg p-3"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  className="border rounded-lg p-3"
                  value={newAddress.pincode}
                  onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Country"
                  className="border rounded-lg p-3"
                  value={newAddress.country}
                  onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                />
              </div>

              <div className="mt-4 flex items-center gap-3">
                <input
                  id="defaultAddress"
                  type="checkbox"
                  checked={newAddress.isDefault}
                  onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                />
                <label htmlFor="defaultAddress" className="select-none cursor-pointer">
                  Set as Default Address
                </label>
              </div>

              <button
                type="button"
                className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow"
                onClick={() => {
                  if (
                    !newAddress.fullName ||
                    !newAddress.phone ||
                    !newAddress.address ||
                    !newAddress.city ||
                    !newAddress.state ||
                    !newAddress.pincode
                  ) {
                    return alert("Please fill all address fields");
                  }

                  let updatedAddresses = [...addresses];

                  if (newAddress.isDefault) {
                    updatedAddresses = updatedAddresses.map((a) => ({
                      ...a,
                      isDefault: false,
                    }));
                  }

                  updatedAddresses.push(newAddress);
                  setAddresses(updatedAddresses);

                  // Reset sub-form state
                  setNewAddress({
                    fullName: "",
                    phone: "",
                    address: "",
                    city: "",
                    state: "",
                    pincode: "",
                    country: "India",
                    isDefault: false,
                  });
                }}
              >
                Add Address
              </button>
            </div>
          </div>

          {/* Master Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors shadow-md"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;