/**
  * Things to test:
  * - [x] questions rendered from response
  * - [x] loading text appears while waiting for questions to load
  * - [x] error text if questions fail to load
  * - [ ] button enable / disable on selection of questions
  * - [ ] select all functionality
  * - [ ] unselect all functionality
  * - [ ] searchbar filtering functionality
  * - [ ] searchbar + select all functionality
  */

import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { Question } from "../../services/api/QuizzesService";

const responseData: Question[] = [...Array(3)].map((_, i) => ({
  question_text: `q${i} question text`,
  answer_text: `q${i} answer text`,
  id: `q${i} ID`,
}));
const questionTestIDs = responseData.map(question => question.id);

const mockAbortController = new AbortController();
const mockFetchQuestions = jest.fn();
jest.mock('../../services/api/QuizzesService', () => ({
  __esModule: true,
  default: {
    // fetchQuestions: () => [mockAbortController, async() => [responseData, null]],
    fetchQuestions: mockFetchQuestions,
  }
}))
import QuestionsPage from './QuestionsPage';

// Selectors
const sLoadingText = 'loading-text';
const sErrorText = 'error-text';
const sSelectAll = 'select-all-questions';
const sDeselectAll = 'deselect-all-questions';

beforeEach(() => {
  mockFetchQuestions.mockReset();
})

test("renders list of questions from response data", async() => {
  mockFetchQuestions.mockReturnValue([mockAbortController, async() => [responseData, null]])
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

test('renders error message when fetching questions returns an error', async() => {
  const errorMessage: string = "error!"
  mockFetchQuestions.mockReturnValue([mockAbortController, async() => [null, new Error(errorMessage)]])
  render(<QuestionsPage />);

  expect(await screen.findByTestId(sLoadingText)).toBeVisible();

  const errorElement = await screen.findByTestId(sErrorText);
  expect(errorElement).toBeVisible();
  expect(errorElement).toHaveTextContent(errorMessage);
});

describe("question filtering and selecting", () => {
  beforeEach(() => {
    mockFetchQuestions.mockReturnValue([mockAbortController, async() => [responseData, null]]);
  });

  test("select all & unselect all buttons select / deselect all questions' checkboxes", async() => {
    render(<QuestionsPage />);

    // loading
    expect(await screen.findByTestId(sLoadingText)).toBeVisible();

    // initial state
    expect(screen.queryByTestId(sDeselectAll)).not.toBeInTheDocument();
    for await(const questionID of questionTestIDs) {
      const question = await screen.findByTestId(questionID);
      const questionCheckbox = within(question).getByRole('checkbox');
      expect(question).toBeVisible();
      expect(questionCheckbox).not.toBeChecked();
    }

    // select all
    await userEvent.click(screen.getByTestId(sSelectAll));
    expect(screen.queryByTestId(sSelectAll)).not.toBeInTheDocument();
    for (const questionID of questionTestIDs) {
      const question = screen.getByTestId(questionID);
      const questionCheckbox = within(question).getByRole('checkbox');
      expect(question).toBeVisible();
      expect(questionCheckbox).toBeChecked();
    }

    // deselect all functionality
    await userEvent.click(screen.getByTestId(sDeselectAll));
    expect(screen.queryByTestId(sDeselectAll)).not.toBeInTheDocument();
    for (const questionID of questionTestIDs) {
      const question = screen.getByTestId(questionID);
      const questionCheckbox = within(question).getByRole('checkbox');
      expect(question).toBeVisible();
      expect(questionCheckbox).not.toBeChecked();
    }
  });

  // test("searchbar filtering limits questions by filter text", async() => {
  //   render(<QuestionsPage />);
  //
  //   // loading
  //   expect(await screen.findByTestId(sLoadingText)).toBeVisible();
  // })
});
