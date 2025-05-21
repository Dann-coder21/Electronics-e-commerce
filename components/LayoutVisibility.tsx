
// components/LayoutVisibility.tsx
"use client"; // This directive marks it as a Client Component

import { usePathname } from "next/navigation";
import Navbar from "./Navbar"; // Assuming Navbar.tsx is in the same 'components' folder
import Footer from "./Footer"; // Assuming Footer.tsx is in the same 'components' folder

export default function LayoutVisibility({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if the current pathname is one of the routes where layout should be hidden
  const hideLayout = ["/account", "/signup", "/auth"].includes(pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}