defmodule Backend.Quizzes.Quiz do
  use Ecto.Schema
  alias Backend.Quizzes.Question
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "quizzes" do
    field :name, :string

    belongs_to :users, Backend.Accounts.User
    has_many :questions, Question

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(quiz, attrs) do
    quiz
    |> cast(attrs, [:name, :user_id])
    |> validate_required([:name, :user_id])
  end
end
