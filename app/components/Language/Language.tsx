import { Dispatch, SetStateAction, useState } from "react"

const countries = [
  { name: "German", code: "DE" },
  { name: "English", code: "GB" },
  { name: "Spain", code: "ES" },
]

export default function Language({setHourMode}: {setHourMode: Dispatch<SetStateAction<boolean>>}) {
  const [selectedLanguage, setLanguage] = useState(countries[0]);
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex flex-col gap-4 w-64">
        <section className="flex justify-center items-center gap-2 h-12 border rounded-2xl" onClick={() => setOpen(!open)}>
            <section className="flex gap-2">
                <img src={`/flags/${selectedLanguage.code}.svg`} className="w-8" alt={selectedLanguage.code}/>
                <span>{selectedLanguage.name}</span>
            </section>
            <svg className="w-8 h-8" fill="black" stroke="currentColor"viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </section>  
        <section className={`absolute top-13 w-full flex flex-col justify-center items-center gap-2 p-4 border bg-zinc-900 rounded-2xl ${open ? "" : "hidden"}`}>
            {countries.map((countrie, index) =>  { 
                return (
                    <section key={index} className="flex gap-2 items-center w-30" onClick={() => { setLanguage(countrie), setOpen(false), setHourMode(countrie.code === "GB")}}>
                        <img src={`/flags/${countrie.code}.svg`} className="w-8" alt={countrie.code}/>
                        <span>{countrie.name}</span>
                    </section>
                )
            })}
        </section>
    </div>
  )
}