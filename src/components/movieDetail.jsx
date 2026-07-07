import { X, Heart, MessageCircle, Star, Clock, Calendar, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocalStorageAutoRefresh } from "../hooks/useLocalStorageAutoRefresh";

const getEmbedUrl = (url) => {
  if (!url) return "";
  let id = "";
  if (url.includes("youtu.be")) {
    id = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("watch?v=")) {
    id = url.split("v=")[1].split("&")[0];
  } else if (url.includes("embed")) {
    return url;
  }
  return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1`;
};

export default function MovieDetailModal({ movie, onClose, isMobile = false }) {
  const STORAGE_KEY = `movie_stats_${movie.id}`;
  const { updateStorage: updateHistory } = useLocalStorageAutoRefresh("watch_history", []);
  const [text, setText] = useState("");
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) {
      setLikes(saved.likes || 0);
      setComments(saved.comments || []);
    }
    saveToHistory();
    setLoading(true);
  }, []);

  useEffect(() => {
    if (!loading) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ likes, comments }));
  }, [likes, comments, loading]);

  const handleLike = () => setLikes((prev) => prev + 1);

  const handleComment = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const newComment = {
      id: Date.now(),
      text: text.trim(),
      timestamp: new Date().toISOString(),
      user: "You",
    };
    setComments((prev) => [...prev, newComment]);
    setText("");
  };

  const saveToHistory = () => {
    updateHistory((prev) => {
      const filtered = prev.filter((h) => h.id !== movie.id);
      return [
        { ...movie, watchedAt: new Date().toISOString() },
        ...filtered.slice(0, 49),
      ];
    });
  };

  const handlePlayTrailer = () => {
    setIsPlaying(true);
    saveToHistory();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className={`bg-black overflow-hidden relative shadow-2xl animate-scaleIn ${
          isMobile
            ? "w-full h-full"
            : "w-[92vw] h-[90vh] rounded-2xl"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 bg-black/60 backdrop-blur-sm rounded-full text-gray-400 hover:text-white hover:bg-black/80 transition-all"
        >
          <X size={isMobile ? 22 : 26} />
        </button>

        {/* Trailer Section */}
        <div className="relative w-full" style={{ height: isMobile ? "45%" : "55%" }}>
          {!isPlaying ? (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-gray-900"
              onClick={handlePlayTrailer}
            >
              {movie.poster_url && (
                <img
                  src={movie.poster_url}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
              )}
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center mb-4 shadow-2xl hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" />
                </div>
                <p className="text-white font-medium text-lg">Play Trailer</p>
              </div>
            </div>
          ) : (
            <iframe
              src={getEmbedUrl(movie.trailer_url)}
              title={movie.title}
              allowFullScreen
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          )}
        </div>

        {/* Content Section */}
        <div
          className={`overflow-y-auto ${
            isMobile ? "h-[55%] px-4 py-4" : "h-[45%] px-8 py-6"
          }`}
        >
          {/* Title & Meta */}
          <div className="mb-4 sm:mb-6">
            <h2
              className={`font-black text-white mb-3 ${
        isMobile ? "text-2xl" : "text-3xl"
      }`}
            >
              {movie.title}
            </h2>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
              <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-amber-300 text-sm font-bold">
                  {movie.rating}/10
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <Calendar className="w-4 h-4" />
                {movie.release_year}
              </div>
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                {movie.duration} min
              </div>
              {movie.director && (
                <span className="text-gray-500 text-sm">
                  Dir. {movie.director}
                </span>
              )}
            </div>

            {movie.genres?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {movie.genres.map((g, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-white/10 text-gray-300 text-xs rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-300 text-sm leading-relaxed">
              {movie.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 rounded-xl transition-all duration-200"
            >
              <Heart className="w-5 h-5 text-red-400" />
              <span className="text-white text-sm font-medium">{likes}</span>
            </button>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/10 rounded-xl">
              <MessageCircle className="w-5 h-5 text-blue-400" />
              <span className="text-white text-sm font-medium">
                {comments.length}
              </span>
            </div>
          </div>

          {/* Comments */}
          <div className="border-t border-white/10 pt-4">
            <h3 className="text-white font-bold mb-3 text-sm">Comments</h3>

            <div className="space-y-3 max-h-40 overflow-y-auto mb-4">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">
                  No comments yet. Be the first!
                </p>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-[10px] text-white font-bold">
                          {c.user[0]}
                        </span>
                      </div>
                      <span className="text-white text-xs font-medium">
                        {c.user}
                      </span>
                      <span className="text-gray-500 text-[10px]">
                        {new Date(c.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm pl-8">{c.text}</p>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleComment} className="flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-white/5 border border-white/10 px-3 py-2.5 rounded-lg text-sm text-white placeholder:text-gray-500 outline-none focus:border-red-500/50 transition-colors"
              />
              <button
                type="submit"
                disabled={!text.trim()}
                className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  text.trim()
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-white/5 text-gray-500 cursor-not-allowed"
                }`}
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
