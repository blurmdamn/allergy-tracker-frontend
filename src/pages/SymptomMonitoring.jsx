import React from "react";
import { api, getApiError } from "../lib/api";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { getLanguage } from "../lib/i18n";
import {
  EFFECT_OPTIONS,
  IMPACT_QUESTION_CODES,
  IMPACT_SCALE,
  MEDICATION_LABELS,
  QUESTION_HELP_TEXT,
  QUESTION_LABELS,
  SYMPTOM_MONITORING_TEXT,
  SYMPTOM_SCALE,
  TRIGGER_OPTIONS,
} from "../lib/symptomMonitoringContent";

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function getInitialDateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("date") || todayIsoDate();
}

function getText(map, language) {
  return map?.[language] || map?.ru || "";
}

function getQuestionLabel(question, language) {
  return (
    QUESTION_LABELS[question.code]?.[language] || question.text || question.code
  );
}

function getMedicationName(item, language) {
  return (
    MEDICATION_LABELS[item.medication_code]?.[language] ||
    item.medication_code ||
    "—"
  );
}

function severityClass(level) {
  if (level === "none") {
    return "border-slate-200 bg-slate-50 text-slate-700";
  }

  if (level === "mild") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (level === "moderate") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (level === "high") {
    return "border-orange-200 bg-orange-50 text-orange-700";
  }

  if (level === "severe") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-700";
}

function normalizeResponseData(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

function groupQuestions(questions) {
  return {
    nasal: questions.filter((question) => question.domain === "nasal"),
    ocular: questions.filter((question) => question.domain === "ocular"),
    wellbeing: questions.filter((question) =>
      ["wellbeing", "activity", "sleep"].includes(question.domain)
    ),
    trigger: questions.filter((question) => question.domain === "trigger"),
    medication: questions.filter((question) => question.domain === "medication"),
    note: questions.filter((question) => question.domain === "note"),
  };
}

function createDefaultAnswers(questions) {
  const result = {};

  questions.forEach((question) => {
    if (question.answer_type === "scale_0_3") {
      result[question.code] = 0;
    }

    if (question.answer_type === "boolean") {
      result[question.code] = false;
    }

    if (question.answer_type === "single_choice") {
      result[question.code] = "";
    }

    if (question.answer_type === "text") {
      result[question.code] = "";
    }
  });

  return result;
}

function createDefaultMedicationUsage(activeMedications) {
  const result = {};

  activeMedications.forEach((medication) => {
    result[medication.id] = {
      selected: false,
      times_taken: "",
      effect: "",
      note: "",
    };
  });

  return result;
}

function ScaleInput({ value, onChange, language, scale = SYMPTOM_SCALE }) {
  return (
    <div className="grid gap-2 sm:grid-cols-4">
      {scale.map((item) => {
        const active = Number(value) === item.value;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={`rounded-2xl border px-3 py-2 text-sm transition ${
              active
                ? "border-emerald-200 bg-emerald-50 font-semibold text-emerald-700"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {getText(item, language)}
          </button>
        );
      })}
    </div>
  );
}

function BooleanInput({ value, onChange, text }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`rounded-2xl border px-3 py-2 text-sm transition ${
          value === true
            ? "border-emerald-200 bg-emerald-50 font-semibold text-emerald-700"
            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
        }`}
      >
        {text.yes}
      </button>

      <button
        type="button"
        onClick={() => onChange(false)}
        className={`rounded-2xl border px-3 py-2 text-sm transition ${
          value === false
            ? "border-emerald-200 bg-emerald-50 font-semibold text-emerald-700"
            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
        }`}
      >
        {text.no}
      </button>
    </div>
  );
}

function QuestionCard({ question, value, onChange, language, text }) {
  const helpText = QUESTION_HELP_TEXT[question.code]?.[language];
  const isImpactQuestion = IMPACT_QUESTION_CODES.has(question.code);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3">
        <div className="text-sm font-semibold text-slate-900">
          {getQuestionLabel(question, language)}
        </div>

        {helpText && (
          <p className="mt-1 text-sm leading-6 text-slate-500">{helpText}</p>
        )}
      </div>

      {question.answer_type === "scale_0_3" && (
        <ScaleInput
          value={value ?? 0}
          language={language}
          scale={isImpactQuestion ? IMPACT_SCALE : SYMPTOM_SCALE}
          onChange={(next) => onChange(question.code, next)}
        />
      )}

      {question.answer_type === "boolean" && (
        <BooleanInput
          value={value ?? false}
          text={text}
          onChange={(next) => onChange(question.code, next)}
        />
      )}

      {question.answer_type === "single_choice" && (
        <select
          value={value || ""}
          onChange={(event) => onChange(question.code, event.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
        >
          <option value="">{text.noTrigger}</option>

          {TRIGGER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {getText(option, language)}
            </option>
          ))}
        </select>
      )}

      {question.answer_type === "text" && (
        <textarea
          value={value || ""}
          onChange={(event) => onChange(question.code, event.target.value)}
          placeholder={text.notePlaceholder}
          rows={4}
          className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
        />
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      </CardHeader>

      <CardBody>{children}</CardBody>
    </Card>
  );
}

function MedicationUsageCard({
  medication,
  value,
  onChange,
  language,
  text,
}) {
  const selected = value?.selected || false;

  function update(next) {
    onChange(medication.id, {
      ...value,
      ...next,
    });
  }

  return (
    <div
      className={`rounded-3xl border p-4 shadow-sm transition ${
        selected
          ? "border-emerald-200 bg-emerald-50/70"
          : "border-slate-200 bg-white"
      }`}
    >
      <button
        type="button"
        onClick={() =>
          update({
            selected: !selected,
            times_taken:
              !selected && !value?.times_taken
                ? "1"
                : value?.times_taken || "",
          })
        }
        className="flex w-full items-start justify-between gap-3 text-left"
      >
        <div>
          <div className="text-sm font-semibold text-slate-900">
            {getMedicationName(medication, language)}
          </div>

          <div className="mt-1 text-xs text-slate-500">
            {medication.dose_text || "—"}
          </div>
        </div>

        <div
          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
            selected
              ? "border-emerald-500 bg-emerald-500"
              : "border-slate-300 bg-white"
          }`}
        >
          {selected && <span className="h-2 w-2 rounded-full bg-white" />}
        </div>
      </button>

      {selected && (
        <div className="mt-4 grid gap-3 border-t border-emerald-100 pt-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              {text.timesTaken}
            </label>

            <input
              type="number"
              min="0"
              value={value?.times_taken || ""}
              onChange={(event) => update({ times_taken: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              {text.effect}
            </label>

            <select
              value={value?.effect || ""}
              onChange={(event) => update({ effect: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
            >
              {EFFECT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {getText(option, language)}
                </option>
              ))}
            </select>
          </div>

          <textarea
            value={value?.note || ""}
            onChange={(event) => update({ note: event.target.value })}
            placeholder={text.medicationNote}
            rows={2}
            className="resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15 sm:col-span-2"
          />
        </div>
      )}
    </div>
  );
}

export default function SymptomMonitoring() {
  const language = getLanguage();
  const text =
    SYMPTOM_MONITORING_TEXT[language] || SYMPTOM_MONITORING_TEXT.ru;

  const [date, setDate] = React.useState(getInitialDateFromUrl());
  const [questions, setQuestions] = React.useState([]);
  const [activeMedications, setActiveMedications] = React.useState([]);

  const [answers, setAnswers] = React.useState({});
  const [medicationUsage, setMedicationUsage] = React.useState({});
  const [savedResult, setSavedResult] = React.useState(null);

  const [loading, setLoading] = React.useState(true);
  const [loadingCheckin, setLoadingCheckin] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  React.useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const [questionsRes, medicationsRes] = await Promise.all([
        api.get("/me/checkins/questions"),
        api.get("/me/medications"),
      ]);

      const loadedQuestions = normalizeResponseData(questionsRes.data);
      const loadedMedications = normalizeResponseData(
        medicationsRes.data
      ).filter((item) => item.is_active);

      setQuestions(loadedQuestions);
      setActiveMedications(loadedMedications);

      setAnswers(createDefaultAnswers(loadedQuestions));
      setMedicationUsage(createDefaultMedicationUsage(loadedMedications));

      await loadExistingCheckin(date, loadedQuestions, loadedMedications);
    } catch (err) {
      setError(getApiError(err, text.loadError));
    } finally {
      setLoading(false);
    }
  }

  async function loadExistingCheckin(
    targetDate = date,
    baseQuestions = questions,
    baseMedications = activeMedications
  ) {
    try {
      setLoadingCheckin(true);
      setError("");
      setSuccess("");
      setSavedResult(null);

      const baseAnswers = createDefaultAnswers(baseQuestions);
      const baseUsage = createDefaultMedicationUsage(baseMedications);

      const response = await api.get(`/me/checkins/${targetDate}`);
      const checkin = response.data;

      (checkin.answers || []).forEach((item) => {
        if (item.answer_type === "scale_0_3") {
          baseAnswers[item.question_code] = item.score_value ?? 0;
        }

        if (item.answer_type === "boolean") {
          baseAnswers[item.question_code] = item.bool_value ?? false;
        }

        if (item.answer_type === "single_choice") {
          baseAnswers[item.question_code] = item.choice_value || "";
        }

        if (item.answer_type === "text") {
          baseAnswers[item.question_code] = item.text_value || "";
        }
      });

      (checkin.medication_usage || []).forEach((item) => {
        baseUsage[item.patient_medication_id] = {
          selected: true,
          times_taken:
            item.times_taken !== null && item.times_taken !== undefined
              ? String(item.times_taken)
              : "",
          effect: item.effect || "",
          note: item.note || "",
        };
      });

      setAnswers(baseAnswers);
      setMedicationUsage(baseUsage);
      setSavedResult(checkin);
    } catch (err) {
      if (err?.response?.status === 404) {
        setAnswers(createDefaultAnswers(baseQuestions));
        setMedicationUsage(createDefaultMedicationUsage(baseMedications));
        setSavedResult(null);
        return;
      }

      setError(getApiError(err, text.loadError));
    } finally {
      setLoadingCheckin(false);
    }
  }

  function handleAnswerChange(code, value) {
    setAnswers((current) => ({
      ...current,
      [code]: value,
    }));
  }

  function handleMedicationUsageChange(id, value) {
    setMedicationUsage((current) => ({
      ...current,
      [id]: value,
    }));
  }

  function buildAnswersPayload() {
    return questions.map((question) => {
      const value = answers[question.code];

      if (question.answer_type === "scale_0_3") {
        return {
          question_code: question.code,
          score_value: Number(value ?? 0),
        };
      }

      if (question.answer_type === "boolean") {
        return {
          question_code: question.code,
          bool_value: Boolean(value),
        };
      }

      if (question.answer_type === "single_choice") {
        return {
          question_code: question.code,
          choice_value: value || "other",
        };
      }

      if (question.answer_type === "text") {
        return {
          question_code: question.code,
          text_value: value || "",
        };
      }

      return {
        question_code: question.code,
        text_value: "",
      };
    });
  }

  function buildMedicationUsagePayload() {
    const medsTakenToday = Boolean(answers.meds_taken_today);

    if (!medsTakenToday) {
      return [];
    }

    return activeMedications
      .map((medication) => {
        const value = medicationUsage[medication.id];

        if (!value?.selected) {
          return null;
        }

        return {
          patient_medication_id: medication.id,
          times_taken:
            value.times_taken === "" || value.times_taken === null
              ? null
              : Number(value.times_taken),
          effect: value.effect || null,
          note: value.note || null,
        };
      })
      .filter(Boolean);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await api.put(`/me/checkins/${date}`, {
        answers: buildAnswersPayload(),
        medication_usage: buildMedicationUsagePayload(),
      });

      setSavedResult(response.data);
      setSuccess(text.saved);
    } catch (err) {
      setError(getApiError(err, text.saveError));
    } finally {
      setSaving(false);
    }
  }

  const grouped = groupQuestions(questions);
  const medsTakenToday = Boolean(answers.meds_taken_today);

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

          <div className="flex w-full flex-col gap-3 rounded-3xl border border-white/70 bg-white/80 p-4 shadow-sm lg:w-auto lg:min-w-80">
            <label className="text-sm font-medium text-slate-700">
              {text.date}
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
              />

              <button
                type="button"
                onClick={() => loadExistingCheckin(date)}
                disabled={loadingCheckin}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {text.load}
              </button>
            </div>
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
      ) : questions.length === 0 ? (
        <Card>
          <CardBody>
            <div className="text-sm text-slate-500">{text.noQuestions}</div>
          </CardBody>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <Section title={text.nasal}>
              <div className="grid gap-4">
                {grouped.nasal.map((question) => (
                  <QuestionCard
                    key={question.code}
                    question={question}
                    value={answers[question.code]}
                    onChange={handleAnswerChange}
                    language={language}
                    text={text}
                  />
                ))}
              </div>
            </Section>

            <Section title={text.ocular}>
              <div className="grid gap-4">
                {grouped.ocular.map((question) => (
                  <QuestionCard
                    key={question.code}
                    question={question}
                    value={answers[question.code]}
                    onChange={handleAnswerChange}
                    language={language}
                    text={text}
                  />
                ))}
              </div>
            </Section>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Section title={text.wellbeing}>
              <div className="grid gap-4">
                {grouped.wellbeing.map((question) => (
                  <QuestionCard
                    key={question.code}
                    question={question}
                    value={answers[question.code]}
                    onChange={handleAnswerChange}
                    language={language}
                    text={text}
                  />
                ))}
              </div>
            </Section>

            <Section title={text.triggers}>
              <div className="grid gap-4">
                {grouped.trigger.map((question) => (
                  <QuestionCard
                    key={question.code}
                    question={question}
                    value={answers[question.code]}
                    onChange={handleAnswerChange}
                    language={language}
                    text={text}
                  />
                ))}
              </div>
            </Section>
          </div>

          <Section title={text.medications}>
            <div className="space-y-4">
              {grouped.medication.map((question) => (
                <QuestionCard
                  key={question.code}
                  question={question}
                  value={answers[question.code]}
                  onChange={handleAnswerChange}
                  language={language}
                  text={text}
                />
              ))}

              {medsTakenToday && (
                <>
                  {activeMedications.length === 0 ? (
                    <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-700">
                      {text.noActiveMedications}
                    </div>
                  ) : (
                    <div className="grid gap-4 lg:grid-cols-2">
                      {activeMedications.map((medication) => (
                        <MedicationUsageCard
                          key={medication.id}
                          medication={medication}
                          value={
                            medicationUsage[medication.id] || {
                              selected: false,
                              times_taken: "",
                              effect: "",
                              note: "",
                            }
                          }
                          onChange={handleMedicationUsageChange}
                          language={language}
                          text={text}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </Section>

          <Section title={text.note}>
            <div className="grid gap-4">
              {grouped.note.map((question) => (
                <QuestionCard
                  key={question.code}
                  question={question}
                  value={answers[question.code]}
                  onChange={handleAnswerChange}
                  language={language}
                  text={text}
                />
              ))}
            </div>
          </Section>

          {savedResult && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-slate-900">
                  {text.result}
                </h2>
              </CardHeader>

              <CardBody>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-sm text-slate-500">
                      {text.nasalScore}
                    </div>

                    <div className="mt-1 text-2xl font-bold text-slate-900">
                      {savedResult.nasal_score}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-sm text-slate-500">
                      {text.ocularScore}
                    </div>

                    <div className="mt-1 text-2xl font-bold text-slate-900">
                      {savedResult.ocular_score}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-sm text-slate-500">
                      {text.symptomScore}
                    </div>

                    <div className="mt-1 text-2xl font-bold text-slate-900">
                      {savedResult.symptom_total_score}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-sm text-slate-500">
                      {text.medicationScore}
                    </div>

                    <div className="mt-1 text-2xl font-bold text-slate-900">
                      {savedResult.medication_score}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-sm text-slate-500">
                      {text.dayScore}
                    </div>

                    <div className="mt-1 text-2xl font-bold text-slate-900">
                      {savedResult.day_total_score}
                    </div>
                  </div>

                  <div
                    className={`rounded-2xl border p-4 ${severityClass(
                      savedResult.severity_level
                    )}`}
                  >
                    <div className="text-sm opacity-80">{text.severity}</div>

                    <div className="mt-1 text-lg font-bold">
                      {text[savedResult.severity_level] ||
                        savedResult.severity_level}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {saving ? text.saving : text.save}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}