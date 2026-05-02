import Button from "../ui/Button";
import { cn } from "../../lib/cn";

export default function Header({
  title = "Allergy Tracker",
  subtitle = "Панель пациента",
  onLogout,
  onMenuClick,
}) {
  return (
    <div className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className={cn(
              "grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50 lg:hidden"
            )}
            aria-label="Открыть меню"
          >
            <span className="text-lg leading-none">☰</span>
          </button>

          <div
            className={cn(
              "grid h-10 w-10 place-items-center rounded-2xl border border-emerald-100 bg-emerald-50 shadow-sm"
            )}
          >
            <span className="text-sm font-semibold text-emerald-700">AT</span>
          </div>

          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">{title}</div>
            <div className="text-xs text-slate-600">{subtitle}</div>
          </div>
        </div>

        <Button variant="ghost" onClick={onLogout}>
          Выйти
        </Button>
      </div>
    </div>
  );
}