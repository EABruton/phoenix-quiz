import type { Meta, StoryObj } from "@storybook/react-vite";

import PagionationController from "./PagionationController";
import { fn } from "storybook/test";

const meta = {
  component: PagionationController,
  args: {
    setPageNumber: fn(),
  },
} satisfies Meta<typeof PagionationController>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalPageNumbers: 3,
    currentPageNumber: 2,
  },
};

export const PreviousDisabled: Story = {
  args: {
    totalPageNumbers: 3,
    currentPageNumber: 1,
  },
};

export const NextDisabled: Story = {
  args: {
    totalPageNumbers: 3,
    currentPageNumber: 3,
  },
};
