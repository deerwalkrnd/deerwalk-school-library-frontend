export const useAvatarFallback = (name: string, avatarFallBack?: string) => {
  if (avatarFallBack) return avatarFallBack;

  const nameParts = name.split(" ");
  const firstNameInitial = nameParts[0]
    ? nameParts[0].charAt(0).toUpperCase()
    : "";
  const lastNameInitial =
    nameParts.length > 1
      ? nameParts[nameParts.length - 1].charAt(0).toUpperCase()
      : "";

  return `${firstNameInitial}${lastNameInitial}`;
};
