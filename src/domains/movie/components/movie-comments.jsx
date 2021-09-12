import * as React from "react"
import { IconButton } from "components/icon-button";
import { Button } from "components/button";
import { useAuth } from "domains/auth";
import { useDeleteMovieComment, useMovieComments } from "../hooks/use-movie-comments";

export const MovieComments = ({ movieId, reload }) => {
  const { status, userId } = useAuth();

  const { data, loadData } = useMovieComments(movieId);
  const deleteMovieComment = useDeleteMovieComment();

  React.useEffect(() => {
        loadData(movieId);
  },[movieId, reload]);


  return (
    <div className="py-6">
      <h2 className="text-2xl p-3 font-medium">Reviews</h2>
      {(status!=="authenticated") && (
        <>
        <a href="/login"><Button variant="primary">Login</Button></a>
           {` to post reviews`}
        </>
      )}
      <ul className="p-3 space-y-3 bg-gray-50">
        {data &&
          data.map((comment) => (
            <li key={comment._id}>
              <div className="flex justify-between items-center px-4 sm:px-6 py-3 bg-white">
                <div>
                  <div><b>Rating</b>: {comment.rating}</div>
                  <div>
                    <b>Submitted by</b>:{comment.userName}
                  </div>
                  <div>
                    <b>Comments</b>:{comment.content}
                  </div>
                </div>
                {(status==="authenticated") && (comment.userId===userId) && (
                <IconButton
                  onClick={() =>
                    deleteMovieComment(comment._id, movieId).then(() => loadData(movieId))
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </IconButton>
                )}
              </div>
            </li>
          ))}
          {(!data || data.length===0) && (status!=="authenticated") && (
            <>No reviews</>
          )}
          {(!data || data.length===0) && (status==="authenticated") && (
            <>Go ahead, be the first to post a review!</>
          )}
      </ul>
    </div>
  )
};
