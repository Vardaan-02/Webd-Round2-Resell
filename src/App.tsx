import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./pages/Home";
import SignUp from "./pages/Signup";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/404Page";
import { RootState } from "./state/store";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductPage from "./pages/ProductPage";
import Message from "./pages/Message";
import MessageEmpty from "./pages/MessageEmpty";
import DashBoard from "./pages/DashBoard";
import Cart from "./pages/Cart";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "SignUp",
      element: <SignUp />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "product/:tag",
      element: <ProductPage />,
    },
    {
      path: "message",
      element: <MessageEmpty />,
    },
    {
      path: "message/:tag",
      element: <Message />,
    },
    {
      path: "product",
      element: <DashBoard />,
    },
    {
      path:"cart",
      element: <Cart />
    }
  ]);

  const theme = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
