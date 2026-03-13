import LinkTemplate from "../LinkTemplate/LinkTemplate"

export default function Juridical() {
  return (
    <nav className="flex flex-col gap-3 pt-4 border-t border-zinc-500 justify-center items-center">
      <LinkTemplate name="Impress"/>
      <LinkTemplate name="Privacy"/>
    </nav>
  );
}
