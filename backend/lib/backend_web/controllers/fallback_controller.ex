defmodule BackendWeb.FallbackController do
  use BackendWeb, :controller

  def call(conn, %Ecto.Changeset{} = changeset) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(json: BackendWeb.ChangesetJson)
    |> render(:error, changeset: changeset)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(json: BackendWeb.ErrorJSON)
    |> render(:"404")
  end

  def call(conn, {:error, :bad_request}) do
    conn
    |> put_status(:bad_request)
    |> put_view(json: BackendWeb.ErrorJSON)
    |> render(:"400")
  end

  def call(conn, {:error, _}) do
    conn
    |> put_status(:internal_server_error)
    |> put_view(json: BackendWeb.ErrorJSON)
    |> render(:"500")
  end
end
