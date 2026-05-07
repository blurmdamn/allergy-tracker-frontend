export const QUESTION_LABELS = {
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
  
  export const QUESTION_HELP_TEXT = {
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
  
  export const IMPACT_QUESTION_CODES = new Set([
    "wellbeing_today",
    "activity_impact",
    "sleep_impact",
  ]);
  
  export const MEDICATION_LABELS = {
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
  
  export const TRIGGER_OPTIONS = [
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
  
  export const SYMPTOM_SCALE = [
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
  
  export const IMPACT_SCALE = [
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
  
  export const EFFECT_OPTIONS = [
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
  
  export const SYMPTOM_MONITORING_TEXT = {
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