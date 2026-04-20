# CoinGecko React Homework

A React + TypeScript + Vite application that integrates the CoinGecko free API.

This project includes:

- Two routes using React Router.
- Coin list view with search and pagination.
- Coin detail view by route id.
- Dark and light theme toggle with sun/moon icons.
- Console logging of API responses for demo/instructor review.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS v4
- React Icons

## Features

### Home Route

Path: `/`

- Fetches top 100 coins from CoinGecko by market cap.
- Search filter by coin name, symbol, or id.
- Pagination with 10 items per page.
- Click any coin to navigate to its detail route.
- Logs list API response in browser console.

### Coin Detail Route

Path: `/:id`

- Fetches coin data by id from CoinGecko.
- Displays rank, pricing stats, market cap, 24h data, and description.
- Includes back button to return to list route.
- Logs detail API response in browser console.

### Theme Support

- Default mode is dark.
- Theme toggle button in app header (sun/moon icons).
- Theme preference is saved in localStorage.

## API Endpoints Used

Base URL:

`https://api.coingecko.com/api/v3`

List endpoint:

`/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`

Detail endpoint:

`/coins/{id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`

## Console Output (Instructor Demo)

When data is fetched, these logs appear in the browser console:

- `[CoinGecko] / (top 100 coins) response:`
- `[CoinGecko] /{id} (coin by id) response:`

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

The app runs on:

`http://localhost:3000`

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Project Structure

```text
src/
  App.tsx
  index.css
  lib/
    coingecko.ts
  pages/
    CoinsListPage.tsx
    CoinDetailPage.tsx
```

## Notes

- CoinGecko free API can occasionally rate-limit requests.
- If rate-limited, the UI shows an error message.
- This project is focused on route-based coin browsing and API integration.
