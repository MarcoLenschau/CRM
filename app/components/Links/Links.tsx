export default function Links() {
  return (
    <nav className="w-full flex flex-col gap-4">
      <a className="w-full h-[42px] flex justify-center items-center border border-gray-500 font-bold" href="./home">Home</a>
      <a className="w-full h-[42px] flex justify-center items-center border border-gray-500 font-bold" href="./users">Users</a>
      <a className="w-full h-[42px] flex justify-center items-center border border-gray-500 font-bold" href="./email">Email</a>
      <a className="w-full h-[42px] flex justify-center items-center border border-gray-500 font-bold" href="./help">Hilfe</a>
    </nav>
  );
}
