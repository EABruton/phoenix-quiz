import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import QuestionList from "./QuestionList";
import { QuestionsPageProvider } from "../../QuestionsPageContext";

const questionsDefault = [...Array(5)].map((_, i) => {
  return {
    question_text: `question ${i}`,
    answer_text: `answer ${i}`,
    id: `${i}`,
  };
});

const filteredQuestionIDsDefault = questionsDefault.map(
  (question) => question.id,
);

const meta = {
  component: QuestionList,
  tags: ["autodocs"],
  args: {
    questions: questionsDefault,
    filteredQuestionIDs: filteredQuestionIDsDefault,
  },
  decorators: [
    (Story, { parameters }) => {
      const initialSelectedQuestions = parameters?.selectedQuestions || [];
      const [selectedQuestions, setSelectedQuestions] = useState<string[]>(
        initialSelectedQuestions,
      );

      return (
        <QuestionsPageProvider
          value={{ setSelectedQuestions, selectedQuestions }}
        >
          <Story />
        </QuestionsPageProvider>
      );
    },
  ],
} satisfies Meta<typeof QuestionList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filtered: Story = {
  args: {
    ...meta.args,
    filteredQuestionIDs: filteredQuestionIDsDefault.slice(
      0,
      questionsDefault.length - 1,
    ),
  },
};

export const Selected: Story = {
  parameters: {
    selectedQuestions: [filteredQuestionIDsDefault[0]],
  },
};
