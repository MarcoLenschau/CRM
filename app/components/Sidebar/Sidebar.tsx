import Links from "../Links/Links";

export default function Sidebar() {
  return (
    <aside className="flex flex-col justify-between w-32 h-screen bg-red-950">
      <img alt="logo"/>
      <Links />
      <nav className="flex flex-col gap-4">
        <a className="h-[42px] flex justify-center items-center border border-gray-500">Impesum</a>
        <a className="h-[42px] flex justify-center items-center border border-gray-500">Datenschutz</a>
      </nav>
    </aside>
  );
}
