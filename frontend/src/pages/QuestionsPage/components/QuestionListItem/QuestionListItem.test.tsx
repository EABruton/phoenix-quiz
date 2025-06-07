import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import QuestionListItem from "./QuestionListItem";
import { QuestionsPageProvider } from "../../QuestionsPageContext";

test("updates item checkbox when clicked", async () => {
  const setSelectedQuestions = jest.fn();
  userEvent.setup();

  render(
    <QuestionsPageProvider
      value={{ selectedQuestions: [], setSelectedQuestions }}
    >
      <QuestionListItem
        question={{ id: "id", question_text: "hello", answer_text: "world" }}
      />
    </QuestionsPageProvider>,
  );

  expect(screen.getByRole("checkbox")).not.toBeChecked();
  await userEvent.click(screen.getByLabelText("Select question"));
  expect(setSelectedQuestions).toHaveBeenCalledWith(expect.any(Function));
});

test("is checked if matching question ID is in selectedQuestions", async () => {
  const setSelectedQuestions = jest.fn();
  const questionID = "abc";
  userEvent.setup();

  render(
    <QuestionsPageProvider
      value={{ selectedQuestions: [questionID], setSelectedQuestions }}
    >
      <QuestionListItem
        question={{
          id: questionID,
          question_text: "hello",
          answer_text: "world",
        }}
      />
    </QuestionsPageProvider>,
  );

  expect(screen.getByRole("checkbox")).toBeChecked();
});

test("is not checked if question ID does not match selectedQuestions IDs", async () => {
  const setSelectedQuestions = jest.fn();
  const questionID = "abc";
  userEvent.setup();

  render(
    <QuestionsPageProvider
      value={{ selectedQuestions: ["def"], setSelectedQuestions }}
    >
      <QuestionListItem
        question={{
          id: questionID,
          question_text: "hello",
          answer_text: "world",
        }}
      />
    </QuestionsPageProvider>,
  );

  expect(screen.getByRole("checkbox")).not.toBeChecked();
});
