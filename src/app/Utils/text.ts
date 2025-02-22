export const GetInitials = (text: string): string => {
  const words: string[] = text.trim().split(/\s+/);
  let initials: string = "";

  if (words.length > 1) {
    initials = words[0].charAt(0) + words[1].charAt(0);
  } else if (words.length === 1) {
    initials = words[0].charAt(0) + words[0].charAt(1);
  }

  return initials.toUpperCase();
};
