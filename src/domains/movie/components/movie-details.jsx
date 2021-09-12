import * as React from "react";
import { TextareaField } from "components/textarea-field";
import { Button } from "components/button";
import { useAuth } from "domains/auth";
import { useMovieDetails } from "../hooks/use-movies";
import { createMovieComment } from "../movie.service";
import { MovieComments } from "./movie-comments";
import { SelectField } from "components/select-field";

export const MovieDetails = ({ movieId }) => {
  const { data } = useMovieDetails(movieId);
  const { status, accessToken } = useAuth();

  const [pageStatus, setPageStatus] = React.useState("idle");
  const [pageStatusMsg, setPageStatusMsg] = React.useState("");
  const [rating, setRating] = React.useState("5");
  const [review, setReview] = React.useState("");
  const [reload, setReload] = React.useState(false);

  const MOVIE_ID = "movieId";
  localStorage.setItem(MOVIE_ID, movieId);
  console.log(`set movieId to ${movieId}`);

  const refreshComment = () => {
    setReload(!reload);     // flip reload to force SubmittedJobApplications to reload
    setRating("5");
    setReview("");
    setPageStatus("idle");  // unlock the input fields and disabled buttons
  }
  return (
    <div className="flex justify-between">
    <div>
      <div className="p-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3">
            <span
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              {data ? `Old title: ${data.originalTitle}` : "..."}
            </span>
          </div>
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                {data ? data.title : "..."}
              </h1>
            </div>
            <div className="text-md px-4 py-1 text-pink-500 font-bold bg-white">
                { data ? `Released on ${data.releaseDate}` : "" }
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 pt-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div>
          <div className="text-lg font-bold">Overview</div>
            <div>
            {data ? data.overview : "..."}
            </div>
            {data && data.adult && (
              <Button variant="primary" disabled>
              Adults only
              </Button>
            )}
            {data && status==="authenticated" && (
              <div>
                <form onSubmit={(ev) => {
                        ev.preventDefault();
                        setPageStatus("loading");
                        setReview(review.trim());
                        if (review === "") {
                            setPageStatusMsg("Go ahead, write your review.");
                            setPageStatus("error");
                        } else {
                            setRating(Number(rating));
                            console.log("going to add comment with rating " + rating);
                            createMovieComment(accessToken, Number(rating), movieId, review).then(() => refreshComment())
                        }
                      }}
                      className="p-6">
                  {status === "error" && (
                    <div className="p-2 text-red-800 bg-red-200 rounded-sm">{pageStatusMsg}</div>
                  )}
                  <div className="text-3xl mt-4 mb-8 font-extrabold text-center">
                    Contribute your review of this movie
                  </div>
                  <div className="space-y-6">

                    <SelectField label="Number of Stars" value={rating} onChangeValue={setRating}>
                      <option value="1">*</option>
                      <option value="2">**</option>
                      <option value="3">***</option>
                      <option value="4">****</option>
                      <option value="5">*****</option>
                    </SelectField>

                    <TextareaField
                        label="Your comments"
                      value={review}
                      onChangeValue={setReview}
                      name="review"
                      id="review"
                      required
                      disabled={pageStatus === "loading"}
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={pageStatus === "loading"}
                    >
                      Post review
                    </Button>
                  </div>
                </form>
              </div>
              )}
          </div>
          <MovieComments movieId={movieId} reload={reload} />
        </div>
      </div>
      </div>
      <div><img src={data ? data.posterUrl:""} alt="poster" /></div>
    </div>
  );
};

// after createJobApplication has completed, how do I make SubmittedJobApplications reload?