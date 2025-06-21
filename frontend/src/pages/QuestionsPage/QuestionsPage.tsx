import "./QuestionsPage.css";
import { useState, useEffect, useRef } from "react";
import QuestionsPageProvider from "./QuestionsPageContext";
import QuizzesService from "../../services/api/QuizzesService";
import Searchbar from "../../components/Searchbar/Searchbar";
import type { Question } from "../../services/api/QuizzesService";
import QuestionList from "./components/QuestionList/QuestionList";
import ErrorsList from "../../components/ErrorsList/ErrorsList";
import PaginationController from "../../components/PagionationController/PagionationController";
import useMediaQuery from "../../hooks/useMediaQuery";
import ActionsBar from "./components/ActionsBar/ActionsBar";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [contentError, setContentError] = useState<Error | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const isDesktop = useMediaQuery("(min-width: 650px)");
  const actionsBarRef = useRef<HTMLDialogElement | null>(null);
  // for paginated results: what page of questions to fetch
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPageNumbers, setTotalPageNumbers] = useState<number>(1);
  const [totalQuestionCount, setTotalQuestionCount] = useState<number>(0);

  // determines whether to show the searchbar + actions floating menu
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

  // TODO: find a good way to implement caching when switching pages
  // it'd be possible to keep ALL results in questions, and only display a certain range
  // or it might be better to hold cached results in a separate location
  useEffect(() => {
    const [controller, fetchQuestions] =
      QuizzesService.fetchQuestions(currentPage);

    fetchQuestions()
      .then(([response, err]) => {
        if (err) {
          console.error("Error fetching questions: ", err.message);
          setContentError(err as Error);
        } else {
          setContentError(null);

          const {
            total_pages: totalPageCount,
            total_count: totalCount,
            data,
          } = response!;

          setTotalQuestionCount(totalCount);
          setTotalPageNumbers(totalPageCount);
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
  }, [currentPage]);

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

  const openActionsButton = isDesktop ? null : (
    <button
      aria-controls={actionsBarRef.current?.id}
      className="questions-page__open-actions button--standard button--secondary--inverse"
      onClick={() => actionsBarRef.current?.showModal()}
    >
      Open actions
    </button>
  );

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
              id="questions-list-errors"
            />
          )}
          {openActionsButton}
          {content}
          {shouldShowComponents && (
            <PaginationController
              currentPageNumber={currentPage}
              totalPageNumbers={totalPageNumbers}
              setPageNumber={setCurrentPage}
            />
          )}
        </section>
        {shouldShowComponents && (
          <ActionsBar
            selectedQuestions={selectedQuestions}
            filteredQuestionIDs={filteredQuestionIDs}
            handleDeleteQuestions={handleDeleteQuestions}
            setSelectedQuestions={setSelectedQuestions}
            questionsCount={totalQuestionCount}
            isDesktop={isDesktop}
            actionsBarRef={actionsBarRef}
          />
        )}
      </main>
    </QuestionsPageProvider>
  );
}
