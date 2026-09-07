export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Kasala.lk logo" className="w-10 h-10 rounded-lg" />
          <h1 className="text-xl font-bold text-brand-700" style={{ fontFamily: "var(--font-heading)" }}>Kasala.Lk</h1>
        </div>
        <nav className="flex gap-6 text-sm font-medium">
          <a href="/dashboard" className="hover:text-brand-600 transition">Dashboard</a>
          <a href="#" className="hover:text-brand-600 transition">About</a>
          <a href="/report" className="hover:text-brand-600 transition">Report Issue</a>
        </nav>
      </header>


      {/* Hero section */}
      <section className="text-center py-28 px-6 bg-gradient-to-br from-brand-700 to-brand-400 text-white">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Smarter Waste Collection for Sri Lanka
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90">
          Kasala.lk (කසල.lk) predicts garbage collection demand across Sri Lankan cities,
          helping councils plan smarter and reduce overflow.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/dashboard" className="bg-white text-brand-700 px-6 py-3 rounded-lg font-semibold hover:bg-brand-50 transition">
            View Dashboard
          </a>
          <a href="/report" className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
            Report a Problem
          </a>
        </div>
      </section>

      {/* Feature cards */}
      <section className="grid md:grid-cols-3 gap-6 px-8 py-16 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold text-lg mb-2 text-brand-700">📍 Zone Predictions</h3>
          <p className="text-gray-600 text-sm">
            See predicted waste demand for Colombo, Kandy, and Galle — updated daily.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold text-lg mb-2 text-brand-700">📊 Forecast Charts</h3>
          <p className="text-gray-600 text-sm">
            Track waste trends over time to plan truck allocation ahead of demand spikes.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold text-lg mb-2 text-brand-700">🗺️ Smart Routes</h3>
          <p className="text-gray-600 text-sm">
            Get suggested collection routes based on predicted demand per zone.
          </p>
        </div>
      </section>

      {/* Transparency note */}
      <section className="bg-white border-t px-8 py-10 text-center text-sm text-gray-500">
        <p className="max-w-2xl mx-auto">
          Kasala.lk's predictions currently use a model trained on published waste-generation
          rates and estimated patterns. Accuracy improves as real collection data is logged
          by participating councils.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-400 text-sm border-t">
        © 2026 Kasala.lk — Built for a cleaner Sri Lanka 🇱🇰
      </footer>
    </main>
  );
}