import React from "react";
import { Link } from "react-router-dom";
import { api, getApiError } from "../lib/api";
import { getRole } from "../lib/role";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import {
  formatDate,
  getSeverityClass,
  getSeverityLabel,
} from "../lib/format";
import { getLanguage, t } from "../lib/i18n";

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

function StatCard({ label, value, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
      {description && (
        <div className="mt-1 text-sm text-slate-500">{description}</div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const role = getRole();
  const language = getLanguage();

  const [dashboard, setDashboard] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const roleTitle =
    role === "patient"
      ? t("dashboard.rolePatient", language)
      : t("dashboard.roleUser", language);

  React.useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/me/dashboard");
      setDashboard(response.data);
    } catch (err) {
      setError(getApiError(err, "Не удалось загрузить данные панели"));
    } finally {
      setLoading(false);
    }
  }

  const todayCheckin = dashboard?.today_checkin;
  const nextAsitEvent = dashboard?.next_asit_event;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="text-xl font-semibold text-slate-900">
            {t("dashboard.welcome", language)}
          </div>

          <div className="text-sm text-slate-500">
            {t("dashboard.loggedAs", language)}: {roleTitle}
          </div>
        </CardHeader>

        <CardBody>
          <div className="text-sm leading-6 text-slate-600">
            {t("dashboard.description", language)}
          </div>
        </CardBody>
      </Card>

      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <Card>
          <CardBody>
            <div className="text-sm text-slate-500">
              {t("common.loading", language)}
            </div>
          </CardBody>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label={t("dashboard.todayDiary", language)}
            value={
              todayCheckin?.filled
                ? t("dashboard.filled", language)
                : t("dashboard.notFilled", language)
            }
            description={
              todayCheckin?.filled
                ? `${t("dashboard.totalScore", language)}: ${
                    todayCheckin?.day_total_score ?? 0
                  }`
                : t("dashboard.fillDiaryToday", language)
            }
          />

          <StatCard
            label={t("dashboard.activeMedications", language)}
            value={dashboard?.active_medications_count ?? 0}
            description={t("dashboard.currentMedicationsCount", language)}
          />

          <StatCard
            label={t("dashboard.severeDays7", language)}
            value={dashboard?.severe_days_last_7 ?? 0}
            description={t("dashboard.severeDaysDescription", language)}
          />

          <StatCard
            label={t("dashboard.streak", language)}
            value={dashboard?.streak ?? 0}
            description={t("dashboard.daysInRow", language)}
          />
        </div>
      )}

      {!loading && todayCheckin && (
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-lg font-semibold text-slate-900">
                  {t("dashboard.todayState", language)}
                </div>

                <div className="text-sm text-slate-500">
                  {t("dashboard.date", language)}:{" "}
                  {formatDate(todayCheckin.date, language)}
                </div>
              </div>

              <span
                className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${getSeverityClass(
                  todayCheckin.severity_level
                )}`}
              >
                {getSeverityLabel(todayCheckin.severity_level, language)}
              </span>
            </div>
          </CardHeader>

          <CardBody>
            {todayCheckin.filled ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div>
                  <div className="text-sm text-slate-500">
                    {t("dashboard.nasalSymptoms", language)}
                  </div>
                  <div className="mt-1 text-xl font-semibold text-slate-900">
                    {todayCheckin.nasal_score ?? 0}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-500">
                    {t("dashboard.ocularSymptoms", language)}
                  </div>
                  <div className="mt-1 text-xl font-semibold text-slate-900">
                    {todayCheckin.ocular_score ?? 0}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-500">
                    {t("dashboard.symptomsTotal", language)}
                  </div>
                  <div className="mt-1 text-xl font-semibold text-slate-900">
                    {todayCheckin.symptom_total_score ?? 0}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-500">
                    {t("dashboard.dayTotal", language)}
                  </div>
                  <div className="mt-1 text-xl font-semibold text-slate-900">
                    {todayCheckin.day_total_score ?? 0}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-600">
                  {t("dashboard.noDiaryToday", language)}
                </div>

                <Link
                  to="/daily-checkin"
                  className="inline-flex w-fit rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                >
                  {t("dashboard.fillDiary", language)}
                </Link>
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {!loading && (
        <Card>
          <CardHeader>
            <div className="text-lg font-semibold text-slate-900">
              {t("dashboard.nextAsitEvent", language)}
            </div>
          </CardHeader>

          <CardBody>
            {nextAsitEvent ? (
              <div className="space-y-2 text-sm text-slate-600">
                <div>
                  <span className="font-medium text-slate-900">
                    {t("dashboard.date", language)}:
                  </span>{" "}
                  {formatDate(nextAsitEvent.planned_date, language)}
                </div>

                <div>
                  <span className="font-medium text-slate-900">
                    {t("dashboard.status", language)}:
                  </span>{" "}
                  {nextAsitEvent.status}
                </div>

                {nextAsitEvent.dose_value && (
                  <div>
                    <span className="font-medium text-slate-900">
                      {t("dashboard.dose", language)}:
                    </span>{" "}
                    {nextAsitEvent.dose_value}
                  </div>
                )}

                {nextAsitEvent.note && (
                  <div>
                    <span className="font-medium text-slate-900">
                      {t("dashboard.note", language)}:
                    </span>{" "}
                    {nextAsitEvent.note}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-slate-500">
                {t("dashboard.noNextAsitEvent", language)}
              </div>
            )}
          </CardBody>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Tile
          to="/profile"
          title={t("tiles.profileTitle", language)}
          description={t("tiles.profileDescription", language)}
        />

        <Tile
          to="/allergies"
          title={t("tiles.allergiesTitle", language)}
          description={t("tiles.allergiesDescription", language)}
        />

        <Tile
          to="/daily-checkin"
          title={t("tiles.checkinTitle", language)}
          description={t("tiles.checkinDescription", language)}
        />

        <Tile
          to="/medications"
          title={t("tiles.medicationsTitle", language)}
          description={t("tiles.medicationsDescription", language)}
        />

        <Tile
          to="/asit"
          title={t("tiles.asitTitle", language)}
          description={t("tiles.asitDescription", language)}
        />

        <Tile
          to="/calendar"
          title={t("tiles.calendarTitle", language)}
          description={t("tiles.calendarDescription", language)}
        />

        <Tile
          to="/reports"
          title={t("tiles.reportsTitle", language)}
          description={t("tiles.reportsDescription", language)}
        />

        <Tile
          to="/reminders"
          title={t("tiles.remindersTitle", language)}
          description={t("tiles.remindersDescription", language)}
        />
      </div>
    </div>
  );
}