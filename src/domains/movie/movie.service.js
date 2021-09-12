import { fetchJson } from "lib/fetch-json";
import { BASE_URL } from "const";



export const createMovieComment = (token, rating, MovieId, comment) =>
  fetchJson(`${BASE_URL}/movie/comment`, {
    method: "POST",
    body: {
      rating,
      movieId: MovieId,
      content: comment
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getMovieComments = (movieId, { signal} ) => {
  console.log(`in getMovieComments with MovieId=${movieId} signal=${signal}`);
  const res = fetchJson(
    `${BASE_URL}/movie/movie/${movieId}/comment`,
    {
      signal
    }
  );
  console.log(`after fetch res=${res}`);
  return res;
};


export const deleteMovieComment = (commentId, movieId, { token }) => {
  console.log(`in deleteMovieComments with commentId=${commentId}, MovieId=${movieId}`);
  const res = fetchJson(`${BASE_URL}/movie/comment/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(`after fetch res=${res}`);
  return res;
};

export const getMovies = (page, signal) => {
  return fetchJson(
    `${BASE_URL}/movie?limit=5&page=${page}` + (page === 2 ? "&delay=3000" : ""),
    {
      signal,
    }
  );
};

export const getMovieDetails = (movieId, signal) => {
  console.log(`into getMovieDetails for MovieId=${movieId} signal=${signal} `);
  return fetchJson(`${BASE_URL}/movie/movie/${movieId}`, { signal });
}