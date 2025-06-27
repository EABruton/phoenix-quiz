defmodule BackendWeb.UsersController do
  use BackendWeb, :controller
  require Logger
  alias Backend.Accounts.User
  alias Backend.Accounts

  @max_cookie_age Application.compile_env!(:backend, :session)[:max_age]

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
        |> assign(:user_id, user.id)
        # session is encrypted, so this should be a safe operation
        |> put_session(:user_id, user.id)
        # this allows the frontend to track UI state
        |> put_resp_cookie("is_logged_in", "true", http_only: false, max_age: @max_cookie_age)
        |> put_status(:ok)
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
