import * as React from "react";
import { getMovies, getMovieDetails } from "../movie.service";

export const useMovies = () => {
  const loadMovies = (pageNum, signal) =>
    getMovies(pageNum, signal).then((data) => setMovies(data));

  const [page, setPage] = React.useState(1);
  const [movies, setMovies] = React.useState(undefined);

  React.useEffect(() => {
    const ab = new AbortController();
    loadMovies(page, ab.signal);
    return () => {
      ab.abort();
    };
  }, [page]);

  return {
    movies,
    page,
    setPage,
    loadMovies,
  };
};

export const useMovieDetails = (movieId) => {
  const [data, setData] = React.useState(undefined);

  React.useEffect(() => {
    const ab = new AbortController();
    getMovieDetails(movieId, ab.signal).then(setData);

    return () => {
      ab.abort();
    };
  }, [movieId]);

  return {
    data,
  };
};
