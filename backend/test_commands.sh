#!/bin/bash

base_url='http://localhost:4000/api'

function separator() {
  echo "-------------------------"
}

function login_test() {
  email="abc@def.com"
  email_wrong="def@abc.com"
  password="abcdefgh"
  password_wrong="def123ABC"

  echo "Correct email and password:"
  separator
  curl \
    -i \
    -X POST \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -d '{
      "email": "'$email'",
      "password": "'$password'"
    }' "${base_url}/login"
  echo
  echo

  echo "Incorrect email:"
  separator
  curl \
    -i \
    -X POST \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -d '{
      "email": "'$email_wrong'",
      "password": "'$password'"
    }' "${base_url}/login"
  echo
  echo

  echo "Incorrect password:"
  separator
  curl \
    -i \
    -X POST \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -d '{
      "email": "'$email'",
      "password": "'$password_wrong'"
    }' "${base_url}/login"
  echo
  echo
}

login_test
