export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Finance Protocol</h1>
        <div>
          <a href="/dashboard" className="px-3 py-2 rounded hover:bg-gray-700">
            Dashboard
          </a>
          <a href="/transactions" className="px-3 py-2 rounded hover:bg-gray-700">
            Transactions
          </a>
          <a href="/settings" className="px-3 py-2 rounded hover:bg-gray-700">
            Settings
          </a>
        </div>
      </div>
    </nav>
  );
}