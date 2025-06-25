defmodule Backend.Quizzes.Answer do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "answers" do
    field :label, :string
    field :text, :string

    belongs_to :question, Backend.Quizzes.Question

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(answer, attrs) do
    answer
    |> cast(attrs, [:label, :text, :question_id])
    |> validate_required([:label, :text, :question_id])
  end
end
