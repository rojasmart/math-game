import React from "react";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Math Games Platform</title>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
