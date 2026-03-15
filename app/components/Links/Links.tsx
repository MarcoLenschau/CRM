import LinkTemplate from "../LinkTemplate/LinkTemplate";

/**
 * Navigation list component rendering multiple LinkTemplate items from provided array.
 * Maps an array of link names into a vertical navigation menu with consistent styling.
 *
 * @param linksArray - Array of link names to render as navigation items
 * @return Rendered navigation list with multiple LinkTemplate components
 * @throws Error if linksArray is invalid or empty; renders empty navigation container
 * @category Feature Components
 * @security Navigation items determined by input array; safe client-side routing via LinkTemplate
 * @performance Maps input array efficiently; no state or API calls
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function Links({linksArray}: {linksArray: string[]}) {
  return (
    <nav className="w-full flex flex-col gap-3 items-center justify-center">
      {linksArray.map((item, index) => <LinkTemplate name={item} key={index}/>)}
    </nav>
  );
}
