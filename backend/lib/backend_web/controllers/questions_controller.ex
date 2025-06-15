defmodule BackendWeb.QuestionsController do
  use BackendWeb, :controller
  alias Backend.Quizzes

  action_fallback BackendWeb.FallbackController

  def index(conn, %{"page" => page}) do
    case Integer.parse(page) do
      {page_num, _} ->
        question_data = Quizzes.list_questions(page_num)
        render(conn, :index, question_data)

      :error ->
        {:error, :bad_request, reason: "Invalid page number"}
    end
  end

  def batch_delete(conn, %{"question_ids" => question_ids}) do
    with {:ok, question_count} when is_integer(question_count) <-
           Quizzes.delete_questions(question_ids) do
      conn
      |> put_status(:no_content)
      |> render(:batch_delete)
    end
  end
end
