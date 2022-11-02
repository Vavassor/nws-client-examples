import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  getGridpointForecast,
  getPoint,
  isGridpointForecastGeoJson,
  isPointGeoJson,
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
  Parameters<typeof getGridpointForecast>[0],
  "format"
>;
type GetPointArgs = Exclude<Parameters<typeof getPoint>[0], "format">;

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
        const forecast = await getGridpointForecast(args);
        if (isGridpointForecastGeoJson(forecast)) {
          return { data: mapGridpointForecast(forecast) };
        }
        return {
          error: {
            message: "The response body was not a GridpointForecastGeoJson.",
          },
        };
      },
    }),
    getPoint: builder.query<Point, GetPointArgs>({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const point = await getPoint(args);
        if (isPointGeoJson(point)) {
          return { data: mapPoint(point) };
        }
        return {
          error: {
            message: "The response body was not a PointGeoJson.",
          },
        };
      },
    }),
  }),
  reducerPath: "nwsApi",
});

export const { useGetGridpointForecastQuery, useGetPointQuery } = nwsApi;
