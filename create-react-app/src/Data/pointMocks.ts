import { Point, PointGeoJson } from "@vavassor/nws-client";

export const pointJsonLd: Point = {
  "@id": "https://api.weather.gov/points/37.5248,-77.5633",
  "@type": "wx:Point",
  cwa: "AKQ",
  forecastOffice: "https://api.weather.gov/offices/AKQ",
  gridId: "AKQ",
  gridX: 40,
  gridY: 75,
  forecast: "https://api.weather.gov/gridpoints/AKQ/40,75/forecast",
  forecastHourly:
    "https://api.weather.gov/gridpoints/AKQ/40,75/forecast/hourly",
  forecastGridData: "https://api.weather.gov/gridpoints/AKQ/40,75",
  observationStations: "https://api.weather.gov/gridpoints/AKQ/40,75/stations",
  relativeLocation: {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-77.570309, 37.516984],
    },
    properties: {
      city: "Bon Air",
      state: "VA",
      distance: {
        unitCode: "wmoUnit:m",
        value: 1066.5050528385,
      },
      bearing: {
        unitCode: "wmoUnit:degree_(angle)",
        value: 35,
      },
    },
  },
  forecastZone: "https://api.weather.gov/zones/forecast/VAZ513",
  county: "https://api.weather.gov/zones/county/VAC041",
  fireWeatherZone: "https://api.weather.gov/zones/fire/VAZ513",
  timeZone: "America/New_York",
  radarStation: "KAKQ",
};

export const pointGeoJson: PointGeoJson = {
  "@context": [
    "https://geojson.org/geojson-ld/geojson-context.jsonld",
    {
      "@version": "1.1",
      wx: "https://api.weather.gov/ontology#",
      s: "https://schema.org/",
      geo: "http://www.opengis.net/ont/geosparql#",
      unit: "http://codes.wmo.int/common/unit/",
      "@vocab": "https://api.weather.gov/ontology#",
      geometry: {
        "@id": "s:GeoCoordinates",
        "@type": "geo:wktLiteral",
      },
      city: "s:addressLocality",
      state: "s:addressRegion",
      distance: {
        "@id": "s:Distance",
        "@type": "s:QuantitativeValue",
      },
      bearing: {
        "@type": "s:QuantitativeValue",
      },
      value: {
        "@id": "s:value",
      },
      unitCode: {
        "@id": "s:unitCode",
        "@type": "@id",
      },
      forecastOffice: {
        "@type": "@id",
      },
      forecastGridData: {
        "@type": "@id",
      },
      publicZone: {
        "@type": "@id",
      },
      county: {
        "@type": "@id",
      },
    },
  ],
  id: "https://api.weather.gov/points/37.5248,-77.5633",
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [-77.5633, 37.5248],
  },
  properties: pointJsonLd,
};
