import type { Meta, StoryObj } from "@storybook/react-vite";

import ActionsBar from "./ActionsBar";
import { createRef } from "react";

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
    actionsBarRef: createRef<HTMLDialogElement>(),
  },
};

export const MobileActionsBar: Story = {
  args: {
    ...Default.args,
    isDesktop: false,
  },
  play: async ({ canvasElement }) => {
    const dialog = canvasElement.querySelector("dialog") as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  },
};
