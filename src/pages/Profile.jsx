import React from "react";
import { api, getApiError } from "../lib/api";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { getLanguage, t } from "../lib/i18n";

const SEASON_PRESETS = [
  {
    key: "spring",
    months: [3, 4, 5],
    labelKey: "allergyProfile.spring",
  },
  {
    key: "early_summer",
    months: [6],
    labelKey: "allergyProfile.earlySummer",
  },
  {
    key: "late_summer",
    months: [7, 8],
    labelKey: "allergyProfile.lateSummer",
  },
  {
    key: "autumn",
    months: [9, 10, 11],
    labelKey: "allergyProfile.autumn",
  },
  {
    key: "year_round",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    labelKey: "allergyProfile.yearRound",
  },
];

const ALLERGEN_TRANSLATIONS = {
  birch: {
    ru: "берёза",
    en: "birch",
    kk: "қайың",
  },
  alder: {
    ru: "ольха",
    en: "alder",
    kk: "қандыағаш",
  },
  oak: {
    ru: "дуб",
    en: "oak",
    kk: "емен",
  },
  timothy_grass: {
    ru: "тимофеевка",
    en: "timothy grass",
    kk: "атқонақ",
  },
  meadow_grass: {
    ru: "мятлик",
    en: "meadow grass",
    kk: "шалғын шөбі",
  },
  mugwort: {
    ru: "полынь",
    en: "mugwort",
    kk: "жусан",
  },
  ragweed: {
    ru: "амброзия",
    en: "ragweed",
    kk: "амброзия",
  },
  chenopodium: {
    ru: "марь",
    en: "chenopodium",
    kk: "алабота",
  },
  lambs_quarters: {
    ru: "лебеда",
    en: "lamb’s quarters",
    kk: "ақ алабота",
  },
  kochia: {
    ru: "курай",
    en: "kochia",
    kk: "қурай",
  },
  d_pteronyssinus: {
    ru: "клещ дерматофагоид птерониссинус",
    en: "Dermatophagoides pteronyssinus mite",
    kk: "Dermatophagoides pteronyssinus кенесі",
  },
  d_farinae: {
    ru: "клещ дерматофагоид фарине",
    en: "Dermatophagoides farinae mite",
    kk: "Dermatophagoides farinae кенесі",
  },
  alternaria: {
    ru: "плесень альтернария",
    en: "Alternaria mold",
    kk: "Alternaria зеңі",
  },
  cladosporium: {
    ru: "плесень кладоспориум",
    en: "Cladosporium mold",
    kk: "Cladosporium зеңі",
  },
  aspergillus: {
    ru: "плесень аспергиллус",
    en: "Aspergillus mold",
    kk: "Aspergillus зеңі",
  },
  cat: {
    ru: "кошка",
    en: "cat",
    kk: "мысық",
  },
  dog: {
    ru: "собака",
    en: "dog",
    kk: "ит",
  },
  horse: {
    ru: "лошадь",
    en: "horse",
    kk: "жылқы",
  },
};

const SYMPTOM_TRANSLATIONS = {
  runny_nose: {
    ru: "насморк",
    en: "runny nose",
    kk: "мұрыннан су ағу",
  },
  nasal_congestion: {
    ru: "заложенность носа",
    en: "nasal congestion",
    kk: "мұрын бітелуі",
  },
  sneezing: {
    ru: "чихание",
    en: "sneezing",
    kk: "түшкіру",
  },
  itchy_nose: {
    ru: "зуд в носу",
    en: "itchy nose",
    kk: "мұрын қышуы",
  },
  red_eyes: {
    ru: "покраснение глаз",
    en: "red eyes",
    kk: "көздің қызаруы",
  },
  watery_eyes: {
    ru: "слезоточивость глаз",
    en: "watery eyes",
    kk: "көзден жас ағу",
  },
  itchy_eyes: {
    ru: "зуд глаз",
    en: "itchy eyes",
    kk: "көз қышуы",
  },
};

function getDictLabel(item, language, translations) {
  return translations[item.code]?.[language] || item.name || item.code;
}

function isPresetActive(activeMonths, presetMonths) {
  return presetMonths.every((month) => activeMonths.includes(month));
}

function toggleCode(current, code) {
  if (current.includes(code)) {
    return current.filter((item) => item !== code);
  }

  return [...current, code];
}

function InfoBlock({ title, description }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

      {description && (
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      )}
    </div>
  );
}

function Chip({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
        active
          ? "border-emerald-200 bg-emerald-50 font-medium text-emerald-700"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}

export default function Profile() {
  const language = getLanguage();

  const [fullName, setFullName] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [sex, setSex] = React.useState("");

  const [symptomsStartDate, setSymptomsStartDate] = React.useState("");
  const [allergens, setAllergens] = React.useState([]);
  const [symptoms, setSymptoms] = React.useState([]);

  const [selectedAllergenCodes, setSelectedAllergenCodes] = React.useState([]);
  const [selectedSymptomCodes, setSelectedSymptomCodes] = React.useState([]);
  const [activeMonths, setActiveMonths] = React.useState([]);
  const [frequency, setFrequency] = React.useState("");

  const [loading, setLoading] = React.useState(true);
  const [savingProfile, setSavingProfile] = React.useState(false);
  const [savingAllergy, setSavingAllergy] = React.useState(false);

  const [profileError, setProfileError] = React.useState("");
  const [profileSuccess, setProfileSuccess] = React.useState("");

  const [allergyError, setAllergyError] = React.useState("");
  const [allergySuccess, setAllergySuccess] = React.useState("");

  React.useEffect(() => {
    loadPageData();
  }, []);

  async function loadPageData() {
    try {
      setLoading(true);
      setProfileError("");
      setAllergyError("");

      const [profileRes, allergyRes, allergensRes, symptomsRes] =
        await Promise.all([
          api.get("/me/profile"),
          api.get("/me/allergy"),
          api.get("/dict/allergens"),
          api.get("/dict/symptoms"),
        ]);

      setFullName(profileRes.data?.full_name || "");
      setBirthDate(profileRes.data?.birth_date || "");
      setSex(profileRes.data?.sex || "");

      setSymptomsStartDate(allergyRes.data?.symptoms_start_date || "");
      setSelectedAllergenCodes(allergyRes.data?.allergen_codes || []);
      setSelectedSymptomCodes(allergyRes.data?.symptom_codes || []);
      setActiveMonths(allergyRes.data?.active_months || []);
      setFrequency(allergyRes.data?.frequency || "");

      setAllergens(allergensRes.data || []);
      setSymptoms(symptomsRes.data || []);
    } catch (err) {
      const message = getApiError(err, t("profile.loadError", language));
      setProfileError(message);
      setAllergyError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveProfile(event) {
    event.preventDefault();

    try {
      setSavingProfile(true);
      setProfileError("");
      setProfileSuccess("");

      await api.put("/me/profile", {
        full_name: fullName || null,
        birth_date: birthDate || null,
        sex: sex || null,
      });

      setProfileSuccess(t("profile.success", language));
    } catch (err) {
      setProfileError(getApiError(err, t("profile.saveError", language)));
    } finally {
      setSavingProfile(false);
    }
  }

  async function handleSaveAllergy(event) {
    event.preventDefault();

    try {
      setSavingAllergy(true);
      setAllergyError("");
      setAllergySuccess("");

      await api.put("/me/allergy", {
        symptoms_start_date: symptomsStartDate || null,
        allergen_codes: selectedAllergenCodes,
        symptom_codes: selectedSymptomCodes,
        active_months: activeMonths,
        frequency: frequency || null,
      });

      setAllergySuccess(t("allergyProfile.success", language));
    } catch (err) {
      setAllergyError(
        getApiError(err, t("allergyProfile.saveError", language))
      );
    } finally {
      setSavingAllergy(false);
    }
  }

  function toggleSeasonPreset(preset) {
    setActiveMonths((current) => {
      const active = isPresetActive(current, preset.months);

      if (active) {
        return current.filter((month) => !preset.months.includes(month));
      }

      return Array.from(new Set([...current, ...preset.months])).sort(
        (a, b) => a - b
      );
    });
  }

  if (loading) {
    return (
      <Card>
        <CardBody>
          <div className="text-sm text-slate-500">
            {t("common.loading", language)}
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h1 className="text-xl font-semibold text-slate-900">
            {t("profile.title", language)}
          </h1>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {t("profile.description", language)}
          </p>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSaveProfile} className="max-w-3xl space-y-5">
            {profileError && (
              <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                {profileError}
              </div>
            )}

            {profileSuccess && (
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700">
                {profileSuccess}
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  {t("profile.fullName", language)}
                </label>

                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder={t("profile.fullNamePlaceholder", language)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  {t("profile.birthDate", language)}
                </label>

                <input
                  type="date"
                  value={birthDate}
                  onChange={(event) => setBirthDate(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  {t("profile.sex", language)}
                </label>

                <select
                  value={sex}
                  onChange={(event) => setSex(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
                >
                  <option value="">
                    {t("profile.sexNotSpecified", language)}
                  </option>
                  <option value="female">
                    {t("profile.female", language)}
                  </option>
                  <option value="male">{t("profile.male", language)}</option>
                  <option value="other">{t("profile.other", language)}</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 pt-5">
              <button
                type="submit"
                disabled={savingProfile}
                className="w-full rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {savingProfile
                  ? t("common.saving", language)
                  : t("profile.saveButton", language)}
              </button>
            </div>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">
            {t("allergyProfile.title", language)}
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {t("allergyProfile.description", language)}
          </p>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSaveAllergy} className="space-y-7">
            {allergyError && (
              <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                {allergyError}
              </div>
            )}

            {allergySuccess && (
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700">
                {allergySuccess}
              </div>
            )}

            <div className="max-w-3xl">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("allergyProfile.symptomsStartDate", language)}
              </label>

              <p className="mb-3 text-sm leading-6 text-slate-500">
                {t("allergyProfile.symptomsStartDateHelp", language)}
              </p>

              <input
                type="date"
                value={symptomsStartDate}
                onChange={(event) => setSymptomsStartDate(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15 sm:max-w-xs"
              />
            </div>

            <div className="grid gap-7 xl:grid-cols-2">
              <section className="space-y-3">
                <InfoBlock
                  title={t("allergyProfile.causativeAllergens", language)}
                  description={t(
                    "allergyProfile.causativeAllergensHelp",
                    language
                  )}
                />

                <div className="grid gap-2 sm:grid-cols-2">
                  {allergens.map((allergen) => (
                    <Chip
                      key={allergen.code}
                      active={selectedAllergenCodes.includes(allergen.code)}
                      onClick={() =>
                        setSelectedAllergenCodes((current) =>
                          toggleCode(current, allergen.code)
                        )
                      }
                    >
                      {getDictLabel(
                        allergen,
                        language,
                        ALLERGEN_TRANSLATIONS
                      )}
                    </Chip>
                  ))}
                </div>
              </section>

              <section className="space-y-3">
                <InfoBlock
                  title={t("allergyProfile.allergySymptoms", language)}
                  description={t("allergyProfile.allergySymptomsHelp", language)}
                />

                <div className="grid gap-2 sm:grid-cols-2">
                  {symptoms.map((symptom) => (
                    <Chip
                      key={symptom.code}
                      active={selectedSymptomCodes.includes(symptom.code)}
                      onClick={() =>
                        setSelectedSymptomCodes((current) =>
                          toggleCode(current, symptom.code)
                        )
                      }
                    >
                      {getDictLabel(symptom, language, SYMPTOM_TRANSLATIONS)}
                    </Chip>
                  ))}
                </div>
              </section>
            </div>

            <section className="space-y-3">
              <InfoBlock
                title={t("allergyProfile.seasonTitle", language)}
                description={t("allergyProfile.seasonHelp", language)}
              />

              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                {SEASON_PRESETS.map((preset) => (
                  <Chip
                    key={preset.key}
                    active={isPresetActive(activeMonths, preset.months)}
                    onClick={() => toggleSeasonPreset(preset)}
                  >
                    {t(preset.labelKey, language)}
                  </Chip>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <InfoBlock
                title={t("allergyProfile.frequencyTitle", language)}
              />

              <div className="grid gap-2 md:grid-cols-2">
                <Chip
                  active={frequency === "contact_only"}
                  onClick={() => setFrequency("contact_only")}
                >
                  {t("allergyProfile.contactOnly", language)}
                </Chip>

                <Chip
                  active={frequency === "daily"}
                  onClick={() => setFrequency("daily")}
                >
                  {t("allergyProfile.daily", language)}
                </Chip>
              </div>
            </section>

            <div className="flex justify-end border-t border-slate-100 pt-5">
              <button
                type="submit"
                disabled={savingAllergy}
                className="w-full rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {savingAllergy
                  ? t("common.saving", language)
                  : t("allergyProfile.saveButton", language)}
              </button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}