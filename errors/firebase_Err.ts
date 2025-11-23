// This function does not use useState now. It simply returns an error message based on the code.
export const handleFirebaseError = (code: string): string => {
  switch (code) {
    case "auth/invalid-email":
      return "Invalid email format.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    default:
      return "Something went wrong. Try again.";
  }
};
