import { render } from "@testing-library/react";
import { MovieItem } from "./movie-item";

test('<MovieItem/> component', () => {
    const { container } = render(
        <MovieItem
                title="MOVIE TITLE"
                releaseDate="2021-09-01"
                backdropUrl="image URL"/>);

    expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="bg-white shadow overflow-hidden sm:rounded-md"
    >
      <div
        class="px-4 py-4 flex items-center sm:px-6"
      >
        <div
          class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between"
        >
          <div>
            <div
              class="text-sm leading-5 font-medium text-pink-600 truncate flex items-center sm:justify-between"
            >
              <span>
                MOVIE TITLE
              </span>
              <span
                class="ml-1 font-normal text-gray-500"
              >
                released on 
                2021-09-01
              </span>
            </div>
            <div
              class="mt-2 flex"
            >
              <div
                class="flex items-center gap-2 text-sm leading-5 text-gray-500"
              >
                <img
                  alt="movie backdrop"
                  src="image URL"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `);
});