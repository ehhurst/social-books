import { render, screen, fireEvent } from "@testing-library/react";
import BookDetailPage from "../BookDetailPage";
import { MemoryRouter } from "react-router-dom";
import * as fetchHooks from "../../hooks/fetch";

// Mock Book data passed via `useLocation().state`
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: {
      work_id: "OL123W",
      title: "Test Book",
      author: "Jane Doe",
      img_M: "http://example.com/cover.jpg",
      description: "A wonderful book",
      reading_Time: 6,
    },
  }),
  useNavigate: () => jest.fn(),
}));

describe("BookDetailPage Component", () => {
  beforeEach(() => {
    jest.spyOn(fetchHooks, "getReviewsForBook").mockReturnValue({
        reviewData: {
          work_id: "OL123W", // <-- add this
          avg_rating: "4.5",
          reviews_list: [],
        },
        loading: false,
        error: null,
      });
        });

  test("renders book detail content", () => {
    render(
      <MemoryRouter>
        <BookDetailPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Back")).toBeInTheDocument();
    expect(screen.getByText("Test Book")).toBeInTheDocument();
    expect(screen.getAllByText(/Reviews/i)[0]).toBeInTheDocument();
});

  test("shows no reviews message", () => {
    render(
      <MemoryRouter>
        <BookDetailPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/No reviews have been written for this title yet/i)
    ).toBeInTheDocument();
  });
});
