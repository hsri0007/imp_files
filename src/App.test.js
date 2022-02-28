import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("email initial input shoulb be empty", () => {
  render(<App />);

  const emailinputelement = screen.getByRole("textbox");
  expect(emailinputelement.value).toBe("");

  const passwordinputelement = screen.getByLabelText("password");
  expect(passwordinputelement.value).toBe("");

  const confirmpasswordinputelement = screen.getByLabelText("confirm password");
  expect(confirmpasswordinputelement.value).toBe("");
});

test("should be able to type an email", () => {
  render(<App />);

  const emailinputelement = screen.getByRole("textbox", {
    name: /email/i,
  });
  userEvent.type(emailinputelement, "hello@gmail.com");
  expect(emailinputelement.value).toBe("hello@gmail.com");
});

test("should be able to type an password", () => {
  render(<App />);

  const passordinputelement = screen.getByLabelText("password", {
    name: /password/i,
  });
  userEvent.type(passordinputelement, "ss");
  expect(passordinputelement.value).toBe("ss");
});

test("should show email error in screen", () => {
  render(<App />);
  const errorEmailElement = screen.queryByText(/email is invalid/i);
  expect(errorEmailElement).not.toBeInTheDocument();

  const emailinputelement = screen.getByRole("textbox", {
    name: /email/i,
  });
  userEvent.type(emailinputelement, "qweqwewqe");

  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });

  userEvent.click(submitBtnElement);
  const errorEmailElementAgain = screen.queryByText(/email is invalid/i);

  expect(errorEmailElementAgain).toBeInTheDocument();
});

test("should show password error in screen", () => {
  render(<App />);
  const errorPasswordElement = screen.queryByText(
    /password must be greater than 6letters/i
  );
  expect(errorPasswordElement).not.toBeInTheDocument();

  const passwordelement = screen.getByLabelText("password", {
    name: /password/i,
  });
  userEvent.type(passwordelement, "asd");

  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });

  userEvent.click(submitBtnElement);

  const errorPasswordElementAgain = screen.queryByText(
    /password must be greater than 6letters/i
  );

  expect(errorPasswordElementAgain).toBeInTheDocument();
});

test("show error that password not matching", () => {
  render(<App />);
  const errorPasswordElement = screen.queryByText(
    /password and Cpassword not matched/i
  );

  expect(errorPasswordElement).not.toBeInTheDocument();

  const passwordelement = screen.getByLabelText("password");
  userEvent.type(passwordelement, "ASasasas");
  const confirmpasswordinputelement = screen.getByLabelText("confirm password");
  userEvent.type(confirmpasswordinputelement, "asa");
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });

  userEvent.click(submitBtnElement);
  const errorPasswordElementAgain = screen.queryByText(
    /password and Cpassword not matched/i
  );

  expect(errorPasswordElementAgain).toBeInTheDocument();
});
