import React from "react";
import { api, getApiError } from "../lib/api";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { getLanguage } from "../lib/i18n";
import {
    ASIT_REGIMENS,
    ASIT_SCHEDULE_TEXT,
} from "../lib/asitScheduleContent";

function todayIsoDate() {
    return new Date().toISOString().slice(0, 10);
}

function addDays(dateString, days) {
    if (!dateString || !days) return "";

    const date = new Date(`${dateString}T00:00:00`);
    date.setDate(date.getDate() + Number(days));

    return date.toISOString().slice(0, 10);
}

function diffDays(targetDate) {
    if (!targetDate) return null;

    const today = new Date(`${todayIsoDate()}T00:00:00`);
    const target = new Date(`${targetDate}T00:00:00`);

    return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function normalizeList(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.items)) return data.items;
    if (Array.isArray(data?.data)) return data.data;
    return [];
}

function getRegimenLabel(value, text) {
    if (value === "conventional") return text.conventional;
    if (value === "daily") return text.daily;
    if (value === "accelerated") return text.accelerated;

    return "—";
}

function getStatusLabel(status, text) {
    if (status === "done") return text.done;
    if (status === "skipped") return text.skipped;
    if (status === "rescheduled") return text.rescheduled;

    return text.planned;
}

function sortEvents(events) {
    return [...events].sort((a, b) => {
        const aDate = a.planned_date || a.actual_date || "";
        const bDate = b.planned_date || b.actual_date || "";

        return String(aDate).localeCompare(String(bDate));
    });
}

function getNearestPlannedEvent(events) {
    const sorted = sortEvents(events);

    return (
        sorted.find(
            (event) => event.status === "planned" || event.status === "rescheduled"
        ) || null
    );
}

function getLastDoneEvent(events) {
    const doneEvents = events
        .filter((event) => event.status === "done")
        .sort((a, b) => {
            const aDate = a.actual_date || a.planned_date || "";
            const bDate = b.actual_date || b.planned_date || "";

            return String(bDate).localeCompare(String(aDate));
        });

    return doneEvents[0] || null;
}

function ReminderCard({ nextEventDate, text }) {
    const days = diffDays(nextEventDate);

    let message = text.noReminder;
    let className = "border-slate-200 bg-slate-50 text-slate-700";

    if (days !== null && days < 0) {
        message = text.overdueReminder;
        className = "border-red-200 bg-red-50 text-red-700";
    } else if (days === 0) {
        message = text.todayReminder;
        className = "border-amber-200 bg-amber-50 text-amber-800";
    } else if (days !== null && days <= 7) {
        message = text.weekReminder;
        className = "border-emerald-200 bg-emerald-50 text-emerald-800";
    }

    return (
        <div className={`rounded-3xl border p-5 ${className}`}>
            <div className="text-sm font-semibold">{text.reminderTitle}</div>

            <div className="mt-2 text-sm leading-6">{message}</div>

            {days !== null && (
                <div className="mt-4 inline-flex rounded-2xl bg-white/70 px-3 py-2 text-sm font-semibold">
                    {text.daysLeft}: {days}
                </div>
            )}
        </div>
    );
}

export default function AsitSchedule() {
    const language = getLanguage();
    const text = ASIT_SCHEDULE_TEXT[language] || ASIT_SCHEDULE_TEXT.ru;

    const [planId, setPlanId] = React.useState(null);
    const [eventId, setEventId] = React.useState(null);

    const [regimen, setRegimen] = React.useState("conventional");
    const [startedAt, setStartedAt] = React.useState(todayIsoDate());
    const [lastDoseDate, setLastDoseDate] = React.useState("");
    const [intervalDays, setIntervalDays] = React.useState("7");
    const [doseUnit, setDoseUnit] = React.useState("");

    const [nextEventDate, setNextEventDate] = React.useState("");
    const [doseValue, setDoseValue] = React.useState("");

    const [events, setEvents] = React.useState([]);

    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [markingDone, setMarkingDone] = React.useState(false);

    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState("");

    React.useEffect(() => {
        loadPlan();
    }, []);

    async function loadPlan() {
        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const plansRes = await api.get("/me/asit/plans");
            const plans = normalizeList(plansRes.data);
            const activePlan = plans.find((item) => item.is_active) || plans[0] || null;

            if (!activePlan) {
                setNextEventDate(addDays(todayIsoDate(), 7));
                return;
            }

            setPlanId(activePlan.id);
            setRegimen(activePlan.regimen || "conventional");
            setStartedAt(activePlan.started_at || todayIsoDate());
            setIntervalDays(
                activePlan.interval_days !== null && activePlan.interval_days !== undefined
                    ? String(activePlan.interval_days)
                    : "7"
            );
            setDoseUnit(activePlan.dose_unit || "");

            const eventsRes = await api.get(`/me/asit/plans/${activePlan.id}/events`);
            const loadedEvents = sortEvents(normalizeList(eventsRes.data));

            const nearestPlanned = getNearestPlannedEvent(loadedEvents);
            const lastDone = getLastDoneEvent(loadedEvents);

            setEvents(loadedEvents);

            if (lastDone) {
                setLastDoseDate(lastDone.actual_date || lastDone.planned_date || "");
            }

            if (nearestPlanned) {
                setEventId(nearestPlanned.id);
                setNextEventDate(nearestPlanned.planned_date || "");
                setDoseValue(nearestPlanned.dose_value || "");
            } else {
                const baseDate =
                    lastDone?.actual_date ||
                    lastDone?.planned_date ||
                    activePlan.started_at ||
                    todayIsoDate();

                setNextEventDate(addDays(baseDate, activePlan.interval_days || 7));
            }
        } catch (err) {
            setError(getApiError(err, text.loadError));
        } finally {
            setLoading(false);
        }
    }

    async function savePlan() {
        const payload = {
            regimen,
            interval_days:
                intervalDays === "" || intervalDays === null
                    ? null
                    : Number(intervalDays),
            dose_unit: doseUnit || null,
            started_at: startedAt || null,
        };

        if (planId) {
            const response = await api.patch(`/me/asit/plans/${planId}`, payload);
            return response.data;
        }

        const response = await api.post("/me/asit/plans", payload);
        return response.data;
    }

    async function saveNextEvent(savedPlanId) {
        if (!nextEventDate) return null;

        const payload = {
            planned_date: nextEventDate,
            dose_value: doseValue || null,
        };

        if (eventId) {
            const response = await api.patch(`/me/asit/events/${eventId}`, {
                ...payload,
                status: "planned",
            });

            return response.data;
        }

        const response = await api.post(
            `/me/asit/plans/${savedPlanId}/events`,
            payload
        );

        return response.data;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const savedPlan = await savePlan();
            const savedPlanId = savedPlan.id;

            setPlanId(savedPlanId);
            setRegimen(savedPlan.regimen || regimen);
            setStartedAt(savedPlan.started_at || startedAt);
            setIntervalDays(
                savedPlan.interval_days !== null && savedPlan.interval_days !== undefined
                    ? String(savedPlan.interval_days)
                    : intervalDays
            );
            setDoseUnit(savedPlan.dose_unit || doseUnit);

            const savedEvent = await saveNextEvent(savedPlanId);

            if (savedEvent) {
                setEventId(savedEvent.id);
                setNextEventDate(savedEvent.planned_date || nextEventDate);
                setDoseValue(savedEvent.dose_value || doseValue);
            }

            setSuccess(text.saved);
            await loadPlan();
        } catch (err) {
            setError(getApiError(err, text.saveError));
        } finally {
            setSaving(false);
        }
    }

    function calculateNextEventDate() {
        const baseDate = lastDoseDate || startedAt;

        if (baseDate && intervalDays) {
            setNextEventDate(addDays(baseDate, intervalDays));
        }
    }

    async function markCurrentEventDone() {
        if (!eventId || !nextEventDate) return;

        try {
            setMarkingDone(true);
            setError("");
            setSuccess("");

            await api.patch(`/me/asit/events/${eventId}`, {
                status: "done",
                actual_date: nextEventDate,
                planned_date: nextEventDate,
                dose_value: doseValue || null,
            });

            const newNextDate = addDays(nextEventDate, intervalDays || 7);

            setLastDoseDate(nextEventDate);
            setEventId(null);
            setNextEventDate(newNextDate);
            setSuccess(text.markedDone);

            await loadPlan();
        } catch (err) {
            setError(getApiError(err, text.saveError));
        } finally {
            setMarkingDone(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-linear-to-br from-emerald-50 via-white to-slate-50 p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
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

                    <div className="rounded-3xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800 lg:max-w-sm">
                        {text.doctorWarning}
                    </div>
                </div>
            </div>

            {error && (
                <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                    {error}
                </div>
            )}

            {success && (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700">
                    {success}
                </div>
            )}

            {loading ? (
                <Card>
                    <CardBody>
                        <div className="text-sm text-slate-500">{text.loading}</div>
                    </CardBody>
                </Card>
            ) : (
                <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                    <Card>
                        <CardHeader>
                            <h2 className="text-xl font-semibold text-slate-900">
                                {text.subtitle}
                            </h2>
                        </CardHeader>

                        <CardBody>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <section>
                                    <label className="mb-3 block text-sm font-semibold text-slate-900">
                                        {text.regimen}
                                    </label>

                                    <div className="grid gap-3 md:grid-cols-3">
                                        {ASIT_REGIMENS.map((item) => {
                                            const active = regimen === item.value;

                                            return (
                                                <button
                                                    key={item.value}
                                                    type="button"
                                                    onClick={() => setRegimen(item.value)}
                                                    className={`rounded-3xl border p-4 text-left transition ${active
                                                            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                                        }`}
                                                >
                                                    <div className="font-semibold">
                                                        {text[item.labelKey]}
                                                    </div>

                                                    <div className="mt-2 text-sm leading-6 opacity-80">
                                                        {item.description[language] || item.description.ru}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </section>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            {text.startDate}
                                        </label>

                                        <input
                                            type="date"
                                            value={startedAt}
                                            onChange={(event) => setStartedAt(event.target.value)}
                                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            {text.lastDoseDate}
                                        </label>

                                        <input
                                            type="date"
                                            value={lastDoseDate}
                                            onChange={(event) => setLastDoseDate(event.target.value)}
                                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
                                        />

                                        <p className="mt-2 text-xs leading-5 text-slate-500">
                                            {text.lastDoseDateHint}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            {text.intervalDays}
                                        </label>

                                        <input
                                            type="number"
                                            min="1"
                                            value={intervalDays}
                                            onChange={(event) => setIntervalDays(event.target.value)}
                                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            {text.doseUnit}
                                        </label>

                                        <input
                                            type="text"
                                            value={doseUnit}
                                            onChange={(event) => setDoseUnit(event.target.value)}
                                            placeholder={text.doseUnitPlaceholder}
                                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            {text.nextEventDate}
                                        </label>

                                        <input
                                            type="date"
                                            value={nextEventDate}
                                            onChange={(event) => setNextEventDate(event.target.value)}
                                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
                                        />

                                        <button
                                            type="button"
                                            onClick={calculateNextEventDate}
                                            className="mt-2 inline-flex w-fit items-center rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                                        >
                                            {text.calculateNextDate}
                                        </button>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            {text.doseValue}
                                        </label>

                                        <input
                                            type="text"
                                            value={doseValue}
                                            onChange={(event) => setDoseValue(event.target.value)}
                                            placeholder={text.doseValuePlaceholder}
                                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                                    {eventId && (
                                        <button
                                            type="button"
                                            onClick={markCurrentEventDone}
                                            disabled={markingDone}
                                            className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                        >
                                            {markingDone ? text.markingDone : text.markDone}
                                        </button>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="w-full rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                    >
                                        {saving ? text.saving : text.save}
                                    </button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>

                    <div className="space-y-6">
                        <ReminderCard nextEventDate={nextEventDate} text={text} />

                        <Card>
                            <CardHeader>
                                <h2 className="text-xl font-semibold text-slate-900">
                                    {text.currentPlan}
                                </h2>
                            </CardHeader>

                            <CardBody>
                                <div className="space-y-3">
                                    <div className="rounded-2xl bg-slate-50 p-4">
                                        <div className="text-sm text-slate-500">
                                            {text.selectedRegimen}
                                        </div>

                                        <div className="mt-1 text-lg font-semibold text-slate-900">
                                            {getRegimenLabel(regimen, text)}
                                        </div>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-2xl bg-slate-50 p-4">
                                            <div className="text-sm text-slate-500">
                                                {text.intervalDays}
                                            </div>

                                            <div className="mt-1 text-lg font-semibold text-slate-900">
                                                {intervalDays || "—"}
                                            </div>
                                        </div>

                                        <div className="rounded-2xl bg-slate-50 p-4">
                                            <div className="text-sm text-slate-500">
                                                {text.doseUnit}
                                            </div>

                                            <div className="mt-1 text-lg font-semibold text-slate-900">
                                                {doseUnit || "—"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl bg-slate-50 p-4">
                                        <div className="text-sm text-slate-500">
                                            {text.lastDoseDate}
                                        </div>

                                        <div className="mt-1 text-lg font-semibold text-slate-900">
                                            {lastDoseDate || "—"}
                                        </div>
                                    </div>

                                    <div className="rounded-2xl bg-slate-50 p-4">
                                        <div className="text-sm text-slate-500">
                                            {text.nextEvent}
                                        </div>

                                        {nextEventDate ? (
                                            <div className="mt-1 space-y-1">
                                                <div className="text-lg font-semibold text-slate-900">
                                                    {nextEventDate}
                                                </div>

                                                <div className="text-sm text-slate-500">
                                                    {doseValue || "—"}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="mt-1 text-sm text-slate-500">
                                                {text.noEvents}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                <h2 className="text-xl font-semibold text-slate-900">
                                    {text.recentEvents}
                                </h2>
                            </CardHeader>

                            <CardBody>
                                {events.length === 0 ? (
                                    <p className="text-sm text-slate-500">{text.noEvents}</p>
                                ) : (
                                    <div className="space-y-2">
                                        {events.slice(0, 6).map((event) => (
                                            <div
                                                key={event.id}
                                                className="rounded-2xl border border-slate-200 bg-white p-4"
                                            >
                                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                                    <div>
                                                        <div className="font-semibold text-slate-900">
                                                            {event.planned_date}
                                                        </div>

                                                        <div className="mt-1 text-sm text-slate-500">
                                                            {event.dose_value || "—"}
                                                        </div>

                                                        {event.actual_date && (
                                                            <div className="mt-1 text-sm text-slate-500">
                                                                {text.actualDate}: {event.actual_date}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="rounded-full bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600">
                                                        {getStatusLabel(event.status, text)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}