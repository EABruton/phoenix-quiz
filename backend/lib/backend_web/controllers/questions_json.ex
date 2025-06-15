defmodule BackendWeb.QuestionsJSON do
  alias Backend.Quizzes.Question

  def index(%{data: questions} = meta) do
    # update questions and keep there rest of the metadata
    with response <- %{data: for(question <- questions, do: data(question))} do
      Map.merge(response, Map.take(meta, [:total_count, :total_pages, :current_page]))
    end
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
