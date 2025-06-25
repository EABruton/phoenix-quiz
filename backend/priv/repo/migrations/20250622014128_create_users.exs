defmodule Backend.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :email, :string, unique: true
      add :password, :string

      timestamps(type: :utc_datetime)
    end

    alter table("quizzes") do
      add :user_id, references(:users, on_delete: :delete_all, type: :binary_id)
    end

    alter table("questions") do
      add :user_id, references(:users, on_delete: :delete_all, type: :binary_id)
    end
  end
end
