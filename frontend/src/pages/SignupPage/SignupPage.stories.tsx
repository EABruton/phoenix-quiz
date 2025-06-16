import type { Meta, StoryObj } from "@storybook/react-vite";

import SignupPage from "./SignupPage";

const meta = {
  component: SignupPage,
} satisfies Meta<typeof SignupPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
