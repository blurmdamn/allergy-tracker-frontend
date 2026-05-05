import React from "react";
import { getLanguage, LANGUAGES, setLanguage } from "../../lib/i18n";

export default function LanguageSwitcher() {
  const [language, setCurrentLanguage] = React.useState(getLanguage());

  function handleChange(event) {
    const nextLanguage = event.target.value;

    setLanguage(nextLanguage);
    setCurrentLanguage(nextLanguage);

    window.location.reload();
  }

  return (
    <select
      value={language}
      onChange={handleChange}
      className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition hover:bg-slate-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15 sm:w-auto"
    >
      {Object.values(LANGUAGES).map((item) => (
        <option key={item.code} value={item.code}>
          {item.label}
        </option>
      ))}
    </select>
  );
}