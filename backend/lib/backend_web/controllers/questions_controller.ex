defmodule BackendWeb.QuestionsController do
  use BackendWeb, :controller
  require Logger
  alias Backend.Quizzes

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    questions = Quizzes.list_questions()
    render(conn, :index, questions: questions)
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
