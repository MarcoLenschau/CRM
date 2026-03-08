export default function Link({name}: {name: string}) {
  return (
      <a className="w-full h-[42px] flex justify-center items-center border border-gray-500 font-bold" href={`./${name.toLowerCase()}`}>{name}</a>
  );
}
