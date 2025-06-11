defmodule BackendWeb.QuestionsControllerTest do
  use BackendWeb.ConnCase

  import Backend.QuizzesFixtures

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "list all questions", %{conn: conn} do
      conn = get(conn, ~p"/api/questions")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "delete" do
    test "deletes all given questions", %{conn: conn} do
      question_ids = create_questions(1)
      conn = delete(conn, ~p"/api/questions", question_ids: question_ids)

      assert response(conn, 204)

      # TODO: whenever view individual question is setup, test that the deleted question URLs return a 404
    end

    test "renders error when invalid data type is given", %{conn: conn} do
      question_ids = ["abc"]

      assert_raise Ecto.Query.CastError, fn ->
        delete(conn, ~p"/api/questions", question_ids: question_ids)
      end
    end

    test "renders errors when data is invalid", %{conn: conn} do
      question_ids = [Ecto.UUID.generate()]
      conn = delete(conn, ~p"/api/questions", question_ids: question_ids)

      assert response(conn, 400)
    end
  end

  defp create_questions(_) do
    question_ids = for _ <- 1..3, q = question_fixture(), do: q.id
    question_ids
  end
end
