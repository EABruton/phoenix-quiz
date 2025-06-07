defmodule Backend.Repo.Migrations.CreateQuestions do
  use Ecto.Migration

  def change do
    create table(:questions, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :question_text, :string
      add :answer_text, :string

      timestamps(type: :utc_datetime)
    end
  end
end
