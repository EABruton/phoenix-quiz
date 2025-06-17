import { validateEmail, validatePassword } from "./validators";

const validEmails = [
  "a@b.com",
  "emailWith5@example.com",
  "emailWith%@example.com",
  "email_with_@example.com",
  "emailWith.@example.com",
  "emailWith+@example.com",
  "emailWith-@example.com",
];

const invalidEmails = [
  "specia!@abc.com",
  "special\\@abc.com",
  "special/@abc.com",
  "special#@abc.com",
  "special@@abc.com",
  "thisemail@doesnotendright",
  "emailatgmail.com",
  "thisemail@endrigh.t",
];

const invalidPasswordFormats = `(){}[]|\`¬¦! "£$%^&*"<>:;#~_-+=,@.`
  .split("")
  .map((char) => "password" + char);
const validPasswordFormats = ["he3LL0W05Ld", "password"];

test("rejects invalid email format", () => {
  for (const email of invalidEmails) {
    const [isValid, errors] = validateEmail(email);
    expect(isValid).toBe(false);
    expect(errors).toContain("Invalid email format");
  }
});

test("accepts valid email format", () => {
  for (const email of validEmails) {
    const [isValid, errors] = validateEmail(email);
    expect(isValid).toBe(true);
    expect(errors.length).toEqual(0);
  }
});

test("rejects short password", () => {
  const password = "a";
  const [isValid, errors] = validatePassword(password);

  expect(isValid).toBe(false);
  expect(errors).toContain("Password too short");
});

test("rejects invalid password format", () => {
  for (const password of invalidPasswordFormats) {
    const [isValid, errors] = validatePassword(password);

    expect(isValid).toBe(false);
    expect(errors).toContain("Incorrect password format");
  }
});

test("accepts valid password format", () => {
  for (const password of validPasswordFormats) {
    const [isValid, errors] = validatePassword(password);

    expect(isValid).toBe(true);
    expect(errors.length).toEqual(0);
  }
});
