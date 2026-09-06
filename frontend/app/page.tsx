export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b bg-white">
        <div className="flex items-center gap-2">
          <span className="text-2xl">♻️</span>
          <h1 className="text-xl font-bold text-green-700">Kasala.lk</h1>
        </div>
        <nav className="flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-green-700">Dashboard</a>
          <a href="#" className="hover:text-green-700">About</a>
          <a href="#" className="hover:text-green-700">Report Issue</a>
        </nav>
      </header>

      {/* Hero section */}
      <section className="text-center py-24 px-6 bg-gradient-to-b from-green-50 to-gray-50">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Smarter Waste Collection for <span className="text-green-700">Sri Lanka</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Kasala.lk (කසල.lk) predicts garbage collection demand across Sri Lankan cities,
          helping councils plan smarter and reduce overflow.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800">
            View Dashboard
          </button>
          <button className="border border-green-700 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50">
            Learn More
          </button>
        </div>
      </section>

      {/* Feature cards */}
      <section className="grid md:grid-cols-3 gap-6 px-8 py-16 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold text-lg mb-2">📍 Zone Predictions</h3>
          <p className="text-gray-600 text-sm">
            See predicted waste demand for Colombo, Kandy, and Galle — updated daily.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold text-lg mb-2">📊 Forecast Charts</h3>
          <p className="text-gray-600 text-sm">
            Track waste trends over time to plan truck allocation ahead of demand spikes.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold text-lg mb-2">🗺️ Smart Routes</h3>
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