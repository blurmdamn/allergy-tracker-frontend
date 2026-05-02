import { NavLink } from "react-router-dom";
import { getRole } from "../../lib/role";

const NAV = {
  patient: [
    { to: "/", label: "Dashboard" },
    { to: "/profile", label: "Мой профиль" },
    { to: "/allergies", label: "Мои аллергии" },
    { to: "/daily-checkin", label: "Дневник симптомов" },
    { to: "/medications", label: "Лекарства" },
    { to: "/asit", label: "Курс АСИТ" },
    { to: "/calendar", label: "Календарь" },
    { to: "/reports", label: "Отчёт для врача" },
    { to: "/reminders", label: "Напоминания" },
  ],
};

function SidebarInner({ roleName, items, onNavigate }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="px-2 py-2">
        <div className="text-xs font-semibold text-slate-500">РОЛЬ</div>
        <div className="mt-1 text-sm font-medium text-slate-900">
          {roleName}
        </div>
      </div>

      <div className="my-3 h-px bg-slate-100" />

      <nav className="space-y-1">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.to === "/"}
            onClick={onNavigate}
            className={({ isActive }) =>
              [
                "block rounded-xl px-3 py-2 text-sm transition",
                "hover:bg-emerald-50 hover:text-emerald-700",
                isActive
                  ? "bg-emerald-50 font-medium text-emerald-700"
                  : "text-slate-700",
              ].join(" ")
            }
          >
            {it.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
        <div className="text-xs font-semibold text-emerald-800">
          Дневник состояния
        </div>

        <div className="mt-1 text-xs leading-5 text-emerald-700">
          Заполняйте симптомы ежедневно, чтобы календарь и отчёт отражали
          динамику состояния.
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ open = false, onClose = () => {} }) {
  const role = getRole();
  const items = NAV[role] || NAV.patient;

  const roleName = role === "patient" ? "Пациент" : "Пользователь";

  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-18.25 h-[calc(100vh-73px)] w-64 p-4">
          <SidebarInner
            roleName={roleName}
            items={items}
            onNavigate={() => {}}
          />
        </div>
      </aside>

      <div className={`lg:hidden ${open ? "block" : "hidden"}`}>
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/30"
          onClick={onClose}
          aria-label="Закрыть меню"
        />

        <div className="fixed left-0 top-0 z-40 h-full w-72 bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-900">Меню</div>

            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50"
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>

          <SidebarInner
            roleName={roleName}
            items={items}
            onNavigate={onClose}
          />
        </div>
      </div>
    </>
  );
}