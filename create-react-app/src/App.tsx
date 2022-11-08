import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HourlyWeather } from "./HourlyWeather";
import { MainLayout } from "./MainLayout";
import { OfficePage } from "./OfficePage";
import { Product } from "./Product";
import { ProductsPage } from "./ProductsPage";
import { TodaysWeather } from "./TodaysWeather";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    children: [
      {
        element: <TodaysWeather />,
        index: true,
      },
      {
        element: <HourlyWeather />,
        path: "hourly",
      },
      {
        element: <OfficePage />,
        path: "offices/:officeId",
      },
      {
        element: <ProductsPage />,
        path: "products",
      },
      {
        element: <Product />,
        path: "products/:productId",
      },
    ],
    element: <MainLayout />,
    path: "/",
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
