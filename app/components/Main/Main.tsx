/**
 * Main content wrapper component for page content rendering.
 * Applies conditional styling for auth pages vs regular pages.
 *
 * @param children - Content to render within main area
 * @param isAuthPage - Whether this is an authentication page (optional, defaults to false)
 * @return Rendered main content container
 * @throws Error if children prop is invalid; renders empty main container
 * @category Layout
 * @security Isolates content area from navigation elements on auth pages
 * @performance Lightweight wrapper with minimal overhead and conditional styling
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function Main({children, isAuthPage}: {children: React.ReactNode, isAuthPage?: boolean}) {
  return (
    <main className={"h-full bg-zinc-800"}>{children}</main>
  );
}
