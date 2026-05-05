import React from "react";
import { api, getApiError } from "../lib/api";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { getLanguage, t } from "../lib/i18n";

const FORM_ORDER = [
  {
    form: "tablet",
    titleKey: "medications.tablets",
  },
  {
    form: "sublingual_drops",
    titleKey: "medications.sublingualDrops",
  },
  {
    form: "sublingual_tablet",
    titleKey: "medications.sublingualTablets",
  },
  {
    form: "injection",
    titleKey: "medications.injections",
  },
];

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

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function getMedicationName(item, language) {
  return MEDICATION_LABELS[item.code]?.[language] || item.name || item.code;
}

function getDoseText(form, timesPerDay, language) {
  if (!timesPerDay) return null;

  if (language === "en") {
    if (form === "tablet" || form === "sublingual_tablet") {
      return `${timesPerDay} tablet(s) per day`;
    }

    if (form === "sublingual_drops") {
      return `${timesPerDay} dose(s) per day`;
    }

    if (form === "injection") {
      return `${timesPerDay} injection(s) per day`;
    }

    return `${timesPerDay} time(s) per day`;
  }

  if (language === "kk") {
    if (form === "injection") {
      return `күніне ${timesPerDay} енгізу`;
    }

    return `күніне ${timesPerDay} рет`;
  }

  if (form === "tablet" || form === "sublingual_tablet") {
    return `${timesPerDay} таблетка(и) в сутки`;
  }

  if (form === "sublingual_drops") {
    return `${timesPerDay} приём(а) в сутки`;
  }

  if (form === "injection") {
    return `${timesPerDay} введение(я) в сутки`;
  }

  return `${timesPerDay} раз(а) в сутки`;
}

function createInitialState(medications, patientMedications) {
  const activeByCode = new Map();

  patientMedications
    .filter((item) => item.is_active)
    .forEach((item) => {
      if (item.medication_code) {
        activeByCode.set(item.medication_code, item);
      }
    });

  return medications.reduce((acc, medication) => {
    const activeItem = activeByCode.get(medication.code);

    acc[medication.code] = {
      selected: Boolean(activeItem),
      patientMedicationId: activeItem?.id || null,
      timesPerDay:
        activeItem?.times_per_day !== null &&
        activeItem?.times_per_day !== undefined
          ? String(activeItem.times_per_day)
          : "",
      effect: activeItem?.treatment_effect || "",
    };

    return acc;
  }, {});
}

function MedicationCard({ medication, value, language, onChange }) {
  const selected = value?.selected || false;

  function update(next) {
    onChange(medication.code, {
      ...value,
      ...next,
    });
  }

  return (
    <div
      className={`rounded-2xl border p-4 transition ${
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
            timesPerDay:
              !selected && !value?.timesPerDay
                ? "1"
                : value?.timesPerDay || "",
          })
        }
        className="flex w-full items-start justify-between gap-3 text-left"
      >
        <div>
          <div className="text-sm font-semibold text-slate-900">
            {getMedicationName(medication, language)}
          </div>

          <div className="mt-1 text-xs text-slate-500">
            {selected
              ? t("medications.selected", language)
              : t("medications.notSelected", language)}
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
        <div className="mt-4 space-y-4 border-t border-emerald-100 pt-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              {t("medications.timesPerDay", language)}
            </label>

            <input
              type="number"
              min="0"
              value={value?.timesPerDay || ""}
              onChange={(event) =>
                update({
                  timesPerDay: event.target.value,
                })
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              {t("medications.treatmentEffect", language)}
            </label>

            <select
              value={value?.effect || ""}
              onChange={(event) =>
                update({
                  effect: event.target.value,
                })
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
            >
              <option value="">
                {t("medications.effectNotSelected", language)}
              </option>
              <option value="good">
                {t("medications.effectGood", language)}
              </option>
              <option value="partial">
                {t("medications.effectPartial", language)}
              </option>
              <option value="none">
                {t("medications.effectNone", language)}
              </option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

function MedicationSection({ title, medications, values, language, onChange }) {
  if (medications.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {medications.map((medication) => (
          <MedicationCard
            key={medication.code}
            medication={medication}
            value={
              values[medication.code] || {
                selected: false,
                patientMedicationId: null,
                timesPerDay: "",
                effect: "",
              }
            }
            language={language}
            onChange={onChange}
          />
        ))}
      </div>
    </section>
  );
}

export default function Medications() {
  const language = getLanguage();

  const [medications, setMedications] = React.useState([]);
  const [patientMedications, setPatientMedications] = React.useState([]);
  const [values, setValues] = React.useState({});

  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  React.useEffect(() => {
    loadPageData();
  }, []);

  async function loadPageData() {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const [dictRes, patientRes] = await Promise.all([
        api.get("/dict/medications"),
        api.get("/me/medications"),
      ]);

      const dictItems = dictRes.data || [];
      const patientItems = patientRes.data || [];

      setMedications(dictItems);
      setPatientMedications(patientItems);
      setValues(createInitialState(dictItems, patientItems));
    } catch (err) {
      setError(getApiError(err, t("medications.loadError", language)));
    } finally {
      setLoading(false);
    }
  }

  function handleMedicationChange(code, nextValue) {
    setValues((current) => ({
      ...current,
      [code]: nextValue,
    }));
  }

  async function saveSelectedMedication(medication, state) {
    const timesPerDay =
      state.timesPerDay === "" || state.timesPerDay === null
        ? null
        : Number(state.timesPerDay);

    const payload = {
      medication_code: medication.code,
      started_at: todayIsoDate(),
      dose_text: getDoseText(medication.form, timesPerDay, language),
      times_per_day: timesPerDay,
      interval_hours: null,
      treatment_effect: state.effect || null,
    };

    if (state.patientMedicationId) {
      const response = await api.patch(
        `/me/medications/${state.patientMedicationId}`,
        {
          ...payload,
          is_active: true,
          ended_at: null,
        }
      );

      return response.data;
    }

    const response = await api.post("/me/medications", payload);
    return response.data;
  }

  async function deactivateMedication(state) {
    if (!state.patientMedicationId) return;

    await api.patch(`/me/medications/${state.patientMedicationId}`, {
      is_active: false,
      ended_at: todayIsoDate(),
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      for (const medication of medications) {
        const state = values[medication.code];

        if (!state) continue;

        if (state.selected) {
          await saveSelectedMedication(medication, state);
        } else if (state.patientMedicationId) {
          await deactivateMedication(state);
        }
      }

      setSuccess(t("medications.success", language));
      await loadPageData();
    } catch (err) {
      setError(getApiError(err, t("medications.saveError", language)));
    } finally {
      setSaving(false);
    }
  }

  const grouped = FORM_ORDER.map((group) => ({
    ...group,
    items: medications.filter((item) => item.form === group.form),
  }));

  const activeSelected = medications.filter(
    (item) => values[item.code]?.selected
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h1 className="text-xl font-semibold text-slate-900">
            {t("medications.title", language)}
          </h1>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {t("medications.description", language)}
          </p>
        </CardHeader>

        <CardBody>
          {loading ? (
            <div className="text-sm text-slate-500">
              {t("common.loading", language)}
            </div>
          ) : medications.length === 0 ? (
            <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-700">
              {t("medications.noMedications", language)}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
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

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
                {t("medications.chooseMedication", language)}
              </div>

              {grouped.map((group) => (
                <MedicationSection
                  key={group.form}
                  title={t(group.titleKey, language)}
                  medications={group.items}
                  values={values}
                  language={language}
                  onChange={handleMedicationChange}
                />
              ))}

              <Card className="bg-slate-50 shadow-none">
                <CardHeader>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {t("medications.activeTreatment", language)}
                  </h2>
                </CardHeader>

                <CardBody>
                  {activeSelected.length === 0 ? (
                    <p className="text-sm text-slate-500">
                      {t("medications.noActiveTreatment", language)}
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {activeSelected.map((item) => (
                        <span
                          key={item.code}
                          className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700"
                        >
                          {getMedicationName(item, language)}
                        </span>
                      ))}
                    </div>
                  )}
                </CardBody>
              </Card>

              <div className="flex justify-end border-t border-slate-100 pt-5">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {saving
                    ? t("medications.saving", language)
                    : t("medications.saveButton", language)}
                </button>
              </div>
            </form>
          )}
        </CardBody>
      </Card>
    </div>
  );
}