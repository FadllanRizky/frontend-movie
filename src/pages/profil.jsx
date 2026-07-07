import { useEffect, useState } from "react";
import { getProfile } from "../api/profil";
import { User, Mail, Shield, Calendar, ArrowLeft, Film } from "lucide-react";
import { Link } from "react-router-dom";
import Headers from "../components/headers";

export default function Profil() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Headers isMobile={isMobile} />
        <div className="pt-24 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Headers isMobile={isMobile} />
        <div className="pt-24 flex flex-col items-center justify-center px-4">
          <div className="w-16 h-16 mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <User className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Failed to Load Profile</h3>
          <p className="text-gray-500 text-sm">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Headers isMobile={isMobile} />

      <main className={`${isMobile ? "pt-14 pb-20" : "pt-16"} max-w-4xl mx-auto px-4 sm:px-6 py-8`}>
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Profile Card */}
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4 sm:gap-6">
            {/* Avatar */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-900/30">
              <span className="text-2xl sm:text-3xl font-black text-white">
                {profile.fullname?.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 truncate">
                {profile.fullname}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    profile.role === "admin"
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  }`}
                >
                  {profile.role?.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-500 text-sm truncate">{profile.email}</p>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm text-white font-medium truncate">{profile.email}</p>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Role</p>
              <p className="text-sm text-white font-medium capitalize">{profile.role}</p>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Member Since</p>
              <p className="text-sm text-white font-medium">
                {profile.created_at
                  ? new Date(profile.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <Film className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Account ID</p>
              <p className="text-sm text-white font-medium font-mono truncate">
                {profile.id}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
