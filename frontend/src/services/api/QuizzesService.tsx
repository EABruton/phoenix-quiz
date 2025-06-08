import api from "./api";

export type Question = {
  question_text: string;
  answer_text: string;
  id: string;
};

async function deleteQuestions(
  questionIDs: string[],
): Promise<[number | null, Error | null]> {
  try {
    const response = await api.delete("/questions", {
      data: { question_ids: questionIDs },
    });
    return [response.status, null];
  } catch (error) {
    return [null, error as Error];
  }
}

async function getQuestions(
  abortSignal: AbortSignal,
): Promise<[Question[] | null, Error | null]> {
  try {
    const { data } = await api.get("/questions", { signal: abortSignal });
    return [data.data, null];
  } catch (error) {
    console.error(error);
    return [null, error as Error];
  }
}

function fetchQuestions(): [
  AbortController,
  () => Promise<[Question[] | null, Error | null]>,
] {
  const controller = new AbortController();

  const func = async () => await getQuestions(controller.signal);

  return [controller, func];
}

export default {
  fetchQuestions,
  deleteQuestions,
};
