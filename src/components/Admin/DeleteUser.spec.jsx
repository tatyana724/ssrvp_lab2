// MyComponent.test.jsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import DeleteUser from "./DeleteUser";
import axios from "axios";

vi.mock("axios");

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

// Mock the axios module

describe("DeleteUser", () => {
  beforeEach(() => {
    axios.get.mockReset();
    axios.post.mockReset();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("fetches and displays the user data", async () => {
    const mockUsers = [{ id: 1, login: "admin" }, { id: 2, login: "testUser" }];
    axios.get.mockResolvedValueOnce(mockUsers);

    render(<DeleteUser />);

    await waitFor(() => {
      expect(screen.getByText("admin")).toBeInTheDocument();
      expect(screen.getByText("testUser")).toBeInTheDocument();
    });
  });
});
