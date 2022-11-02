import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const geolocationApi = createApi({
  baseQuery: fakeBaseQuery<GeolocationPositionError>(),
  endpoints: (builder) => ({
    getCurrentPosition: builder.query<
      GeolocationPosition,
      PositionOptions | void
    >({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        // The Geolocation API unfortunately requires an API key attached to a
        // billing account. So instead return a fixed position.
        const position: GeolocationPosition = {
          coords: {
            accuracy: 1,
            altitude: null,
            altitudeAccuracy: null,
            heading: NaN,
            latitude: 37.5247764,
            longitude: -77.5633017,
            speed: 0,
          },
          timestamp: Date.now(),
        };
        return {
          data: position,
        };
      },
    }),
  }),
  reducerPath: "geolocationApi",
});

export const { useGetCurrentPositionQuery } = geolocationApi;
