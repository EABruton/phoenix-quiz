import type { Meta, StoryObj } from "@storybook/react-vite";

import FieldErrorsList from "./FieldErrorsList";

const meta = {
  component: FieldErrorsList,
} satisfies Meta<typeof FieldErrorsList>;

export default meta;

type Story = StoryObj<typeof meta>;

const fieldErrors = [...Array(5)].map((_, i) => `Error: ${i}`);

export const Default: Story = {
  args: {
    errorMessages: fieldErrors,
  },
};
