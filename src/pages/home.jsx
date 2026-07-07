import { useEffect, useState, useRef } from "react";
import { getMovies } from "../api/movie";
import { getGenres } from "../api/genre";
import MovieProduct from "../components/movieProduct";
import MovieDetailModal from "../components/movieDetail";
import Headers from "../components/headers";
import Footers from "../components/footers";
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";

export default function Home({
  activeGenre,
  setActiveGenre,
  genres = [],
  setGenres,
  isMobile = false,
  autoFocusSearch = false,
}) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const movieRes = await getMovies();
        const genreRes = await getGenres();
        setMovies(movieRes.data || []);
        setGenres(genreRes.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Hero auto-rotate
  useEffect(() => {
    if (movies.length === 0) return;
    const topMovies = movies
      .filter((m) => m.rating >= 7)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
    if (topMovies.length <= 1) return;

    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % topMovies.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [movies]);

  // Group movies by genre
  const moviesByGenre = {};
  if (genres.length > 0) {
    genres.forEach((genre) => {
      const filtered = movies.filter((m) => m.genres?.includes(genre.name));
      if (filtered.length > 0) {
        moviesByGenre[genre.name] = filtered;
      }
    });
  }

  // Featured movie for hero
  const topRated = movies
    .filter((m) => m.rating >= 7)
    .sort((a, b) => b.rating - a.rating);
  const featuredMovie = topRated[heroIndex] || topRated[0];

  // Filtered movies for search
  const filteredMovies = search
    ? movies.filter((m) =>
        m.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Headers
          search={search}
          setSearch={setSearch}
          genres={genres}
          activeGenre={activeGenre}
          setActiveGenre={setActiveGenre}
          isMobile={isMobile}
        />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-400 text-sm">Loading movies...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Headers
        search={search}
        setSearch={setSearch}
        genres={genres}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
        isMobile={isMobile}
      />

      <main className={`${isMobile ? "pt-14 pb-20" : "pt-16"}`}>
        {/* SEARCH RESULTS */}
        {search ? (
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8">
            <h2 className="text-xl font-bold mb-6">
              Search results for &quot;{search}&quot;
            </h2>
            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
                {filteredMovies.map((movie) => (
                  <MovieProduct
                    key={movie.id}
                    movie={movie}
                    onClick={() => setSelectedMovie(movie)}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-20">
                No movies found.
              </p>
            )}
          </div>
        ) : (
          <>
            {/* HERO BANNER */}
            {featuredMovie && (
              <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh]">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={featuredMovie.poster_url}
                    alt={featuredMovie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 hero-gradient" />
                  <div className="absolute inset-0 hero-gradient-bottom" />
                </div>

                {/* Hero Content */}
                <div className="absolute inset-0 flex items-end">
                  <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24">
                    <div className="max-w-xl">
                      {/* Rating Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-1 rounded">
                          <span className="text-amber-400 text-xs font-bold">
                            TOP RATED
                          </span>
                          <span className="text-amber-300 text-xs font-bold">
                            {featuredMovie.rating}/10
                          </span>
                        </div>
                        {featuredMovie.release_year && (
                          <span className="text-gray-400 text-sm">
                            {featuredMovie.release_year}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h1
                        className={`font-black text-white mb-3 leading-tight ${
                          isMobile ? "text-3xl" : "text-4xl sm:text-5xl md:text-6xl"
                        }`}
                      >
                        {featuredMovie.title}
                      </h1>

                      {/* Genre Tags */}
                      {featuredMovie.genres?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {featuredMovie.genres.slice(0, 4).map((g, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-white/10 text-gray-300 text-xs rounded-full"
                            >
                              {g}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Description */}
                      <p
                        className={`text-gray-300 leading-relaxed mb-5 ${
                          isMobile ? "text-sm line-clamp-2" : "text-base line-clamp-3"
                        }`}
                      >
                        {featuredMovie.description}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setSelectedMovie(featuredMovie)}
                          className="flex items-center gap-2 bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base hover:bg-gray-200 transition-colors"
                        >
                          <Play className="w-5 h-5 fill-current" />
                          Play
                        </button>
                        <button
                          onClick={() => setSelectedMovie(featuredMovie)}
                          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-white/30 transition-colors border border-white/10"
                        >
                          <Info className="w-5 h-5" />
                          More Info
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hero Indicators */}
                {topRated.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {topRated.slice(0, 5).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setHeroIndex(i)}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          i === heroIndex
                            ? "w-8 bg-white"
                            : "w-2 bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* GENRE ROWS */}
            <div className="relative z-10 -mt-8 sm:-mt-12 md:-mt-16">
              {/* Active Genre Filter */}
              {activeGenre !== "All" && (
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">
                      Filtering:
                    </span>
                    <span className="px-3 py-1 bg-white text-black text-sm font-bold rounded-full">
                      {activeGenre}
                    </span>
                    <button
                      onClick={() => setActiveGenre("All")}
                      className="text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}

              {/* Horizontal Genre Rows */}
              {activeGenre === "All"
                ? // Show all genres
                  Object.entries(moviesByGenre).map(([genreName, genreMovies]) => (
                    <GenreRow
                      key={genreName}
                      title={genreName}
                      movies={genreMovies}
                      isMobile={isMobile}
                      onMovieClick={setSelectedMovie}
                    />
                  ))
                : // Show filtered genre
                  moviesByGenre[activeGenre] && (
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4">
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
                        {moviesByGenre[activeGenre].map((movie) => (
                          <MovieProduct
                            key={movie.id}
                            movie={movie}
                            onClick={() => setSelectedMovie(movie)}
                            isMobile={isMobile}
                          />
                        ))}
                      </div>
                    </div>
                  )}

              {/* Fallback: All Movies Row */}
              {Object.keys(moviesByGenre).length === 0 && movies.length > 0 && (
                <GenreRow
                  title="All Movies"
                  movies={movies}
                  isMobile={isMobile}
                  onMovieClick={setSelectedMovie}
                />
              )}
            </div>
          </>
        )}
      </main>

      {/* Detail Modal */}
      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isMobile={isMobile}
        />
      )}

      {/* Footer */}
      <Footers genres={genres} onSelectGenre={setActiveGenre} isMobile={isMobile} />
    </div>
  );
}

function GenreRow({ title, movies, isMobile, onMovieClick }) {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 10);
    setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) ref.addEventListener("scroll", checkScroll);
    return () => ref?.removeEventListener("scroll", checkScroll);
  }, [movies]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = isMobile ? 300 : 500;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-3 sm:py-4">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3">
          {title}
        </h2>
      </div>

      <div className="relative group/row">
        {/* Left Scroll Button */}
        {!isMobile && showLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-r from-black/80 to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
        )}

        {/* Movie Row */}
        <div
          ref={scrollRef}
          className="netflix-row pl-3 sm:pl-4 md:pl-6 pr-3 sm:pr-4 md:pr-6"
        >
          {movies.map((movie) => (
            <MovieProduct
              key={movie.id}
              movie={movie}
              onClick={() => onMovieClick(movie)}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Right Scroll Button */}
        {!isMobile && showRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-l from-black/80 to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
