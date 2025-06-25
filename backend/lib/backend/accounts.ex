defmodule Backend.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias Backend.Repo

  alias Backend.Accounts.User

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Gets a user by email and compares their password with the provided password.

  ## Examples
    
    iex> login(%{"email": email, "password": password})
    {:ok, %User{}}

    iex> login(%{"email": email, "password": bad_password})
    {:error, :invalid_password}
  """
  def login(%{"email" => email, "password" => password}) do
    with %{email: _user_email, password: user_password} = user <- Repo.get_by(User, email: email),
         true <- Bcrypt.verify_pass(password, user_password) do
      {:ok, user}
    else
      false -> {:error, :invalid_password}
      _ -> {:error, :invalid_user}
    end
  end

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(%{"password" => password} = attrs) do
    with hashed_password <- Bcrypt.hash_pwd_salt(password),
         updated_attrs <-
           Map.put(attrs, "password", hashed_password) do
      %User{}
      |> User.changeset(updated_attrs)
      |> Repo.insert()
    end
  end

  @doc """
  Updates a user's email.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, %{"email" => _email} = attrs) do
    user
    |> User.changeset(attrs, :update_email)
    |> Repo.update()
  end

  def update_user(%User{} = user, %{"password" => password} = attrs) do
    changeset = user |> User.changeset(attrs, :update_password)
    hashed_password = Bcrypt.Base.hash_password(password, Bcrypt.Base.gen_salt(12, false))

    updated_changeset =
      Map.update(changeset, :changes, %{}, fn _changes -> %{password: hashed_password} end)

    updated_changeset |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{data: %User{}}

  """
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end
end
