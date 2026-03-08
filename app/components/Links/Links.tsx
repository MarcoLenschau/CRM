export default function Links() {
  return (
    <nav className="w-full flex flex-col gap-4">
      <a className="w-full h-[42px] flex justify-center items-center border border-gray-500" href="./home">Home</a>
      <a className="w-full h-[42px] flex justify-center items-center border border-gray-500" href="./users">Users</a>
      <a className="w-full h-[42px] flex justify-center items-center border border-gray-500" href="./email">Email</a>
      <a className="w-full h-[42px] flex justify-center items-center border border-gray-500" href="./help">Hilfe</a>
    </nav>
  );
}
