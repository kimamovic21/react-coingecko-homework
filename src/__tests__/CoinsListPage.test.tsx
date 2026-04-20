import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CoinsListPage } from "../pages/CoinsListPage";
import { bitcoinListResponse, mockJsonResponse } from "../mocks/coingecko";

describe("CoinsListPage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    vi.spyOn(console, "log").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows bitcoin in the list after fetching coins", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue(mockJsonResponse(bitcoinListResponse));

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<CoinsListPage isDark={false} />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading coins...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    });

    expect(screen.getByText("btc")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /bitcoin/i })).toHaveAttribute(
      "href",
      "/bitcoin",
    );
  });
});
