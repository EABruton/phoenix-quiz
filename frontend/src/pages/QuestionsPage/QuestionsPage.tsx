import "./QuestionsPage.css";
import { useState, useEffect } from "react";
import FloatingActionsBar from "../../components/FloatingActionsBar/FloatingActionsBar";
import QuestionsPageProvider from "./QuestionsPageContext";
import QuizzesService from "../../services/api/QuizzesService";
import Searchbar from "../../components/Searchbar/Searchbar";
import type { Question } from "../../services/api/QuizzesService";
import QuestionList from "./components/QuestionList/QuestionList";
import {
  SelectAllButton,
  DeselectAllButton,
} from "./components/SelectButtons/SelectButtons";
import ErrorsList from "../../components/ErrorsList/ErrorsList";

type ActionsBarProps = {
  selectedQuestions: string[];
  filteredQuestionIDs: string[];
  handleDeleteQuestions: () => void;
  setSelectedQuestions: React.Dispatch<React.SetStateAction<string[]>>;
  questionsCount: number;
};

function ActionsBar({
  selectedQuestions,
  filteredQuestionIDs,
  handleDeleteQuestions,
  setSelectedQuestions,
  questionsCount,
}: ActionsBarProps) {
  return (
    <aside className="questions-page__actions">
      <FloatingActionsBar key={"floating-actions-bar"}>
        <div className="floating-actions-bar__info">
          <p className="floating-actions-bar__text">
            <span>Total Questions:</span>
            <span data-testid="total-questions-count">{questionsCount}</span>
          </p>
          <p className="floating-actions-bar__text">
            <span>Selected Questions:</span>
            <span data-testid="selected-questions-count">
              {selectedQuestions.length}
            </span>
          </p>
          <p className="floating-actions-bar__text">
            <span>Visible Questions:</span>
            <span data-testid="visible-questions-count">
              {filteredQuestionIDs.length}
            </span>
          </p>
        </div>
        <button
          className="floating-actions-bar__button floating-actions-bar__button--delete"
          onClick={handleDeleteQuestions}
          disabled={selectedQuestions.length === 0}
        >
          Delete Selected
        </button>
        <SelectAllButton
          setSelectedQuestions={setSelectedQuestions}
          filteredQuestionIDs={filteredQuestionIDs}
        />
        <DeselectAllButton
          setSelectedQuestions={setSelectedQuestions}
          filteredQuestionIDs={filteredQuestionIDs}
          selectedQuestionIDs={selectedQuestions}
        />
      </FloatingActionsBar>
    </aside>
  );
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [contentError, setContentError] = useState<Error | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>("");

  const shouldShowComponents = !isLoading && !contentError;

  const filteredQuestionIDs = questions
    .filter(({ question_text: questionText }) => {
      if (searchFilter.trim().length < 1) return true;

      return questionText
        .toLowerCase()
        .trim()
        .includes(searchFilter.toLowerCase().trim());
    })
    .map((question) => question.id);

  async function handleDeleteQuestions() {
    const [_, error] = await QuizzesService.deleteQuestions(selectedQuestions);

    if (error) {
      console.error("Error deleting questions: ", error.message);
      setErrorMessages([error.message]);
    } else {
      setQuestions(
        questions.filter(
          (question) => !selectedQuestions.includes(question.id),
        ),
      );
      setSelectedQuestions([]);
    }
  }

  useEffect(() => {
    const [controller, fetchQuestions] = QuizzesService.fetchQuestions();

    fetchQuestions()
      .then(([data, err]) => {
        if (err) {
          console.error("Error fetching questions: ", err.message);
          setContentError(err as Error);
        } else {
          setContentError(null);
          setQuestions(data!);
        }

        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions: ", err.message);
        setContentError(err as Error);
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  let content;
  if (contentError)
    content = (
      <p
        className="questions-page__notice-text error-text"
        data-testid="error-text"
      >
        Error: {contentError.message}
      </p>
    );
  else if (isLoading)
    content = (
      <p className="questions-page__notice-text" data-testid="loading-text">
        Loading...
      </p>
    );
  else {
    content =
      filteredQuestionIDs.length > 0 ? (
        <QuestionList
          questions={questions}
          filteredQuestionIDs={filteredQuestionIDs}
          key={"question-list"}
        />
      ) : (
        <p
          key={"no-matching-question-notice"}
          data-testid="no-matching-question-notice"
          className="notice"
        >
          No matching questions
        </p>
      );
  }

  return (
    <QuestionsPageProvider value={{ selectedQuestions, setSelectedQuestions }}>
      <main id="questions-page">
        <header className="questions-page__header">
          <h1 className="questions-page__heading">Manage Your Questions</h1>
          {shouldShowComponents && (
            <Searchbar
              ariaLabel="Search questions"
              ariaControls="question-list"
              searchCallback={setSearchFilter}
              placeholderText="Search questions..."
              key={"searchbar"}
            />
          )}
        </header>
        <section className="questions-page__content">
          {errorMessages.length > 0 && (
            <ErrorsList
              errorMessages={errorMessages}
              setErrorMessages={setErrorMessages}
            />
          )}
          {content}
        </section>
        {shouldShowComponents && (
          <ActionsBar
            selectedQuestions={selectedQuestions}
            filteredQuestionIDs={filteredQuestionIDs}
            handleDeleteQuestions={handleDeleteQuestions}
            setSelectedQuestions={setSelectedQuestions}
            questionsCount={questions.length}
          />
        )}
      </main>
    </QuestionsPageProvider>
  );
}
