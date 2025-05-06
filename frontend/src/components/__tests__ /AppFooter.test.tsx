import { render, screen } from "@testing-library/react";
import AppFooter from "../AppFooter";
import { BrowserRouter } from "react-router-dom";

describe("AppFooter", () => {
  test("renders without crashing and displays NavBar links", () => {
    render(
      <BrowserRouter>
        <AppFooter />
      </BrowserRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText(/browse books/i)).toBeInTheDocument(); // updated line
    expect(screen.getByText("Competitions")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
      });
});
