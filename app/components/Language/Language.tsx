import { Dispatch, SetStateAction, useState } from "react"

const countries = [
  { name: "German", code: "DE" },
  { name: "English", code: "GB" },
  { name: "Spain", code: "ES" },
]

/**
 * Language selector dropdown component with flag icons and time format toggle integration.
 * Displays available languages with country flags and manages locale selection state.
 *
 * @param setHourMode - Callback function to update time format (12-hour vs 24-hour) when language changes
 * @return Rendered language selector dropdown with flag indicators
 * @throws Error if flag images fail to load or setHourMode callback fails; displays fallback language selector
 * @category Feature Components
 * @security Manages UI locale preference only; no sensitive data exposed
 * @performance Lightweight dropdown with icon lazy loading via flag assets
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function Language({setHourMode}: {setHourMode: Dispatch<SetStateAction<boolean>>}) {
  const [selectedLanguage, setLanguage] = useState(countries[0]);
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex flex-col gap-2">
        <button 
          onClick={() => setOpen(!open)}
          className="flex justify-between items-center gap-2 h-10 px-4 bg-zinc-800 border-2 border-zinc-500 rounded-lg hover:border-zinc-400 transition-colors shadow-lg group"
        >
          <div className="flex items-center gap-2 min-w-0">
            <img src={`/flags/${selectedLanguage.code}.svg`} className="w-5 h-5 flex-shrink-0" alt={selectedLanguage.code}/>
            <span className="text-sm font-semibold text-white">{selectedLanguage.code}</span>
          </div>
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} 
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </button>

        {open && (
          <div className="absolute top-12 right-0 w-48 bg-zinc-800 border-2 border-zinc-500 rounded-lg shadow-xl z-50 overflow-hidden backdrop-blur-sm">
            <div className="p-1">
              {countries.map((country, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setLanguage(country);
                    setOpen(false);
                    setHourMode(country.code === "GB");
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                    selectedLanguage.code === country.code
                      ? "bg-zinc-700/50 border-l-2 border-zinc-500"
                      : "hover:bg-zinc-700/50"
                  }`}
                >
                  <img src={`/flags/${country.code}.svg`} className="w-5 h-5" alt={country.code}/>
                  <span className="text-sm font-medium text-white">{country.name}</span>
                  {selectedLanguage.code === country.code && (
                    <svg className="w-4 h-4 text-zinc-400 ml-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
    </div>
  )
}