export default function Main({children, isAuthPage}: {children: React.ReactNode, isAuthPage?: boolean}) {
  return (
    <main className={"h-full bg-zinc-800"}>{children}</main>
  );
}
