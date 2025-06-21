import type { Meta, StoryObj } from "@storybook/react-vite";

import ActionsBar from "./ActionsBar";
// import { fn } from "storybook/test";

const meta = {
  component: ActionsBar,
} satisfies Meta<typeof ActionsBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedQuestions: [],
    filteredQuestionIDs: [],
    handleDeleteQuestions: () => {},
    setSelectedQuestions: () => {},
    questionsCount: 0,
    isDesktop: true,
    actionsBarRef: null,
  },
};
