export const validateEmail = (email) => {
  // Basic email pattern
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const minLength = 8;
  const hasNumber = /\d/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  if (!password || password.trim().length < minLength) {
    return { valid: false, message: "Password must be at least 8 characters long." };
  }
  if (!hasNumber.test(password)) {
    return { valid: false, message: "Password must contain at least one number." };
  }
  if (!hasSpecialChar.test(password)) {
    return { valid: false, message: "Password must contain at least one special character." };
  }

  return { valid: true };
};