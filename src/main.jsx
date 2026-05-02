import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Placeholder from "./pages/Placeholder.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AppLayout from "./components/layout/AppLayout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Placeholder title="Мой профиль" />} />
          <Route path="allergies" element={<Placeholder title="Мои аллергии" />} />
          <Route
            path="daily-checkin"
            element={<Placeholder title="Дневник симптомов" />}
          />
          <Route path="medications" element={<Placeholder title="Лекарства" />} />
          <Route path="asit" element={<Placeholder title="Курс АСИТ" />} />
          <Route path="calendar" element={<Placeholder title="Календарь" />} />
          <Route path="reports" element={<Placeholder title="Отчёт для врача" />} />
          <Route path="reminders" element={<Placeholder title="Напоминания" />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);