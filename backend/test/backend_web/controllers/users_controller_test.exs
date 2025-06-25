defmodule BackendWeb.UsersControllerTest do
  use BackendWeb.ConnCase, async: true
  import Backend.AccountsFixtures

  @endpoint BackendWeb.Endpoint

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "signup" do
    test "returns success on valid user signup", %{conn: conn} do
      conn =
        post(conn, ~p"/api/signup", %{"email" => "hello@example.com", "password" => "worlD123"})

      assert json_response(conn, 201)
    end

    test "returns failure on invalid user signup", %{conn: conn} do
      conn =
        post(conn, ~p"/api/signup", %{"email" => "helloexample.com", "password" => "worlD123"})

      assert json_response(conn, 500)
    end
  end

  describe "login" do
    test "returns success on valid user login", %{conn: conn} do
      user_fixture(%{"email" => "hello@example.com", "password" => "worlD123"})

      conn =
        post(conn, ~p"/api/login", %{"email" => "hello@example.com", "password" => "worlD123"})

      assert json_response(conn, 200)
    end

    test "returns unauthorized on invalid user email", %{conn: conn} do
      user_fixture(%{"email" => "hello@example.com", "password" => "worlD123"})

      conn =
        post(conn, ~p"/api/login", %{"email" => "hello2@example.com", "password" => "worlD123"})

      assert json_response(conn, 401)["message"] == "Unauthorized"
    end

    test "returns unauthorized on invalid user password", %{conn: conn} do
      user_fixture(%{"email" => "hello@example.com", "password" => "worlD123"})

      conn =
        post(conn, ~p"/api/login", %{"email" => "hello@example.com", "password" => "worlD1234"})

      assert json_response(conn, 401)["message"] == "Unauthorized"
    end
  end
end
