import { createContext, useContext } from 'react';

const QuestionsPageContext = createContext<{
  selectedQuestions: string[];
  setSelectedQuestions: (updater: (prev: string[]) => string[]) => void;
}>({
  selectedQuestions: [],
  setSelectedQuestions: () => {},
});

export const QuestionsPageProvider = QuestionsPageContext.Provider;
export const useQuestionsPageContext = () => useContext(QuestionsPageContext);

export default QuestionsPageContext;
export type { QuestionsPageContext };
