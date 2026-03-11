import type { Metadata } from "next";
import Container from "./components/Container/Container";
import "./globals.scss"
import "./styles/lightmode.scss";
import "./styles/tailwind.scss";

export const metadata: Metadata = {
  title: "Login",
  description: "CRM Login page",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className="bg-zinc-800">
        <Container>
            {children}
        </Container>
      </body>
    </html>
  );
}
