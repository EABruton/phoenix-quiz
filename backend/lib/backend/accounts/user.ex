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
  def changeset(user, attrs, action \\ :create)

  def changeset(user, attrs, :create) do
    user
    |> cast(attrs, [:email, :password])
    |> validate_required([:email, :password])
    |> validate_email()
  end

  def changeset(user, attrs, :update_email) do
    user
    |> cast(attrs, [:email])
    |> validate_required([:email])
    |> validate_email()
  end

  def changeset(user, attrs, :update_password) do
    user
    |> cast(attrs, [:password])
    |> validate_required([:password])
    |> validate_length(:password, min: 7)
  end

  defp validate_email(changeset) do
    changeset
    |> validate_format(:email, ~r/^[^\s]+@[^\s]+$/)
    |> unique_constraint(:email)
  end
end
