import type { Metadata } from "next";
import Container from "./components/Container/Container";
import "./globals.scss"
import "./styles/theme.scss";
import "./styles/tailwind.scss";

export const metadata: Metadata = {
  title: "Login",
  description: "CRM Login page",
};

/**
 * Root layout component wrapping entire application.
 * Provides global HTML structure, styling, and authentication container.
 *
 * @param children - Page component content to render within layout
 * @return HTML root layout with Container wrapper
 * @category Layout
 * @security Container component manages authentication context and session state
 * @performance Global styles imported at root level for efficient style loading
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
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
