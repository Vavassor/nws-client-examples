import { configureStore } from "@reduxjs/toolkit";
import { geolocationApi } from "./geolocationApi";
import { nwsApi } from "./nwsApi";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(geolocationApi.middleware, nwsApi.middleware),
  reducer: {
    [geolocationApi.reducerPath]: geolocationApi.reducer,
    [nwsApi.reducerPath]: nwsApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
