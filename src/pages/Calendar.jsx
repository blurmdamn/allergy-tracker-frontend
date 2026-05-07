import React from "react";
import { useNavigate } from "react-router-dom";
import { api, getApiError } from "../lib/api";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { getLanguage } from "../lib/i18n";

const TEXT = {
  ru: {
    title: "Календарь",
    description:
      "Отслеживайте заполнение дневника симптомов по дням. Пропущенные дни отмечены серым, заполненные дни окрашиваются по тяжести состояния.",
    previousMonth: "Предыдущий месяц",
    nextMonth: "Следующий месяц",
    loading: "Загружаем календарь...",
    loadError: "Не удалось загрузить календарь",
    today: "Сегодня",
    missed: "Пропущено",
    future: "Будущий день",
    noSymptoms: "Нет симптомов",
    mild: "Лёгкие симптомы",
    moderate: "Умеренные симптомы",
    high: "Выраженные симптомы",
    severe: "Тяжёлый день",
    legend: "Легенда",
    completedDays: "Заполнено дней",
    missedDays: "Пропущено дней",
    selectedDay: "Выбранный день",
    fillSurvey: "Заполнить опрос",
    editSurvey: "Редактировать опрос",
    close: "Закрыть",
    daySummary: "Сводка дня",
    nasalScore: "Назальный балл",
    ocularScore: "Глазной балл",
    symptomScore: "Симптомы всего",
    medicationScore: "Лекарства",
    totalScore: "Итоговый балл",
    severity: "Тяжесть",
    noEntry:
      "За этот день дневник симптомов ещё не заполнен. Нажмите кнопку ниже, чтобы пройти опрос.",
    futureText:
      "Этот день ещё не наступил. Его можно будет заполнить позже.",
    asitEvent: "Событие АСИТ",
  },
  en: {
    title: "Calendar",
    description:
      "Track symptom diary completion by day. Missed days are gray, completed days are colored by severity.",
    previousMonth: "Previous month",
    nextMonth: "Next month",
    loading: "Loading calendar...",
    loadError: "Failed to load calendar",
    today: "Today",
    missed: "Missed",
    future: "Future day",
    noSymptoms: "No symptoms",
    mild: "Mild symptoms",
    moderate: "Moderate symptoms",
    high: "Pronounced symptoms",
    severe: "Severe day",
    legend: "Legend",
    completedDays: "Completed days",
    missedDays: "Missed days",
    selectedDay: "Selected day",
    fillSurvey: "Fill survey",
    editSurvey: "Edit survey",
    close: "Close",
    daySummary: "Day summary",
    nasalScore: "Nasal score",
    ocularScore: "Ocular score",
    symptomScore: "Symptoms total",
    medicationScore: "Medication",
    totalScore: "Total score",
    severity: "Severity",
    noEntry:
      "The symptom diary has not been filled for this day yet. Click the button below to complete it.",
    futureText:
      "This day has not come yet. You will be able to fill it in later.",
    asitEvent: "ASIT event",
  },
  kk: {
    title: "Күнтізбе",
    description:
      "Симптомдар күнделігінің күндер бойынша толтырылуын бақылаңыз. Өткізілген күндер сұр түспен, толтырылған күндер жағдайдың ауырлығына қарай түспен белгіленеді.",
    previousMonth: "Алдыңғы ай",
    nextMonth: "Келесі ай",
    loading: "Күнтізбе жүктелуде...",
    loadError: "Күнтізбені жүктеу мүмкін болмады",
    today: "Бүгін",
    missed: "Өткізілді",
    future: "Болашақ күн",
    noSymptoms: "Симптомдар жоқ",
    mild: "Жеңіл симптомдар",
    moderate: "Орташа симптомдар",
    high: "Айқын симптомдар",
    severe: "Ауыр күн",
    legend: "Түсіндірме",
    completedDays: "Толтырылған күндер",
    missedDays: "Өткізілген күндер",
    selectedDay: "Таңдалған күн",
    fillSurvey: "Сауалнаманы толтыру",
    editSurvey: "Сауалнаманы өзгерту",
    close: "Жабу",
    daySummary: "Күн қорытындысы",
    nasalScore: "Мұрын баллы",
    ocularScore: "Көз баллы",
    symptomScore: "Симптомдар жалпы",
    medicationScore: "Дәрілер",
    totalScore: "Жалпы балл",
    severity: "Ауырлық",
    noEntry:
      "Бұл күн үшін симптомдар күнделігі әлі толтырылмаған. Сауалнамадан өту үшін төмендегі батырманы басыңыз.",
    futureText:
      "Бұл күн әлі келген жоқ. Оны кейін толтыруға болады.",
    asitEvent: "АСИТ оқиғасы",
  },
};

const WEEKDAYS = {
  ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  kk: ["Дс", "Сс", "Ср", "Бс", "Жм", "Сб", "Жс"],
};

const MONTHS = {
  ru: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
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
    "Қаңтар",
    "Ақпан",
    "Наурыз",
    "Сәуір",
    "Мамыр",
    "Маусым",
    "Шілде",
    "Тамыз",
    "Қыркүйек",
    "Қазан",
    "Қараша",
    "Желтоқсан",
  ],
};

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getMonthStart(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getMonthEnd(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function normalizeList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

function getCheckinDate(checkin) {
  return (
    checkin.date ||
    checkin.checkin_date ||
    checkin.day ||
    checkin.created_for_date ||
    ""
  );
}

function normalizeSeverity(value) {
  if (!value) return "none";

  if (["none", "mild", "moderate", "high", "severe"].includes(value)) {
    return value;
  }

  return "none";
}

function getSeverityLabel(level, text) {
  if (level === "none") return text.noSymptoms;
  if (level === "mild") return text.mild;
  if (level === "moderate") return text.moderate;
  if (level === "high") return text.high;
  if (level === "severe") return text.severe;

  return level || "—";
}

function getDayClass({ isFuture, hasCheckin, severity }) {
  if (isFuture) {
    return "border-slate-100 bg-white text-slate-300";
  }

  if (!hasCheckin) {
    return "border-slate-200 bg-slate-100 text-slate-500 hover:bg-slate-200";
  }

  if (severity === "none") {
    return "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100";
  }

  if (severity === "mild") {
    return "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100";
  }

  if (severity === "moderate") {
    return "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100";
  }

  if (severity === "high") {
    return "border-orange-200 bg-orange-50 text-orange-800 hover:bg-orange-100";
  }

  if (severity === "severe") {
    return "border-red-200 bg-red-50 text-red-800 hover:bg-red-100";
  }

  return "border-slate-200 bg-white text-slate-700";
}

function buildCalendarDays(monthDate, checkinsByDate, asitEventsByDate) {
  const start = getMonthStart(monthDate);
  const end = getMonthEnd(monthDate);
  const today = todayIsoDate();

  const firstWeekday = (start.getDay() + 6) % 7;
  const days = [];

  for (let i = 0; i < firstWeekday; i += 1) {
    days.push({
      key: `empty-start-${i}`,
      empty: true,
    });
  }

  for (let day = 1; day <= end.getDate(); day += 1) {
    const dateObj = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
    const iso = toIsoDate(dateObj);
    const checkin = checkinsByDate.get(iso);
    const severity = normalizeSeverity(checkin?.severity_level);
    const isFuture = iso > today;

    days.push({
      key: iso,
      date: iso,
      day,
      isToday: iso === today,
      isFuture,
      hasCheckin: Boolean(checkin),
      checkin,
      severity,
      asitEvents: asitEventsByDate.get(iso) || [],
    });
  }

  while (days.length % 7 !== 0) {
    days.push({
      key: `empty-end-${days.length}`,
      empty: true,
    });
  }

  return days;
}

function SummaryStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-bold text-slate-900">{value}</div>
    </div>
  );
}

function LegendItem({ className, label }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <span className={`h-3 w-3 rounded-full border ${className}`} />
      <span>{label}</span>
    </div>
  );
}

function DayModal({ day, text, onClose, onOpenSurvey }) {
  if (!day) return null;

  const checkin = day.checkin;
  const severity = normalizeSeverity(checkin?.severity_level);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/35 px-4 py-4 sm:items-center">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-emerald-600">
                {text.selectedDay}
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {day.date}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              {text.close}
            </button>
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-5 py-5 sm:px-6">
          {day.isFuture ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
              {text.futureText}
            </div>
          ) : !day.hasCheckin ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
                {text.noEntry}
              </div>

              <button
                type="button"
                onClick={() => onOpenSurvey(day.date)}
                className="w-full rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                {text.fillSurvey}
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${getDayClass(
                  {
                    isFuture: false,
                    hasCheckin: true,
                    severity,
                  }
                )}`}
              >
                {text.severity}: {getSeverityLabel(severity, text)}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <SummaryStat
                  label={text.nasalScore}
                  value={checkin.nasal_score ?? "—"}
                />
                <SummaryStat
                  label={text.ocularScore}
                  value={checkin.ocular_score ?? "—"}
                />
                <SummaryStat
                  label={text.symptomScore}
                  value={checkin.symptom_total_score ?? "—"}
                />
                <SummaryStat
                  label={text.medicationScore}
                  value={checkin.medication_score ?? "—"}
                />
              </div>

              <SummaryStat
                label={text.totalScore}
                value={checkin.day_total_score ?? "—"}
              />

              {day.asitEvents.length > 0 && (
                <div className="rounded-2xl border border-violet-100 bg-violet-50 px-4 py-3 text-sm leading-6 text-violet-800">
                  {text.asitEvent}: {day.asitEvents.length}
                </div>
              )}

              <button
                type="button"
                onClick={() => onOpenSurvey(day.date)}
                className="w-full rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                {text.editSurvey}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Calendar() {
  const navigate = useNavigate();
  const language = getLanguage();
  const text = TEXT[language] || TEXT.ru;

  const [monthDate, setMonthDate] = React.useState(getMonthStart(new Date()));
  const [checkins, setCheckins] = React.useState([]);
  const [asitEvents, setAsitEvents] = React.useState([]);
  const [selectedDay, setSelectedDay] = React.useState(null);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    loadCalendar();
  }, [monthDate]);

  async function loadCalendar() {
    try {
      setLoading(true);
      setError("");

      const dateFrom = toIsoDate(getMonthStart(monthDate));
      const dateTo = toIsoDate(getMonthEnd(monthDate));

      const response = await api.get("/me/report/summary", {
        params: {
          date_from: dateFrom,
          date_to: dateTo,
        },
      });

      const data = response.data || {};

      setCheckins(normalizeList(data.checkins || data.daily_checkins));
      setAsitEvents(normalizeList(data.asit_events));
    } catch (err) {
      setError(getApiError(err, text.loadError));
    } finally {
      setLoading(false);
    }
  }

  function openSurvey(date) {
    navigate(`/symptom-monitoring?date=${date}`);
  }

  const checkinsByDate = React.useMemo(() => {
    const map = new Map();

    checkins.forEach((checkin) => {
      const date = getCheckinDate(checkin);

      if (date) {
        map.set(date, checkin);
      }
    });

    return map;
  }, [checkins]);

  const asitEventsByDate = React.useMemo(() => {
    const map = new Map();

    asitEvents.forEach((event) => {
      const date = event.planned_date || event.actual_date;

      if (!date) return;

      const list = map.get(date) || [];
      list.push(event);
      map.set(date, list);
    });

    return map;
  }, [asitEvents]);

  const days = React.useMemo(
    () => buildCalendarDays(monthDate, checkinsByDate, asitEventsByDate),
    [monthDate, checkinsByDate, asitEventsByDate]
  );

  const today = todayIsoDate();
  const monthEnd = getMonthEnd(monthDate);
  const maxPastDay = Math.min(
    monthEnd.getDate(),
    monthDate.getFullYear() === new Date().getFullYear() &&
      monthDate.getMonth() === new Date().getMonth()
      ? new Date().getDate()
      : monthEnd.getDate()
  );

  const completedDays = checkins.length;
  const missedDays = days.filter(
    (day) =>
      !day.empty &&
      !day.isFuture &&
      day.date <= today &&
      !day.hasCheckin &&
      day.day <= maxPastDay
  ).length;

  const monthTitle = `${MONTHS[language]?.[monthDate.getMonth()] || MONTHS.ru[monthDate.getMonth()]} ${monthDate.getFullYear()}`;

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-linear-to-br from-emerald-50 via-white to-slate-50 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
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

          <button
            type="button"
            onClick={() => openSurvey(today)}
            className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            {text.today}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <SummaryStat label={text.completedDays} value={completedDays} />
        <SummaryStat label={text.missedDays} value={missedDays} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {monthTitle}
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMonthDate((current) => addMonths(current, -1))}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                ←
              </button>

              <button
                type="button"
                onClick={() => setMonthDate((current) => addMonths(current, 1))}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                →
              </button>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          {loading ? (
            <div className="text-sm text-slate-500">{text.loading}</div>
          ) : (
            <div className="space-y-5">
              <div>
                <div className="mb-3 grid grid-cols-7 gap-2">
                  {(WEEKDAYS[language] || WEEKDAYS.ru).map((day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-semibold uppercase tracking-wide text-slate-400"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {days.map((day) => {
                    if (day.empty) {
                      return <div key={day.key} className="aspect-square" />;
                    }

                    const className = getDayClass(day);

                    return (
                      <button
                        key={day.key}
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className={`relative aspect-square rounded-2xl border p-2 text-left transition ${className} ${
                          day.isToday ? "ring-2 ring-emerald-500 ring-offset-2" : ""
                        }`}
                      >
                        <span className="text-sm font-bold sm:text-base">
                          {day.day}
                        </span>

                        <div className="absolute bottom-2 left-2 flex gap-1">
                          {day.asitEvents.length > 0 && (
                            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                          )}

                          {day.hasCheckin && (
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-700/60" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  {text.legend}
                </h3>

                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  <LegendItem
                    className="border-slate-200 bg-slate-100"
                    label={text.missed}
                  />
                  <LegendItem
                    className="border-slate-200 bg-slate-50"
                    label={text.noSymptoms}
                  />
                  <LegendItem
                    className="border-emerald-200 bg-emerald-50"
                    label={text.mild}
                  />
                  <LegendItem
                    className="border-amber-200 bg-amber-50"
                    label={text.moderate}
                  />
                  <LegendItem
                    className="border-orange-200 bg-orange-50"
                    label={text.high}
                  />
                  <LegendItem
                    className="border-red-200 bg-red-50"
                    label={text.severe}
                  />
                </div>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {selectedDay && (
        <DayModal
          day={selectedDay}
          text={text}
          onClose={() => setSelectedDay(null)}
          onOpenSurvey={openSurvey}
        />
      )}
    </div>
  );
}