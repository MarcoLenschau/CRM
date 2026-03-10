export default function InputForm({children, onSubmit = () => {}}: {children: React.ReactNode, onSubmit?: () => void}) {
  return (
    <section className="h-full flex justify-center items-center">
      <form className="flex flex-col items-center gap-6 p-18 border border-gray-300 rounded-2xl shadow-[0px_0px_10px_10px_rgba(100,0,0,0.7)]" 
        onSubmit={() => onSubmit()}>
        {children}
      </form>
    </section>
  );
}