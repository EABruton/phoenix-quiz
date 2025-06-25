defmodule BackendWeb.Router do
  use BackendWeb, :router
  use Plug.ErrorHandler

  pipeline :browser do
    plug :accepts, ["html", "json"]
    plug :fetch_session
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :fetch_current_user
  end

  scope "/api", BackendWeb do
    pipe_through :api

    resources "/questions", QuestionsController, only: [:index]
    delete "/questions", QuestionsController, :batch_delete

    post "/signup", UsersController, :create
    post "/login", UsersController, :login
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:backend, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: BackendWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end

  scope "/", BackendWeb do
    pipe_through :browser

    get "/*path", ReactController, :index
  end

  @impl Plug.ErrorHandler
  def handle_errors(conn, %{reason: %Ecto.Query.CastError{}}) do
    format = Phoenix.Controller.get_format(conn) || "json"

    conn
    |> put_status(:bad_request)
    |> put_view(BackendWeb.ErrorJSON)
    |> put_format(format)
    |> render(:"400")
  end

  @impl Plug.ErrorHandler
  def handle_errors(conn, %{reason: reason}) do
    format = Phoenix.Controller.get_format(conn) || "json"

    conn
    |> put_status(:internal_server_error)
    |> put_view(BackendWeb.ErrorJSON)
    |> put_format(format)
    |> render(:"500", reason: inspect(reason))
  end

  defp fetch_current_user(conn, _) do
    case get_session(conn, :user_uuid, :no_uuid) do
      :no_uuid ->
        new_user_uuid = Ecto.UUID.generate()

        conn
        |> assign(:user_uuid, new_user_uuid)
        |> put_session(:user_uuid, new_user_uuid)

      user_uuid ->
        assign(conn, :user_uuid, user_uuid)
    end
  end
end
