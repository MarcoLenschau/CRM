export default function InputContainer({children}: {children: React.ReactNode}) {
  return (
    <section className="flex flex-col gap-4">{children}</section>
  );
}