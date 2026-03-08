import Link from "../Link/Link"

export default function Links({linksArray}: {linksArray: string[]}) {
  return (
    <nav className="w-full flex flex-col gap-4">
      {linksArray.map((item, index) => <Link name={item} key={index}/>)}
    </nav>
  );
}
