import type { Metadata } from "next";
import Container from "./components/Container/Container";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRM",
  description: "CRM with Next JS",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        <Container>
            {children}
        </Container>
      </body>
    </html>
  );
}
