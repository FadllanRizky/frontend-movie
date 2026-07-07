import { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Edit2,
  Trash2,
  Users,
  Film,
  ArrowLeft,
  X,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import Headers from "../components/headers";

const emptyMovie = {
  title: "",
  description: "",
  rating: "",
  release_year: "",
  duration: "",
  poster_url: "",
  trailer_url: "",
  director: "",
};

export default function TableAdmin() {
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState(emptyMovie);
  const [editingMovie, setEditingMovie] = useState(null);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const token = localStorage.getItem("token");

  const axiosAuth = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    fetchUsers();
    fetchMovies();
  }, []);

  const fetchUsers = async () => {
    const res = await axiosAuth.get("/admin/users");
    setUsers(res.data || []);
  };

  const fetchMovies = async () => {
    const res = await axiosAuth.get("/movies");
    setMovies(res.data || []);
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    const payload = {
      ...newMovie,
      rating: Number(newMovie.rating),
      release_year: Number(newMovie.release_year),
    };
    await axiosAuth.post("/movies", payload);
    setNewMovie(emptyMovie);
    setShowAddForm(false);
    fetchMovies();
  };

  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    const payload = { ...editingMovie, rating: Number(editingMovie.rating), release_year: Number(editingMovie.release_year) };
    delete payload.genres;
    await axiosAuth.put(`/movies/${editingMovie.id}`, payload);
    setEditingMovie(null);
    fetchMovies();
  };

  const handleDeleteMovie = async (id) => {
    if (!window.confirm("Delete this movie?")) return;
    await axiosAuth.delete(`/movies/${id}`);
    fetchMovies();
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    await axiosAuth.put(`/admin/users/${editingUser.id}`, {
      fullname: editingUser.fullname,
      email: editingUser.email,
      role: editingUser.role,
    });
    setEditingUser(null);
    fetchUsers();
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await axiosAuth.delete(`/admin/users/${id}`);
    fetchUsers();
  };

  const filteredMovies = movies.filter(
    (m) =>
      m.title?.toLowerCase().includes(search.toLowerCase()) ||
      m.director?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Headers isMobile={isMobile} />

      <main className={`${isMobile ? "pt-14 pb-20" : "pt-16"} max-w-7xl mx-auto px-4 sm:px-6 py-8`}>
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {movies.length} movies &bull; {users.length} users
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Movie
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-700/50 rounded-xl text-white text-sm placeholder:text-gray-500 outline-none focus:border-red-600/50 transition-all"
          />
        </div>

        {/* Movies Section */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-white mb-4">Movies</h2>
          {isMobile ? (
            /* Mobile: Card Layout */
            <div className="space-y-3">
              {filteredMovies.map((m) => (
                <div
                  key={m.id}
                  className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 flex gap-3"
                >
                  <img
                    src={m.poster_url}
                    alt={m.title}
                    className="w-16 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">
                      {m.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {m.release_year} &bull; {m.director}
                    </p>
                    <p className="text-xs text-amber-400 mt-1">
                      ⭐ {m.rating}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => setEditingMovie(m)}
                        className="p-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                      >
                        <Edit2 className="w-3 h-3 text-blue-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteMovie(m.id)}
                        className="p-1.5 bg-red-500/10 border border-red-500/20 rounded-lg"
                      >
                        <Trash2 className="w-3 h-3 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Desktop: Table Layout */
            <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="p-3 text-left text-xs text-gray-400">Title</th>
                    <th className="p-3 text-left text-xs text-gray-400">Rating</th>
                    <th className="p-3 text-left text-xs text-gray-400">Director</th>
                    <th className="p-3 text-left text-xs text-gray-400">Year</th>
                    <th className="p-3 text-left text-xs text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {filteredMovies.map((m) => (
                    <tr key={m.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img src={m.poster_url} alt="" className="w-8 h-12 object-cover rounded" />
                          <span className="text-sm text-white font-medium">{m.title}</span>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-amber-400">⭐ {m.rating}</td>
                      <td className="p-3 text-sm text-gray-400">{m.director}</td>
                      <td className="p-3 text-sm text-gray-400">{m.release_year}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button onClick={() => setEditingMovie(m)} className="p-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors">
                            <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                          </button>
                          <button onClick={() => handleDeleteMovie(m.id)} className="p-1.5 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors">
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Users Section */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Users</h2>
          {isMobile ? (
            <div className="space-y-3">
              {users.map((u) => (
                <div
                  key={u.id}
                  className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {u.fullname?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{u.fullname}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${u.role === "admin" ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"}`}>
                      {u.role}
                    </span>
                    <button onClick={() => setEditingUser(u)} className="p-1.5 bg-blue-500/10 rounded-lg">
                      <Edit2 className="w-3 h-3 text-blue-400" />
                    </button>
                    <button onClick={() => handleDeleteUser(u.id)} className="p-1.5 bg-red-500/10 rounded-lg">
                      <Trash2 className="w-3 h-3 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="p-3 text-left text-xs text-gray-400">Name</th>
                    <th className="p-3 text-left text-xs text-gray-400">Email</th>
                    <th className="p-3 text-left text-xs text-gray-400">Role</th>
                    <th className="p-3 text-left text-xs text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 text-sm text-white">{u.fullname}</td>
                      <td className="p-3 text-sm text-gray-400">{u.email}</td>
                      <td className="p-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${u.role === "admin" ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button onClick={() => setEditingUser(u)} className="p-1.5 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors">
                            <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                          </button>
                          <button onClick={() => handleDeleteUser(u.id)} className="p-1.5 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors">
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Add Movie Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAddForm(false)}>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Add New Movie</h2>
              <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleAddMovie} className="space-y-3">
              {Object.keys(emptyMovie).map((key) => (
                <div key={key}>
                  <label className="block text-xs text-gray-400 mb-1 capitalize">
                    {key.replace("_", " ")}
                  </label>
                  <input
                    required
                    placeholder={key.replace("_", " ")}
                    className="w-full px-3 py-2.5 bg-white/5 border border-gray-700/50 rounded-lg text-sm text-white placeholder:text-gray-500 outline-none focus:border-red-600/50 transition-all"
                    value={newMovie[key]}
                    onChange={(e) => setNewMovie({ ...newMovie, [key]: e.target.value })}
                  />
                </div>
              ))}
              <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors mt-4">
                Add Movie
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Movie Modal */}
      {editingMovie && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setEditingMovie(null)}>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Edit Movie</h2>
              <button onClick={() => setEditingMovie(null)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleUpdateMovie} className="space-y-3">
              {Object.keys(emptyMovie).map((key) => (
                <div key={key}>
                  <label className="block text-xs text-gray-400 mb-1 capitalize">
                    {key.replace("_", " ")}
                  </label>
                  {key === "description" ? (
                    <textarea
                      required
                      rows="3"
                      value={editingMovie[key] || ""}
                      onChange={(e) => setEditingMovie({ ...editingMovie, [key]: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white/5 border border-gray-700/50 rounded-lg text-sm text-white placeholder:text-gray-500 outline-none focus:border-red-600/50 transition-all resize-none"
                    />
                  ) : (
                    <input
                      required
                      value={editingMovie[key] || ""}
                      onChange={(e) => setEditingMovie({ ...editingMovie, [key]: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white/5 border border-gray-700/50 rounded-lg text-sm text-white placeholder:text-gray-500 outline-none focus:border-red-600/50 transition-all"
                    />
                  )}
                </div>
              ))}
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors mt-4">
                Update Movie
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setEditingUser(null)}>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-md w-full animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Edit User</h2>
              <button onClick={() => setEditingUser(null)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleUpdateUser} className="space-y-3">
              <input
                value={editingUser.fullname}
                onChange={(e) => setEditingUser({ ...editingUser, fullname: e.target.value })}
                placeholder="Full Name"
                className="w-full px-3 py-2.5 bg-white/5 border border-gray-700/50 rounded-lg text-sm text-white outline-none focus:border-red-600/50"
              />
              <input
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                placeholder="Email"
                className="w-full px-3 py-2.5 bg-white/5 border border-gray-700/50 rounded-lg text-sm text-white outline-none focus:border-red-600/50"
              />
              <select
                value={editingUser.role}
                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                className="w-full px-3 py-2.5 bg-white/5 border border-gray-700/50 rounded-lg text-sm text-white outline-none focus:border-red-600/50"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="flex gap-3 mt-4">
                <button type="button" onClick={() => setEditingUser(null)} className="flex-1 py-2.5 bg-white/5 border border-gray-700/50 rounded-xl text-sm text-gray-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
