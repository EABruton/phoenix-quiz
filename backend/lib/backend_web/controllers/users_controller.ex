defmodule BackendWeb.UsersController do
  use BackendWeb, :controller
  alias Backend.Accounts

  action_fallback BackendWeb.FallbackController

  def create(conn, %{"user" => user}) do
    with {:ok, _user} <- Accounts.create_user(user) do
      conn
      |> put_status(:created)
      |> render(:created)
    end
  end
end
