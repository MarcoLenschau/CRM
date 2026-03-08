import Links from "../Links/Links";

export default function Sidebar() {
  return (
    <aside className="flex flex-col justify-between border-r-2 border-gray-600 w-38 h-screen bg-gray-900">
      <img alt="logo"/>
      <Links />
      <nav className="flex flex-col gap-4">
        <a className="h-[42px] flex justify-center items-center border border-gray-500 font-bold">Impesum</a>
        <a className="h-[42px] flex justify-center items-center border border-gray-500 font-bold">Datenschutz</a>
      </nav>
    </aside>
  );
}
