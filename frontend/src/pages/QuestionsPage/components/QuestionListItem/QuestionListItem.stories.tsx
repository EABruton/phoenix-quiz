import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { QuestionsPageProvider } from '../../QuestionsPageContext';
import './QuestionListItem.css';

import QuestionListItem from './QuestionListItem';

const meta = {
  component: QuestionListItem,
  tags: ["autodocs"],
  args: {
    question: {
      "question_text": "Question Text",
      "answer_text": "Answer Text",
      "id": "qID1",
    }
  },
  decorators: [
    (Story, { parameters }) => {
      const initialSelectedQuestions = parameters?.selectedQuestions || [];
      const [selectedQuestions, setSelectedQuestions] = useState<string[]>(initialSelectedQuestions);

      return (
        <QuestionsPageProvider value={{ setSelectedQuestions, selectedQuestions }}>
          <ul>
            <Story />
          </ul>
        </QuestionsPageProvider>
      );
    }
  ],
} satisfies Meta<typeof QuestionListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  parameters: {
    selectedQuestions: ["qID1"],
  }
}
