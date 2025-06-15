defmodule BackendWeb.ErrorJSONTest do
  use BackendWeb.ConnCase, async: true

  test "renders 404" do
    assert BackendWeb.ErrorJSON.render(:"404", %{}) == %{message: "Not Found"}
  end

  test "renders 500" do
    assert BackendWeb.ErrorJSON.render(:"500", %{}) ==
             %{message: "Internal Server Error"}
  end

  test "renders 400" do
    assert BackendWeb.ErrorJSON.render(:"400", %{}) == %{message: "Bad Request"}
  end

  test "renders 401" do
    assert BackendWeb.ErrorJSON.render(:"401", %{}) == %{message: "Unauthorized"}
  end

  test "renders 403" do
    assert BackendWeb.ErrorJSON.render(:"403", %{}) == %{message: "Forbidden"}
  end

  test "renders default error" do
    assert BackendWeb.ErrorJSON.render(:no_match, %{}) == %{message: "Internal Server Error"}
  end

  test "renders custom message error" do
    reason = "hello world"
    assert BackendWeb.ErrorJSON.render(:no_match, %{reason: reason}) == %{message: reason}
  end
end
