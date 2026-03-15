import LinkTemplate from "../LinkTemplate/LinkTemplate"

/**
 * Footer navigation component displaying legal and policy links (impress and privacy).
 * Provides quick access to important legal documents in a vertical navigation layout.
 *
 * @return Rendered legal links navigation footer
 * @throws Error if LinkTemplate rendering fails; displays fallback text links
 * @category Feature Components
 * @security Links to legal pages managed via LinkTemplate routing component
 * @performance Static component with no state or API calls
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function Juridical() {
  return (
    <nav className="flex flex-col gap-3 pt-4 border-t border-zinc-500 justify-center items-center">
      <LinkTemplate name="Impress"/>
      <LinkTemplate name="Privacy"/>
    </nav>
  );
}
