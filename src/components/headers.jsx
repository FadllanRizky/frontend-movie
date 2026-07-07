import { Link, useNavigate } from "react-router-dom";
import { getRole, clearAuth } from "../utils/token";
import {
  Search,
  House,
  ShieldUser,
  LogOut,
  User,
  Menu,
  X,
  History,
  Film,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Headers({
  search,
  setSearch,
  genres = [],
  activeGenre,
  setActiveGenre,
  isMobile = false,
}) {
  const navigate = useNavigate();
  const role = getRole();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    clearAuth();
    navigate("/login", { replace: true });
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-gray-950/95 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 h-14 sm:h-16 md:h-20 flex items-center justify-between">
        {/* LOGO & MOBILE MENU */}
        <div className="flex items-center gap-3">
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg"
            >
              {menuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          )}

          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/30">
              <Film className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-white font-black text-lg sm:text-xl tracking-tight hidden sm:block">
              MOVIE<span className="text-red-600">MBUR</span>
            </span>
          </Link>
        </div>

        {/* DESKTOP NAV */}
        {!isMobile && (
          <nav className="flex items-center gap-1 ml-8">
            <Link
              to="/"
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              Home
            </Link>
            <Link
              to="/history"
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              My List
            </Link>
            {role === "admin" && (
              <Link
                to="/admin"
                className="px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors rounded-lg hover:bg-red-500/10"
              >
                Admin
              </Link>
            )}
          </nav>
        )}

        {/* SEARCH & RIGHT ACTIONS */}
        <div className="flex items-center gap-2">
          {/* Desktop Search */}
          {!isMobile && (
            <div className="relative group">
              <Search className="text-gray-500 w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-red-500 transition-colors" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search movies..."
                className="w-48 lg:w-64 bg-white/5 border border-gray-700/50 pl-9 pr-4 py-2 rounded-lg text-sm outline-none text-white placeholder:text-gray-500 focus:border-red-600/50 focus:bg-white/10 transition-all duration-300"
              />
            </div>
          )}

          {/* Mobile Search Toggle */}
          {isMobile && (
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg"
            >
              <Search className="w-5 h-5 text-gray-400" />
            </button>
          )}

          {/* Desktop Right Actions */}
          {!isMobile && (
            <div className="flex items-center gap-1 ml-2">
              <Link
                to="/profile"
                className="p-2 rounded-lg hover:bg-white/5 transition-colors group"
                title="Profile"
              >
                <User className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobile && searchOpen && (
        <div className="bg-gray-950 border-b border-gray-800 px-4 py-3 animate-slideUp">
          <div className="relative">
            <Search className="text-gray-500 w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies..."
              className="w-full bg-white/5 border border-gray-700/50 pl-9 pr-10 py-3 rounded-lg text-sm outline-none text-white placeholder:text-gray-500 focus:border-red-600/50"
              autoFocus
            />
            <button
              onClick={() => {
                setSearchOpen(false);
                setSearch("");
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div className="bg-gray-950 border-b border-gray-800 p-4 animate-slideUp">
          <div className="space-y-1">
            <Link
              to="/"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-white"
              onClick={() => setMenuOpen(false)}
            >
              <House className="w-5 h-5 text-gray-400" />
              Home
            </Link>
            <Link
              to="/history"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-white"
              onClick={() => setMenuOpen(false)}
            >
              <History className="w-5 h-5 text-gray-400" />
              My List
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-white"
              onClick={() => setMenuOpen(false)}
            >
              <User className="w-5 h-5 text-gray-400" />
              Profile
            </Link>
            {role === "admin" && (
              <Link
                to="/admin"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-red-400"
                onClick={() => setMenuOpen(false)}
              >
                <ShieldUser className="w-5 h-5" />
                Admin Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-white w-full"
            >
              <LogOut className="w-5 h-5 text-gray-400" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Desktop Genre Pills */}
      {!isMobile && genres.length > 0 && scrolled && (
        <div className="bg-gray-950/80 backdrop-blur-sm border-b border-gray-800/30">
          <div className="max-w-7xl mx-auto px-6 py-2">
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
              <button
                onClick={() => setActiveGenre("All")}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  activeGenre === "All"
                    ? "bg-white text-black"
                    : "bg-white/10 text-gray-400 hover:text-white hover:bg-white/20"
                }`}
              >
                All
              </button>
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => setActiveGenre(genre.name)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    activeGenre === genre.name
                      ? "bg-white text-black"
                      : "bg-white/10 text-gray-400 hover:text-white hover:bg-white/20"
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
