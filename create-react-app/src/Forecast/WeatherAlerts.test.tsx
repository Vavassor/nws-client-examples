import { render, screen } from "../Common/TestUtilities";
import { WeatherAlerts } from "./WeatherAlerts";
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

describe("WeatherAlerts", () => {
  test("shows the heading", () => {
    render(<WeatherAlerts />);
    expect(screen.getByText("Weather Alerts")).toBeInTheDocument();
  });
});
