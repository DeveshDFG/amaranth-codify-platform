/**
 * Checks if an email address is valid.
 * - Basic RFC 5322 compliance
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Checks if a username meets the requirements:
 * - 3 to 36 characters
 * - Only letters, numbers, underscores
 * - Starts with a letter
 */
export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{2,35}$/;
  return usernameRegex.test(username);
}

/**
 * Checks if a password meets the requirements:
 * - 8 to 64 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one digit
 * - At least one special character
 */
export function isValidPassword(password: string): boolean {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,64}$/;
  return passwordRegex.test(password);
}
