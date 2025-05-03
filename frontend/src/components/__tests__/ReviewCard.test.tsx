import { render, screen } from "@testing-library/react";
import ReviewCard from "../ReviewCard";
import { BrowserRouter } from "react-router-dom";

const mockReview = {
  review_id: "1",
  work_id: "abc123",
  username: "testuser",
  rating: 4,
  reviewText: "A very enjoyable book!",
  liked: true,
};

describe("ReviewCard Component", () => {
  beforeEach(() => {
    localStorage.setItem("username", "testuser");
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("renders username and review text", () => {
    render(
      <BrowserRouter>
        <ReviewCard {...mockReview} />
      </BrowserRouter>
    );
    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByText("A very enjoyable book!")).toBeInTheDocument();
  });

//   it("shows delete/edit icons for user's own review", () => {
//     render(
//       <BrowserRouter>
//         <ReviewCard {...mockReview} />
//       </BrowserRouter>
//     );
    // screen.getByTestId('delete-icon') // Add data-testid="delete-icon" to SVG
    expect(screen.getByRole("img", { name: /pen/i })).toBeInTheDocument();
  });

  it("hides delete/edit icons for other users' reviews", () => {
    localStorage.setItem("username", "someone_else");
    render(
      <BrowserRouter>
        <ReviewCard {...mockReview} />
      </BrowserRouter>
    );
    expect(screen.queryByRole("img", { name: /trash/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /pen/i })).not.toBeInTheDocument();
  });
// });
