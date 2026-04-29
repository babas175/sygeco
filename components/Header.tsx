export default function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800">
        Dashboard
      </h2>

      <div className="text-sm text-gray-500">
        Bienvenue 👋
      </div>
    </header>
  );
}