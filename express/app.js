const express = require("express");
const {
  NwsClient,
  getQuantitativeValue,
} = require("@vavassor/nws-client");
const app = express();
const port = 3000;

const nwsClient = new NwsClient();

app.get("/weather", async (req, res) => {
  const position = { latitude: 37.5247764, longitude: -77.5633017 };
  const forecast = await nwsClient.getGridpointForecastGeoJson({
    latitude: position.latitude,
    longitude: position.longitude,
  });
  const gridpoint = await nwsClient.getGridpointGeoJson({
    latitude: position.latitude,
    longitude: position.longitude,
  });

  const result = {
    temperature: null,
    precipitation: null,
  };

  const periods = forecast.properties.periods;
  if (periods.length > 0) {
    result.temperature = getQuantitativeValue(periods[0].temperature, "[degF]");
  }

  const precipitationValues =
    gridpoint.properties.probabilityOfPrecipitation.values;
  if (precipitationValues.length > 0) {
    result.precipitation = precipitationValues[0];
  }

  res.json(result).status(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
