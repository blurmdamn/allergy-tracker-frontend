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

    sidebar: {
      dashboard: "Главная",
      profile: "Мой профиль",
      allergies: "Информация об аллергии",
      medications: "Лекарства",
      asit: "График АСИТ",
      calendar: "Календарь",
      reports: "Мои результаты",
      reminders: "Настройка напоминаний",
      symptomMonitoring: "Мониторинг симптомов",
      dailyCheckin: "Мониторинг симптомов",
    },

    severity: {
      none: "Нет симптомов",
      mild: "Лёгкое состояние",
      moderate: "Средняя тяжесть",
      severe: "Тяжёлый день",
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
      profileDescription: "Основные данные пациента и аллергологический профиль",
      allergiesTitle: "Информация об аллергии",
      allergiesDescription: "Справочная информация об аллергии и АСИТ",
      checkinTitle: "Мониторинг симптомов",
      checkinDescription: "Ежедневная оценка назальных и глазных симптомов",
      medicationsTitle: "Лекарства",
      medicationsDescription: "Текущее лечение, дозировки и эффект терапии",
      asitTitle: "График АСИТ",
      asitDescription: "План терапии, форма препарата и расписание курса",
      calendarTitle: "Календарь",
      calendarDescription: "Цветовая оценка состояния по дням",
      reportsTitle: "Мои результаты",
      reportsDescription: "Календарь состояния, динамика симптомов и отчёт",
      remindersTitle: "Настройка напоминаний",
      remindersDescription:
        "Уведомления о лекарствах, дневнике и событиях АСИТ",
    },

    home: {
      profileTitle: "Мой профиль",
      profileDescription: "Основные данные пациента и аллергологический профиль",

      allergyInfoTitle: "Информация об аллергии",
      allergyInfoDescription:
        "Справочная информация об аллергии, аллергическом рините и АСИТ",

      medicationsTitle: "Лекарства",
      medicationsDescription:
        "Текущее лечение, количество приёмов в сутки и эффект терапии",

      asitScheduleTitle: "График АСИТ",
      asitScheduleDescription:
        "План терапии, форма препарата и расписание курса",

      remindersTitle: "Настройка напоминаний",
      remindersDescription:
        "Уведомления о лекарствах, дневнике симптомов и событиях АСИТ",

      symptomMonitoringTitle: "Мониторинг симптомов",
      symptomMonitoringDescription:
        "Ежедневная оценка назальных и глазных симптомов",

      resultsTitle: "Мои результаты",
      resultsDescription:
        "Календарь состояния, динамика симптомов и отчёт для врача",
    },

    profile: {
      title: "Мой профиль",
      description:
        "Укажите основные данные пациента. Они будут использоваться в личной карточке и отчётах.",
      fullName: "Имя",
      fullNamePlaceholder: "Введите имя",
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

    allergyProfile: {
      title: "Аллергологический профиль",
      description:
        "Заполните сведения о начале симптомов, виновных аллергенах, сезонности и частоте появления симптомов.",
      symptomsStartDate: "Начало симптомов аллергического ринита",
      symptomsStartDateHelp:
        "Когда Вы впервые почувствовали симптомы? Если Вы не уверены в точной дате, пожалуйста, предположите её как можно точнее.",
      causativeAllergens: "Виновный аллерген",
      causativeAllergensHelp:
        "В развитии симптомов аллергического ринита и астмы лежит чувствительность к аэроаллергенам. На какой аллерген у вас есть реакция?",
      allergySymptoms: "Симптомы аллергии",
      allergySymptomsHelp:
        "Аллергический ринит характеризуется насморком, заложенностью носа, чиханием, зудом в носу и другими симптомами. Какие симптомы Вы испытываете?",
      seasonTitle: "Симптомы беспокоят",
      seasonHelp:
        "Выберите периоды, когда симптомы обычно появляются или усиливаются.",
      frequencyTitle: "Симптомы появляются",
      contactOnly: "Только при тесном контакте с аллергеном",
      daily: "Ежедневно",
      saveButton: "Сохранить аллергологический профиль",
      success: "Аллергологический профиль сохранён",
      loadError: "Не удалось загрузить аллергологический профиль",
      saveError: "Не удалось сохранить аллергологический профиль",

      spring: "Весной",
      earlySummer: "В начале лета",
      lateSummer: "В конце лета",
      autumn: "Осенью",
      yearRound: "Круглый год",
    },

    allergies: {
      title: "Информация об аллергии",
      description:
        "Справочная информация об аллергии, аллергическом рините и аллерген-специфической иммунотерапии.",
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

    medications: {
      title: "Лекарства",
      description:
        "Отметьте текущее лечение, количество приёмов в сутки и эффект от терапии.",
      currentTreatment: "Текущее лечение",
      tablets: "Таблетки",
      sublingualDrops: "Подъязычные капли",
      sublingualTablets: "Подъязычные таблетки",
      injections: "Инъекции",
      chooseMedication: "Выберите препараты, которые используете сейчас.",
      selected: "Выбрано",
      notSelected: "Не выбрано",
      timesPerDay: "Количество приёмов в сутки",
      treatmentEffect: "Эффект от лечения",
      effectNotSelected: "Не выбрано",
      effectGood: "Хороший успех",
      effectPartial: "Частичный успех",
      effectNone: "Неуспех",
      saveButton: "Сохранить лечение",
      saving: "Сохраняем...",
      success: "Данные о лечении сохранены",
      loadError: "Не удалось загрузить лекарства",
      saveError: "Не удалось сохранить лекарства",
      noMedications:
        "Справочник лекарств пуст. Запустите seed_dicts.py на backend.",
      activeTreatment: "Активное лечение",
      noActiveTreatment: "Пока не выбрано ни одного активного препарата.",
      intakeHint:
        "При сохранении выбранного препарата также фиксируется текущий эффект лечения.",
    },

    dailyCheckin: {
      title: "Мониторинг симптомов",
      description:
        "Заполните ежедневную оценку симптомов. Эти данные используются для календаря состояния и отчёта для врача.",
      date: "Дата дневника",
      loadButton: "Загрузить",
      saveButton: "Сохранить дневник",
      saving: "Сохраняем...",
      loading: "Загружаем дневник...",
      saved: "Дневник сохранён",
      loadError: "Не удалось загрузить дневник",
      saveError: "Не удалось сохранить дневник",
      noQuestions:
        "Вопросы дневника не найдены. Запустите seed_checkin_questions.py на backend.",
      nasal: "Назальные симптомы",
      ocular: "Глазные симптомы",
      wellbeing: "Самочувствие и качество жизни",
      trigger: "Триггеры",
      medication: "Лекарства за день",
      note: "Заметка",
      scale0: "0 — нет",
      scale1: "1 — слабо",
      scale2: "2 — умеренно",
      scale3: "3 — сильно",
      yes: "Да",
      no: "Нет",
      possibleTrigger: "Возможный триггер",
      triggerNone: "Не выбрано",
      triggerPollen: "Пыльца",
      triggerDust: "Пыль",
      triggerAnimal: "Животные",
      triggerFood: "Пища",
      triggerWeather: "Погода",
      triggerOther: "Другое",
      dailyNotePlaceholder:
        "Например: симптомы усилились вечером после прогулки",
      medsTaken: "Принимали препараты сегодня",
      medicationUsage: "Отметка препаратов",
      noMedications:
        "Активных лекарств пока нет. Их можно добавить на странице «Лекарства».",
      timesTaken: "Сколько раз принято",
      effect: "Эффект",
      effectGood: "Хороший",
      effectPartial: "Частичный",
      effectNone: "Нет эффекта",
      medNote: "Комментарий",
      result: "Итог после сохранения",
      nasalScore: "Назальный балл",
      ocularScore: "Глазной балл",
      symptomScore: "Симптомы всего",
      dayScore: "Итог дня",
      severity: "Тяжесть",
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

    sidebar: {
      dashboard: "Dashboard",
      profile: "My profile",
      allergies: "Allergy information",
      medications: "Medications",
      asit: "ASIT schedule",
      calendar: "Calendar",
      reports: "My results",
      reminders: "Reminder settings",
      symptomMonitoring: "Symptom monitoring",
      dailyCheckin: "Symptom monitoring",
    },

    severity: {
      none: "No symptoms",
      mild: "Mild condition",
      moderate: "Moderate severity",
      severe: "Severe day",
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
      profileDescription: "Patient details and allergy profile",
      allergiesTitle: "Allergy information",
      allergiesDescription: "Educational information about allergy and ASIT",
      checkinTitle: "Symptom monitoring",
      checkinDescription: "Daily assessment of nasal and ocular symptoms",
      medicationsTitle: "Medications",
      medicationsDescription: "Current treatment, dosage, and therapy effect",
      asitTitle: "ASIT schedule",
      asitDescription: "Therapy plan, medication form, and treatment schedule",
      calendarTitle: "Calendar",
      calendarDescription: "Color-coded daily condition assessment",
      reportsTitle: "My results",
      reportsDescription: "Condition calendar, symptom dynamics, and report",
      remindersTitle: "Reminder settings",
      remindersDescription:
        "Notifications about medications, diary, and ASIT events",
    },

    home: {
      profileTitle: "My profile",
      profileDescription: "Patient details and allergy profile",

      allergyInfoTitle: "Allergy information",
      allergyInfoDescription:
        "Educational information about allergy, allergic rhinitis, and ASIT",

      medicationsTitle: "Medications",
      medicationsDescription:
        "Current treatment, daily dosage, and therapy effect",

      asitScheduleTitle: "ASIT schedule",
      asitScheduleDescription:
        "Therapy plan, medication form, and treatment schedule",

      remindersTitle: "Reminder settings",
      remindersDescription:
        "Notifications for medications, symptom diary, and ASIT events",

      symptomMonitoringTitle: "Symptom monitoring",
      symptomMonitoringDescription:
        "Daily assessment of nasal and ocular symptoms",

      resultsTitle: "My results",
      resultsDescription:
        "Condition calendar, symptom dynamics, and doctor report",
    },

    profile: {
      title: "My profile",
      description:
        "Enter the patient’s basic details. They will be used in the personal card and reports.",
      fullName: "Name",
      fullNamePlaceholder: "Enter your name",
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

    allergyProfile: {
      title: "Allergy profile",
      description:
        "Fill in information about symptom onset, causative allergens, seasonality, and symptom frequency.",
      symptomsStartDate: "Onset of allergic rhinitis symptoms",
      symptomsStartDateHelp:
        "When did you first notice symptoms? If you are not sure of the exact date, please estimate it as accurately as possible.",
      causativeAllergens: "Causative allergen",
      causativeAllergensHelp:
        "Symptoms of allergic rhinitis and asthma are often related to sensitivity to aeroallergens. Which allergen do you react to?",
      allergySymptoms: "Allergy symptoms",
      allergySymptomsHelp:
        "Allergic rhinitis is characterized by runny nose, nasal congestion, sneezing, itchy nose, and other symptoms. Which symptoms do you experience?",
      seasonTitle: "Symptoms occur",
      seasonHelp: "Select the periods when symptoms usually appear or worsen.",
      frequencyTitle: "Symptom frequency",
      contactOnly: "Only with close contact with the allergen",
      daily: "Daily",
      saveButton: "Save allergy profile",
      success: "Allergy profile saved",
      loadError: "Failed to load allergy profile",
      saveError: "Failed to save allergy profile",

      spring: "Spring",
      earlySummer: "Early summer",
      lateSummer: "Late summer",
      autumn: "Autumn",
      yearRound: "All year round",
    },

    allergies: {
      title: "Allergy information",
      description:
        "Educational information about allergy, allergic rhinitis, and allergen-specific immunotherapy.",
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

    medications: {
      title: "Medications",
      description:
        "Mark current treatment, number of daily intakes, and therapy effect.",
      currentTreatment: "Current treatment",
      tablets: "Tablets",
      sublingualDrops: "Sublingual drops",
      sublingualTablets: "Sublingual tablets",
      injections: "Injections",
      chooseMedication: "Select the medications you are currently using.",
      selected: "Selected",
      notSelected: "Not selected",
      timesPerDay: "Number of intakes per day",
      treatmentEffect: "Treatment effect",
      effectNotSelected: "Not selected",
      effectGood: "Good success",
      effectPartial: "Partial success",
      effectNone: "No success",
      saveButton: "Save treatment",
      saving: "Saving...",
      success: "Treatment data saved",
      loadError: "Failed to load medications",
      saveError: "Failed to save medications",
      noMedications:
        "Medication dictionary is empty. Run seed_dicts.py on the backend.",
      activeTreatment: "Active treatment",
      noActiveTreatment: "No active medication has been selected yet.",
      intakeHint:
        "When saving a selected medication, the current treatment effect is also recorded.",
    },

    dailyCheckin: {
      title: "Symptom monitoring",
      description:
        "Fill in the daily symptom assessment. These data are used for the condition calendar and doctor report.",
      date: "Diary date",
      loadButton: "Load",
      saveButton: "Save diary",
      saving: "Saving...",
      loading: "Loading diary...",
      saved: "Diary saved",
      loadError: "Failed to load diary",
      saveError: "Failed to save diary",
      noQuestions:
        "Diary questions were not found. Run seed_checkin_questions.py on the backend.",
      nasal: "Nasal symptoms",
      ocular: "Ocular symptoms",
      wellbeing: "Wellbeing and quality of life",
      trigger: "Triggers",
      medication: "Medication for the day",
      note: "Note",
      scale0: "0 — none",
      scale1: "1 — mild",
      scale2: "2 — moderate",
      scale3: "3 — severe",
      yes: "Yes",
      no: "No",
      possibleTrigger: "Possible trigger",
      triggerNone: "Not selected",
      triggerPollen: "Pollen",
      triggerDust: "Dust",
      triggerAnimal: "Animals",
      triggerFood: "Food",
      triggerWeather: "Weather",
      triggerOther: "Other",
      dailyNotePlaceholder:
        "For example: symptoms worsened in the evening after a walk",
      medsTaken: "Took medication today",
      medicationUsage: "Medication usage",
      noMedications:
        "There are no active medications yet. You can add them on the Medications page.",
      timesTaken: "Times taken",
      effect: "Effect",
      effectGood: "Good",
      effectPartial: "Partial",
      effectNone: "No effect",
      medNote: "Comment",
      result: "Result after saving",
      nasalScore: "Nasal score",
      ocularScore: "Ocular score",
      symptomScore: "Symptoms total",
      dayScore: "Day total",
      severity: "Severity",
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
      loginDescription:
        "Симптомдар, дәрілер және АСИТ курсына арналған жеке күнделік.",
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

    sidebar: {
      dashboard: "Басты бет",
      profile: "Менің профилім",
      allergies: "Аллергия туралы ақпарат",
      medications: "Дәрілер",
      asit: "АСИТ кестесі",
      calendar: "Күнтізбе",
      reports: "Менің нәтижелерім",
      reminders: "Еске салғыштарды баптау",
      symptomMonitoring: "Симптомдарды бақылау",
      dailyCheckin: "Симптомдарды бақылау",
    },

    severity: {
      none: "Симптомдар жоқ",
      mild: "Жеңіл жағдай",
      moderate: "Орташа ауырлық",
      severe: "Ауыр күн",
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
      profileDescription:
        "Пациенттің негізгі деректері және аллергологиялық профиль",
      allergiesTitle: "Аллергия туралы ақпарат",
      allergiesDescription: "Аллергия және АСИТ туралы анықтамалық ақпарат",
      checkinTitle: "Симптомдарды бақылау",
      checkinDescription: "Мұрын және көз симптомдарын күнделікті бағалау",
      medicationsTitle: "Дәрілер",
      medicationsDescription: "Ағымдағы ем, дозалар және терапия әсері",
      asitTitle: "АСИТ кестесі",
      asitDescription: "Терапия жоспары, препарат түрі және курс кестесі",
      calendarTitle: "Күнтізбе",
      calendarDescription: "Күндер бойынша жағдайды түспен бағалау",
      reportsTitle: "Менің нәтижелерім",
      reportsDescription: "Жағдай күнтізбесі, симптомдар динамикасы және есеп",
      remindersTitle: "Еске салғыштарды баптау",
      remindersDescription:
        "Дәрілер, күнделік және АСИТ оқиғалары туралы хабарламалар",
    },

    home: {
      profileTitle: "Менің профилім",
      profileDescription:
        "Пациенттің негізгі деректері және аллергологиялық профиль",

      allergyInfoTitle: "Аллергия туралы ақпарат",
      allergyInfoDescription:
        "Аллергия, аллергиялық ринит және АСИТ туралы анықтамалық ақпарат",

      medicationsTitle: "Дәрілер",
      medicationsDescription:
        "Ағымдағы ем, тәуліктік қабылдау саны және ем әсері",

      asitScheduleTitle: "АСИТ кестесі",
      asitScheduleDescription:
        "Терапия жоспары, препарат түрі және курс кестесі",

      remindersTitle: "Еске салғыштарды баптау",
      remindersDescription:
        "Дәрілер, симптомдар күнделігі және АСИТ оқиғалары туралы хабарламалар",

      symptomMonitoringTitle: "Симптомдарды бақылау",
      symptomMonitoringDescription:
        "Мұрын және көз симптомдарын күнделікті бағалау",

      resultsTitle: "Менің нәтижелерім",
      resultsDescription:
        "Жағдай күнтізбесі, симптомдар динамикасы және дәрігерге есеп",
    },

    profile: {
      title: "Менің профилім",
      description:
        "Пациенттің негізгі деректерін көрсетіңіз. Олар жеке карточкада және есептерде қолданылады.",
      fullName: "Аты",
      fullNamePlaceholder: "Атыңызды енгізіңіз",
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

    allergyProfile: {
      title: "Аллергологиялық профиль",
      description:
        "Симптомдардың басталуын, себеп аллергендерді, маусымдылықты және симптомдардың жиілігін көрсетіңіз.",
      symptomsStartDate: "Аллергиялық ринит симптомдарының басталуы",
      symptomsStartDateHelp:
        "Симптомдарды алғаш қашан сездіңіз? Нақты күнді білмесеңіз, мүмкіндігінше жақын күнді көрсетіңіз.",
      causativeAllergens: "Себеп аллерген",
      causativeAllergensHelp:
        "Аллергиялық ринит пен астма симптомдарының дамуы аэроаллергендерге сезімталдықпен байланысты. Қай аллергенге реакцияңыз бар?",
      allergySymptoms: "Аллергия симптомдары",
      allergySymptomsHelp:
        "Аллергиялық ринит мұрыннан су ағу, мұрын бітелуі, түшкіру, мұрын қышуы және басқа симптомдармен сипатталады. Сізде қандай симптомдар бар?",
      seasonTitle: "Симптомдар мазалайтын кезең",
      seasonHelp:
        "Симптомдар пайда болатын немесе күшейетін кезеңдерді таңдаңыз.",
      frequencyTitle: "Симптомдар пайда болады",
      contactOnly: "Тек аллергенмен тығыз байланыста болғанда",
      daily: "Күн сайын",
      saveButton: "Аллергологиялық профильді сақтау",
      success: "Аллергологиялық профиль сақталды",
      loadError: "Аллергологиялық профильді жүктеу мүмкін болмады",
      saveError: "Аллергологиялық профильді сақтау мүмкін болмады",

      spring: "Көктемде",
      earlySummer: "Жаздың басында",
      lateSummer: "Жаздың соңында",
      autumn: "Күзде",
      yearRound: "Жыл бойы",
    },

    allergies: {
      title: "Аллергия туралы ақпарат",
      description:
        "Аллергия, аллергиялық ринит және аллерген-спецификалық иммунотерапия туралы анықтамалық ақпарат.",
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

    medications: {
      title: "Дәрілер",
      description:
        "Ағымдағы емді, тәуліктік қабылдау санын және терапия әсерін белгілеңіз.",
      currentTreatment: "Ағымдағы ем",
      tablets: "Таблеткалар",
      sublingualDrops: "Тіл астына тамызатын тамшылар",
      sublingualTablets: "Тіл астына салатын таблеткалар",
      injections: "Инъекциялар",
      chooseMedication: "Қазір қолданып жүрген дәрілерді таңдаңыз.",
      selected: "Таңдалды",
      notSelected: "Таңдалмаған",
      timesPerDay: "Тәулігіне қабылдау саны",
      treatmentEffect: "Ем әсері",
      effectNotSelected: "Таңдалмаған",
      effectGood: "Жақсы нәтиже",
      effectPartial: "Жартылай нәтиже",
      effectNone: "Нәтиже жоқ",
      saveButton: "Емді сақтау",
      saving: "Сақталуда...",
      success: "Ем деректері сақталды",
      loadError: "Дәрілерді жүктеу мүмкін болмады",
      saveError: "Дәрілерді сақтау мүмкін болмады",
      noMedications:
        "Дәрілер анықтамалығы бос. Backend жағында seed_dicts.py іске қосыңыз.",
      activeTreatment: "Белсенді ем",
      noActiveTreatment: "Әзірге белсенді дәрі таңдалмаған.",
      intakeHint:
        "Таңдалған дәріні сақтаған кезде емнің ағымдағы әсері де белгіленеді.",
    },

    dailyCheckin: {
      title: "Симптомдарды бақылау",
      description:
        "Күнделікті симптомдарды бағалауды толтырыңыз. Бұл деректер жағдай күнтізбесі мен дәрігерге арналған есепте қолданылады.",
      date: "Күнделік күні",
      loadButton: "Жүктеу",
      saveButton: "Күнделікті сақтау",
      saving: "Сақталуда...",
      loading: "Күнделік жүктелуде...",
      saved: "Күнделік сақталды",
      loadError: "Күнделікті жүктеу мүмкін болмады",
      saveError: "Күнделікті сақтау мүмкін болмады",
      noQuestions:
        "Күнделік сұрақтары табылмады. Backend жағында seed_checkin_questions.py іске қосыңыз.",
      nasal: "Мұрын симптомдары",
      ocular: "Көз симптомдары",
      wellbeing: "Жалпы жағдай және өмір сапасы",
      trigger: "Триггерлер",
      medication: "Күн ішіндегі дәрілер",
      note: "Ескерту",
      scale0: "0 — жоқ",
      scale1: "1 — жеңіл",
      scale2: "2 — орташа",
      scale3: "3 — қатты",
      yes: "Иә",
      no: "Жоқ",
      possibleTrigger: "Мүмкін триггер",
      triggerNone: "Таңдалмаған",
      triggerPollen: "Тозаң",
      triggerDust: "Шаң",
      triggerAnimal: "Жануарлар",
      triggerFood: "Тағам",
      triggerWeather: "Ауа райы",
      triggerOther: "Басқа",
      dailyNotePlaceholder:
        "Мысалы: серуеннен кейін кешке симптомдар күшейді",
      medsTaken: "Бүгін дәрі қабылдадыңыз ба",
      medicationUsage: "Дәрілерді қолдану",
      noMedications:
        "Белсенді дәрілер әлі жоқ. Оларды «Дәрілер» бетінде қосуға болады.",
      timesTaken: "Қанша рет қабылданды",
      effect: "Әсері",
      effectGood: "Жақсы",
      effectPartial: "Жартылай",
      effectNone: "Әсері жоқ",
      medNote: "Пікір",
      result: "Сақтаудан кейінгі нәтиже",
      nasalScore: "Мұрын баллы",
      ocularScore: "Көз баллы",
      symptomScore: "Симптомдар жалпы",
      dayScore: "Күн қорытындысы",
      severity: "Ауырлық",
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