import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AlertPage } from "./Forecast/AlertPage";
import { HourlyWeatherPage } from "./Forecast/HourlyWeatherPage";
import { TodaysWeatherPage } from "./Forecast/TodaysWeatherPage";
import { MainLayout } from "./MainLayout";
import { OfficePage } from "./Office/OfficePage";
import { ProductPage } from "./Product/ProductPage";
import { ProductsPage } from "./Product/ProductsPage";
import { StationsPage } from "./Stations/StationsPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    children: [
      {
        element: <TodaysWeatherPage />,
        index: true,
      },
      {
        element: <AlertPage />,
        path: "alerts/:alertId",
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
      {
        element: <StationsPage />,
        path: "stations",
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
