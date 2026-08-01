import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShoppingBag,
} from "react-icons/fa";

import { loginUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      if (response.success) {
        login(response.token, response.user);

        toast.success(response.message);

        reset();

        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 flex items-center justify-center px-6 py-12">

      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-12">

          <FaShoppingBag className="text-7xl mb-8" />

          <h1 className="text-5xl font-extrabold text-center">

            Welcome Back

          </h1>

          <p className="mt-8 text-xl text-center leading-9 text-blue-100">

            Login to continue shopping,
            manage your orders,
            wishlist and enjoy exclusive offers.

          </p>

        </div>

        {/* Right Side */}

        <div className="p-10 lg:p-14">

          <h2 className="text-4xl font-bold">

            Sign In

          </h2>

          <p className="text-gray-500 mt-3">

            Enter your credentials to access your account.

          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 space-y-6"
          >

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
                    required:
                      "Email is required",
                  })}
                />

              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}

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
                    required:
                      "Password is required",
                  })}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
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

            {/* Login */}

            <button
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-bold transition"
            >

              {isSubmitting
                ? "Logging In..."
                : "Login"}

            </button>

          </form>

          <div className="mt-8 text-center">

            <p className="text-gray-600">

              Don't have an account?

              <Link
                to="/register"
                className="text-blue-600 font-bold ml-2 hover:underline"
              >

                Register

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;