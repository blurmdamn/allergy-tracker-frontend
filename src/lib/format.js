import { getLanguage, getLocale, t } from "./i18n";

const SEVERITY_LABELS = {
  ru: {
    none: "Нет симптомов",
    mild: "Лёгкое состояние",
    moderate: "Средняя тяжесть",
    high: "Выраженные симптомы",
    severe: "Тяжёлый день",
  },
  en: {
    none: "No symptoms",
    mild: "Mild condition",
    moderate: "Moderate severity",
    high: "Pronounced symptoms",
    severe: "Severe day",
  },
  kk: {
    none: "Симптомдар жоқ",
    mild: "Жеңіл жағдай",
    moderate: "Орташа ауырлық",
    high: "Айқын симптомдар",
    severe: "Ауыр күн",
  },
};

const ASIT_STATUS_LABELS = {
  ru: {
    planned: "Запланировано",
    done: "Выполнено",
    skipped: "Пропущено",
    rescheduled: "Перенесено",
  },
  en: {
    planned: "Planned",
    done: "Done",
    skipped: "Skipped",
    rescheduled: "Rescheduled",
  },
  kk: {
    planned: "Жоспарланған",
    done: "Орындалды",
    skipped: "Өткізілді",
    rescheduled: "Ауыстырылды",
  },
};

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

  const key = `severity.${level}`;
  const translated = t(key, language);

  if (translated && translated !== key) {
    return translated;
  }

  return (
    SEVERITY_LABELS[language]?.[level] ||
    SEVERITY_LABELS.ru[level] ||
    level
  );
}

export function getSeverityClass(level) {
  const map = {
    none: "bg-slate-100 text-slate-700",
    mild: "bg-emerald-50 text-emerald-700",
    moderate: "bg-amber-50 text-amber-700",
    high: "bg-orange-50 text-orange-700",
    severe: "bg-red-50 text-red-700",
  };

  return map[level] || "bg-slate-100 text-slate-700";
}

export function getAsitStatusLabel(status, language = getLanguage()) {
  if (!status) return t("common.noData", language);

  const key = `asitStatus.${status}`;
  const translated = t(key, language);

  if (translated && translated !== key) {
    return translated;
  }

  return (
    ASIT_STATUS_LABELS[language]?.[status] ||
    ASIT_STATUS_LABELS.ru[status] ||
    status
  );
}