// app/layout.tsx
import "../styles/global.css"; // Your global styles
// Make sure Navbar and Footer are NOT directly imported here,
// as they will be rendered conditionally by LayoutVisibility

import LayoutVisibility from "../components/LayoutVisibility"; // Import your new client component

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* You can add your head content here if needed */}
      <head>
        <title>My Next.js App</title>
        <meta name="description" content="A Next.js application" />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Wrap your children with the LayoutVisibility component */}
        <LayoutVisibility>{children}</LayoutVisibility>
      </body>
    </html>
  );
}