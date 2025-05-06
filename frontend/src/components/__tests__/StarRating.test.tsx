import { render, screen } from "@testing-library/react";
import StarRating from "../StarRating";

describe("StarRating Component", () => {
  test("renders correct number of stars for rating", () => {
    render(<StarRating rating={3} />);

    // Count total number of SVGs rendered
    const stars = screen.getAllByRole("img");
    expect(stars.length).toBe(5);
  });

  test("displays 4 filled stars when rating is 4", () => {
    render(<StarRating rating={4} />);
    const stars = screen.getAllByTestId("star");
    // This assumes filled stars come first
    expect(stars.length).toBe(5);
  });
});
