/**
 * Renders 404 Not Found error page for missing routes.
 * Displayed when user navigates to non-existent pages.
 *
 * @return 404 error page component
 * @category Error Pages
 * @security Public error page with no sensitive information
 * @performance Static error page with minimal rendering
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function ErrorPage() {
  return ( 
    <section className="flex justify-center items-center h-full">
      <h1 className="text-4xl">404 Page not found</h1>
    </section>
  );
}