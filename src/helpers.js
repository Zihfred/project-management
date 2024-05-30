export function extractErrorMessages(errorResponse) {
  let errorMessages = [];
  try {
    const errors = errorResponse?.error?.details?.errors || [];
    errors.forEach((error) => {
      errorMessages.push(error.message || "Unknown error");
    });
  } catch (e) {
    errorMessages.push(
      `An error occurred while extracting messages: ${e.message}`,
    );
  }
  return errorMessages;
}
