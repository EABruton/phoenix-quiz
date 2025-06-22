defmodule Backend.QuizzesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Backend.Quiz` context.
  """
  alias Backend.Quizzes.Question
  alias Backend.Accounts.User
  import Backend.AccountsFixtures

  @doc """
  Generate a question.
  """
  def question_fixture(attrs \\ %{}) do
    %User{id: user_id} = user_fixture()

    {:ok, question} =
      attrs
      |> Enum.into(%{
        answer_text: "some answer_text",
        question_text: "some question_text",
        user_id: user_id
      })
      |> Backend.Quizzes.create_question()

    question
  end

  @doc """
  Generate a answer.
  """
  def answer_fixture(attrs \\ %{}) do
    %Question{id: question_id} = question_fixture()

    {:ok, answer} =
      attrs
      |> Enum.into(%{
        label: "some label",
        text: "some text",
        question_id: question_id
      })
      |> Backend.Quizzes.create_answer()

    answer
  end

  @doc """
  Generate a quiz.
  """
  def quiz_fixture(attrs \\ %{}) do
    %User{id: user_id} = user_fixture()

    {:ok, quiz} =
      attrs
      |> Enum.into(%{
        name: "some name",
        user_id: user_id
      })
      |> Backend.Quizzes.create_quiz()

    quiz
  end
end
