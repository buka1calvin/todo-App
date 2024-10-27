import i18n from "i18next";

export const formatDate = (date: Date) => {
  const language = i18n.language || "en"; 

  return new Intl.DateTimeFormat(language, {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};
