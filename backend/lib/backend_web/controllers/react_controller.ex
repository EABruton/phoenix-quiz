defmodule BackendWeb.ReactController do
  use BackendWeb, :controller

  def index(conn, _params) do
    conn
    |> put_resp_content_type("text/html")
    |> Plug.Conn.send_file(200, Path.join(:code.priv_dir(:backend), "static/index.html"))
  end
end

