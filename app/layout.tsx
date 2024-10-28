import type { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
  title: "iv codes",
  description: "iv's epic website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}