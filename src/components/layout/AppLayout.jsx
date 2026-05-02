import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { clearAuth, getRole } from "../../lib/auth";

function logout() {
  clearAuth();
  window.location.href = "/login";
}

export default function AppLayout() {
  const role = getRole();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const subtitle = role === "patient" ? "Панель пациента" : "Рабочая панель";

  return (
    <div className="min-h-full bg-slate-50">
      <Header
        title="Allergy Tracker"
        subtitle={subtitle}
        onLogout={logout}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[16rem_1fr]">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}