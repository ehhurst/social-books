import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ReviewForm from "../ReviewForm";

const mockBook = {
  work_id: "123",
  title: "Test Book",
  img_M: "https://example.com/image.jpg"
};

describe("ReviewForm", () => {
  test("renders review form with correct book title and image", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/review", state: mockBook }]}>
        <Routes>
          <Route path="/review" element={<ReviewForm />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/My Review for Test Book/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", mockBook.img_M);
  });
});
