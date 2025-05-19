import "../styles/global.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Since we're using Zustand, we don't need a CartProvider wrapper
// Zustand stores are available globally by default

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}