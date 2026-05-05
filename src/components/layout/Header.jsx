import Button from "../ui/Button";
import LanguageSwitcher from "./LanguageSwitcher";
import { getLanguage, t } from "../../lib/i18n";

export default function Header({
  title = "Allergy Tracker",
  subtitle = "Панель пациента",
  onLogout,
  onMenuClick,
}) {
  const language = getLanguage();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
            aria-label={t("layout.openMenu", language)}
          >
            <span className="text-lg leading-none">☰</span>
          </button>

          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-emerald-100 bg-emerald-50 shadow-sm">
            <span className="text-sm font-bold text-emerald-700">AT</span>
          </div>

          <div className="min-w-0 leading-tight">
            <div className="truncate text-base font-bold text-slate-900 sm:text-lg">
              {title}
            </div>

            <div className="truncate text-xs font-medium text-slate-500 sm:text-sm">
              {subtitle}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <Button
            variant="ghost"
            onClick={onLogout}
            className="h-10 rounded-xl px-3 text-sm sm:px-4"
          >
            {t("layout.logout", language)}
          </Button>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-white px-3 py-2 sm:hidden">
        <LanguageSwitcher />
      </div>
    </header>
  );
}