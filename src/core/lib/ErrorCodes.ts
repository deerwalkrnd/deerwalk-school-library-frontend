export type ErrorCode =
  | "token_expired"
  | "invalid_token"
  | "insufficient_permission"
  | "invalid_fields"
  | "unknown_error"
  | "duplicate_entry"
  | "not_found"
  | "incomplete_profile";

export const ErrorMessages: Record<ErrorCode, string> = {
  token_expired: "Your session has expired. Please log in again.",
  invalid_token: "Invalid session token. Please try logging in again.",
  insufficient_permission:
    "You do not have the required permissions to perform this action.",
  invalid_fields: "Some of the fields are invalid. Please check and try again.",
  unknown_error: "An unexpected error occurred. Please try again later.",
  duplicate_entry: "This entry already exists. Please use a different value.",
  not_found: "The requested resource was not found.",
  incomplete_profile:
    "Your profile is incomplete. Please update your information to continue.",
};
