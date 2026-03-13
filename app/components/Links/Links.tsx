import LinkTemplate from "../LinkTemplate/LinkTemplate";

export default function Links({linksArray}: {linksArray: string[]}) {
  return (
    <nav className="w-full flex flex-col gap-3 items-center justify-center">
      {linksArray.map((item, index) => <LinkTemplate name={item} key={index}/>)}
    </nav>
  );
}
