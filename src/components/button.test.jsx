import { render } from "@testing-library/react";
import { Button } from "./button";

test('<Button/> component', () => {
    const { container } = render(
        <Button variant="primary">Primary</Button>);

    expect(container.firstChild).toMatchInlineSnapshot(`
    <button
      class="inline-flex justify-center items-center py-2 px-4 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 border-transparent text-white bg-pink-600 hover:bg-pink-700"
      type="button"
    >
      Primary
    </button>
    `);
});