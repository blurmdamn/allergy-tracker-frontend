import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import Placeholder from "./pages/Placeholder.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AppLayout from "./components/layout/AppLayout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED APP ROUTES */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* Главная */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Navigate to="/" replace />} />

          {/* Мой профиль */}
          <Route path="profile" element={<Profile />} />

          {/* Информация об аллергии */}
          <Route
            path="allergy-info"
            element={<Placeholder title="Информация об аллергии" />}
          />
          <Route
            path="allergies"
            element={<Navigate to="/allergy-info" replace />}
          />

          {/* Мониторинг симптомов */}
          <Route
            path="symptom-monitoring"
            element={<Placeholder title="Мониторинг симптомов" />}
          />
          <Route
            path="daily-checkin"
            element={<Navigate to="/symptom-monitoring" replace />}
          />

          {/* Лекарства */}
          <Route
            path="medications"
            element={<Placeholder title="Лекарства" />}
          />

          {/* График АСИТ */}
          <Route
            path="asit-schedule"
            element={<Placeholder title="График АСИТ" />}
          />
          <Route
            path="asit"
            element={<Navigate to="/asit-schedule" replace />}
          />

          {/* Календарь */}
          <Route
            path="calendar"
            element={<Placeholder title="Календарь" />}
          />

          {/* Мои результаты */}
          <Route
            path="results"
            element={<Placeholder title="Мои результаты" />}
          />
          <Route
            path="reports"
            element={<Navigate to="/results" replace />}
          />

          {/* Напоминания */}
          <Route
            path="reminders"
            element={<Placeholder title="Настройка напоминаний" />}
          />

          {/* Любая неизвестная страница внутри приложения */}
          <Route
            path="*"
            element={<Placeholder title="Страница в разработке" />}
          />
        </Route>

        {/* Любая неизвестная страница вне приложения */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);