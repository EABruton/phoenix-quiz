defmodule Backend.Repo.Migrations.AddQuizTable do
  use Ecto.Migration

  def change do
    create table(:quizzes, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string

      timestamps(type: :utc_datetime)
    end

    alter table(:questions) do
      add :quiz_id, references(:quizzes, on_delete: :nothing, type: :binary_id)
    end
  end
end
