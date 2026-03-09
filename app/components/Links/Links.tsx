import LinkTemplate from "../LinkTemplate/LinkTemplate";

export default function Links({linksArray}: {linksArray: string[]}) {
  return (
    <nav className="w-full flex flex-col gap-4">
      {linksArray.map((item, index) => <LinkTemplate name={item} key={index}/>)}
    </nav>
  );
}
