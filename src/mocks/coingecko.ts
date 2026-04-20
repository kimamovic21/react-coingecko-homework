import type { CoinDetail, CoinListItem } from "../lib/coingecko";

export const bitcoinListItem: CoinListItem = {
  id: "bitcoin",
  symbol: "btc",
  name: "Bitcoin",
};

export const bitcoinListResponse: CoinListItem[] = [bitcoinListItem];

export const bitcoinDetailResponse: CoinDetail = {
  id: "bitcoin",
  symbol: "btc",
  name: "Bitcoin",
  hashing_algorithm: "SHA-256",
  description: {
    en: "Bitcoin is the world's first decentralized cryptocurrency.",
  },
  image: {
    thumb: "https://example.com/bitcoin-thumb.png",
    small: "https://example.com/bitcoin-small.png",
    large: "https://example.com/bitcoin-large.png",
  },
  market_cap_rank: 1,
  genesis_date: "2009-01-03",
  market_data: {
    current_price: {
      usd: 100000,
    },
    market_cap: {
      usd: 2000000000000,
    },
    high_24h: {
      usd: 102500,
    },
    low_24h: {
      usd: 98000,
    },
    price_change_percentage_24h: 2.34,
  },
};

export function mockJsonResponse<T>(body: T): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
