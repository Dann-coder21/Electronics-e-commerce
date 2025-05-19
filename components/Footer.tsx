import React from "react";

export default function Footer() {
  return (
    <footer style={{
      marginTop: "3rem",
      padding: "1.5rem 0",
      background: "#222",
      color: "#fff",
      textAlign: "center"
    }}>
      &copy; {new Date().getFullYear()} ElectroHub. All rights reserved.
    </footer>
  );
}