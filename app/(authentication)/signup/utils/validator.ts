/* eslint-disable import/prefer-default-export */
import validator from "validator";

export const validate = (
  email: string,
  password: string,
  confirmPassword: string,
  username: string,
) => {
  if (!email || !password || !confirmPassword || !username) {
    const errorTitle = "Incomplete Fields.";
    const errorDescription = "Please fill all the fields.";

    return { errorTitle, errorDescription, isValid: false };
  }

  // USERNAME VALIDATION
  if (username.length < 6) {
    const errorTitle = "Invalid Username.";
    const errorDescription = "Username should be atleast 6 characters long.";

    return { errorTitle, errorDescription, isValid: false };
  }

  if (username.length > 30) {
    const errorTitle = "Invalid Username.";
    const errorDescription =
      "Username too long. It should not exceed 30 characters";

    return { errorTitle, errorDescription, isValid: false };
  }

  // EMAIL VALIDATION
  const validEmail = validator.isEmail(email);
  if (!validEmail) {
    const errorTitle = "Invalid Email.";
    const errorDescription = "Not a valid email.";

    return { errorTitle, errorDescription, isValid: false };
  }

  // PASSWORD VALIDATION
  if (password.length < 8) {
    const errorTitle = "Password too short.";
    const errorDescription = "Password should be atleast 8 characters long";

    return { errorTitle, errorDescription, isValid: false };
  }

  if (password.length > 30) {
    const errorTitle = "Password too long.";
    const errorDescription =
      "Password too long. It should not exceeed 30 characters.";

    return { errorTitle, errorDescription, isValid: false };
  }

  const hasCapitalLetter = /[A-Z]/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password);
  const hasNumber = /\d/.test(password);

  if (!hasCapitalLetter) {
    const errorTitle = "Invalid Password.";
    const errorDescription = "Password should have atleast one capital letter.";

    return { errorTitle, errorDescription, isValid: false };
  }

  if (!hasSpecialCharacter) {
    const errorTitle = "Invalid Password.";
    const errorDescription =
      "Password should have atleast one special character.";

    return { errorTitle, errorDescription, isValid: false };
  }

  if (!hasNumber) {
    const errorTitle = "Invalid Password.";
    const errorDescription = "Password should have atleast one number.";

    return { errorTitle, errorDescription, isValid: false };
  }

  if (password !== confirmPassword) {
    const errorTitle = "Password Not Matched.";
    const errorDescription =
      "Make sure that your passwords match for confirmation.";

    return { errorTitle, errorDescription, isValid: false };
  }

  return { isValid: true };
};
