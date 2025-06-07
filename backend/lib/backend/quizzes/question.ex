defmodule Backend.Quizzes.Question do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "questions" do
    field :question_text, :string
    field :answer_text, :string

    has_many :answers, Backend.Quizzes.Answer
    belongs_to :quiz, Backend.Quizzes.Quiz, type: :binary_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(question, attrs) do
    question
    |> cast(attrs, [:question_text, :answer_text, :quiz_id])
    |> validate_required([:question_text, :answer_text])
  end
end
