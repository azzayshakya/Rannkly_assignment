import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import { UserProvider } from "./context/user.context";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="bottom-right" />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
