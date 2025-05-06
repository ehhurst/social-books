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

  it("shows delete/edit icons for user's own review", () => {
    render(
      <BrowserRouter>
        <ReviewCard {...mockReview} />
      </BrowserRouter>
    );
    expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
    expect(screen.getByTestId("delete-icon")).toBeInTheDocument();
  });
  
  it("hides delete/edit icons for other users' reviews", () => {
    localStorage.setItem("username", "someone_else");
  
    render(
      <BrowserRouter>
        <ReviewCard {...mockReview} />
      </BrowserRouter>
    );
  
    expect(screen.queryByTestId("edit-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("delete-icon")).not.toBeInTheDocument();
  });
});