import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CoinDetailPage } from "./pages/CoinDetailPage";
import { CoinsListPage } from "./pages/CoinsListPage";

type Theme = "dark" | "light";

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "light" ? "light" : "dark";
  });

  const isDark = theme === "dark";

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <BrowserRouter>
      <main
        className={`min-h-screen transition-colors duration-300 ${
          isDark
            ? "bg-linear-to-b from-slate-950 via-slate-900 to-zinc-900 text-slate-100"
            : "bg-linear-to-b from-amber-50 via-emerald-50 to-cyan-100 text-slate-900"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-end">
            <button
              type="button"
              onClick={toggleTheme}
              className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                isDark
                  ? "border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700"
                  : "border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
              }`}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
              {isDark ? "Light mode" : "Dark mode"}
            </button>
          </div>
          <Routes>
            <Route path="/" element={<CoinsListPage isDark={isDark} />} />
            <Route path="/:id" element={<CoinDetailPage isDark={isDark} />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
