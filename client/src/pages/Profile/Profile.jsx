import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSave,
} from "react-icons/fa";

import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response =
        await getProfile();

      setForm({
        name: response.user.name || "",
        email: response.user.email || "",
        phone: response.user.phone || "",
        address:
          response.user.address || "",
      });
    } catch (error) {
      toast.error(
        "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response =
        await updateProfile(form);

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Update failed"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-3xl font-bold">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold mb-10">
          My Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="font-semibold mb-2 block">
              Name
            </label>

            <div className="relative">

              <FaUser className="absolute left-4 top-4 text-gray-400"/>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-xl pl-12 pr-4 py-3"
              />

            </div>

          </div>

          <div>

            <label className="font-semibold mb-2 block">
              Email
            </label>

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-4 text-gray-400"/>

              <input
                type="email"
                value={form.email}
                disabled
                className="w-full border rounded-xl pl-12 pr-4 py-3 bg-gray-100"
              />

            </div>

          </div>

          <div>

            <label className="font-semibold mb-2 block">
              Phone
            </label>

            <div className="relative">

              <FaPhone className="absolute left-4 top-4 text-gray-400"/>

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-xl pl-12 pr-4 py-3"
              />

            </div>

          </div>

          <div>

            <label className="font-semibold mb-2 block">
              Address
            </label>

            <div className="relative">

              <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400"/>

              <textarea
                rows="5"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded-xl pl-12 pr-4 py-3"
              />

            </div>

          </div>

          <button
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3"
          >

            <FaSave />

            {saving
              ? "Saving..."
              : "Update Profile"}

          </button>

        </form>

      </div>

    </div>
  );
}

export default Profile;