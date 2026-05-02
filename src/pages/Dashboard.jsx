import React from "react";
import { Link } from "react-router-dom";
import { getRole } from "../lib/role";
import { Card, CardHeader, CardBody } from "../components/ui/Card";

function Tile({ to, title, description }) {
  return (
    <Link
      to={to}
      className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="text-base font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-500">{description}</div>
    </Link>
  );
}

export default function Dashboard() {
  const role = getRole();

  const roleTitle = role === "patient" ? "Пациент" : "Пользователь";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="text-xl font-semibold text-slate-900">
            Добро пожаловать
          </div>

          <div className="text-sm text-slate-500">
            Вы вошли как: {roleTitle}
          </div>
        </CardHeader>

        <CardBody>
          <div className="text-sm leading-6 text-slate-600">
            Используйте быстрые действия ниже для ведения дневника симптомов,
            контроля лекарств, отслеживания курса АСИТ и формирования отчёта
            для врача.
          </div>
        </CardBody>
      </Card>

      {role === "patient" && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Tile
            to="/profile"
            title="Мой профиль"
            description="Основные данные пациента и настройки аккаунта"
          />

          <Tile
            to="/allergies"
            title="Мои аллергии"
            description="Добавление аллергенов и связанных симптомов"
          />

          <Tile
            to="/daily-checkin"
            title="Дневник симптомов"
            description="Ежедневная оценка назальных и глазных симптомов"
          />

          <Tile
            to="/medications"
            title="Лекарства"
            description="Планы приёма препаратов и отметки использования"
          />

          <Tile
            to="/asit"
            title="Курс АСИТ"
            description="Отслеживание терапии, дозировок и событий курса"
          />

          <Tile
            to="/calendar"
            title="Календарь"
            description="Цветовая оценка состояния по дням"
          />

          <Tile
            to="/reports"
            title="Отчёт для врача"
            description="Сводка по симптомам, лекарствам и тяжёлым дням"
          />

          <Tile
            to="/reminders"
            title="Напоминания"
            description="Уведомления о лекарствах, дневнике и событиях АСИТ"
          />
        </div>
      )}
    </div>
  );
}