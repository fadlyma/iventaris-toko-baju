"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, User, Sparkles, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Show success toast
        toast.success("Login Successful!", {
          description: "Welcome back! Redirecting...",
          duration: 2000,
        });

        // Small delay to show toast before redirect
        setTimeout(() => {
          // Get redirect URL from query params or default to home
          const params = new URLSearchParams(window.location.search);
          const redirect = params.get("redirect") || "/";
          router.push(redirect);
          router.refresh(); // Force refresh to update middleware
        }, 1000);
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-100 flex items-center justify-center p-4">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-2xl shadow-2xl mb-3 sm:mb-4">
            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
            ClothingHub
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Secure Admin Access
          </p>
        </div>

        {/* Login Card */}
        <div className="transform hover:scale-[1.02] transition-all duration-300">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl relative overflow-visible animate-in zoom-in-95 duration-700">
            {/* Glowing gradient border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>

            {/* Card Content */}
            <div className="relative bg-white rounded-lg">
              <CardHeader className="space-y-1 pb-4 sm:pb-6 pt-6 sm:pt-8 px-4 sm:px-6">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
                  <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                    Welcome Back
                  </span>
                </CardTitle>
                <p className="text-xs sm:text-sm text-gray-600 text-center font-medium">
                  Masukan Email dan password anda
                </p>
              </CardHeader>
              <CardContent className="pb-6 sm:pb-8 px-4 sm:px-6">
                <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-gray-700 font-medium text-sm"
                    >
                      Email
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="contoh@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-11 sm:h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl transition-all text-sm sm:text-base"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-gray-700 font-medium text-sm"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-11 sm:h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl transition-all text-sm sm:text-base"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          "Demo credentials:\nEmail: tokobajudewi@gmail.com\nPassword: tokobaju123@",
                        )
                      }
                      className="text-xs sm:text-sm text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border-2 border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
                      <span className="font-medium">⚠️ {error}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full h-11 sm:h-12 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all rounded-xl text-sm sm:text-base"
                  >
                    Masuk
                    <span className="ml-2">→</span>
                  </Button>
                </form>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © 2024 ClothingHub. All rights reserved.
        </p>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
