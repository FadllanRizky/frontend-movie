import { History, ArrowLeft, Clock, Calendar, Star, Film, Trash2, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocalStorageAutoRefresh } from "../hooks/useLocalStorageAutoRefresh";
import Headers from "../components/headers";
import { useState, useEffect } from "react";

export default function WatchList() {
  const { value: history, updateStorage, removeFromStorage } =
    useLocalStorageAutoRefresh("watch_history", []);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleRemoveMovie = (movieId) => {
    if (window.confirm("Remove from history?")) {
      updateStorage(history.filter((m) => m.id !== movieId));
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Clear all watch history?")) {
      removeFromStorage();
    }
  };

  const totalHours = Math.round(
    history.reduce((acc, m) => acc + (m.duration || 0), 0) / 60
  );

  if (history.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Headers isMobile={isMobile} />
        <main className={`${isMobile ? "pt-14 pb-20" : "pt-16"} max-w-6xl mx-auto px-4 py-12`}>
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/5 border border-gray-800/50 flex items-center justify-center">
              <Film className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Watch History</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
              Start watching movies to build your history.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors text-sm"
            >
              Browse Movies
            </Link>
          </div>
        </main>
      </div>
    );
  }

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Watch History</h1>
            <p className="text-gray-500 text-sm mt-1">
              {history.length} movies &bull; {totalHours}h total
            </p>
          </div>
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm hover:bg-red-500/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>

        {/* Movie Grid */}
        <div
          className={`grid gap-3 sm:gap-4 ${
            isMobile
              ? "grid-cols-2"
              : "grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          }`}
        >
          {history.map((movie) => (
            <div
              key={`${movie.id}-${movie.watchedAt}`}
              className="group bg-gray-900/50 border border-gray-800/50 rounded-xl overflow-hidden hover:border-gray-700/50 transition-all duration-300"
            >
              {/* Poster */}
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                {/* Rating */}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-white text-[10px] font-bold">
                    {movie.rating || "N/A"}
                  </span>
                </div>

                {/* Watched Badge */}
                <div className="absolute top-2 left-2 bg-blue-600/80 backdrop-blur-sm px-1.5 py-0.5 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3 text-white" />
                  <span className="text-white text-[10px] font-bold">WATCHED</span>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white text-sm font-bold line-clamp-1">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400 text-xs">{movie.release_year}</span>
                    {movie.duration && (
                      <span className="text-gray-500 text-xs">{movie.duration}m</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-3 flex gap-2">
                <Link
                  to="/"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/5 border border-gray-700/50 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Play className="w-3 h-3" />
                  Watch
                </Link>
                <button
                  onClick={() => handleRemoveMovie(movie.id)}
                  className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
