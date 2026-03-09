import LinkTemplate from "../LinkTemplate/LinkTemplate"

export default function Juridical() {
  return (
    <nav className="flex flex-col gap-4">
      <LinkTemplate name="Impress"/>
      <LinkTemplate name="Privacy"/>
    </nav>
  );
}
