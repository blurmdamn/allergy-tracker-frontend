import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { api, getApiError } from "../lib/api";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import {
  formatDate,
  getAsitStatusLabel,
  getSeverityLabel,
} from "../lib/format";
import { getLanguage } from "../lib/i18n";
import {
  ALLERGEN_LABELS,
  ALLERGY_SYMPTOM_LABELS,
  FREQUENCY_LABELS,
  SEVERITY_ORDER,
  STATISTICS_TEXT,
} from "../lib/statisticsContent";

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function subtractDays(days) {
  const date = new Date();
  date.setDate(date.getDate() - days + 1);
  return toIsoDate(date);
}

function subtractMonths(months) {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return toIsoDate(date);
}

function normalizeList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

function getCheckinDate(checkin) {
  return checkin.date || checkin.checkin_date || checkin.day || "";
}

function formatNumber(value) {
  if (value === null || value === undefined) return "—";

  const number = Number(value);

  if (Number.isNaN(number)) return "—";

  return Number.isInteger(number) ? String(number) : number.toFixed(2);
}

function getMonthName(monthNo, language) {
  const months = {
    ru: [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь",
    ],
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    kk: [
      "қаңтар",
      "ақпан",
      "наурыз",
      "сәуір",
      "мамыр",
      "маусым",
      "шілде",
      "тамыз",
      "қыркүйек",
      "қазан",
      "қараша",
      "желтоқсан",
    ],
  };

  return months[language]?.[monthNo - 1] || months.ru[monthNo - 1] || monthNo;
}

function getFrequencyLabel(value, language) {
  if (!value) return "—";

  return (
    FREQUENCY_LABELS[language]?.[value] ||
    FREQUENCY_LABELS.ru[value] ||
    value
  );
}

function getDictionaryLabel(value, dictionary, language) {
  if (!value) return "—";

  const key = String(value).trim();

  return dictionary[key]?.[language] || dictionary[key]?.ru || key;
}

function formatDictionaryList(items, dictionary, language) {
  const list = normalizeList(items);

  if (list.length === 0) return "—";

  return list
    .map((item) => getDictionaryLabel(item, dictionary, language))
    .join(", ");
}

function getRegimenLabel(timesPerDay, text) {
  if (!timesPerDay) return "—";

  return `${timesPerDay} ${text.timesPerDay}`;
}

function buildChartData(checkins) {
  return normalizeList(checkins)
    .map((item) => ({
      date: getCheckinDate(item),
      nasal_score: item.nasal_score ?? 0,
      ocular_score: item.ocular_score ?? 0,
      symptom_total_score: item.symptom_total_score ?? 0,
      day_total_score: item.day_total_score ?? 0,
    }))
    .filter((item) => item.date)
    .sort((a, b) => String(a.date).localeCompare(String(b.date)));
}

function buildSeverityDistribution(checkins) {
  const result = {
    none: 0,
    mild: 0,
    moderate: 0,
    high: 0,
    severe: 0,
  };

  normalizeList(checkins).forEach((item) => {
    const level = item.severity_level || "none";

    if (result[level] !== undefined) {
      result[level] += 1;
    }
  });

  return result;
}

function formatChartDate(value, language) {
  if (!value) return "";

  try {
    return new Intl.DateTimeFormat(
      language === "kk" ? "kk-KZ" : language === "en" ? "en-US" : "ru-RU",
      {
        day: "2-digit",
        month: "2-digit",
      }
    ).format(new Date(value));
  } catch {
    return value;
  }
}

function CustomTooltip({ active, payload, label, language }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
      <div className="mb-2 text-sm font-semibold text-slate-900">
        {formatDate(label, language)}
      </div>

      <div className="space-y-1">
        {payload.map((entry) => (
          <div
            key={entry.dataKey}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <span style={{ color: entry.color }}>{entry.name}</span>
            <span className="font-semibold text-slate-900">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function buildDoctorReport(data, text, language) {
  const stats = data?.stats || {};
  const profile = data?.profile || {};
  const allergy = data?.allergy || {};
  const dateFrom = data?.date_from;
  const dateTo = data?.date_to;

  const daysInPeriod = stats.days_in_period ?? 0;
  const filledDays = stats.filled_checkins_count ?? 0;
  const missedDays = Math.max(daysInPeriod - filledDays, 0);

  const fullName = profile.full_name || "—";

  const allergens = formatDictionaryList(
    allergy.allergens,
    ALLERGEN_LABELS,
    language
  );

  const symptoms = formatDictionaryList(
    allergy.symptoms,
    ALLERGY_SYMPTOM_LABELS,
    language
  );

  return `${text.reportPeriod}: ${formatDate(dateFrom, language)} — ${formatDate(
    dateTo,
    language
  )}.

${text.patient}: ${fullName}.
${text.relevantAllergens}: ${allergens}.
${text.notedSymptoms}: ${symptoms}.

${text.completedDiary} ${filledDays} ${text.outOf} ${daysInPeriod} ${
    text.days
  }. ${text.missedDaysText}: ${missedDays}.
${text.averageNasalText}: ${formatNumber(stats.average_nasal_score)}.
${text.averageOcularText}: ${formatNumber(stats.average_ocular_score)}.
${text.averageSymptomText}: ${formatNumber(stats.average_symptom_total_score)}.
${text.averageDayText}: ${formatNumber(stats.average_day_total_score)}.
${text.severeDaysText}: ${stats.severe_days_count ?? 0}.

${text.activeMedicationCoursesText}: ${
    stats.active_medication_courses_count ?? 0
  }.
${text.asitEventsText}: ${stats.asit_events_total ?? 0}.`;
}

function StatCard({ label, value, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>

      {description && (
        <div className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </div>
      )}
    </div>
  );
}

function QuickRangeButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
    >
      {children}
    </button>
  );
}

export default function Statistics() {
  const language = getLanguage();
  const text = STATISTICS_TEXT[language] || STATISTICS_TEXT.ru;

  const [dateFrom, setDateFrom] = React.useState(subtractDays(30));
  const [dateTo, setDateTo] = React.useState(todayIsoDate());
  const [data, setData] = React.useState(null);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    loadStatistics();
  }, []);

  async function loadStatistics() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/me/report/summary", {
        params: {
          date_from: dateFrom,
          date_to: dateTo,
        },
      });

      setData(response.data);
    } catch (err) {
      setError(getApiError(err, text.loadError));
    } finally {
      setLoading(false);
    }
  }

  function setQuickRange(type) {
    if (type === "7") {
      setDateFrom(subtractDays(7));
      setDateTo(todayIsoDate());
    }

    if (type === "30") {
      setDateFrom(subtractDays(30));
      setDateTo(todayIsoDate());
    }

    if (type === "90") {
      setDateFrom(subtractMonths(3));
      setDateTo(todayIsoDate());
    }
  }

  const stats = data?.stats || {};
  const checkins = normalizeList(data?.checkins);
  const activeMedications = normalizeList(data?.active_medications);
  const asitEvents = normalizeList(data?.asit_events);
  const allergy = data?.allergy || {};
  const profile = data?.profile || {};

  const chartData = React.useMemo(() => buildChartData(checkins), [checkins]);

  const severityDistribution = React.useMemo(
    () => buildSeverityDistribution(checkins),
    [checkins]
  );

  const daysInPeriod = stats.days_in_period ?? 0;
  const filledDays = stats.filled_checkins_count ?? 0;
  const missedDays = Math.max(daysInPeriod - filledDays, 0);
  const completionRate =
    daysInPeriod > 0 ? Math.round((filledDays / daysInPeriod) * 100) : 0;

  const doctorReport = data ? buildDoctorReport(data, text, language) : "";

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-linear-to-br from-emerald-50 via-white to-slate-50 p-6 shadow-sm sm:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Allergy Tracker
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {text.title}
          </h1>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
            {text.description}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            {text.period}
          </h2>
        </CardHeader>

        <CardBody>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  {text.dateFrom}
                </label>

                <input
                  type="date"
                  value={dateFrom}
                  onChange={(event) => setDateFrom(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  {text.dateTo}
                </label>

                <input
                  type="date"
                  value={dateTo}
                  onChange={(event) => setDateTo(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
                />
              </div>

              <button
                type="button"
                onClick={loadStatistics}
                disabled={loading}
                className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {text.show}
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <QuickRangeButton onClick={() => setQuickRange("7")}>
                {text.last7}
              </QuickRangeButton>

              <QuickRangeButton onClick={() => setQuickRange("30")}>
                {text.last30}
              </QuickRangeButton>

              <QuickRangeButton onClick={() => setQuickRange("90")}>
                {text.last90}
              </QuickRangeButton>
            </div>
          </div>
        </CardBody>
      </Card>

      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
          {error}
        </div>
      )}

      {loading && (
        <Card>
          <CardBody>
            <div className="text-sm text-slate-500">{text.loading}</div>
          </CardBody>
        </Card>
      )}

      {!loading && data && (
        <>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-slate-900">
                {text.summary}
              </h2>
            </CardHeader>

            <CardBody>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label={text.filledDays} value={filledDays} />
                <StatCard label={text.missedDays} value={missedDays} />
                <StatCard
                  label={text.completionRate}
                  value={`${completionRate}%`}
                />
                <StatCard
                  label={text.severeDays}
                  value={stats.severe_days_count ?? 0}
                />
                <StatCard
                  label={text.avgNasal}
                  value={formatNumber(stats.average_nasal_score)}
                />
                <StatCard
                  label={text.avgOcular}
                  value={formatNumber(stats.average_ocular_score)}
                />
                <StatCard
                  label={text.avgSymptomTotal}
                  value={formatNumber(stats.average_symptom_total_score)}
                />
                <StatCard
                  label={text.avgDayTotal}
                  value={formatNumber(stats.average_day_total_score)}
                />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {text.symptomDynamics}
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {text.chartDescription}
                </p>
              </div>
            </CardHeader>

            <CardBody>
              {chartData.length === 0 ? (
                <div className="text-sm text-slate-500">{text.noData}</div>
              ) : (
                <div className="h-97.5 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 20, right: 28, left: 8, bottom: 28 }}
                    >
                      <CartesianGrid strokeDasharray="4 4" stroke="#CBD5E1" />

                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12, fill: "#64748B" }}
                        tickFormatter={(value) =>
                          formatChartDate(value, language)
                        }
                        interval="preserveStartEnd"
                        label={{
                          value: text.xAxis,
                          position: "insideBottom",
                          offset: -14,
                          style: { fill: "#475569", fontSize: 12 },
                        }}
                      />

                      <YAxis
                        allowDecimals={false}
                        tick={{ fontSize: 12, fill: "#64748B" }}
                        label={{
                          value: text.yAxis,
                          angle: -90,
                          position: "insideLeft",
                          style: { fill: "#475569", fontSize: 12 },
                        }}
                      />

                      <Tooltip
                        content={<CustomTooltip language={language} />}
                      />

                      <Legend
                        verticalAlign="bottom"
                        wrapperStyle={{
                          paddingTop: 18,
                          fontSize: "13px",
                        }}
                      />

                      <Line
                        type="monotone"
                        dataKey="nasal_score"
                        name={text.nasalScore}
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />

                      <Line
                        type="monotone"
                        dataKey="ocular_score"
                        name={text.ocularScore}
                        stroke="#3B82F6"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />

                      <Line
                        type="monotone"
                        dataKey="symptom_total_score"
                        name={text.symptomTotalScore}
                        stroke="#F59E0B"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />

                      <Line
                        type="monotone"
                        dataKey="day_total_score"
                        name={text.dayTotalScore}
                        stroke="#8B5CF6"
                        strokeWidth={3}
                        strokeDasharray="7 5"
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardBody>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-slate-900">
                  {text.severityDistribution}
                </h2>
              </CardHeader>

              <CardBody>
                <div className="space-y-3">
                  {SEVERITY_ORDER.map((level) => (
                    <div
                      key={level}
                      className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                    >
                      <span className="text-sm font-medium text-slate-700">
                        {getSeverityLabel(level, language)}
                      </span>

                      <span className="text-lg font-semibold text-slate-900">
                        {severityDistribution[level]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-slate-900">
                  {text.patientInfo}
                </h2>
              </CardHeader>

              <CardBody>
                <div className="space-y-3 text-sm leading-6 text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-900">
                      {text.fullName}:
                    </span>{" "}
                    {profile.full_name || "—"}
                  </div>

                  <div>
                    <span className="font-semibold text-slate-900">
                      {text.birthDate}:
                    </span>{" "}
                    {formatDate(profile.birth_date, language)}
                  </div>

                  <div>
                    <span className="font-semibold text-slate-900">
                      {text.sex}:
                    </span>{" "}
                    {profile.sex || "—"}
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-slate-900">
                {text.allergyInfo}
              </h2>
            </CardHeader>

            <CardBody>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">{text.allergens}</div>

                  <div className="mt-2 text-sm leading-6 text-slate-800">
                    {formatDictionaryList(
                      allergy.allergens,
                      ALLERGEN_LABELS,
                      language
                    )}
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">{text.symptoms}</div>

                  <div className="mt-2 text-sm leading-6 text-slate-800">
                    {formatDictionaryList(
                      allergy.symptoms,
                      ALLERGY_SYMPTOM_LABELS,
                      language
                    )}
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">
                    {text.activeMonths}
                  </div>

                  <div className="mt-2 text-sm leading-6 text-slate-800">
                    {normalizeList(allergy.active_months)
                      .map((month) => getMonthName(month, language))
                      .join(", ") || "—"}
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">{text.frequency}</div>

                  <div className="mt-2 text-sm leading-6 text-slate-800">
                    {getFrequencyLabel(allergy.frequency, language)}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-slate-900">
                  {text.activeMedications}
                </h2>
              </CardHeader>

              <CardBody>
                {activeMedications.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    {text.noActiveMedications}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {activeMedications.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-slate-200 bg-white p-4"
                      >
                        <div className="font-semibold text-slate-900">
                          {item.medication_name || item.medication_code}
                        </div>

                        <div className="mt-2 text-sm leading-6 text-slate-500">
                          {text.dose}: {item.dose_text || "—"}
                        </div>

                        <div className="text-sm leading-6 text-slate-500">
                          {text.regimen}:{" "}
                          {getRegimenLabel(item.times_per_day, text)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-slate-900">
                  {text.asitEvents}
                </h2>
              </CardHeader>

              <CardBody>
                {asitEvents.length === 0 ? (
                  <p className="text-sm text-slate-500">{text.noAsitEvents}</p>
                ) : (
                  <div className="space-y-3">
                    {asitEvents.map((event) => (
                      <div
                        key={event.id}
                        className="rounded-2xl border border-slate-200 bg-white p-4"
                      >
                        <div className="font-semibold text-slate-900">
                          {formatDate(event.planned_date, language)}
                        </div>

                        <div className="mt-2 text-sm leading-6 text-slate-500">
                          {text.eventDose}: {event.dose_value || "—"}
                        </div>

                        <div className="text-sm leading-6 text-slate-500">
                          {text.eventStatus}:{" "}
                          {getAsitStatusLabel(event.status, language)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {text.doctorReport}
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {text.doctorReportDescription}
                </p>
              </div>
            </CardHeader>

            <CardBody>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 text-sm font-semibold text-slate-900">
                  {text.reportTextTitle}
                </div>

                <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-slate-700">
                  {doctorReport}
                </pre>
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}