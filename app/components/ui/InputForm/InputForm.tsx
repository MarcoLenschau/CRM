export default function InputForm({children, onSubmit = () => {}}: {children: React.ReactNode, onSubmit?: () => void}) {
  return (
    <section className="h-full flex justify-center items-center">
      <form className="flex flex-col justify-between items-center gap-6 p-18 border border-slate-700 rounded-2xl bg-slate-800 h-[80%]" 
        onSubmit={() => onSubmit()}>
        {children}
      </form>
    </section>
  );
}