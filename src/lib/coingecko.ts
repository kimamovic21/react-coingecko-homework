const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

export type CoinListItem = {
  id: string;
  symbol: string;
  name: string;
};

type CoinMarketListItem = {
  id: string;
  symbol: string;
  name: string;
};

export type CoinDetail = {
  id: string;
  symbol: string;
  name: string;
  hashing_algorithm: string | null;
  description: {
    en: string;
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_cap_rank: number | null;
  genesis_date: string | null;
  market_data?: {
    current_price?: {
      usd?: number;
    };
    market_cap?: {
      usd?: number;
    };
    total_volume?: {
      usd?: number;
    };
    high_24h?: {
      usd?: number;
    };
    low_24h?: {
      usd?: number;
    };
    price_change_percentage_24h?: number;
  };
};

async function requestJson<T>(path: string): Promise<T> {
  const response = await fetch(`${COINGECKO_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`CoinGecko request failed (${response.status})`);
  }

  return (await response.json()) as T;
}

export function fetchAllCoins(): Promise<CoinListItem[]> {
  return requestJson<CoinMarketListItem[]>(
    "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
  );
}

export function fetchCoinById(id: string): Promise<CoinDetail> {
  return requestJson<CoinDetail>(
    `/coins/${encodeURIComponent(
      id,
    )}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
  );
}
