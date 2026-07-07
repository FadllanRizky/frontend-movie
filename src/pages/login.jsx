import { useState } from "react";
import { loginUser } from "../api/auth";
import { Link } from "react-router-dom";
import { saveAuth } from "../utils/token";
import { Lock, Mail, Film } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await loginUser({ email, password });
      saveAuth(res.data.token, res.data.user.role);
      setMsg("Login berhasil");
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-900/10 rounded-full blur-3xl" />
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
          <h1 className="text-2xl font-bold text-white mb-1">Sign In</h1>
          <p className="text-gray-500 text-sm mb-6">
            Enter your credentials to access your account
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
          <form onSubmit={submitLogin} className="space-y-4">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-700/50 rounded-xl text-white text-sm placeholder:text-gray-500 outline-none focus:border-red-600/50 focus:bg-white/10 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl shadow-lg shadow-red-900/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="px-3 text-xs text-gray-600">or</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-500 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-red-400 font-semibold hover:text-red-300 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
