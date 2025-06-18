import type { Meta, StoryObj } from "@storybook/react-vite";
import { http, HttpResponse } from "msw";

import LoginPage from "./LoginPage";

const postSuccessResponse = http.post("*/api/accounts/login", async () => {
  return new HttpResponse({ status: 200 });
});

const postFailureResponse = http.post("*/api/accounts/login", async () => {
  return HttpResponse.json({ message: "Invalid data" }, { status: 400 });
});

const meta = {
  component: LoginPage,
} satisfies Meta<typeof LoginPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    msw: [postSuccessResponse],
  },
};

export const ErrorSubmission: Story = {
  args: {},
  parameters: {
    msw: [postFailureResponse],
  },
};
