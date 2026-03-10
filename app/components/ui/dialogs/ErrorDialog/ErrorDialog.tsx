import { Dispatch, SetStateAction } from "react";
import Button from "../../Button/Button";

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
