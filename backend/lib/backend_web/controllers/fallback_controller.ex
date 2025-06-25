defmodule BackendWeb.FallbackController do
  use BackendWeb, :controller

  def call(conn, %Ecto.Changeset{} = changeset) do
    conn
    |> put_format("json")
    |> put_status(:unprocessable_entity)
    |> put_view(json: BackendWeb.ChangesetJson)
    |> render(:error, changeset: changeset)
  end

  def call(conn, {:error, :unauthorized}) do
    conn
    |> put_format("json")
    |> put_status(:unauthorized)
    |> put_view(json: BackendWeb.ErrorJSON)
    |> render(:"401")
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_format("json")
    |> put_status(:not_found)
    |> put_view(json: BackendWeb.ErrorJSON)
    |> render(:"404")
  end

  def call(conn, {:error, :bad_request}) do
    conn
    |> put_format("json")
    |> put_status(:bad_request)
    |> put_view(json: BackendWeb.ErrorJSON)
    |> render(:"400")
  end

  def call(conn, {:error, :bad_request, reason: reason}) do
    conn
    |> put_format("json")
    |> put_status(:bad_request)
    |> assign(:reason, reason)
    |> put_view(json: BackendWeb.ErrorJSON)
    |> render(:"400")
  end

  def call(conn, {:error, _}) do
    conn
    |> put_format("json")
    |> put_status(:internal_server_error)
    |> put_view(json: BackendWeb.ErrorJSON)
    |> render(:"500")
  end
end
