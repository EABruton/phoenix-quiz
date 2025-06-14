import type { Meta, StoryObj } from "@storybook/react-vite";

import ErrorsList from "./ErrorsList";
import { fn } from "storybook/test";

const meta = {
  component: ErrorsList,
} satisfies Meta<typeof ErrorsList>;

export default meta;

type Story = StoryObj<typeof meta>;

const messages = [
  ...[...Array(3)].map((_, i) => `Error message: ${i}`),
  "really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, long error",
];

export const Default: Story = {
  args: {
    setErrorMessages: fn(),
    errorMessages: messages,
  },
};
