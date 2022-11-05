import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  getGridpointForecastGeoJson,
  getPointGeoJson,
  ProblemDetail,
  ResponseWithoutBodyError,
} from "@vavassor/nws-client";
import {
  GridpointForecast,
  mapGridpointForecast,
  mapPoint,
  Point,
} from "./nwsMapping";

type GetGridpointForecastArgs = Exclude<
  Parameters<typeof getGridpointForecastGeoJson>[0],
  "format"
>;
type GetPointArgs = Exclude<Parameters<typeof getPointGeoJson>[0], "format">;

interface TransformError {
  message: string;
}

export const nwsApi = createApi({
  baseQuery: fakeBaseQuery<
    ProblemDetail | ResponseWithoutBodyError | TransformError
  >(),
  endpoints: (builder) => ({
    getGridpointForecast: builder.query<
      GridpointForecast,
      GetGridpointForecastArgs
    >({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const forecast = await getGridpointForecastGeoJson(args);
        return { data: mapGridpointForecast(forecast) };
      },
    }),
    getPoint: builder.query<Point, GetPointArgs>({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const point = await getPointGeoJson(args);
        return { data: mapPoint(point) };
      },
    }),
  }),
  reducerPath: "nwsApi",
});

export const { useGetGridpointForecastQuery, useGetPointQuery } = nwsApi;
