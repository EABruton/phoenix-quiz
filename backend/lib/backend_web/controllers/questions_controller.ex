defmodule BackendWeb.QuestionsController do
  use BackendWeb, :controller
  alias Backend.Quizzes

  def index(conn, _params) do
    questions = Quizzes.list_questions()
    render(conn, :index, questions: questions)
  end

  def batch_delete(conn, %{"question_ids" => question_ids}) do
    {:ok, _question_count} = Quizzes.delete_questions(question_ids)

    conn
    |> put_status(:no_content)
    |> render(:batch_delete)
  end
end
