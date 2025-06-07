defmodule Backend.QuizzesTest do
  use Backend.DataCase

  alias Backend.Quizzes

  describe "questions" do
    alias Backend.Quizzes.Question

    import Backend.QuizzesFixtures

    @invalid_attrs %{question_text: nil, answer_text: nil}

    test "list_questions/0 returns all questions" do
      question = question_fixture()
      question = Backend.Repo.preload(question, :answers)
      assert Quizzes.list_questions() == [question]
    end

    test "get_question!/1 returns the question with given id" do
      question = question_fixture()
      assert Quizzes.get_question!(question.id) == question
    end

    test "create_question/1 with valid data creates a question" do
      valid_attrs = %{question_text: "some question_text", answer_text: "some answer_text"}

      assert {:ok, %Question{} = question} = Quizzes.create_question(valid_attrs)
      assert question.question_text == "some question_text"
      assert question.answer_text == "some answer_text"
    end

    test "create_question/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Quizzes.create_question(@invalid_attrs)
    end

    test "update_question/2 with valid data updates the question" do
      question = question_fixture()
      update_attrs = %{question_text: "some updated question_text", answer_text: "some updated answer_text"}

      assert {:ok, %Question{} = question} = Quizzes.update_question(question, update_attrs)
      assert question.question_text == "some updated question_text"
      assert question.answer_text == "some updated answer_text"
    end

    test "update_question/2 with invalid data returns error changeset" do
      question = question_fixture()
      assert {:error, %Ecto.Changeset{}} = Quizzes.update_question(question, @invalid_attrs)
      assert question == Quizzes.get_question!(question.id)
    end

    test "delete_question/1 deletes the question" do
      question = question_fixture()
      assert {:ok, %Question{}} = Quizzes.delete_question(question)
      assert_raise Ecto.NoResultsError, fn -> Quizzes.get_question!(question.id) end
    end

    test "change_question/1 returns a question changeset" do
      question = question_fixture()
      assert %Ecto.Changeset{} = Quizzes.change_question(question)
    end

    test "delete_questions/1 deletes all provided questions" do
      import Ecto.Query

      all_question_ids = for _ <- 1..5, question = question_fixture(), do: question.id
      deleted_question_ids = Enum.slice(all_question_ids, 0, 3)
      non_deleted_question_ids = Enum.slice(all_question_ids, 3, 5)

      assert {:ok, 3} = Quizzes.delete_questions(deleted_question_ids)
      assert [] == from(q in Question, where: q.id in ^deleted_question_ids) |> Repo.all()
      
      non_deleted_results = from(q in Question, where: q.id in ^all_question_ids) |> Repo.all()
      assert length(non_deleted_results) == length(non_deleted_question_ids)
    end
  end

  describe "answers" do
    alias Backend.Quizzes.Answer

    import Backend.QuizzesFixtures

    @invalid_attrs %{label: nil, text: nil}

    test "list_answers/0 returns all answers" do
      answer = answer_fixture()
      assert Quizzes.list_answers() == [answer]
    end

    test "get_answer!/1 returns the answer with given id" do
      answer = answer_fixture()
      assert Quizzes.get_answer!(answer.id) == answer
    end

    test "create_answer/1 with valid data creates a answer" do
      valid_attrs = %{label: "some label", text: "some text"}

      assert {:ok, %Answer{} = answer} = Quizzes.create_answer(valid_attrs)
      assert answer.label == "some label"
      assert answer.text == "some text"
    end

    test "create_answer/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Quizzes.create_answer(@invalid_attrs)
    end

    test "update_answer/2 with valid data updates the answer" do
      answer = answer_fixture()
      update_attrs = %{label: "some updated label", text: "some updated text"}

      assert {:ok, %Answer{} = answer} = Quizzes.update_answer(answer, update_attrs)
      assert answer.label == "some updated label"
      assert answer.text == "some updated text"
    end

    test "update_answer/2 with invalid data returns error changeset" do
      answer = answer_fixture()
      assert {:error, %Ecto.Changeset{}} = Quizzes.update_answer(answer, @invalid_attrs)
      assert answer == Quizzes.get_answer!(answer.id)
    end

    test "delete_answer/1 deletes the answer" do
      answer = answer_fixture()
      assert {:ok, %Answer{}} = Quizzes.delete_answer(answer)
      assert_raise Ecto.NoResultsError, fn -> Quizzes.get_answer!(answer.id) end
    end

    test "change_answer/1 returns a answer changeset" do
      answer = answer_fixture()
      assert %Ecto.Changeset{} = Quizzes.change_answer(answer)
    end
  end

  describe "quizzes" do
    alias Backend.Quizzes.Quiz

    import Backend.QuizzesFixtures

    @invalid_attrs %{name: nil}

    test "list_quizzes/0 returns all quizzes" do
      quiz = quiz_fixture()
      assert Quizzes.list_quizzes() == [quiz]
    end

    test "get_quiz!/1 returns the quiz with given id" do
      quiz = quiz_fixture()
      assert Quizzes.get_quiz!(quiz.id) == quiz
    end

    test "create_quiz/1 with valid data creates a quiz" do
      valid_attrs = %{name: "some name"}

      assert {:ok, %Quiz{} = quiz} = Quizzes.create_quiz(valid_attrs)
      assert quiz.name == "some name"
    end

    test "create_quiz/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Quizzes.create_quiz(@invalid_attrs)
    end

    test "update_quiz/2 with valid data updates the quiz" do
      quiz = quiz_fixture()
      update_attrs = %{name: "some updated name"}

      assert {:ok, %Quiz{} = quiz} = Quizzes.update_quiz(quiz, update_attrs)
      assert quiz.name == "some updated name"
    end

    test "update_quiz/2 with invalid data returns error changeset" do
      quiz = quiz_fixture()
      assert {:error, %Ecto.Changeset{}} = Quizzes.update_quiz(quiz, @invalid_attrs)
      assert quiz == Quizzes.get_quiz!(quiz.id)
    end

    test "delete_quiz/1 deletes the quiz" do
      quiz = quiz_fixture()
      assert {:ok, %Quiz{}} = Quizzes.delete_quiz(quiz)
      assert_raise Ecto.NoResultsError, fn -> Quizzes.get_quiz!(quiz.id) end
    end

    test "change_quiz/1 returns a quiz changeset" do
      quiz = quiz_fixture()
      assert %Ecto.Changeset{} = Quizzes.change_quiz(quiz)
    end
  end
end
