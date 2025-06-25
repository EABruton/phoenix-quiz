defmodule Backend.AccountsTest do
  use Backend.DataCase

  alias Backend.Accounts

  describe "users" do
    alias Backend.Accounts.User

    import Backend.AccountsFixtures

    @invalid_attrs %{"password" => nil, "email" => nil}
    @invalid_partial_attrs %{"password" => "abc123DEF", "email" => nil}

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Accounts.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Accounts.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      email = "some@email.com"
      password = "some password"
      valid_attrs = %{"password" => password, "email" => email}

      assert {:ok, %User{} = user} = Accounts.create_user(valid_attrs)
      assert Bcrypt.verify_pass(password, user.password) == true
      assert user.email == email
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_user(@invalid_partial_attrs)
    end

    test "login/1 with valid data returns user" do
      password = "abc123DEF"
      user = user_fixture(%{"password" => password})

      assert {:ok, user} == Accounts.login(%{"email" => user.email, "password" => password})
    end

    test "login/1 with invalid email returns invalid user" do
      password = "abc123DEF"
      email_right = "abc@def.com"
      email_wrong = "def@abc.com"
      user_fixture(%{"password" => password, "email" => email_right})

      assert {:error, :invalid_user} ==
               Accounts.login(%{"email" => email_wrong, "password" => password})
    end

    test "login/1 with invalid password returns invalid user" do
      password = "abc123DEF"
      password_wrong = "abc123EFG"
      email = "abc@def.com"
      user_fixture(%{"password" => password, "email" => email})

      assert {:error, :invalid_password} ==
               Accounts.login(%{"email" => email, "password" => password_wrong})
    end

    test "update_user/2 with email only updates email" do
      # make sure the password does not change
      original_password = "original password"
      user = user_fixture(%{"password" => original_password})
      new_password = "new password"
      updated_email = "some@updated.com"
      update_attrs = %{"email" => updated_email, "password" => new_password}

      assert {:ok, %User{} = user} = Accounts.update_user(user, update_attrs)

      assert user.email == updated_email
      assert Bcrypt.verify_pass(original_password, user.password)
    end

    test "create_user/2 with password hashes new password" do
      user = user_fixture(%{"password" => "old password"})
      new_password = "abcPassword123"
      updated_attrs = %{"password" => new_password}

      assert {:ok, %User{} = user} = Accounts.update_user(user, updated_attrs)

      assert Bcrypt.verify_pass(new_password, user.password)
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_user(user, @invalid_attrs)
      assert user == Accounts.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Accounts.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Accounts.change_user(user)
    end
  end
end
