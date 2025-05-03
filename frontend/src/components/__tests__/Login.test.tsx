import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../Login";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Login Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders login form elements", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  test("shows error message if fields are empty", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText(/username and password are required/i)).toBeInTheDocument();
  });

  test("submits login request and stores token", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { access_token: "mocked_token" },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "testuser" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "testpass" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(localStorage.getItem("access_token")).toBe("mocked_token")
    );
    expect(localStorage.getItem("username")).toBe("testuser");
  });

  test("shows error on failed login", async () => {
    mockedAxios.post.mockRejectedValueOnce({});

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "failuser" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "failpass" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText(/invalid username or password/i)).toBeInTheDocument();
  });
});
