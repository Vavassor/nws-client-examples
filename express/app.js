const express = require("express");
const {
  NwsClient,
  isGridpointGeoJson,
  isGridpointForecastGeoJson,
  getQuantitativeValue,
} = require("@vavassor/nws-client");
const app = express();
const port = 3000;

const nwsClient = new NwsClient();

app.get("/weather", async (req, res) => {
  const position = { latitude: 37.5247764, longitude: -77.5633017 };
  const forecast = await nwsClient.getGridpointForecast({
    latitude: position.latitude,
    longitude: position.longitude,
  });
  const gridpoint = await nwsClient.getGridpoint({
    latitude: position.latitude,
    longitude: position.longitude,
  });

  const result = {
    temperature: null,
    precipitation: null,
  };

  if (isGridpointForecastGeoJson(forecast)) {
    const periods = forecast.properties.periods;
    if (periods.length > 0) {
      result.temperature = getQuantitativeValue(
        periods[0].temperature,
        "[degF]"
      );
    }
  }

  if (isGridpointGeoJson(gridpoint)) {
    const precipitationValues =
      gridpoint.properties.probabilityOfPrecipitation.values;
    if (precipitationValues.length > 0) {
      result.precipitation = precipitationValues[0];
    }
  }

  res.json(result).status(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
