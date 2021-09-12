import { Button } from "components/button";
import { MovieItem, useMovies } from "domains/movie";

export const MoviesPage = () => {
  const { page, setPage, movies } = useMovies();
  
  const MOVIE_ID = "movieId";
  localStorage.setItem(MOVIE_ID, "");
  console.log('reset movieId');

  return (
    <div className="px-4 py-6 grid gap-4 md:grid-cols-2 max-w-7xl mx-auto">
      <div className="py-12 md:py-24 lg:py-32">
        <div className="relative max-w-7xl mx-auto pl-4 pr-8 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Movies
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-3xl">
            Pop-corns taste better with Movies.
          </p>
        </div>
      </div>
      <div>
        <div className="flex justify-between max-w-xl mx-auto">
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </Button>
          <Button onClick={() => setPage(page + 1)}>Next</Button>
        </div>
        <div className="max-w-xl mx-auto py-6 space-y-5">
          {movies
            ? movies.map((movie) => (
                <a href={`/movie/${movie._id}`} className="block" key={movie._id}>
                  <MovieItem
                    title={movie.title}
                    releaseDate={movie.releaseDate}
                    backdropUrl={movie.backdropUrl}
                  />
                </a>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
