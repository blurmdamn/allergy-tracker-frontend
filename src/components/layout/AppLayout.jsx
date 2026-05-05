import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { clearAuth, getRole } from "../../lib/auth";
import { getLanguage, t } from "../../lib/i18n";

function logout() {
  clearAuth();
  window.location.href = "/login";
}

export default function AppLayout() {
  const role = getRole();
  const language = getLanguage();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const subtitle =
    role === "patient"
      ? t("layout.patientPanel", language)
      : t("layout.workspace", language);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        title="Allergy Tracker"
        subtitle={subtitle}
        onLogout={logout}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-3 py-4 sm:gap-5 sm:px-4 sm:py-5 lg:grid-cols-[16rem_1fr] lg:gap-6 lg:px-6 lg:py-6">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="min-w-0 space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}