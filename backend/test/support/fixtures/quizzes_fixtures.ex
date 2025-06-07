defmodule Backend.QuizzesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Backend.Quiz` context.
  """

  @doc """
  Generate a question.
  """
  def question_fixture(attrs \\ %{}) do
    {:ok, question} =
      attrs
      |> Enum.into(%{
        answer_text: "some answer_text",
        question_text: "some question_text"
      })
      |> Backend.Quizzes.create_question()

    question
  end

  @doc """
  Generate a answer.
  """
  def answer_fixture(attrs \\ %{}) do
    {:ok, answer} =
      attrs
      |> Enum.into(%{
        label: "some label",
        text: "some text"
      })
      |> Backend.Quizzes.create_answer()

    answer
  end

  @doc """
  Generate a quiz.
  """
  def quiz_fixture(attrs \\ %{}) do
    {:ok, quiz} =
      attrs
      |> Enum.into(%{
        name: "some name"
      })
      |> Backend.Quizzes.create_quiz()

    quiz
  end
end
