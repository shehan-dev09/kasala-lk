export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 px-6 md:px-8 py-14">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src="/logo.png" alt="Kasala.lk" className="w-8 h-8 rounded-lg" />
            <span className="text-white font-bold">Kasala.Lk</span>
          </div>
          <p className="text-sm">Smarter waste collection for a cleaner Sri Lanka.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/dashboard" className="hover:text-white transition">Dashboard</a></li>
            <li><a href="/report" className="hover:text-white transition">Report Issue</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/#about" className="hover:text-white transition">About</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Legal</h4>
          <p className="text-sm">Predictions are model estimates, refined with real council data over time.</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto border-t border-gray-800 mt-10 pt-6 text-sm text-center">
        © 2026 Kasala.lk — Built for a cleaner Sri Lanka 🇱🇰
      </div>
    </footer>
  );
}