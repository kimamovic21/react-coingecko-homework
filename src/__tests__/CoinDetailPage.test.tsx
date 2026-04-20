import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CoinDetailPage } from "../pages/CoinDetailPage";
import { bitcoinDetailResponse, mockJsonResponse } from "../mocks/coingecko";

describe("CoinDetailPage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    vi.spyOn(console, "log").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows bitcoin details after fetching by id", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue(mockJsonResponse(bitcoinDetailResponse));

    render(
      <MemoryRouter initialEntries={["/bitcoin"]}>
        <Routes>
          <Route path="/:id" element={<CoinDetailPage isDark={false} />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading coin data...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    });

    expect(screen.getByText("btc")).toBeInTheDocument();
    expect(screen.getByText("$100,000.00")).toBeInTheDocument();
    expect(screen.getByText("2009-01-03")).toBeInTheDocument();
  });
});
