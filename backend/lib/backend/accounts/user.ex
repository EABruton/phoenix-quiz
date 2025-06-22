defmodule Backend.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "users" do
    field :email, :string
    field :password, :string

    has_many :quizzes, Backend.Quizzes.Quiz, foreign_key: :user_id
    has_many :questions, Backend.Quizzes.Question, foreign_key: :user_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs, action \\ :create) do
    user
    |> cast(attrs, [:email, :password])
    |> maybe_validate_required(action)
    |> validate_format(:email, ~r/^[^\s]+@[^\s]+$/)
    |> unique_constraint(:email)
  end

  defp maybe_validate_required(changeset, :create) do
    validate_required(changeset, [:email, :password])
  end

  defp maybe_validate_required(changeset, :update_email) do
    validate_required(changeset, [:email])
  end
end
