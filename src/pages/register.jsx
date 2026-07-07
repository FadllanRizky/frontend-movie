import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api/auth";
import { User, Mail, Lock, Film } from "lucide-react";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordStrength = () => {
    if (password.length >= 8) return { level: "strong", width: "w-full", color: "bg-green-500" };
    if (password.length >= 5) return { level: "medium", width: "w-2/3", color: "bg-amber-500" };
    if (password.length > 0) return { level: "weak", width: "w-1/3", color: "bg-red-500" };
    return null;
  };

  const strength = passwordStrength();

  const submitRegis = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    if (fullname.length < 3) {
      setMsg("Fullname minimal 3 karakter");
      setLoading(false);
      return;
    }

    if (!isEmailValid(email)) {
      setMsg("Format email tidak valid");
      setLoading(false);
      return;
    }

    if (password.length < 5) {
      setMsg("Password minimal 5 karakter");
      setLoading(false);
      return;
    }

    try {
      const res = await registerUser({ fullname, email, password });
      setMsg(res.data.msg);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Register gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-900/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-fadeIn">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/30">
              <Film className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-black text-3xl">
              MOVIE<span className="text-red-600">MBUR</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
          <p className="text-gray-500 text-sm mb-6">
            Join MovieMbur for premium streaming
          </p>

          {/* Message */}
          {msg && (
            <div
              className={`mb-4 p-3 rounded-xl text-center text-sm font-medium ${
                msg.includes("berhasil")
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {msg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={submitRegis} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-700/50 rounded-xl text-white text-sm placeholder:text-gray-500 outline-none focus:border-red-600/50 focus:bg-white/10 transition-all"
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </div>
              {fullname && fullname.length < 3 && (
                <p className="mt-1 text-xs text-amber-400">
                  Name must be at least 3 characters
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-700/50 rounded-xl text-white text-sm placeholder:text-gray-500 outline-none focus:border-red-600/50 focus:bg-white/10 transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {email && !isEmailValid(email) && (
                <p className="mt-1 text-xs text-amber-400">
                  Please enter a valid email
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-700/50 rounded-xl text-white text-sm placeholder:text-gray-500 outline-none focus:border-red-600/50 focus:bg-white/10 transition-all"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {strength && (
                <div className="mt-2">
                  <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 capitalize">
                    {strength.level} password
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl shadow-lg shadow-red-900/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="px-3 text-xs text-gray-600">or</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-400 font-semibold hover:text-red-300 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
