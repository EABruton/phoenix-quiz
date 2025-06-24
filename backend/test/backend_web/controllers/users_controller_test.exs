defmodule BackendWeb.UsersControllerTest do
  use BackendWeb.ConnCase, async: true

  @endpoint BackendWeb.Endpoint

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create" do
    test "returns success on valid user creation", %{conn: conn} do
      conn =
        post(conn, ~p"/api/signup", %{email: "hello@example.com", password: "worlD123"})

      assert json_response(conn, 201)
    end

    test "returns failure on invalid user creation", %{conn: conn} do
      conn =
        post(conn, ~p"/api/signup", %{email: "helloexample.com", password: "worlD123"})

      assert json_response(conn, 500)
    end
  end
end
