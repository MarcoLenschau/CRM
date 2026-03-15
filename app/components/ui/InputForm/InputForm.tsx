/**
 * Form wrapper component providing structured layout with centered form container and submission handling.
 * Wraps children form elements in semantic form element with consistent spacing and styling.
 *
 * @param children - Form elements and content to render within the form
 * @param onSubmit - Optional callback function triggered on form submission, defaults to empty function
 * @return Rendered form element with centered layout and submission handler
 * @throws Error if form submission fails; handled by onSubmit callback
 * @category UI Components
 * @security Form semantics enable native browser validation; submission callback can integrate validation logic
 * @performance Lightweight wrapper component with minimal overhead
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
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