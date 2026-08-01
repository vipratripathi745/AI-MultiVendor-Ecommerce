import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaUserTag,
  FaCalendarAlt,
  FaSave,
} from "react-icons/fa";

import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    created_at: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();

      setFormData(response.user);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await updateProfile({
        name: formData.name,
        phone: formData.phone,
      });

      toast.success(response.message);

      setFormData(response.user);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
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

        {/* Avatar */}

        <div className="flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-6xl">

            <FaUserCircle />

          </div>

          <h1 className="text-4xl font-bold mt-5">

            My Profile

          </h1>

          <span className="mt-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">

            {formData.role}

          </span>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >

          {/* Name */}

          <div>

            <label className="font-semibold flex items-center gap-2 mb-2">

              <FaUserCircle />

              Full Name

            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

          </div>

          {/* Email */}

          <div>

            <label className="font-semibold flex items-center gap-2 mb-2">

              <FaEnvelope />

              Email

            </label>

            <input
              type="email"
              value={formData.email}
              readOnly
              className="w-full border rounded-xl p-3 bg-gray-100 cursor-not-allowed"
            />

          </div>

          {/* Phone */}

          <div>

            <label className="font-semibold flex items-center gap-2 mb-2">

              <FaPhone />

              Phone

            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          {/* Role */}

          <div>

            <label className="font-semibold flex items-center gap-2 mb-2">

              <FaUserTag />

              Role

            </label>

            <input
              type="text"
              value={formData.role}
              readOnly
              className="w-full border rounded-xl p-3 bg-gray-100"
            />

          </div>

          {/* Joined */}

          <div>

            <label className="font-semibold flex items-center gap-2 mb-2">

              <FaCalendarAlt />

              Joined

            </label>

            <input
              type="text"
              value={
                formData.created_at
                  ? new Date(
                      formData.created_at
                    ).toLocaleDateString()
                  : "-"
              }
              readOnly
              className="w-full border rounded-xl p-3 bg-gray-100"
            />

          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-3 transition"
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