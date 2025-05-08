import { render, screen } from "@testing-library/react";
import StarRating from "../StarRating";

describe("StarRating Component", () => {
  test("renders correct number of stars for rating", () => {
    render(<StarRating rating={3} />);
    const stars = screen.getAllByTestId("star");
    expect(stars.length).toBe(5);
  });

  test("displays 4 filled stars when rating is 4", () => {
    render(<StarRating rating={4} />);
    const filledStars = screen.getAllByTestId("filled-star");
    const emptyStars = screen.getAllByTestId("empty-star");
    expect(filledStars.length).toBe(4);
    expect(emptyStars.length).toBe(1);
  });
});
