import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Login Component", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("renders login form elements", () => {
    render(<Login />, { wrapper: MemoryRouter });
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("shows error message if fields are empty", async () => {
    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(screen.getByText(/username and password are required/i)).toBeInTheDocument()
    );
  });

  it("submits login request and stores token", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        access_token: "mocked_token",
      },
    });

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        username: "testuser",
        first_name: "Test",
        last_name: "User",
        goal: "Read more books"
      }
    });

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "testpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(sessionStorage.getItem("access_token")).toBe("mocked_token")
    );

    const storedUser = JSON.parse(sessionStorage.getItem("User") || "{}");
    expect(storedUser.username).toBe("testuser");
    expect(storedUser.first_name).toBe("Test");
  });

  it("shows error on failed login", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Invalid credentials"));

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument()
    );
  });
});
