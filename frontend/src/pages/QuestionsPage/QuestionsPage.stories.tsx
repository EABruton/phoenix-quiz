import type { Meta, StoryObj } from "@storybook/react-vite";
import QuestionsPage from "./QuestionsPage";
import { http, HttpResponse, delay } from "msw";
import type { Question } from "../../services/api/QuizzesService";

const data: Question[] = [
  {
    question_text: "What is the capital of France?",
    answer_text: "Paris",
    id: "1",
  },
  {
    question_text: "What is the largest planet in our solar system?",
    answer_text: "Jupiter",
    id: "2",
  },
  {
    question_text: "What is the boiling point of water?",
    answer_text: "100 degrees Celsius",
    id: "3",
  },
];

const getHandlerDelay = http.get("*/api/questions", async () => {
  await delay(3000);
  return HttpResponse.json({ data: data });
});

const getHandlerSuccess = http.get("*/api/questions", async () => {
  return HttpResponse.json({ data: data });
});

const deleteHandlerSuccess = http.delete("*/api/questions", async () => {
  return new HttpResponse({ status: 204 });
});

const getHandlerFail = http.get("*/api/questions", async () => {
  return HttpResponse.json({ message: "Bad request" }, { status: 400 });
});

const deleteHandlerFail = http.delete("*/api/questions", async () => {
  return HttpResponse.json({ message: "Bad request" }, { status: 400 });
});

const meta = {
  component: QuestionsPage,
  parameters: {
    msw: {
      handlers: [getHandlerSuccess, deleteHandlerSuccess],
    },
  },
} satisfies Meta<typeof QuestionsPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Loading: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [getHandlerDelay, deleteHandlerSuccess],
    },
  },
};

export const GetQuestionsError: Story = {
  parameters: {
    msw: {
      handlers: [getHandlerFail],
    },
  },
};

export const DeleteQuestionsError: Story = {
  parameters: {
    msw: {
      handlers: [getHandlerSuccess, deleteHandlerFail],
    },
  },
};
