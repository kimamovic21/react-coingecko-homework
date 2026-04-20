import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12 text-slate-900">
      <section className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <p className="text-sm font-semibold tracking-wide text-blue-700">
          Tailwind CSS is active
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">React + Vite + Tailwind</h1>
        <p className="mt-4 text-slate-600">
          If this card has spacing, color, shadow, and typography styles, Tailwind is
          configured correctly.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setCount((value) => value + 1)}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Count is {count}
          </button>
          <button
            type="button"
            onClick={() => setCount(0)}
            className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Reset
          </button>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-600">
          <p>
            Next step: start using utility classes in your own components and remove
            old stylesheet rules you no longer need.
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
