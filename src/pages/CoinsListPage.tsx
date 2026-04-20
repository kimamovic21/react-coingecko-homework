import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { type CoinListItem, fetchAllCoins } from "../lib/coingecko";

const PAGE_SIZE = 10;

type CoinsListPageProps = {
  isDark: boolean;
};

export function CoinsListPage({ isDark }: CoinsListPageProps) {
  const [coins, setCoins] = useState<CoinListItem[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadCoins = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchAllCoins();
        console.log("[CoinGecko] / (top 100 coins) response:", result);
        if (isMounted) {
          setCoins(result);
        }
      } catch {
        if (isMounted) {
          setError(
            "Failed to fetch coins. CoinGecko free API may be rate limited.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadCoins();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCoins = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return coins;
    }

    return coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(normalizedSearch) ||
        coin.symbol.toLowerCase().includes(normalizedSearch) ||
        coin.id.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [coins, search]);

  const pageCount = Math.max(1, Math.ceil(filteredCoins.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageCoins = filteredCoins.slice(pageStart, pageStart + PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [search]); // Removed set-state-in-effect pattern

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  return (
    <section className="space-y-6">
      <header
        className={`overflow-hidden rounded-3xl border p-6 shadow-xl backdrop-blur-sm sm:p-8 ${
          isDark
            ? "border-slate-700/80 bg-slate-900/80 shadow-black/30"
            : "border-amber-300/50 bg-white/80 shadow-amber-200/40"
        }`}
      >
        <p
          className={`text-xs font-semibold uppercase tracking-[0.18em] ${
            isDark ? "text-emerald-400" : "text-emerald-700"
          }`}
        >
          CoinGecko Free API
        </p>
        <h1
          className={`mt-2 text-3xl font-black tracking-tight sm:text-5xl ${
            isDark ? "text-slate-100" : "text-slate-900"
          }`}
        >
          Top 100 Most Popular Coins
        </h1>
        <p
          className={`mt-3 max-w-2xl text-sm sm:text-base ${isDark ? "text-slate-300" : "text-slate-600"}`}
        >
          Showing the top 100 most popular coins by market cap from CoinGecko.
          Open any coin route to fetch full details by id.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, symbol, or id"
            className={`h-12 w-full rounded-xl border px-4 text-sm outline-none ring-0 transition focus:border-emerald-500 ${
              isDark
                ? "border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-400"
                : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
            }`}
          />
          <div className="flex h-12 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white">
            {filteredCoins.length.toLocaleString()} found
          </div>
        </div>
      </header>

      {loading ? (
        <div
          className={`rounded-2xl border p-8 text-center shadow-lg ${
            isDark
              ? "border-slate-700 bg-slate-900/80 text-slate-300"
              : "border-slate-200 bg-white/80 text-slate-600"
          }`}
        >
          Loading coins...
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-lg">
          {error}
        </div>
      ) : null}

      {!loading && !error ? (
        <>
          <div
            className={`overflow-hidden rounded-2xl border shadow-xl ${
              isDark
                ? "border-slate-700 bg-slate-900/90"
                : "border-slate-200 bg-white/90"
            }`}
          >
            <div
              className={`grid grid-cols-[2fr_1fr_2fr] gap-3 border-b px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] sm:px-6 ${
                isDark
                  ? "border-slate-700 bg-slate-800 text-slate-400"
                  : "border-slate-200 bg-slate-50 text-slate-500"
              }`}
            >
              <span>Name</span>
              <span>Symbol</span>
              <span>Id Route</span>
            </div>

            <ul
              className={`max-h-[65vh] divide-y overflow-auto ${
                isDark ? "divide-slate-800" : "divide-slate-100"
              }`}
            >
              {pageCoins.map((coin) => (
                <li key={coin.id}>
                  <Link
                    to={`/${coin.id}`}
                    className={`grid grid-cols-[2fr_1fr_2fr] gap-3 px-4 py-3 text-sm transition sm:px-6 ${
                      isDark ? "hover:bg-slate-800" : "hover:bg-emerald-50"
                    }`}
                  >
                    <span
                      className={`truncate font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}
                    >
                      {coin.name}
                    </span>
                    <span
                      className={`truncate uppercase ${isDark ? "text-slate-300" : "text-slate-600"}`}
                    >
                      {coin.symbol}
                    </span>
                    <span className="truncate font-mono text-emerald-700">
                      /{coin.id}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <footer
            className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-4 py-3 shadow-lg sm:px-6 ${
              isDark
                ? "border-slate-700 bg-slate-900/85"
                : "border-slate-200 bg-white/85"
            }`}
          >
            <p
              className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}
            >
              Showing {filteredCoins.length === 0 ? 0 : pageStart + 1} to{" "}
              {Math.min(pageStart + PAGE_SIZE, filteredCoins.length)} of{" "}
              {filteredCoins.length.toLocaleString()} results
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((previous) => Math.max(1, previous - 1))}
                disabled={safePage === 1}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  isDark
                    ? "border-slate-600 bg-slate-800 text-slate-100 enabled:hover:bg-slate-700"
                    : "border-slate-300 bg-white text-slate-700 enabled:hover:bg-slate-50"
                }`}
              >
                Previous
              </button>
              <span
                className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                  isDark
                    ? "bg-slate-800 text-slate-100"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                Page {safePage} / {pageCount}
              </span>
              <button
                type="button"
                onClick={() =>
                  setPage((previous) => Math.min(pageCount, previous + 1))
                }
                disabled={safePage === pageCount}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  isDark
                    ? "border-slate-600 bg-slate-800 text-slate-100 enabled:hover:bg-slate-700"
                    : "border-slate-300 bg-white text-slate-700 enabled:hover:bg-slate-50"
                }`}
              >
                Next
              </button>
            </div>
          </footer>
        </>
      ) : null}
    </section>
  );
}
