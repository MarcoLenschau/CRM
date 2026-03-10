export default function InputForm({children, onSubmit = () => {}}: {children: React.ReactNode, onSubmit?: () => void}) {
  return (
    <section className="h-full flex justify-center items-center">
      <form className="flex flex-col justify-between items-center gap-6 p-18 border border-zinc-500 rounded-2xl bg-zinc-900 h-[80%]" 
        onSubmit={() => onSubmit()}>
        {children}
      </form>
    </section>
  );
}