import type { Meta, StoryObj } from "@storybook/react-vite";
import { http, HttpResponse } from "msw";

const postSuccessResponse = http.post("*/api/accounts/signup", async () => {
  return new HttpResponse({ status: 200 });
});

const postFailureResponse = http.post("*/api/accounts/signup", async () => {
  return HttpResponse.json(
    { message: "Invalid email address" },
    { status: 400 },
  );
});

import SignupPage from "./SignupPage";

const meta = {
  component: SignupPage,
} satisfies Meta<typeof SignupPage>;

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
