import { render, screen } from "@testing-library/react";
import App from "../../App.tsx";
import { MemoryRouter } from "react-router-dom";

describe("App Routing (dumb pass mode)", () => {
  test("renders Home page by default", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/search by title or author/i)).toBeInTheDocument();
  });

  test("renders Books page at /books", () => {
    render(
      <MemoryRouter initialEntries={["/books"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/fiction books/i)).toBeInTheDocument();
  });

  test("renders Competitions page at /competitions", () => {
    render(
      <MemoryRouter initialEntries={["/competitions"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/competitions/i).length).toBeGreaterThan(0);
  });

  test("renders Not Found page for invalid path", () => {
    render(
      <MemoryRouter initialEntries={["/not-a-real-route"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/we couldn't find the page/i)).toBeInTheDocument();
  });
});
