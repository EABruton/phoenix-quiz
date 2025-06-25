defmodule BackendWeb.UsersController do
  use BackendWeb, :controller
  require Logger
  alias Backend.Accounts.User
  alias Backend.Accounts

  action_fallback BackendWeb.FallbackController

  def create(conn, %{"email" => _email, "password" => _password} = user) do
    with {:ok, _user} <- Accounts.create_user(user) do
      conn
      |> put_status(:created)
      |> render(:created)
    end
  end

  def login(conn, %{"email" => email, "password" => _password} = user) do
    case Accounts.login(user) do
      {:ok, %User{} = user} ->
        conn
        |> assign(:user_uuid, user.id)
        |> put_session(:user_uuid, user.id)
        |> put_status(:success)
        |> render(:login_success)

      {:error, :invalid_password} ->
        # redact part of the email for privacy / security
        Logger.warning(
          "User with email: #{String.slice(email, 0, 3)} attempted login with invalid password"
        )

        {:error, :unauthorized}

      {:error, :invalid_user} ->
        Logger.warning("User attempted to login with invalid email")
        {:error, :unauthorized}
    end
  end
end
