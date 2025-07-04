defmodule BackendWeb.ErrorJSONTest do
  use BackendWeb.ConnCase, async: true

  test "renders 404" do
    assert BackendWeb.ErrorJSON.render("404.json", %{}) == %{message: "Not Found"}
  end

  test "renders 500" do
    assert BackendWeb.ErrorJSON.render("500.json", %{}) ==
             %{message: "Internal Server Error"}
  end

  test "renders 400" do
    assert BackendWeb.ErrorJSON.render("400.json", %{}) == %{message: "Bad Request"}
  end

  test "renders 401" do
    assert BackendWeb.ErrorJSON.render("401.json", %{}) == %{message: "Unauthorized"}
  end

  test "renders 403" do
    assert BackendWeb.ErrorJSON.render("403.json", %{}) == %{message: "Forbidden"}
  end

  test "renders default error" do
    assert BackendWeb.ErrorJSON.render(:no_match, %{}) == %{message: "Internal Server Error"}
  end

  test "renders custom message error" do
    reason = "hello world"
    assert BackendWeb.ErrorJSON.render(:no_match, %{reason: reason}) == %{message: reason}
  end
end
