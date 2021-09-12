import { render } from "@testing-library/react";
import { Label } from "./label";
import { TextInput } from "./text-input";

test('<Button/> component', () => {
    const { container } = render(
        <>
        <Label htmlFor="name">Name</Label>
        <TextInput id="name" placeholder="John Doe" />
        </>
      );

    expect(container.firstChild).toMatchInlineSnapshot(`
    <label
      class="block text-sm font-medium text-gray-900"
      for="name"
    >
      Name
    </label>
    `);
});