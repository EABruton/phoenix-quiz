import type { Meta, StoryObj } from "@storybook/react-vite";

import Searchbar from "./Searchbar";

const meta = {
  component: Searchbar,
} satisfies Meta<typeof Searchbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ariaControls: "ariaControls",
    ariaLabel: "ariaLabel",
    searchCallback: () => {},
    placeholderText: "placeholderText",
  },
};
