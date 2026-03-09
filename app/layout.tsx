import type { Metadata } from "next";
import Container from "./components/Container/Container";
import "./globals.css";

export const metadata: Metadata = {
  title: "Login",
  description: "CRM Login page",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html className="bg-zinc-900" lang="en">
      <body>
        <Container>
            {children}
        </Container>
      </body>
    </html>
  );
}
