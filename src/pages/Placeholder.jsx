import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "../components/ui/Card";
import { getLanguage, t } from "../lib/i18n";

export default function Placeholder({ title }) {
  const language = getLanguage();

  return (
    <Card>
      <CardBody>
        <p className="text-sm font-semibold text-emerald-600">
          Allergy Tracker
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-slate-900">
          {title || t("placeholder.title", language)}
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          {t("placeholder.text", language)}
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          {t("common.backToHome", language)}
        </Link>
      </CardBody>
    </Card>
  );
}