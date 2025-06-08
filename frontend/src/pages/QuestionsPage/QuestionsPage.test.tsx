/**
 * Things to test:
 * - [x] questions rendered from response
 * - [x] loading text appears while waiting for questions to load
 * - [x] error text if questions fail to load
 * - [x] select all functionality
 * - [x] unselect all functionality
 * - [x] searchbar filtering functionality
 * - [x] searchbar + select all functionality
 * - [x] searchbar + deselect all functionality
 * - [ ] total questions count is accurate
 * - [ ] filtered questions count is accurate
 * - [ ] no results text appears when no matching question results
 */

import userEvent from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { Question } from "../../services/api/QuizzesService";

const responseData: Question[] = [...Array(3)].map((_, i) => ({
  question_text: `q${i} question text`,
  answer_text: `q${i} answer text`,
  id: `q${i} ID`,
}));
const questionTestIDs = responseData.map((question) => question.id);

const mockAbortController = new AbortController();
const mockFetchQuestions = jest.fn();
jest.mock("../../services/api/QuizzesService", () => ({
  __esModule: true,
  default: {
    fetchQuestions: mockFetchQuestions,
  },
}));
import QuestionsPage from "./QuestionsPage";

// Selectors
const sLoadingText = "loading-text";
const sErrorText = "error-text";
const sSelectAll = "select-all-questions";
const sDeselectAll = "deselect-all-questions";

beforeEach(() => {
  mockFetchQuestions.mockReset();
});

test("renders list of questions from response data", async () => {
  mockFetchQuestions.mockReturnValue([
    mockAbortController,
    async () => [responseData, null],
  ]);
  render(<QuestionsPage />);

  // initial state
  expect(await screen.findByTestId("loading-text")).toBeVisible();

  // expect(await loadingText).not.toBeVisible();
  for await (const { question_text } of responseData) {
    expect(await screen.findByText(question_text)).toBeVisible();
  }
  expect(screen.queryByTestId(sLoadingText)).not.toBeInTheDocument();
  expect(screen.queryByTestId(sErrorText)).not.toBeInTheDocument();
});

test("renders error message when fetching questions returns an error", async () => {
  const errorMessage: string = "error!";
  mockFetchQuestions.mockReturnValue([
    mockAbortController,
    async () => [null, new Error(errorMessage)],
  ]);
  render(<QuestionsPage />);

  expect(await screen.findByTestId(sLoadingText)).toBeVisible();

  const errorElement = await screen.findByTestId(sErrorText);
  expect(errorElement).toBeVisible();
  expect(errorElement).toHaveTextContent(errorMessage);
});

describe("question filtering and selecting", () => {
  beforeEach(() => {
    mockFetchQuestions.mockReturnValue([
      mockAbortController,
      async () => [responseData, null],
    ]);
  });

  test("select all & unselect all buttons select / deselect all questions' checkboxes", async () => {
    render(<QuestionsPage />);

    // loading
    expect(await screen.findByTestId(sLoadingText)).toBeVisible();

    // initial state
    expect(await screen.findByTestId(sDeselectAll)).toBeDisabled();
    for await (const questionID of questionTestIDs) {
      const question = await screen.findByTestId(questionID);
      const questionCheckbox = within(question).getByRole("checkbox");
      expect(question).toBeVisible();
      expect(questionCheckbox).not.toBeChecked();
    }

    // select all
    await userEvent.click(screen.getByTestId(sSelectAll));
    for (const questionID of questionTestIDs) {
      const question = screen.getByTestId(questionID);
      const questionCheckbox = within(question).getByRole("checkbox");
      expect(question).toBeVisible();
      expect(questionCheckbox).toBeChecked();
    }

    // deselect all functionality
    await userEvent.click(screen.getByTestId(sDeselectAll));
    expect(screen.queryByTestId(sDeselectAll)).toBeDisabled();
    for (const questionID of questionTestIDs) {
      const question = screen.getByTestId(questionID);
      const questionCheckbox = within(question).getByRole("checkbox");
      expect(question).toBeVisible();
      expect(questionCheckbox).not.toBeChecked();
    }
  });

  test("searchbar filtering limits questions by filter text", async () => {
    const targetQuestion = responseData[0];
    render(<QuestionsPage />);

    // loading
    expect(await screen.findByTestId(sLoadingText)).toBeVisible();

    // ensure all questions initially visible
    for await (const questionID of questionTestIDs) {
      const question = await screen.findByTestId(questionID);
      expect(question).toBeVisible();
    }

    const searchBar = screen.getByRole("searchbox");
    expect(searchBar).toBeVisible();

    await userEvent.type(searchBar, targetQuestion.question_text);

    for (const { id, question_text } of responseData) {
      if (targetQuestion.question_text.includes(question_text)) {
        const question = screen.getByTestId(id);
        expect(question).toBeVisible();
        continue;
      }

      expect(screen.queryByTestId(id)).not.toBeInTheDocument();
    }

    // clearing the search reveals all questions again
    await userEvent.clear(searchBar);
    for (const questionID of questionTestIDs) {
      const question = screen.getByTestId(questionID);
      expect(question).toBeVisible();
    }
  });

  test("select / deselect all only affects visible items", async () => {
    const targetQuestion = responseData[0];
    const targetQuestion2 = responseData[1];
    render(<QuestionsPage />);

    // loading
    expect(await screen.findByTestId(sLoadingText)).toBeVisible();
    // loaded
    expect(await screen.findByTestId(targetQuestion.id)).toBeVisible();

    // filter by the first question's text
    const searchBar = screen.getByRole("searchbox");
    await userEvent.type(searchBar, targetQuestion.question_text);

    // select all (should only affect the first question)
    const selectAllButton = screen.getByTestId(sSelectAll);
    await userEvent.click(selectAllButton);

    // clear filter
    await userEvent.clear(searchBar);
    // verify only the specific question is selected
    for (const { id } of responseData) {
      const question = screen.getByTestId(id);
      const checkbox = within(question).getByRole("checkbox");

      if (id === targetQuestion.id) {
        expect(checkbox).toBeChecked();
        continue;
      }
      expect(checkbox).not.toBeChecked();
    }

    // select a separate question
    const question2 = screen.getByTestId(targetQuestion2.id);
    const question2Checkbox = within(question2).getByRole("checkbox");
    await userEvent.click(question2Checkbox);
    expect(question2Checkbox).toBeChecked();

    // filter by the original question's text
    await userEvent.type(searchBar, targetQuestion.question_text);

    // deselect all (should only affect the filtered / first question)
    const deselectAllButton = screen.getByTestId(sDeselectAll);
    await userEvent.click(deselectAllButton);

    // clear filter
    await userEvent.clear(searchBar);
    // verify that it only cleared the filtered question's checkbox
    for (const { id } of responseData) {
      const question = screen.getByTestId(id);
      const checkbox = within(question).getByRole("checkbox");

      if (id === targetQuestion2.id) {
        expect(checkbox).toBeChecked();
        continue;
      }
      expect(checkbox).not.toBeChecked();
    }
  });
});
