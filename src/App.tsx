import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./Routes";
import i18n from "./components/common/LangConfig";
import { LangProvider } from "./contexts/LangProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { UsersProvider } from "./contexts/UsersContext";
import { TasksProvider } from "./contexts/TasksProvider";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/NavBar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersProvider>
        <TasksProvider>

          <Router>
            <main dir={i18n.t("dir")} className="overflow-x-hidden">
              <LangProvider>
                <Routes>
                  {routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={<route.element />}
                    >
                      {route.children &&
                        route.children.map((childRoute, childIndex) => (
                          <Route
                            key={childIndex}
                            path={childRoute.path}
                            element={<childRoute.element />}
                          >
                            {childRoute.children &&
                              childRoute.children.map(
                                (grandChildRoute, grandChildIndex) => (
                                  <Route
                                    key={grandChildIndex}
                                    path={grandChildRoute.path}
                                    element={<grandChildRoute.element />}
                                  />
                                )
                              )}
                          </Route>
                        ))}
                    </Route>
                  ))}
                </Routes>
                <Toaster/>
              </LangProvider>
            </main>
          </Router>
        </TasksProvider>
      </UsersProvider>
    </QueryClientProvider>
  );
};

export default App;
