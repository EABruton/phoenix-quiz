defmodule BackendWeb.ErrorJSON do
  @moduledoc """
  This module is invoked by your endpoint in case of errors on JSON requests.

  See config/config.exs.
  """

  # If you want to customize a particular status code,
  # you may add your own clauses, such as:
  #
  # def render("500.json", _assigns) do
  #   %{errors: %{detail: "Internal Server Error"}}
  # end

  def render("400.json", %{reason: reason}), do: %{message: reason}
  def render("400.json", _assigns), do: %{message: "Bad Request"}
  def render("401.json", _assigns), do: %{message: "Unauthorized"}
  def render("403.json", _assigns), do: %{message: "Forbidden"}
  def render("404.json", _assigns), do: %{message: "Not Found"}
  def render("500.json", _assigns), do: %{message: "Internal Server Error"}
  def render(_, %{reason: reason}), do: %{message: reason}
  def render(_, _assigns), do: %{message: "Internal Server Error"}

  # By default, Phoenix returns the status message from
  # the template name. For example, "404.json" becomes
  # "Not Found".
  # def render(template, _assigns) do
  #   %{errors: %{detail: Phoenix.Controller.status_message_from_template(template)}}
  # end
end
