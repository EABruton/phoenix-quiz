import './QuestionsPage.css';
import { useState, useEffect } from "react";
import FloatingActionsBar from "../../components/FloatingActionsBar/FloatingActionsBar";
import QuestionsPageContext from "./QuestionsPageContext";
import QuestionsService from "../../services/api/QuizzesService";
import Searchbar from "../../components/Searchbar/Searchbar";
import type { Question } from "../../services/api/QuizzesService";
import QuestionList from './components/QuestionList/QuestionList';


type SelectButtonProps = {
  selectedQuestions: string[];
  setSelectedQuestions: (questions: string[]) => void;
  questions: Question[];
};

function SelectButton({ selectedQuestions, setSelectedQuestions, questions }: SelectButtonProps) {
  if (selectedQuestions.length === questions.length) {
    return (
      <button
        className="floating-actions-bar__button floating-actions-bar__button--select"
        onClick={() => setSelectedQuestions([])}
      >
        Deselect All
      </button>
    );
  }
  return (
    <button
      className="floating-actions-bar__button floating-actions-bar__button--select"
      onClick={() => setSelectedQuestions([...questions.map(q => q.id)])}
    >
      Select All
    </button>
  );
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>("");

  const filteredQuestions = questions.filter(({ question_text: questionText }) => {
    if (searchFilter.trim().length < 1) return true;

    return questionText.toLowerCase().includes(searchFilter.toLowerCase());
  })

  async function handleDeleteQuestions() {
    const [responseCode, error] = await QuestionsService.deleteQuestions(selectedQuestions);

    if (error) {
      console.error("Error deleting questions: ", error.message);
    }
    else {
      console.log("Success!");
      console.log(responseCode);
      setQuestions(questions.filter(question => !selectedQuestions.includes(question.id)))
      setSelectedQuestions([]);
    }
  }

  useEffect(() => {
    const [controller, fetchQuestions] = QuestionsService.fetchQuestions();

    fetchQuestions()
      .then(([data, err]) => {
        if (err) {
          console.error("Error fetching questions: ", err.message);
          setError(err as Error);
        } else {
          setError(null);
          setQuestions(data!);
        }

        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions: ", err.message);
        setError(err as Error);
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  let content;
  if (error) content = <p>Error: {error.message}</p>;
  else if (isLoading) content = <p>Loading...</p>;
  else {
    content = [
      <Searchbar ariaLabel="Search questions" ariaControls="questions-list" searchCallback={setSearchFilter} key={"searchbar"} />,
      filteredQuestions.length > 0 ? <QuestionList
        questions={filteredQuestions}
        key={"question-list"}
      /> : <p className="notice">No matching questions</p>,
      <FloatingActionsBar key={"floating-actions-bar"}>
        <div className="floating-actions-bar__info">
          <p className="floating-actions-bar__text">
            <span>Total Questions:</span><span>{questions.length}</span>
          </p>
          <p className="floating-actions-bar__text">
            <span>Selected Questions:</span><span>{selectedQuestions.length}</span>
          </p>
          <p className="floating-actions-bar__text">
            <span>Visible Questions:</span><span>{filteredQuestions.length}</span>
          </p>
        </div>
        <button
          className="floating-actions-bar__button floating-actions-bar__button--delete"
          onClick={handleDeleteQuestions}
          disabled={selectedQuestions.length === 0}
        >
          Delete Selected
        </button>
        <SelectButton
          selectedQuestions={selectedQuestions}
          setSelectedQuestions={setSelectedQuestions}
          questions={filteredQuestions}
        />
      </FloatingActionsBar>
    ]
  }

  return (
    <QuestionsPageContext.Provider value={{ selectedQuestions, setSelectedQuestions }}>
      <main id="questions-page">{content}</main>
    </QuestionsPageContext.Provider>
  )
}
