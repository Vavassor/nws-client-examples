import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HourlyWeatherPage } from "./Forecast/HourlyWeatherPage";
import { MainLayout } from "./MainLayout";
import { OfficePage } from "./Office/OfficePage";
import { ProductPage } from "./Product/ProductPage";
import { ProductsPage } from "./Product/ProductsPage";
import { TodaysWeatherPage } from "./Forecast/TodaysWeatherPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    children: [
      {
        element: <TodaysWeatherPage />,
        index: true,
      },
      {
        element: <HourlyWeatherPage />,
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
        element: <ProductPage />,
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
        <Suspense fallback="loading">
          <RouterProvider router={router} />
        </Suspense>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
