import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "../components/ui/Card";

export default function Placeholder({ title = "Страница в разработке" }) {
  return (
    <Card>
      <CardBody>
        <p className="text-sm font-semibold text-emerald-600">
          Allergy Tracker
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Эта страница будет реализована следующим этапом. Сейчас создана
          основная структура навигации, авторизации и панели пациента.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          Вернуться на главную
        </Link>
      </CardBody>
    </Card>
  );
}