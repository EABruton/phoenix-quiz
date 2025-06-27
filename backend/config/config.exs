# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :backend,
  ecto_repos: [Backend.Repo],
  generators: [timestamp_type: :utc_datetime, binary_id: true]

# Configures the endpoint
config :backend, BackendWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Bandit.PhoenixAdapter,
  render_errors: [
    formats: [json: BackendWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: Backend.PubSub,
  live_view: [signing_salt: "wstcTPDQ"]

config :backend, :session,
  key: "_backend_key",
  signing_salt: System.get_env("SIGNING_SALT") || "compiletime-fallback",
  encryption_salt: System.get_env("ENCRYPTION_SALT") || "compiletime-fallback",
  max_age: String.to_integer(System.get_env("SESSION_MAX_AGE") || "86400"),
  store: :cookie,
  same_site: "Lax"

if Mix.env() == :prod do
  for env_variable <- ["SIGNING_SALT", "ENCRYPTION_SALT"] do
    if is_nil(System.get_env(env_variable)) do
      raise "Missing SIGNING_SALT variable in production"
    end
  end
end

# Configures the mailer
#
# By default it uses the "Local" adapter which stores the emails
# locally. You can see the emails in your browser, at "/dev/mailbox".
#
# For production it's recommended to configure a different adapter
# at the `config/runtime.exs`.
config :backend, Backend.Mailer, adapter: Swoosh.Adapters.Local

# Configures Elixir's Logger
config :logger, :default_formatter,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
