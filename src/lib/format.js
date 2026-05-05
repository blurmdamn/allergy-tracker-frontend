import { getLanguage, getLocale, t } from "./i18n";

export function formatDate(value, language = getLanguage()) {
  if (!value) return "—";

  try {
    return new Date(value).toLocaleDateString(getLocale(language));
  } catch {
    return value;
  }
}

export function formatDateTime(value, language = getLanguage()) {
  if (!value) return "—";

  try {
    return new Date(value).toLocaleString(getLocale(language));
  } catch {
    return value;
  }
}

export function getSeverityLabel(level, language = getLanguage()) {
  if (!level) return t("common.noData", language);

  return t(`severity.${level}`, language);
}

export function getSeverityClass(level) {
  const map = {
    none: "bg-slate-100 text-slate-700",
    mild: "bg-emerald-50 text-emerald-700",
    moderate: "bg-amber-50 text-amber-700",
    severe: "bg-red-50 text-red-700",
  };

  return map[level] || "bg-slate-100 text-slate-700";
}