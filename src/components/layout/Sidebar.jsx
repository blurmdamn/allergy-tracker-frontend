import { NavLink } from "react-router-dom";
import { getRole } from "../../lib/role";
import { getLanguage, t } from "../../lib/i18n";

function getNavigation(language) {
  return {
    patient: [
      { to: "/", label: t("sidebar.dashboard", language), end: true },
      { to: "/profile", label: t("sidebar.profile", language) },
      { to: "/allergies", label: t("sidebar.allergies", language) },
      { to: "/daily-checkin", label: t("sidebar.dailyCheckin", language) },
      { to: "/medications", label: t("sidebar.medications", language) },
      { to: "/asit", label: t("sidebar.asit", language) },
      { to: "/calendar", label: t("sidebar.calendar", language) },
      { to: "/reports", label: t("sidebar.reports", language) },
      { to: "/reminders", label: t("sidebar.reminders", language) },
    ],
  };
}

function SidebarInner({ roleName, items, onNavigate, language }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="px-2 py-2">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {t("layout.role", language)}
        </div>

        <div className="mt-1 text-sm font-medium text-slate-900">
          {roleName}
        </div>
      </div>

      <div className="my-3 h-px bg-slate-100" />

      <nav className="space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
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
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
        <div className="text-xs font-semibold text-emerald-800">
          {t("layout.diaryHintTitle", language)}
        </div>

        <div className="mt-1 text-xs leading-5 text-emerald-700">
          {t("layout.diaryHintText", language)}
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ open = false, onClose = () => {} }) {
  const role = getRole();
  const language = getLanguage();

  const NAV = getNavigation(language);
  const items = NAV[role] || NAV.patient;

  const roleName =
    role === "patient"
      ? t("dashboard.rolePatient", language)
      : t("dashboard.roleUser", language);

  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-18.25 h-[calc(100vh-73px)] w-64 p-4">
          <SidebarInner
            roleName={roleName}
            items={items}
            language={language}
            onNavigate={() => {}}
          />
        </div>
      </aside>

      <div className={`lg:hidden ${open ? "block" : "hidden"}`}>
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/30"
          onClick={onClose}
          aria-label={t("layout.closeMenu", language)}
        />

        <div className="fixed left-0 top-0 z-40 h-full w-72 bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">
                {t("layout.menu", language)}
              </div>

              <div className="text-xs text-slate-500">Allergy Tracker</div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50"
              aria-label={t("layout.closeMenu", language)}
            >
              ✕
            </button>
          </div>

          <SidebarInner
            roleName={roleName}
            items={items}
            language={language}
            onNavigate={onClose}
          />
        </div>
      </div>
    </>
  );
}