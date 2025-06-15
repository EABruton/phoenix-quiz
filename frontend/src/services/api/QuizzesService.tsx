import api from "./api";

export type Question = {
  question_text: string;
  answer_text: string;
  id: string;
};

export type QuestionListResponse = {
  data: Question[];
  total_count: number;
  total_pages: number;
  current_page: number;
}

async function deleteQuestions(
  questionIDs: string[],
): Promise<[number | null, Error | null]> {
  try {
    const response = await api.delete("/questions", {
      data: { question_ids: questionIDs },
    });
    return [response.status, null];
  } catch (error) {
    console.error("Unable to delete questions");
    return [null, error as Error];
  }
}

async function getQuestions(
  abortSignal: AbortSignal,
  pageNumber: number,
): Promise<[QuestionListResponse | null, Error | null]> {
  try {
    const { data: responseData } = await api.get("/questions?page=" + pageNumber, {
      signal: abortSignal,
    });

    return [responseData, null];
  } catch (error) {
    console.error("Unable to fetch questions");
    return [null, error as Error];
  }
}

function fetchQuestions(
  pageNumber: number = 1,
): [AbortController, () => Promise<[QuestionListResponse | null, Error | null]>] {
  const controller = new AbortController();

  const func = async () => await getQuestions(controller.signal, pageNumber);

  return [controller, func];
}

export default {
  fetchQuestions,
  deleteQuestions,
};
