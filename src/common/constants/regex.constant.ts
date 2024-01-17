// checks if a password has at least one uppercase letter and a number or special character
export const PASSWORD_REGEX =
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

// checks if a string has only letters, numbers, spaces, apostrophes, dots and dashes
export const NAME_REGEX = /(^[\p{L}\d'\.\s\-]*$)/u;

// checks if a string begins at 09 and followed by 9 digits
export const PH_MOBILE_REGEX = /^(09)\d{9}$/u;
