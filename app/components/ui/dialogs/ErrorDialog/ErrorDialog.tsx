import { Dispatch, SetStateAction } from "react";
import Button from "../../Button/Button";

/**
 * Modal error dialog component that displays an error message with customizable action buttons.
 * Supports multiple button configurations (OK, CANCEL, DELETE, HELP) for different error scenarios.
 *
 * @param text - The error message text to display in the dialog
 * @param setErrorDialog - State setter to close the dialog (set to empty string)
 * @param controlButtons - Array of button labels to display, defaults to ["OK", "CANCEL"]
 * @return Rendered error dialog modal with buttons
 * @throws Error if setErrorDialog callback fails or button rendering fails; dialog remains visible
 * @category Dialogs
 * @security Dialog uses backdrop blur for modal effect, preventing interaction with background elements
 * @performance Lightweight component with minimal re-renders, buttons trigger immediate state updates
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function ErrorDialog({text, setErrorDialog, controlButtons = ["OK", "CANCEL"]}: {text: string, setErrorDialog: Dispatch<SetStateAction<string>>, controlButtons?: string[]}) {
  return ( 
    <dialog className="absolute top-0 flex justify-center items-center h-full w-full bg-transparent backdrop-blur">
      <section className="flex flex-col gap-24 justify-center items-center bg-zinc-900 h-80 w-150 ml-30 rounded-3xl">
        <h1 className="text-2xl">{text}</h1>
        <section className="flex gap-4">
            {controlButtons.map((controlButton: string) => {
              return controlButton === "OK" ? <Button text="OK" type="button" onClick={() => setErrorDialog("")}/> :
                     controlButton === "CANCEL" ? <Button text="Cancel" type="button" onClick={() => setErrorDialog("")}/> :
                     controlButton === "DELETE" ? <Button text="Delete" type="button" onClick={() => setErrorDialog("")}/> :
                     controlButton === "HELP" ? <Button text="Help" type="button" onClick={() => setErrorDialog("")}/> :
                     null
            })}
        </section>
      </section>
    </dialog>
  );
}
