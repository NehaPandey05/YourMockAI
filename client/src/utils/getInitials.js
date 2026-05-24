export const getInitials = (name = "") => {
  return name
    .split(" ")        // split full name into words
    .map(n => n[0])    // take first letter of each word
    .join("")          // join letters like "JK"
    .toUpperCase();    // convert to capital letters
};