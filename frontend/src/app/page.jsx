import UrlForm from "@/components/UrlForm";

const App = () => {
  return (
    <main className="min-h-screen grid place-items-center p-8 bg-gradient-to-b from-neutral-50 to-neutral-100 text-slate-900 dark:from-slate-900/60 dark:to-slate-900 dark:text-slate-100">
      <div className="w-full max-w-3xl bg-white/80 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-slate-100">
            Url Shortener
          </h1>
        </header>
        {/* Url Form */}
        <UrlForm />
        <footer className="mt-6 text-center text-sm text-slate-400">
          Modern, minimal URL shortener UI — mobile friendly
        </footer>
      </div>
    </main>
  );
};

export default App;
