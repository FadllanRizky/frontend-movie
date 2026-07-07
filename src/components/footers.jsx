import { useState } from "react";
import { Film, Github, Instagram, Youtube, Mail, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import PolicyModal from "./PolicyModal";

export default function Footers({ genres = [], onSelectGenre, isMobile = false }) {
  const [openGenre, setOpenGenre] = useState(false);
  const [activePolicy, setActivePolicy] = useState(null);

  return (
    <>
      <footer className="bg-gray-950 border-t border-gray-800/30 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          {isMobile ? (
            /* MOBILE FOOTER */
            <div className="space-y-6">
              {/* Brand */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                  <Film className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-black text-lg">
                  MOVIE<span className="text-red-600">MBUR</span>
                </span>
              </div>

              {/* Social */}
              <div className="flex gap-3">
                {[Github, Instagram, Youtube, Mail].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-white/5 border border-gray-800 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-gray-400" />
                  </a>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4 text-xs">
                <button
                  onClick={() => setOpenGenre(true)}
                  className="hover:text-white transition-colors"
                >
                  Browse Genres
                </button>
                <Link to="/history" className="hover:text-white transition-colors">
                  My List
                </Link>
                <Link to="/profile" className="hover:text-white transition-colors">
                  Profile
                </Link>
              </div>
            </div>
          ) : (
            /* DESKTOP FOOTER */
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/30">
                    <Film className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-black text-2xl">
                    MOVIE<span className="text-red-600">MBUR</span>
                  </span>
                </div>
                <p className="text-sm text-gray-500 max-w-sm mb-4">
                  Platform streaming film modern dengan koleksi terbaik dalam
                  kualitas premium.
                </p>
                <div className="flex items-center gap-2 text-amber-500 text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Exclusive Content Available</span>
                </div>
              </div>

              <div>
                <h3 className="text-white font-bold text-sm mb-4">Explore</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/" className="hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => setOpenGenre(true)}
                      className="hover:text-white transition-colors text-left"
                    >
                      Browse Genres
                    </button>
                  </li>
                  <li>
                    <Link
                      to="/history"
                      className="hover:text-white transition-colors"
                    >
                      My List
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-bold text-sm mb-4">Connect</h3>
                <div className="flex gap-3 mb-4">
                  {[Github, Instagram, Youtube, Mail].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-9 h-9 bg-white/5 border border-gray-800 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-gray-400" />
                    </a>
                  ))}
                </div>
                <p className="text-xs text-gray-600">support@moviembur.com</p>
              </div>
            </div>
          )}

          {/* Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-gray-800/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} MovieMbur. All rights reserved.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setActivePolicy("privacy")}
                className="hover:text-gray-400 transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActivePolicy("terms")}
                className="hover:text-gray-400 transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => setActivePolicy("cookies")}
                className="hover:text-gray-400 transition-colors"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Genre Modal */}
      {openGenre && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setOpenGenre(false)}
        >
          <div
            className="bg-gray-900 border border-gray-800 p-6 rounded-2xl w-full max-w-lg relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-white mb-4">
              Browse by Genre
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                onClick={() => {
                  onSelectGenre("All");
                  setOpenGenre(false);
                }}
                className="px-4 py-3 bg-red-600 rounded-xl text-white font-medium text-sm hover:bg-red-700 transition-colors"
              >
                All Genres
              </button>
              {genres.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    onSelectGenre(g.name);
                    setOpenGenre(false);
                  }}
                  className="px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-gray-300 font-medium text-sm hover:bg-white/10 hover:text-white transition-colors"
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Policy Modals */}
      {activePolicy && (
        <PolicyModal
          type={activePolicy}
          onClose={() => setActivePolicy(null)}
        />
      )}
    </>
  );
}
