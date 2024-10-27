import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LngDetector from 'i18next-browser-languagedetector';
const savedLang = localStorage.getItem("lang");
const defaultLang = savedLang || "en";

const resources={
    en: {
        translation: {
          homePage: {
            heading: "Organize, Track, and Achieve Your Goals",
            description: "Welcome to your all-in-one task management system. Stay on top of deadlines, streamline your workflow, and make every day productive with powerful tools designed to help you focus on what matters most.",
            startJourney: "Start your journey to peak productivity!",
            buttonText: "Let's Get Started"
          },
          dashboard:{
            topnav: {
              searchPlaceholder: "Search...",
              greeting: "Hello, Calvin",
              profile: "Profile",
              settings: "Settings",
              logout: "Logout",
            },
            projectNav: {
              workspace: "Workspace",
              category: "Category-All",
              project: "Project-All",
              fromDate: "From {{date}}",
              uploaded: "Uploaded {{time}} ago",
            },
            projectsList: {
              searchPlaceholder: "Search projects...",
              allStatuses: "All Statuses",
              completed: "Completed",
              inProgress: "In Progress",
              pending: "Pending",
              errorLoading: "Error loading projects: {{error}}",
              projectCard: {
                noDescription: "No description available",
                tasks: "Tasks",
                status: "Status",
                unknown: "Unknown",
                viewDetails: "View Details",
              },
            },
            projectOverview: {
              loading: "Loading...",
              notFound: "Project not found.",
              allTasks: "All Tasks",
              todoTasks: "Todo/In Progress",
              completedTasks: "Completed",
              newTask: "New Task",
              filterSort: "Filter & Sort",
              limitedAccess: "Limited Access",
              fullAccess: "Full Access",
              allAccess: "All Access",
              filterOptions: {
                all: "All Tasks",
                inProgress: "Todo/In Progress",
                completed: "Completed",
              },
            },
            drawer:{
              projectOverview: "Project Overview",
              seeAll: "See All",
              timeline: "Timeline",
              team: "Team",
              status: "Status",
              unknown: "Unknown",
              closeDrawer: "Close drawer",
            },
            chatRoom:{
              title: "TeamChat",
              date: "24 April 2024",
              placeholder: "Your messages...",
              send: "Send",
              time: "AM",
              you:"me"
            },
            "userFormModal": {
              "title": "Assign Users to Task",
              "searchUsers": "Search Users",
              "searchPlaceholder": "Search user...",
              "selectTask": "Select Task",
              "selectTaskPlaceholder": "Select Task",
              "closeButton": "Close",
              "assignButton": "Assign"
            },
            newTask:{
              title: "Create New Task for",
              taskTitle: "Task Title",
              description: "Description",
              fromDate: "From Date",
              toDate: "To Date",
              dueDate: "Due Date",
              priority: "Priority",
              accessLevel: "Access Level",
              assignUsers: "Assign Users",
              searchUser: "Search user...",
              low: "Low",
              medium: "Medium",
              high: "High",
              limitedAccess: "Limited Access",
              fullAccess: "Full Access",
              allAccess: "All Access",
              close: "Close",
              createTask: "Create Task",
            },
            editTask: {
              title: "Edit Task for",
              taskTitle: "Task Title",
              description: "Description",
              fromDate: "From Date",
              toDate: "To Date",
              dueDate: "Due Date",
              priority: "Priority",
              completed: "Completed",
              accessLevel: "Access Level",
              assignUsers: "Assign Users",
              searchUser: "Search user...",
              low: "Low",
              medium: "Medium",
              high: "High",
              limitedAccess: "Limited Access",
              fullAccess: "Full Access",
              allAccess: "All Access",
              cancel: "Cancel",
              save: "Save",
            },
            taskCard:{

            }
          }
        }
      },
      fr: {
        translation: {
          homePage: {
            heading: "Organisez, suivez et atteignez vos objectifs",
            description: "Bienvenue dans votre système de gestion des tâches tout-en-un. Restez au courant des délais, simplifiez votre flux de travail et rendez chaque jour productif avec des outils puissants conçus pour vous aider à vous concentrer sur ce qui compte le plus.",
            startJourney: "Commencez votre parcours vers une productivité maximale!",
            buttonText: "Commençons"
          },
          dashboard:{
            topnav: {
              searchPlaceholder: "Rechercher...",
              greeting: "Bonjour, Calvin",
              profile: "Profil",
              settings: "Paramètres",
              logout: "Déconnexion",
            },
            projectNav: {
              workspace: "Espace de travail",
              category: "Catégorie-Tout",
              project: "Projet-Tout",
              fromDate: "Depuis le {{date}}",
              uploaded: "Téléchargé il y a {{time}}",
            },
            projectsList: {
              searchPlaceholder: "Rechercher des projets...",
              allStatuses: "Tous les statuts",
              completed: "Terminé",
              inProgress: "En cours",
              pending: "En attente",
              errorLoading: "Erreur lors du chargement des projets : {{error}}",
              projectCard: {
                noDescription: "Pas de description disponible",
                tasks: "Tâches",
                status: "Statut",
                unknown: "Inconnu",
                viewDetails: "Voir les détails",
              },
              drawer:{
                projectOverview: "Project Overview",
                seeAll: "See All",
                timeline: "Timeline",
                team: "Team",
                status: "Status",
                unknown: "Unknown",
                closeDrawer: "Close drawer",
              }
            },
            projectOverview: {
              loading: "Chargement...",
              notFound: "Projet non trouvé.",
              allTasks: "Toutes les tâches",
              todoTasks: "À faire/En cours",
              completedTasks: "Terminé",
              newTask: "Nouvelle tâche",
              filterSort: "Filtrer et trier",
              limitedAccess: "Accès limité",
              fullAccess: "Accès complet",
              allAccess: "Accès total",
              filterOptions: {
                all: "Toutes les tâches",
                inProgress: "À faire/En cours",
                completed: "Terminé",
              },
            },
            drawer:{
              projectOverview: "Aperçu du Projet",
              seeAll: "Voir Tout",
              timeline: "Chronologie",
              team: "Équipe",
              status: "Statut",
              unknown: "Inconnu",
              closeDrawer: "Fermer le tiroir",
            },
            chatRoom:{
              title: "Discussion d'équipe",
              date: "24 avril 2024",
              placeholder: "Vos messages...",
              send: "Envoyer",
              time: "AM",
              you:"moi"
            },
            "userFormModal": {
              "title": "Assigner des utilisateurs à une tâche",
              "searchUsers": "Rechercher des utilisateurs",
              "searchPlaceholder": "Rechercher un utilisateur...",
              "selectTask": "Sélectionner une tâche",
              "selectTaskPlaceholder": "Sélectionner une tâche",
              "closeButton": "Fermer",
              "assignButton": "Assigner"
            },
            newTask:{
              title: "Créer une nouvelle tâche pour",
              taskTitle: "Titre de la tâche",
              description: "Description",
              fromDate: "Date de début",
              toDate: "Date de fin",
              dueDate: "Date d'échéance",
              priority: "Priorité",
              accessLevel: "Niveau d'accès",
              assignUsers: "Assigner des utilisateurs",
              searchUser: "Rechercher un utilisateur...",
              low: "Faible",
              medium: "Moyenne",
              high: "Haute",
              limitedAccess: "Accès limité",
              fullAccess: "Accès complet",
              allAccess: "Accès total",
              close: "Fermer",
              createTask: "Créer une tâche",
            },
            editTask: {
              title: "Modifier la tâche pour",
              taskTitle: "Titre de la tâche",
              description: "Description",
              fromDate: "Date de début",
              toDate: "Date de fin",
              dueDate: "Date d'échéance",
              priority: "Priorité",
              completed: "Terminée",
              accessLevel: "Niveau d'accès",
              assignUsers: "Attribuer des utilisateurs",
              searchUser: "Rechercher un utilisateur...",
              low: "Faible",
              medium: "Moyenne",
              high: "Élevée",
              limitedAccess: "Accès Limité",
              fullAccess: "Accès Complet",
              allAccess: "Accès Total",
              cancel: "Annuler",
              save: "Enregistrer",
            },
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