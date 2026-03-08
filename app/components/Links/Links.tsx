import Link from "../Link/Link"

export default function Links() {
  return (
    <nav className="w-full flex flex-col gap-4">
      <Link name="Home"/>
      <Link name="Users"/>
      <Link name="Email"/>
      <Link name="Help"/>
    </nav>
  );
}
