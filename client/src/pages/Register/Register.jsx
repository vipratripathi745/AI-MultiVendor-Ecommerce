import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
} from "react-icons/fa";

import { registerUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);

      if (response.success) {
        login(response.token, response.user);

        toast.success(response.message);

        reset();

        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-blue-700 to-cyan-700 flex items-center justify-center px-6 py-12">

      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* Left */}

        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-700 to-blue-900 text-white p-12">

          <FaUserPlus className="text-7xl mb-8" />

          <h1 className="text-5xl font-extrabold text-center">
            Join AI Shop
          </h1>

          <p className="mt-8 text-xl text-center leading-9 text-blue-100">
            Create your account and enjoy premium shopping,
            secure checkout, wishlist and exclusive offers.
          </p>

        </div>

        {/* Right */}

        <div className="p-10 lg:p-14">

          <h2 className="text-4xl font-bold">
            Create Account
          </h2>

          <p className="text-gray-500 mt-3">
            Register to start shopping today.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 space-y-6"
          >

            {/* Name */}

            <div>

              <label className="font-semibold">
                Full Name
              </label>

              <div className="relative mt-2">

                <FaUser className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 outline-none"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />

              </div>

              {errors.name && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.name.message}
                </p>
              )}

            </div>

            {/* Email */}

            <div>

              <label className="font-semibold">
                Email
              </label>

              <div className="relative mt-2">

                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 outline-none"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />

              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}

            </div>

            {/* Phone */}

            <div>

              <label className="font-semibold">
                Phone
              </label>

              <div className="relative mt-2">

                <FaPhone className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="w-full border rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 outline-none"
                  {...register("phone")}
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="font-semibold">
                Password
              </label>

              <div className="relative mt-2">

                <FaLock className="absolute left-4 top-4 text-gray-400" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter password"
                  className="w-full border rounded-xl py-3 pl-12 pr-12 focus:ring-2 focus:ring-blue-600 outline-none"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message:
                        "Password must be at least 6 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-4 text-gray-500"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}

            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-bold transition"
            >
              {isSubmitting
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <div className="mt-8 text-center">

            <p className="text-gray-600">

              Already have an account?

              <Link
                to="/login"
                className="text-blue-600 font-bold ml-2 hover:underline"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;