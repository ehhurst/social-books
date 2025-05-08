import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../NavBar";

describe("NavBar", () => {
  beforeEach(() => {
    render(<NavBar />, { wrapper: MemoryRouter });
  });

  it("renders all navigation links with correct text", () => {
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Browse Books/i)).toBeInTheDocument();
    expect(screen.getByText(/Competitions/i)).toBeInTheDocument();
  });

  it("has correct link destinations", () => {
    expect(screen.getByText(/Home/i).closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText(/Browse Books/i).closest("a")).toHaveAttribute("href", "/categories/fiction");
    expect(screen.getByText(/Competitions/i).closest("a")).toHaveAttribute("href", "/competitions");
  });
});
