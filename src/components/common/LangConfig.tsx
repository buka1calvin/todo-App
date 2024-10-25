import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LngDetector from 'i18next-browser-languagedetector';
const savedLang = localStorage.getItem("lang");
const defaultLang = savedLang || "en";

const resources={
    en: {
        translation: {
          welcome: "Welcome to the app",
          task: {
            title: "Task Manager",
            description: "Manage your tasks effectively",
            addTask: "Add a new task"
          }
        }
      },
      fr: {
        translation: {
          welcome: "Bienvenue sur l'application",
          task: {
            title: "Gestionnaire de tâches",
            description: "Gérez vos tâches efficacement",
            addTask: "Ajouter une nouvelle tâche"
          }
        }
      }
}

i18n
  .use(LngDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLang,
    fallbackLng: "en",
    keySeparator: ".",
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'cookie', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });
  
  export default i18n;