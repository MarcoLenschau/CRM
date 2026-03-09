export default function InputForm({children}: {children: React.ReactNode}) {
  return (
    <form className="h-full flex flex-col justify-center items-center gap-6">{children}</form>
  );
}