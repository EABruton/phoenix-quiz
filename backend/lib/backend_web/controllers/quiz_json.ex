defmodule BackendWeb.QuizJSON do
  alias Backend.Quizzes.Question

  def index(%{questions: questions}) do
    %{data: for(question <- questions, do: data(question))}
  end

  defp data(%Question{} = question) do
    %{
      question_text: question.question_text,
      answer_text: question.answer_text,
      id: question.id
    }
  end

  def batch_delete(_) do
    :ok
  end
end
