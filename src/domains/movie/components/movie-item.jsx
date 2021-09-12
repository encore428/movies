import {
} from "@heroicons/react/solid";
import * as React from "react";

const MovieItemTitle = (props) => {
  return (
    <div className="text-sm leading-5 font-medium text-pink-600 truncate flex items-center sm:justify-between">
      <span>{props.title}</span>
      <span className="ml-1 font-normal text-gray-500">
        released on {props.releaseDate}
      </span>
    </div>
  );
};

export function MovieItem({
  title,
  releaseDate,
  backdropUrl
}) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-4 flex items-center sm:px-6">
        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <MovieItemTitle title={title} releaseDate={releaseDate} />
            <div className="mt-2 flex">
              <div className="flex items-center gap-2 text-sm leading-5 text-gray-500">
                <img src={backdropUrl} alt="movie backdrop" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
