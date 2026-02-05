// import { LoginPage } from "./pages/LoginPage";
import { RouterProvider } from "@tanstack/react-router";
import { useAuth } from "./auth/auth-context-core";
import { createAppRouter } from "./router";

function App() {
  const auth = useAuth();
  return <RouterProvider router={createAppRouter(auth)} />;
}

export default App;
