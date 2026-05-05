const STORAGE_KEY = "app_language";

export const LANGUAGES = {
  ru: {
    code: "ru",
    label: "Русский",
    locale: "ru-RU",
  },
  en: {
    code: "en",
    label: "English",
    locale: "en-US",
  },
  kk: {
    code: "kk",
    label: "Қазақша",
    locale: "kk-KZ",
  },
};

export function getLanguage() {
  return localStorage.getItem(STORAGE_KEY) || "ru";
}

export function setLanguage(language) {
  if (!LANGUAGES[language]) {
    localStorage.setItem(STORAGE_KEY, "ru");
    return;
  }

  localStorage.setItem(STORAGE_KEY, language);
}

export function getLocale(language = getLanguage()) {
  return LANGUAGES[language]?.locale || "ru-RU";
}

const translations = {
  ru: {
    common: {
      noData: "Нет данных",
      save: "Сохранить",
      saving: "Сохраняем...",
      loading: "Загрузка...",
      loadingData: "Загружаем данные...",
      error: "Ошибка",
      backToHome: "Вернуться на главную",
      cancel: "Отмена",
      yes: "Да",
      no: "Нет",
      date: "Дата",
      status: "Статус",
      note: "Примечание",
      dose: "Доза",
    },

    layout: {
      patientPanel: "Панель пациента",
      workspace: "Рабочая панель",
      logout: "Выйти",
      openMenu: "Открыть меню",
      closeMenu: "Закрыть меню",
      menu: "Меню",
      role: "Роль",
      diaryHintTitle: "Дневник состояния",
      diaryHintText:
        "Заполняйте симптомы ежедневно, чтобы календарь и отчёт отражали динамику состояния.",
    },

    auth: {
      loginTitle: "Вход в систему",
      loginDescription: "Личный дневник симптомов, лекарств и курса АСИТ.",
      email: "Email",
      password: "Пароль",
      enterPassword: "Введите пароль",
      show: "Показать",
      hide: "Скрыть",
      loginButton: "Войти",
      loggingIn: "Входим...",
      noAccount: "Нет аккаунта?",
      registerLink: "Зарегистрируйтесь",
      loginError: "Не удалось войти в систему",

      registerTitle: "Регистрация",
      registerDescription:
        "Создайте аккаунт для ведения дневника симптомов и курса АСИТ.",
      createPassword: "Придумайте пароль",
      repeatPassword: "Повторите пароль",
      registerButton: "Зарегистрироваться",
      registering: "Регистрируем...",
      alreadyHaveAccount: "Уже есть аккаунт?",
      loginLink: "Войти",
      passwordsDoNotMatch: "Пароли не совпадают",
      registerSuccess: "Аккаунт создан. Теперь войдите в систему.",
      registerError: "Не удалось зарегистрироваться",
    },

    severity: {
      none: "Нет симптомов",
      mild: "Лёгкое состояние",
      moderate: "Средняя тяжесть",
      severe: "Тяжёлый день",
    },

    sidebar: {
      dashboard: "Главная",
      profile: "Мой профиль",
      allergies: "Мои аллергии",
      dailyCheckin: "Дневник симптомов",
      medications: "Лекарства",
      asit: "Курс АСИТ",
      calendar: "Календарь",
      reports: "Отчёт для врача",
      reminders: "Напоминания",
    },

    dashboard: {
      welcome: "Добро пожаловать",
      rolePatient: "Пациент",
      roleUser: "Пользователь",
      loggedAs: "Вы вошли как",
      description:
        "Используйте быстрые действия ниже для ведения дневника симптомов, контроля лекарств, отслеживания курса АСИТ и формирования отчёта для врача.",
      todayDiary: "Дневник сегодня",
      filled: "Заполнен",
      notFilled: "Не заполнен",
      totalScore: "Суммарный балл",
      fillDiaryToday: "Заполните дневник за сегодняшний день",
      activeMedications: "Активные лекарства",
      currentMedicationsCount: "Количество текущих препаратов",
      severeDays7: "Тяжёлые дни за 7 дней",
      severeDaysDescription: "Дни с выраженными симптомами",
      streak: "Серия заполнений",
      daysInRow: "Дней подряд",
      todayState: "Состояние сегодня",
      date: "Дата",
      nasalSymptoms: "Назальные симптомы",
      ocularSymptoms: "Глазные симптомы",
      symptomsTotal: "Симптомы всего",
      dayTotal: "Итог дня",
      fillDiary: "Заполнить дневник",
      noDiaryToday: "Сегодня дневник симптомов ещё не заполнен.",
      nextAsitEvent: "Ближайшее событие АСИТ",
      noNextAsitEvent: "Ближайшее событие АСИТ пока не запланировано.",
      status: "Статус",
      dose: "Доза",
      note: "Примечание",
      loadError: "Не удалось загрузить данные панели",
    },

    tiles: {
      profileTitle: "Мой профиль",
      profileDescription: "Основные данные пациента и настройки аккаунта",
      allergiesTitle: "Мои аллергии",
      allergiesDescription: "Добавление аллергенов и связанных симптомов",
      checkinTitle: "Дневник симптомов",
      checkinDescription: "Ежедневная оценка назальных и глазных симптомов",
      medicationsTitle: "Лекарства",
      medicationsDescription: "Планы приёма препаратов и отметки использования",
      asitTitle: "Курс АСИТ",
      asitDescription: "Отслеживание терапии, дозировок и событий курса",
      calendarTitle: "Календарь",
      calendarDescription: "Цветовая оценка состояния по дням",
      reportsTitle: "Отчёт для врача",
      reportsDescription: "Сводка по симптомам, лекарствам и тяжёлым дням",
      remindersTitle: "Напоминания",
      remindersDescription:
        "Уведомления о лекарствах, дневнике и событиях АСИТ",
    },

    profile: {
      title: "Мой профиль",
      description:
        "Укажите основные данные пациента. Они будут использоваться в отчётах и персональной карточке.",
      fullName: "ФИО",
      fullNamePlaceholder: "Например: Иванова Анна Сергеевна",
      birthDate: "Дата рождения",
      sex: "Пол",
      sexNotSpecified: "Не указан",
      female: "Женский",
      male: "Мужской",
      other: "Другое",
      saveButton: "Сохранить профиль",
      loading: "Загружаем профиль...",
      success: "Профиль сохранён",
      loadError: "Не удалось загрузить профиль",
      saveError: "Не удалось сохранить профиль",
    },

    allergies: {
      title: "Мои аллергии",
      description:
        "Укажите основной аллерген, характерные симптомы и месяцы активности. Эти данные будут использоваться в дневнике, календаре и отчётах.",
      mainAllergen: "Основной аллерген",
      mainAllergenDescription:
        "Выберите аллерген, который является главным для текущего наблюдения.",
      selectAllergen: "Выберите аллерген",
      activeMonths: "Активные месяцы",
      activeMonthsDescription:
        "Отметьте месяцы, когда симптомы обычно усиливаются.",
      symptoms: "Характерные симптомы",
      symptomsDescription:
        "Выберите симптомы, которые чаще всего проявляются при контакте с аллергеном.",
      saveHint:
        "После сохранения эти данные будут учитываться при построении отчёта и календаря состояния.",
      selectAllergenError: "Выберите аллерген",
      success: "Данные об аллергии сохранены",
      loadError: "Не удалось загрузить данные об аллергии",
      saveError: "Не удалось сохранить аллергию",
      months: {
        1: "Январь",
        2: "Февраль",
        3: "Март",
        4: "Апрель",
        5: "Май",
        6: "Июнь",
        7: "Июль",
        8: "Август",
        9: "Сентябрь",
        10: "Октябрь",
        11: "Ноябрь",
        12: "Декабрь",
      },
    },

    placeholder: {
      title: "Страница в разработке",
      text:
        "Эта страница будет реализована следующим этапом. Сейчас создана основная структура навигации, авторизации и панели пациента.",
    },
  },

  en: {
    common: {
      noData: "No data",
      save: "Save",
      saving: "Saving...",
      loading: "Loading...",
      loadingData: "Loading data...",
      error: "Error",
      backToHome: "Back to home",
      cancel: "Cancel",
      yes: "Yes",
      no: "No",
      date: "Date",
      status: "Status",
      note: "Note",
      dose: "Dose",
    },

    layout: {
      patientPanel: "Patient panel",
      workspace: "Workspace",
      logout: "Log out",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      menu: "Menu",
      role: "Role",
      diaryHintTitle: "Condition diary",
      diaryHintText:
        "Fill in symptoms daily so the calendar and report reflect your condition dynamics.",
    },

    auth: {
      loginTitle: "Sign in",
      loginDescription: "Personal diary for symptoms, medications, and ASIT.",
      email: "Email",
      password: "Password",
      enterPassword: "Enter password",
      show: "Show",
      hide: "Hide",
      loginButton: "Sign in",
      loggingIn: "Signing in...",
      noAccount: "No account?",
      registerLink: "Register",
      loginError: "Failed to sign in",

      registerTitle: "Registration",
      registerDescription:
        "Create an account to keep a symptom diary and track your ASIT course.",
      createPassword: "Create a password",
      repeatPassword: "Repeat password",
      registerButton: "Register",
      registering: "Registering...",
      alreadyHaveAccount: "Already have an account?",
      loginLink: "Sign in",
      passwordsDoNotMatch: "Passwords do not match",
      registerSuccess: "Account created. Now sign in.",
      registerError: "Failed to register",
    },

    severity: {
      none: "No symptoms",
      mild: "Mild condition",
      moderate: "Moderate severity",
      severe: "Severe day",
    },

    sidebar: {
      dashboard: "Dashboard",
      profile: "My profile",
      allergies: "My allergies",
      dailyCheckin: "Symptom diary",
      medications: "Medications",
      asit: "ASIT course",
      calendar: "Calendar",
      reports: "Doctor report",
      reminders: "Reminders",
    },

    dashboard: {
      welcome: "Welcome",
      rolePatient: "Patient",
      roleUser: "User",
      loggedAs: "Logged in as",
      description:
        "Use the quick actions below to keep a symptom diary, track medications, monitor ASIT therapy, and generate a report for your doctor.",
      todayDiary: "Today’s diary",
      filled: "Completed",
      notFilled: "Not completed",
      totalScore: "Total score",
      fillDiaryToday: "Fill in today’s symptom diary",
      activeMedications: "Active medications",
      currentMedicationsCount: "Number of current medications",
      severeDays7: "Severe days in 7 days",
      severeDaysDescription: "Days with pronounced symptoms",
      streak: "Completion streak",
      daysInRow: "Days in a row",
      todayState: "Today’s condition",
      date: "Date",
      nasalSymptoms: "Nasal symptoms",
      ocularSymptoms: "Ocular symptoms",
      symptomsTotal: "Symptoms total",
      dayTotal: "Day total",
      fillDiary: "Fill diary",
      noDiaryToday: "The symptom diary has not been completed today.",
      nextAsitEvent: "Next ASIT event",
      noNextAsitEvent: "No upcoming ASIT event has been scheduled yet.",
      status: "Status",
      dose: "Dose",
      note: "Note",
      loadError: "Failed to load dashboard data",
    },

    tiles: {
      profileTitle: "My profile",
      profileDescription: "Patient details and account settings",
      allergiesTitle: "My allergies",
      allergiesDescription: "Add allergens and related symptoms",
      checkinTitle: "Symptom diary",
      checkinDescription: "Daily assessment of nasal and ocular symptoms",
      medicationsTitle: "Medications",
      medicationsDescription: "Medication plans and usage records",
      asitTitle: "ASIT course",
      asitDescription: "Track therapy, dosage, and course events",
      calendarTitle: "Calendar",
      calendarDescription: "Color-coded daily condition assessment",
      reportsTitle: "Doctor report",
      reportsDescription: "Summary of symptoms, medications, and severe days",
      remindersTitle: "Reminders",
      remindersDescription:
        "Notifications about medications, diary, and ASIT events",
    },

    profile: {
      title: "My profile",
      description:
        "Enter the patient’s basic details. They will be used in reports and the personal card.",
      fullName: "Full name",
      fullNamePlaceholder: "For example: Anna Ivanova",
      birthDate: "Date of birth",
      sex: "Sex",
      sexNotSpecified: "Not specified",
      female: "Female",
      male: "Male",
      other: "Other",
      saveButton: "Save profile",
      loading: "Loading profile...",
      success: "Profile saved",
      loadError: "Failed to load profile",
      saveError: "Failed to save profile",
    },

    allergies: {
      title: "My allergies",
      description:
        "Specify the main allergen, typical symptoms, and active months. These data will be used in the diary, calendar, and reports.",
      mainAllergen: "Main allergen",
      mainAllergenDescription:
        "Select the allergen that is the main one for current monitoring.",
      selectAllergen: "Select an allergen",
      activeMonths: "Active months",
      activeMonthsDescription:
        "Mark the months when symptoms usually become stronger.",
      symptoms: "Typical symptoms",
      symptomsDescription:
        "Select the symptoms that most often appear after contact with the allergen.",
      saveHint:
        "After saving, these data will be used when building the report and condition calendar.",
      selectAllergenError: "Select an allergen",
      success: "Allergy data saved",
      loadError: "Failed to load allergy data",
      saveError: "Failed to save allergy data",
      months: {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December",
      },
    },

    placeholder: {
      title: "Page in development",
      text:
        "This page will be implemented in the next stage. The basic navigation, authentication, and patient dashboard structure have already been created.",
    },
  },

  kk: {
    common: {
      noData: "Деректер жоқ",
      save: "Сақтау",
      saving: "Сақталуда...",
      loading: "Жүктелуде...",
      loadingData: "Деректер жүктелуде...",
      error: "Қате",
      backToHome: "Басты бетке оралу",
      cancel: "Болдырмау",
      yes: "Иә",
      no: "Жоқ",
      date: "Күні",
      status: "Күйі",
      note: "Ескерту",
      dose: "Доза",
    },

    layout: {
      patientPanel: "Пациент панелі",
      workspace: "Жұмыс панелі",
      logout: "Шығу",
      openMenu: "Мәзірді ашу",
      closeMenu: "Мәзірді жабу",
      menu: "Мәзір",
      role: "Рөл",
      diaryHintTitle: "Жағдай күнделігі",
      diaryHintText:
        "Күнтізбе мен есеп жағдайдың динамикасын көрсетуі үшін симптомдарды күн сайын толтырыңыз.",
    },

    auth: {
      loginTitle: "Жүйеге кіру",
      loginDescription: "Симптомдар, дәрілер және АСИТ курсына арналған жеке күнделік.",
      email: "Email",
      password: "Құпиясөз",
      enterPassword: "Құпиясөзді енгізіңіз",
      show: "Көрсету",
      hide: "Жасыру",
      loginButton: "Кіру",
      loggingIn: "Кіру орындалуда...",
      noAccount: "Аккаунтыңыз жоқ па?",
      registerLink: "Тіркеліңіз",
      loginError: "Жүйеге кіру мүмкін болмады",

      registerTitle: "Тіркелу",
      registerDescription:
        "Симптомдар күнделігін жүргізу және АСИТ курсын бақылау үшін аккаунт жасаңыз.",
      createPassword: "Құпиясөз ойлап табыңыз",
      repeatPassword: "Құпиясөзді қайталаңыз",
      registerButton: "Тіркелу",
      registering: "Тіркелу орындалуда...",
      alreadyHaveAccount: "Аккаунтыңыз бар ма?",
      loginLink: "Кіру",
      passwordsDoNotMatch: "Құпиясөздер сәйкес келмейді",
      registerSuccess: "Аккаунт жасалды. Енді жүйеге кіріңіз.",
      registerError: "Тіркелу мүмкін болмады",
    },

    severity: {
      none: "Симптомдар жоқ",
      mild: "Жеңіл жағдай",
      moderate: "Орташа ауырлық",
      severe: "Ауыр күн",
    },

    sidebar: {
      dashboard: "Басты бет",
      profile: "Менің профилім",
      allergies: "Менің аллергияларым",
      dailyCheckin: "Симптомдар күнделігі",
      medications: "Дәрілер",
      asit: "АСИТ курсы",
      calendar: "Күнтізбе",
      reports: "Дәрігерге есеп",
      reminders: "Еске салғыштар",
    },

    dashboard: {
      welcome: "Қош келдіңіз",
      rolePatient: "Пациент",
      roleUser: "Пайдаланушы",
      loggedAs: "Жүйеге кірген рөліңіз",
      description:
        "Төмендегі жылдам әрекеттерді симптомдар күнделігін жүргізу, дәрілерді бақылау, АСИТ курсын қадағалау және дәрігерге есеп қалыптастыру үшін пайдаланыңыз.",
      todayDiary: "Бүгінгі күнделік",
      filled: "Толтырылған",
      notFilled: "Толтырылмаған",
      totalScore: "Жалпы балл",
      fillDiaryToday: "Бүгінгі симптомдар күнделігін толтырыңыз",
      activeMedications: "Белсенді дәрілер",
      currentMedicationsCount: "Қазіргі дәрілер саны",
      severeDays7: "7 күндегі ауыр күндер",
      severeDaysDescription: "Айқын симптомдары бар күндер",
      streak: "Толтыру сериясы",
      daysInRow: "Күн қатарынан",
      todayState: "Бүгінгі жағдай",
      date: "Күні",
      nasalSymptoms: "Мұрын симптомдары",
      ocularSymptoms: "Көз симптомдары",
      symptomsTotal: "Симптомдардың жалпы саны",
      dayTotal: "Күн қорытындысы",
      fillDiary: "Күнделікті толтыру",
      noDiaryToday: "Бүгін симптомдар күнделігі әлі толтырылмаған.",
      nextAsitEvent: "Келесі АСИТ оқиғасы",
      noNextAsitEvent: "Алдағы АСИТ оқиғасы әлі жоспарланбаған.",
      status: "Күйі",
      dose: "Доза",
      note: "Ескерту",
      loadError: "Панель деректерін жүктеу мүмкін болмады",
    },

    tiles: {
      profileTitle: "Менің профилім",
      profileDescription: "Пациенттің негізгі деректері және аккаунт баптаулары",
      allergiesTitle: "Менің аллергияларым",
      allergiesDescription: "Аллергендер мен байланысты симптомдарды қосу",
      checkinTitle: "Симптомдар күнделігі",
      checkinDescription: "Мұрын және көз симптомдарын күнделікті бағалау",
      medicationsTitle: "Дәрілер",
      medicationsDescription: "Дәрі қабылдау жоспарлары және қолдану белгілері",
      asitTitle: "АСИТ курсы",
      asitDescription: "Терапияны, дозаларды және курс оқиғаларын бақылау",
      calendarTitle: "Күнтізбе",
      calendarDescription: "Күндер бойынша жағдайды түспен бағалау",
      reportsTitle: "Дәрігерге есеп",
      reportsDescription: "Симптомдар, дәрілер және ауыр күндер бойынша жиынтық",
      remindersTitle: "Еске салғыштар",
      remindersDescription:
        "Дәрілер, күнделік және АСИТ оқиғалары туралы хабарламалар",
    },

    profile: {
      title: "Менің профилім",
      description:
        "Пациенттің негізгі деректерін көрсетіңіз. Олар есептерде және жеке карточкада қолданылады.",
      fullName: "Толық аты-жөні",
      fullNamePlaceholder: "Мысалы: Айдана Ерланқызы",
      birthDate: "Туған күні",
      sex: "Жынысы",
      sexNotSpecified: "Көрсетілмеген",
      female: "Әйел",
      male: "Ер",
      other: "Басқа",
      saveButton: "Профильді сақтау",
      loading: "Профиль жүктелуде...",
      success: "Профиль сақталды",
      loadError: "Профильді жүктеу мүмкін болмады",
      saveError: "Профильді сақтау мүмкін болмады",
    },

    allergies: {
      title: "Менің аллергияларым",
      description:
        "Негізгі аллергенді, тән симптомдарды және белсенді айларды көрсетіңіз. Бұл деректер күнделікте, күнтізбеде және есептерде қолданылады.",
      mainAllergen: "Негізгі аллерген",
      mainAllergenDescription:
        "Ағымдағы бақылау үшін негізгі аллергенді таңдаңыз.",
      selectAllergen: "Аллергенді таңдаңыз",
      activeMonths: "Белсенді айлар",
      activeMonthsDescription:
        "Симптомдар әдетте күшейетін айларды белгілеңіз.",
      symptoms: "Тән симптомдар",
      symptomsDescription:
        "Аллергенмен байланыс кезінде жиі байқалатын симптомдарды таңдаңыз.",
      saveHint:
        "Сақталғаннан кейін бұл деректер есеп пен жағдай күнтізбесін құру кезінде ескеріледі.",
      selectAllergenError: "Аллергенді таңдаңыз",
      success: "Аллергия деректері сақталды",
      loadError: "Аллергия деректерін жүктеу мүмкін болмады",
      saveError: "Аллергия деректерін сақтау мүмкін болмады",
      months: {
        1: "Қаңтар",
        2: "Ақпан",
        3: "Наурыз",
        4: "Сәуір",
        5: "Мамыр",
        6: "Маусым",
        7: "Шілде",
        8: "Тамыз",
        9: "Қыркүйек",
        10: "Қазан",
        11: "Қараша",
        12: "Желтоқсан",
      },
    },

    placeholder: {
      title: "Бет әзірленуде",
      text:
        "Бұл бет келесі кезеңде іске асырылады. Қазір навигацияның, авторизацияның және пациент панелінің негізгі құрылымы жасалды.",
    },
  },
};

export function t(key, language = getLanguage()) {
  const keys = key.split(".");
  let value = translations[language];

  for (const item of keys) {
    value = value?.[item];
  }

  if (typeof value === "string") {
    return value;
  }

  let fallback = translations.ru;

  for (const item of keys) {
    fallback = fallback?.[item];
  }

  return typeof fallback === "string" ? fallback : key;
}