import { Play, Star, Info } from "lucide-react";
import { useState } from "react";

export default function MovieProduct({ movie, onClick, isMobile = false }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card-netflix group"
      style={{ width: isMobile ? "140px" : "200px" }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-md">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient Overlay - always visible on mobile */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isMobile
              ? "bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100"
              : "bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100"
          }`}
        />

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 z-10">
          <div className="flex items-center gap-0.5 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-white text-[10px] font-bold">
              {movie.rating || "N/A"}
            </span>
          </div>
        </div>

        {/* Info Overlay - Desktop */}
        {!isMobile && (
          <div
            className={`absolute inset-0 flex flex-col justify-end p-3 transition-all duration-300 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="space-y-2">
              {/* Play Button */}
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Play className="w-4 h-4 text-black ml-0.5" />
                </button>
                <button className="w-8 h-8 bg-white/20 backdrop-blur-sm border border-gray-400/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Info className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Movie Info */}
              <div>
                <h3 className="text-white text-xs font-bold line-clamp-1">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-400 text-[10px]">
                    {movie.release_year}
                  </span>
                  {movie.genres?.slice(0, 2).map((g, i) => (
                    <span
                      key={i}
                      className="text-[9px] text-gray-400 bg-white/10 px-1.5 py-0.5 rounded"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Bottom Info */}
        {isMobile && (
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <h3 className="text-white text-xs font-bold line-clamp-1">
              {movie.title}
            </h3>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-gray-400 text-[10px]">
                {movie.release_year}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
