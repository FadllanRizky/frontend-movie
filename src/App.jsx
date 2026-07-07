import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home as HomeIcon, Search, History, User } from "lucide-react";

import Login from "./pages/login";
import Register from "./pages/register";
import HomePage from "./pages/home";
import TableAdmin from "./pages/tabelAdmin";
import Profil from "./pages/profil";
import WatchList from "./pages/wathcList";

import ProtectedRoute from "./components/ProtectedRoute";
import PolicyModal from "./components/PolicyModal";
import { getToken } from "./utils/token";

function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  const tabs = [
    { to: "/", icon: HomeIcon, label: "Home" },
    { to: "/search", icon: Search, label: "Search" },
    { to: "/history", icon: History, label: "History" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const isActive = path === tab.to;
        return (
          <Link
            key={tab.to}
            to={tab.to}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-all duration-200 ${
              isActive
                ? "text-red-500"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function App() {
  const token = getToken();
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activePolicy, setActivePolicy] = useState(null);

  const [activeGenre, setActiveGenre] = useState("All");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 shadow-lg shadow-red-900/30 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
            </div>
          </div>
          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
            MOVIE<span className="text-red-600">MBUR</span>
          </h2>
          <p className="text-gray-500 text-sm">Loading premium experience...</p>
          <div className="mt-6 flex justify-center gap-2">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse delay-150"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage
                  activeGenre={activeGenre}
                  setActiveGenre={setActiveGenre}
                  genres={genres}
                  setGenres={setGenres}
                  isMobile={isMobile}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <HomePage
                  activeGenre={activeGenre}
                  setActiveGenre={setActiveGenre}
                  genres={genres}
                  setGenres={setGenres}
                  isMobile={isMobile}
                  autoFocusSearch
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profil />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <TableAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <WatchList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />

          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <Register />}
          />

          <Route
            path="*"
            element={<Navigate to={token ? "/" : "/login"} />}
          />
        </Routes>

        {/* Bottom Nav - Mobile Only */}
        {token && <BottomNav />}

        {/* Policy Modals */}
        {activePolicy && (
          <PolicyModal
            type={activePolicy}
            onClose={() => setActivePolicy(null)}
          />
        )}

        {/* Global policy setter via window */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.openPolicy = (type) => { /* handled by React */ }`,
          }}
        />
      </div>
    </BrowserRouter>
  );
}
