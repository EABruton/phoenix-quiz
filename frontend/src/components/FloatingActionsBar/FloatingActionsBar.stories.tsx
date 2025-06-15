import type { Meta, StoryObj } from "@storybook/react-vite";

import FloatingActionsBar from "./FloatingActionsBar";
import Button from "../Button/Button.tsx";

const meta = {
  component: FloatingActionsBar,
  args: {
    children: <Button>Click me</Button>,
  },
} satisfies Meta<typeof FloatingActionsBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
