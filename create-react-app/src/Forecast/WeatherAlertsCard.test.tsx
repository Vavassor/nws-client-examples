import { render, screen } from "../Common/TestUtilities";
import { WeatherAlertsCard } from "./WeatherAlertsCard";
import * as nwsClient from "@vavassor/nws-client";

jest.mock("@vavassor/nws-client", () => {
  const { jest } = require("@jest/globals");
  return {
    __esModule: true,
    ...jest.requireActual("@vavassor/nws-client"),
    getActiveAlerts: jest.fn(),
  };
});

export const mockedNwsClient = nwsClient as jest.Mocked<typeof nwsClient>;

describe("WeatherAlertsCard", () => {
  test("shows the heading", () => {
    render(<WeatherAlertsCard />);
    expect(screen.getByText("Weather Alerts")).toBeInTheDocument();
  });
});
