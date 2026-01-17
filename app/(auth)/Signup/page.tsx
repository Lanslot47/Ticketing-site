"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Film } from "lucide-react";
import { supabase } from "@/app/lib/supabaseClient";


export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "error" | "success"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setToast({ type: "error", message: "Passwords don't match." });
      return;
    }

    if (formData.password.length < 8) {
      setToast({ type: "error", message: "Password must be at least 8 characters long." });
      return;
    }

    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.name,
        },
      },
    });

    if (error) {
      setIsLoading(false);
      setToast({ type: "error", message: error.message });
      return;
    }
 console.log(data)
    setToast({ type: "success", message: "Account created successfully! Redirecting..." });

    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Film className="h-12 w-12 text-indigo-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">CineTicket</h1>
        </div>

        {toast && (
          <div
            className={`mb-4 p-3 text-sm rounded-md text-center ${
              toast.type === "error"
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {toast.message}
          </div>
        )}

        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl border border-gray-200">
          <div className="p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="UserName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-2 font-semibold text-white rounded-md transition ${
                  isLoading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <div className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link href="./Login" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
