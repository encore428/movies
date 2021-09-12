import { useAuth } from "domains/auth";
import * as React from "react";
import { deleteMovieComment, getMovieComments } from "../movie.service";

export const useMovieComments = (movieId) => {
  const [data, setData] = React.useState(undefined);
  const loadData = (movieId, { signal }) =>
    getMovieComments(movieId, { signal }).then(setData);

  React.useEffect(() => {
      const ab = new AbortController();
      console.log(`in useMovieComments created ab.signal=${ab.signal}`);
      loadData(movieId, { signal: ab.signal });
      return () => {
        ab.abort();
      };
  }, [movieId]);

  return {
    data,
    loadData: (moviebId) => loadData(movieId, {}),
  };
};

export const useDeleteMovieComment = () => {
  const { accessToken } = useAuth();

  return function run(commentId, movieId) {
    return deleteMovieComment(commentId, movieId, { token: accessToken });
  };
};
