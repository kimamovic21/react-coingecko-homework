import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { type CoinDetail, fetchCoinById } from "../lib/coingecko";

type CoinDetailPageProps = {
  isDark: boolean;
};

function formatUsd(value: number | undefined): string {
  if (typeof value !== "number") {
    return "N/A";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 1 ? 2 : 8,
  }).format(value);
}

function cleanHtmlText(input: string | undefined): string {
  if (!input) {
    return "No description available for this coin.";
  }

  return (
    input.replace(/<[^>]+>/g, "").trim() ||
    "No description available for this coin."
  );
}

export function CoinDetailPage({ isDark }: CoinDetailPageProps) {
  const { id } = useParams();
  const [coin, setCoin] = useState<CoinDetail | null>(null);
  const [loading, setLoading] = useState(() => Boolean(id));
  const [error, setError] = useState<string | null>(() =>
    id ? null : "Invalid coin route.",
  );

  useEffect(() => {
    if (!id) {
      return;
    }

    let isMounted = true;

    const loadCoin = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchCoinById(id);
        console.log(`[CoinGecko] /${id} (coin by id) response:`, data);
        if (isMounted) {
          setCoin(data);
        }
      } catch {
        if (isMounted) {
          setError(
            "Failed to fetch this coin. Check the id or try again later.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadCoin();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1
          className={`text-2xl font-black tracking-tight sm:text-4xl ${
            isDark ? "text-slate-100" : "text-slate-900"
          }`}
        >
          Coin Details
        </h1>
        <Link
          to="/"
          className={`rounded-xl border px-4 py-2 text-sm font-semibold shadow transition ${
            isDark
              ? "border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          Back to all coins
        </Link>
      </div>

      {loading ? (
        <div
          className={`rounded-2xl border p-8 text-center shadow-lg ${
            isDark
              ? "border-slate-700 bg-slate-900/90 text-slate-300"
              : "border-slate-200 bg-white/90 text-slate-600"
          }`}
        >
          Loading coin data...
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-lg">
          {error}
        </div>
      ) : null}

      {!loading && !error && coin ? (
        <article
          className={`overflow-hidden rounded-3xl border shadow-2xl ${
            isDark
              ? "border-slate-700 bg-slate-900/90 shadow-black/35"
              : "border-emerald-200/70 bg-white/90 shadow-emerald-100"
          }`}
        >
          <header className="bg-linear-to-r from-emerald-500 to-cyan-600 p-6 text-white sm:p-8">
            <div className="flex flex-wrap items-center gap-4">
              <img
                src={coin.image.large}
                alt={coin.name}
                className="h-16 w-16 rounded-full bg-white/90 p-1 shadow-lg"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
                  /{coin.id}
                </p>
                <h2 className="text-3xl font-black tracking-tight">
                  {coin.name}
                </h2>
                <p className="text-sm uppercase text-cyan-100">{coin.symbol}</p>
              </div>
            </div>
          </header>

          <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 sm:p-8">
            <div
              className={`rounded-2xl border p-4 ${
                isDark
                  ? "border-slate-700 bg-slate-800"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-[0.12em] ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Rank
              </p>
              <p
                className={`mt-2 text-xl font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}
              >
                {coin.market_cap_rank ?? "N/A"}
              </p>
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isDark
                  ? "border-slate-700 bg-slate-800"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-[0.12em] ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Current Price
              </p>
              <p
                className={`mt-2 text-xl font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}
              >
                {formatUsd(coin.market_data?.current_price?.usd)}
              </p>
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isDark
                  ? "border-slate-700 bg-slate-800"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-[0.12em] ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Market Cap
              </p>
              <p
                className={`mt-2 text-xl font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}
              >
                {formatUsd(coin.market_data?.market_cap?.usd)}
              </p>
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isDark
                  ? "border-slate-700 bg-slate-800"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-[0.12em] ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                24h High
              </p>
              <p
                className={`mt-2 text-xl font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}
              >
                {formatUsd(coin.market_data?.high_24h?.usd)}
              </p>
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isDark
                  ? "border-slate-700 bg-slate-800"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-[0.12em] ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                24h Low
              </p>
              <p
                className={`mt-2 text-xl font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}
              >
                {formatUsd(coin.market_data?.low_24h?.usd)}
              </p>
            </div>

            <div
              className={`rounded-2xl border p-4 ${
                isDark
                  ? "border-slate-700 bg-slate-800"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-[0.12em] ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                24h Change
              </p>
              <p
                className={`mt-2 text-xl font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}
              >
                {typeof coin.market_data?.price_change_percentage_24h ===
                "number"
                  ? `${coin.market_data.price_change_percentage_24h.toFixed(2)}%`
                  : "N/A"}
              </p>
            </div>
          </div>

          <div
            className={`border-t p-6 sm:p-8 ${isDark ? "border-slate-700" : "border-slate-200"}`}
          >
            <h3
              className={`text-sm font-semibold uppercase tracking-[0.12em] ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              About
            </h3>
            <p
              className={`mt-3 leading-7 ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              {cleanHtmlText(coin.description.en)}
            </p>

            <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
              <div
                className={`rounded-xl border p-4 ${
                  isDark
                    ? "border-slate-700 bg-slate-800"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <dt
                  className={`font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  Hashing Algorithm
                </dt>
                <dd
                  className={`mt-1 font-medium ${isDark ? "text-slate-100" : "text-slate-900"}`}
                >
                  {coin.hashing_algorithm ?? "N/A"}
                </dd>
              </div>
              <div
                className={`rounded-xl border p-4 ${
                  isDark
                    ? "border-slate-700 bg-slate-800"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <dt
                  className={`font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  Genesis Date
                </dt>
                <dd
                  className={`mt-1 font-medium ${isDark ? "text-slate-100" : "text-slate-900"}`}
                >
                  {coin.genesis_date ?? "N/A"}
                </dd>
              </div>
            </dl>
          </div>
        </article>
      ) : null}
    </section>
  );
}
