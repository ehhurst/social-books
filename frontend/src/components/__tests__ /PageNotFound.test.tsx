import { render, screen } from "@testing-library/react";
import PageNotFound from "../PageNotFound";

describe("PageNotFound Component", () => {
  test("renders 404 message", () => {
    render(<PageNotFound />);
    expect(
      screen.getByText(/couldn't find the page you were looking for/i)
    ).toBeInTheDocument();
  });
});
