import React from "react";
import { api, getApiError } from "../lib/api";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { getLanguage } from "../lib/i18n";

const QUESTION_LABELS = {
  runny_nose: {
    ru: "Насморк",
    en: "Runny nose",
    kk: "Мұрыннан су ағу",
  },
  nasal_congestion: {
    ru: "Заложенность носа",
    en: "Nasal congestion",
    kk: "Мұрын бітелуі",
  },
  sneezing: {
    ru: "Чихание",
    en: "Sneezing",
    kk: "Түшкіру",
  },
  itchy_nose: {
    ru: "Зуд в носу",
    en: "Itchy nose",
    kk: "Мұрын қышуы",
  },
  red_eyes: {
    ru: "Покраснение глаз",
    en: "Red eyes",
    kk: "Көздің қызаруы",
  },
  watery_eyes: {
    ru: "Слезоточивость глаз",
    en: "Watery eyes",
    kk: "Көзден жас ағу",
  },
  itchy_eyes: {
    ru: "Зуд глаз",
    en: "Itchy eyes",
    kk: "Көз қышуы",
  },
  wellbeing_today: {
    ru: "Общее самочувствие",
    en: "General wellbeing",
    kk: "Жалпы жағдай",
  },
  activity_impact: {
    ru: "Влияние симптомов на активность",
    en: "Impact on activity",
    kk: "Белсенділікке әсері",
  },
  sleep_impact: {
    ru: "Нарушение сна из-за симптомов",
    en: "Sleep disturbance",
    kk: "Ұйқыға әсері",
  },
  had_allergen_contact: {
    ru: "Был ли сегодня контакт с аллергеном?",
    en: "Was there allergen contact today?",
    kk: "Бүгін аллергенмен байланыс болды ма?",
  },
  possible_trigger: {
    ru: "Что могло вызвать ухудшение?",
    en: "What could have triggered worsening?",
    kk: "Жағдайдың нашарлауына не себеп болуы мүмкін?",
  },
  meds_taken_today: {
    ru: "Принимали ли вы сегодня препараты от аллергии?",
    en: "Did you take allergy medication today?",
    kk: "Бүгін аллергияға қарсы дәрі қабылдадыңыз ба?",
  },
  daily_note: {
    ru: "Заметка за день",
    en: "Daily note",
    kk: "Күндік ескерту",
  },
};

const QUESTION_HELP_TEXT = {
  wellbeing_today: {
    ru: "Оцените, насколько симптомы аллергии повлияли на ваше общее состояние сегодня.",
    en: "Rate how much allergy symptoms affected your general condition today.",
    kk: "Аллергия симптомдары бүгінгі жалпы жағдайыңызға қаншалықты әсер еткенін бағалаңыз.",
  },
  activity_impact: {
    ru: "Оцените, насколько симптомы мешали учёбе, работе, прогулкам или обычным делам.",
    en: "Rate how much symptoms interfered with studying, work, walking, or daily activities.",
    kk: "Симптомдар оқу, жұмыс, серуен немесе күнделікті істерге қаншалықты кедергі келтіргенін бағалаңыз.",
  },
  sleep_impact: {
    ru: "Оцените, насколько симптомы мешали сну или ухудшили качество сна.",
    en: "Rate how much symptoms disturbed your sleep or worsened sleep quality.",
    kk: "Симптомдар ұйқыға немесе ұйқы сапасына қаншалықты әсер еткенін бағалаңыз.",
  },
};

const IMPACT_QUESTION_CODES = new Set([
  "wellbeing_today",
  "activity_impact",
  "sleep_impact",
]);

const MEDICATION_LABELS = {
  cetirizine: {
    ru: "Цетиризин",
    en: "Cetirizine",
    kk: "Цетиризин",
  },
  levocetirizine: {
    ru: "Левоцетиризин",
    en: "Levocetirizine",
    kk: "Левоцетиризин",
  },
  loratadine: {
    ru: "Лоратадин",
    en: "Loratadine",
    kk: "Лоратадин",
  },
  desloratadine: {
    ru: "Дезлоратадин",
    en: "Desloratadine",
    kk: "Дезлоратадин",
  },
  bilastine: {
    ru: "Биластин",
    en: "Bilastine",
    kk: "Биластин",
  },
  fexofenadine: {
    ru: "Фексофенадин",
    en: "Fexofenadine",
    kk: "Фексофенадин",
  },
  ebastine: {
    ru: "Эбастин",
    en: "Ebastine",
    kk: "Эбастин",
  },
  rupatadine: {
    ru: "Рупатадин",
    en: "Rupatadine",
    kk: "Рупатадин",
  },
  montelukast: {
    ru: "Монтелукаст",
    en: "Montelukast",
    kk: "Монтелукаст",
  },
  roxall_sulgen: {
    ru: "Роксаль Сульген",
    en: "Roxall Sulgen",
    kk: "Роксаль Сульген",
  },
  immunotek_oraltek: {
    ru: "Инмунотек Оралтек",
    en: "Immunotek Oraltek",
    kk: "Инмунотек Оралтек",
  },
  lofarma: {
    ru: "Лофарма",
    en: "Lofarma",
    kk: "Лофарма",
  },
  antipollin: {
    ru: "Антиполлин",
    en: "Antipollin",
    kk: "Антиполлин",
  },
  roxall_clastoid: {
    ru: "Роксаль Кластоид",
    en: "Roxall Clastoid",
    kk: "Роксаль Кластоид",
  },
  immunotek_clustek: {
    ru: "Инмунотек Клюстек",
    en: "Immunotek Clustek",
    kk: "Инмунотек Клюстек",
  },
};

const TRIGGER_OPTIONS = [
  {
    value: "pollen",
    ru: "Пыльца",
    en: "Pollen",
    kk: "Тозаң",
  },
  {
    value: "dust",
    ru: "Пыль",
    en: "Dust",
    kk: "Шаң",
  },
  {
    value: "animal",
    ru: "Животные",
    en: "Animals",
    kk: "Жануарлар",
  },
  {
    value: "food",
    ru: "Пища",
    en: "Food",
    kk: "Тағам",
  },
  {
    value: "weather",
    ru: "Погода",
    en: "Weather",
    kk: "Ауа райы",
  },
  {
    value: "other",
    ru: "Другое",
    en: "Other",
    kk: "Басқа",
  },
];

const SYMPTOM_SCALE = [
  {
    value: 0,
    ru: "0 — нет",
    en: "0 — none",
    kk: "0 — жоқ",
  },
  {
    value: 1,
    ru: "1 — слабо",
    en: "1 — mild",
    kk: "1 — жеңіл",
  },
  {
    value: 2,
    ru: "2 — умеренно",
    en: "2 — moderate",
    kk: "2 — орташа",
  },
  {
    value: 3,
    ru: "3 — сильно",
    en: "3 — severe",
    kk: "3 — қатты",
  },
];

const IMPACT_SCALE = [
  {
    value: 0,
    ru: "0 — не повлияло",
    en: "0 — no impact",
    kk: "0 — әсер етпеді",
  },
  {
    value: 1,
    ru: "1 — немного",
    en: "1 — slightly",
    kk: "1 — аздап",
  },
  {
    value: 2,
    ru: "2 — заметно",
    en: "2 — noticeably",
    kk: "2 — айтарлықтай",
  },
  {
    value: 3,
    ru: "3 — сильно",
    en: "3 — strongly",
    kk: "3 — қатты",
  },
];

const EFFECT_OPTIONS = [
  {
    value: "",
    ru: "Не выбрано",
    en: "Not selected",
    kk: "Таңдалмаған",
  },
  {
    value: "good",
    ru: "Хороший",
    en: "Good",
    kk: "Жақсы",
  },
  {
    value: "partial",
    ru: "Частичный",
    en: "Partial",
    kk: "Жартылай",
  },
  {
    value: "none",
    ru: "Нет эффекта",
    en: "No effect",
    kk: "Әсері жоқ",
  },
];

const PAGE_TEXT = {
  ru: {
    title: "Мониторинг симптомов",
    description:
      "Заполните ежедневный дневник состояния. Эти данные используются для календаря, динамики симптомов и отчёта для врача.",
    date: "Дата дневника",
    load: "Загрузить",
    loading: "Загружаем дневник...",
    save: "Сохранить дневник",
    saving: "Сохраняем...",
    saved: "Дневник сохранён",
    loadError: "Не удалось загрузить дневник",
    saveError: "Не удалось сохранить дневник",
    noQuestions:
      "Вопросы дневника не найдены. Запустите seed_checkin_questions.py на backend.",
    nasal: "Назальные симптомы",
    ocular: "Глазные симптомы",
    wellbeing: "Самочувствие и качество жизни",
    triggers: "Триггеры",
    medications: "Лекарства за день",
    note: "Заметка",
    yes: "Да",
    no: "Нет",
    noTrigger: "Не выбрано",
    notePlaceholder: "Например: симптомы усилились вечером после прогулки.",
    noActiveMedications:
      "Активных лекарств пока нет. Их можно добавить на странице «Лекарства».",
    timesTaken: "Сколько раз принято сегодня",
    effect: "Эффект сегодня",
    medicationNote: "Комментарий к препарату",
    result: "Итог дня",
    nasalScore: "Назальный балл",
    ocularScore: "Глазной балл",
    symptomScore: "Симптомы всего",
    medicationScore: "Лекарства",
    dayScore: "Итоговый балл",
    severity: "Тяжесть",
    none: "Нет симптомов",
    mild: "Лёгкое состояние",
    moderate: "Средняя тяжесть",
    high: "Выраженные симптомы",
    severe: "Тяжёлый день",
  },
  en: {
    title: "Symptom monitoring",
    description:
      "Fill in your daily condition diary. These data are used for the calendar, symptom dynamics, and doctor report.",
    date: "Diary date",
    load: "Load",
    loading: "Loading diary...",
    save: "Save diary",
    saving: "Saving...",
    saved: "Diary saved",
    loadError: "Failed to load diary",
    saveError: "Failed to save diary",
    noQuestions:
      "Diary questions were not found. Run seed_checkin_questions.py on the backend.",
    nasal: "Nasal symptoms",
    ocular: "Ocular symptoms",
    wellbeing: "Wellbeing and quality of life",
    triggers: "Triggers",
    medications: "Medication for the day",
    note: "Note",
    yes: "Yes",
    no: "No",
    noTrigger: "Not selected",
    notePlaceholder: "For example: symptoms worsened in the evening after a walk.",
    noActiveMedications:
      "There are no active medications yet. You can add them on the Medications page.",
    timesTaken: "Times taken today",
    effect: "Effect today",
    medicationNote: "Medication comment",
    result: "Day result",
    nasalScore: "Nasal score",
    ocularScore: "Ocular score",
    symptomScore: "Symptoms total",
    medicationScore: "Medication",
    dayScore: "Day total",
    severity: "Severity",
    none: "No symptoms",
    mild: "Mild condition",
    moderate: "Moderate severity",
    high: "Pronounced symptoms",
    severe: "Severe day",
  },
  kk: {
    title: "Симптомдарды бақылау",
    description:
      "Күнделікті жағдай күнделігін толтырыңыз. Бұл деректер күнтізбе, симптомдар динамикасы және дәрігерге арналған есеп үшін қолданылады.",
    date: "Күнделік күні",
    load: "Жүктеу",
    loading: "Күнделік жүктелуде...",
    save: "Күнделікті сақтау",
    saving: "Сақталуда...",
    saved: "Күнделік сақталды",
    loadError: "Күнделікті жүктеу мүмкін болмады",
    saveError: "Күнделікті сақтау мүмкін болмады",
    noQuestions:
      "Күнделік сұрақтары табылмады. Backend жағында seed_checkin_questions.py іске қосыңыз.",
    nasal: "Мұрын симптомдары",
    ocular: "Көз симптомдары",
    wellbeing: "Жалпы жағдай және өмір сапасы",
    triggers: "Триггерлер",
    medications: "Күн ішіндегі дәрілер",
    note: "Ескерту",
    yes: "Иә",
    no: "Жоқ",
    noTrigger: "Таңдалмаған",
    notePlaceholder: "Мысалы: серуеннен кейін кешке симптомдар күшейді.",
    noActiveMedications:
      "Белсенді дәрілер әлі жоқ. Оларды «Дәрілер» бетінде қосуға болады.",
    timesTaken: "Бүгін қанша рет қабылданды",
    effect: "Бүгінгі әсері",
    medicationNote: "Дәрі бойынша пікір",
    result: "Күн қорытындысы",
    nasalScore: "Мұрын баллы",
    ocularScore: "Көз баллы",
    symptomScore: "Симптомдар жалпы",
    medicationScore: "Дәрілер",
    dayScore: "Күннің жалпы баллы",
    severity: "Ауырлық",
    none: "Симптомдар жоқ",
    mild: "Жеңіл жағдай",
    moderate: "Орташа ауырлық",
    high: "Айқын симптомдар",
    severe: "Ауыр күн",
  },
};

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
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

function ScaleInput({
  value,
  onChange,
  language,
  scale = SYMPTOM_SCALE,
}) {
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
  const text = PAGE_TEXT[language] || PAGE_TEXT.ru;

  const [date, setDate] = React.useState(todayIsoDate());
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