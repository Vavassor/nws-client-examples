import { render, screen } from "../Common/TestUtilities";
import { WeatherAlerts } from "./WeatherAlerts";

describe("WeatherAlerts", () => {
  test("shows the heading", () => {
    render(<WeatherAlerts />);
    expect(screen.getByText("Weather Alerts")).toBeInTheDocument();
  });
});
