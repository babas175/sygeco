import "./globals.css";

export default function RootLayout({ children }: any) {
  return (
    <html lang="fr">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}