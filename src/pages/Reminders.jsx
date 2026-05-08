import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { api, getApiError } from "../lib/api";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { getLanguage } from "../lib/i18n";

const TEXT = {
  ru: {
    title: "Настройка напоминаний",
    description:
      "Подключите Telegram-бота и создавайте напоминания о дневнике симптомов, лекарствах и событиях АСИТ.",
    telegramTitle: "Telegram-бот",
    telegramDescription:
      "Отсканируйте QR-код или откройте ссылку, чтобы привязать Telegram к аккаунту.",
    connected: "Telegram подключён",
    notConnected: "Telegram не подключён",
    username: "Пользователь",
    scanQr: "Отсканируйте QR-код",
    openTelegram: "Открыть Telegram",
    refreshQr: "Обновить QR-код",
    unlink: "Отключить Telegram",
    checkStatus: "Проверить статус",
    noBotUrl:
      "Ссылка на Telegram-бота пока недоступна. Проверьте TELEGRAM_BOT_USERNAME на backend.",
    createTitle: "Создать напоминание",
    type: "Тип",
    message: "Сообщение",
    scheduledAt: "Дата и время",
    activeMonths: "Активные месяцы",
    activeMonthsHint:
      "Можно выбрать месяцы сезона аллергии. Если ничего не выбрано — напоминание работает круглый год.",
    create: "Создать",
    creating: "Создаём...",
    listTitle: "Мои напоминания",
    emptyList: "Напоминаний пока нет.",
    loading: "Загрузка...",
    saveError: "Не удалось сохранить напоминание",
    loadError: "Не удалось загрузить напоминания",
    telegramError: "Не удалось загрузить Telegram-статус",
    delete: "Удалить",
    activate: "Включить",
    deactivate: "Выключить",
    active: "Активно",
    inactive: "Выключено",
    sent: "Отправлено",
    waiting: "Ожидает отправки",
    allYear: "Круглый год",
    botConnectedHint:
      "Теперь можно создать напоминание. Когда наступит указанное время, бот отправит сообщение в Telegram.",
    botNotConnectedHint:
      "Сначала подключите Telegram. После нажатия Start в боте вернитесь сюда и нажмите «Проверить статус».",
    types: {
      daily_checkin: "Дневник симптомов",
      asit_visit: "Визит по АСИТ",
      questionnaire: "Контрольный опрос",
      custom: "Другое",
    },
    defaultMessages: {
      daily_checkin: "Не забудьте заполнить дневник симптомов",
      asit_visit: "Через неделю должна быть очередная инъекция АСИТ — запланируйте визит к врачу",
      questionnaire: "Пройдите контрольный опрос для оценки состояния",
      custom: "Напоминание Allergy Tracker",
    },
    months: [
      "Янв",
      "Фев",
      "Мар",
      "Апр",
      "Май",
      "Июн",
      "Июл",
      "Авг",
      "Сен",
      "Окт",
      "Ноя",
      "Дек",
    ],
  },

  en: {
    title: "Reminder settings",
    description:
      "Connect the Telegram bot and create reminders for symptom diary entries, medications, and ASIT events.",
    telegramTitle: "Telegram bot",
    telegramDescription:
      "Scan the QR code or open the link to connect Telegram to your account.",
    connected: "Telegram connected",
    notConnected: "Telegram not connected",
    username: "User",
    scanQr: "Scan the QR code",
    openTelegram: "Open Telegram",
    refreshQr: "Refresh QR code",
    unlink: "Disconnect Telegram",
    checkStatus: "Check status",
    noBotUrl:
      "The Telegram bot link is not available yet. Check TELEGRAM_BOT_USERNAME on the backend.",
    createTitle: "Create reminder",
    type: "Type",
    message: "Message",
    scheduledAt: "Date and time",
    activeMonths: "Active months",
    activeMonthsHint:
      "You can select allergy season months. If no month is selected, the reminder works all year.",
    create: "Create",
    creating: "Creating...",
    listTitle: "My reminders",
    emptyList: "No reminders yet.",
    loading: "Loading...",
    saveError: "Failed to save reminder",
    loadError: "Failed to load reminders",
    telegramError: "Failed to load Telegram status",
    delete: "Delete",
    activate: "Enable",
    deactivate: "Disable",
    active: "Active",
    inactive: "Disabled",
    sent: "Sent",
    waiting: "Pending",
    allYear: "All year",
    botConnectedHint:
      "You can now create reminders. When the scheduled time comes, the bot will send a Telegram message.",
    botNotConnectedHint:
      "Connect Telegram first. After pressing Start in the bot, return here and click “Check status”.",
    types: {
      daily_checkin: "Symptom diary",
      asit_visit: "ASIT visit",
      questionnaire: "Control questionnaire",
      custom: "Custom",
    },
    defaultMessages: {
      daily_checkin: "Do not forget to complete your symptom diary",
      asit_visit: "Your next ASIT injection is coming soon — schedule a doctor visit",
      questionnaire: "Complete the control questionnaire to assess your condition",
      custom: "Allergy Tracker reminder",
    },
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },

  kk: {
    title: "Еске салуларды баптау",
    description:
      "Telegram-ботты қосып, симптомдар күнделігі, дәрілер және АСИТ оқиғалары бойынша еске салулар жасаңыз.",
    telegramTitle: "Telegram-бот",
    telegramDescription:
      "Telegram аккаунтын қосу үшін QR-кодты сканерлеңіз немесе сілтемені ашыңыз.",
    connected: "Telegram қосылды",
    notConnected: "Telegram қосылмаған",
    username: "Пайдаланушы",
    scanQr: "QR-кодты сканерлеңіз",
    openTelegram: "Telegram ашу",
    refreshQr: "QR-кодты жаңарту",
    unlink: "Telegram өшіру",
    checkStatus: "Күйін тексеру",
    noBotUrl:
      "Telegram-бот сілтемесі қолжетімсіз. Backend ішінде TELEGRAM_BOT_USERNAME мәнін тексеріңіз.",
    createTitle: "Еске салу жасау",
    type: "Түрі",
    message: "Хабарлама",
    scheduledAt: "Күні мен уақыты",
    activeMonths: "Белсенді айлар",
    activeMonthsHint:
      "Аллергия маусымының айларын таңдауға болады. Ай таңдалмаса, еске салу жыл бойы жұмыс істейді.",
    create: "Жасау",
    creating: "Жасалуда...",
    listTitle: "Менің еске салуларым",
    emptyList: "Еске салулар әлі жоқ.",
    loading: "Жүктелуде...",
    saveError: "Еске салуды сақтау мүмкін болмады",
    loadError: "Еске салуларды жүктеу мүмкін болмады",
    telegramError: "Telegram күйін жүктеу мүмкін болмады",
    delete: "Жою",
    activate: "Қосу",
    deactivate: "Өшіру",
    active: "Белсенді",
    inactive: "Өшірулі",
    sent: "Жіберілді",
    waiting: "Күтуде",
    allYear: "Жыл бойы",
    botConnectedHint:
      "Енді еске салу жасауға болады. Уақыты келгенде бот Telegram арқылы хабарлама жібереді.",
    botNotConnectedHint:
      "Алдымен Telegram қосыңыз. Ботта Start басқаннан кейін осы бетке оралып, «Күйін тексеру» батырмасын басыңыз.",
    types: {
      daily_checkin: "Симптомдар күнделігі",
      asit_visit: "АСИТ визиті",
      questionnaire: "Бақылау сауалнамасы",
      custom: "Басқа",
    },
    defaultMessages: {
      daily_checkin: "Симптомдар күнделігін толтыруды ұмытпаңыз",
      asit_visit: "Келесі АСИТ инъекциясы жақында — дәрігерге визит жоспарлаңыз",
      questionnaire: "Жағдайды бағалау үшін бақылау сауалнамасын өтіңіз",
      custom: "Allergy Tracker еске салуы",
    },
    months: [
      "Қаң",
      "Ақп",
      "Нау",
      "Сәу",
      "Мам",
      "Мау",
      "Шіл",
      "Там",
      "Қыр",
      "Қаз",
      "Қар",
      "Жел",
    ],
  },
};

const REMINDER_TYPES = [
  "daily_checkin",
  "asit_visit",
  "questionnaire",
  "custom",
];

function getText(language) {
  return TEXT[language] || TEXT.ru;
}

function toDateTimeLocalValue(date = new Date()) {
  const copy = new Date(date);
  copy.setMinutes(copy.getMinutes() - copy.getTimezoneOffset());
  return copy.toISOString().slice(0, 16);
}

function getDefaultReminderDate() {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 3);
  return toDateTimeLocalValue(date);
}

function formatDateTime(value, language) {
  if (!value) return "—";

  try {
    return new Intl.DateTimeFormat(
      language === "kk" ? "kk-KZ" : language === "en" ? "en-US" : "ru-RU",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    ).format(new Date(value));
  } catch {
    return value;
  }
}

function normalizeList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

function TelegramStatusBadge({ linked, text }) {
  return (
    <span
      className={[
        "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold",
        linked
          ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border border-amber-200 bg-amber-50 text-amber-700",
      ].join(" ")}
    >
      {linked ? text.connected : text.notConnected}
    </span>
  );
}

function MonthButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-2xl px-3 py-2 text-sm font-semibold transition",
        active
          ? "border border-emerald-300 bg-emerald-50 text-emerald-700 shadow-sm"
          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function ActionButton({ children, onClick, disabled, variant = "primary", type = "button" }) {
  const base =
    "inline-flex items-center justify-center rounded-[22px] px-5 py-3 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "border border-emerald-300/70 bg-[linear-gradient(135deg,rgba(16,185,129,0.96),rgba(5,150,105,0.86))] text-white shadow-[0_14px_34px_rgba(16,185,129,0.22),inset_0_1px_0_rgba(255,255,255,0.35)] hover:scale-[1.01]",
    secondary:
      "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50",
    danger:
      "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100",
    soft:
      "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.primary}`}
    >
      {children}
    </button>
  );
}

export default function Reminders() {
  const language = getLanguage();
  const text = getText(language);

  const [telegram, setTelegram] = React.useState(null);
  const [reminders, setReminders] = React.useState([]);

  const [type, setType] = React.useState("daily_checkin");
  const [message, setMessage] = React.useState(
    text.defaultMessages.daily_checkin
  );
  const [scheduledAt, setScheduledAt] = React.useState(getDefaultReminderDate);
  const [activeMonths, setActiveMonths] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [telegramLoading, setTelegramLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const isTelegramLinked = Boolean(telegram?.is_linked);
  const botUrl = telegram?.bot_url;

  React.useEffect(() => {
    loadPage();
  }, []);

  React.useEffect(() => {
    setMessage(text.defaultMessages[type] || text.defaultMessages.custom);
  }, [type, language]);

  React.useEffect(() => {
    if (isTelegramLinked) return;

    const timer = window.setInterval(() => {
      loadTelegramStatus({ silent: true });
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isTelegramLinked]);

  async function loadPage() {
    try {
      setLoading(true);
      setError("");

      await Promise.all([loadTelegramStatus({ silent: true }), loadReminders()]);
    } finally {
      setLoading(false);
    }
  }

  async function loadTelegramStatus({ silent = false } = {}) {
    try {
      if (!silent) {
        setTelegramLoading(true);
        setError("");
        setSuccess("");
      }

      const response = await api.get("/me/telegram/link");
      setTelegram(response.data);
    } catch (err) {
      if (!silent) {
        setError(getApiError(err, text.telegramError));
      }
    } finally {
      if (!silent) {
        setTelegramLoading(false);
      }
    }
  }

  async function refreshTelegramLink() {
    try {
      setTelegramLoading(true);
      setError("");
      setSuccess("");

      const response = await api.post("/me/telegram/refresh-link");
      setTelegram(response.data);
    } catch (err) {
      setError(getApiError(err, text.telegramError));
    } finally {
      setTelegramLoading(false);
    }
  }

  async function unlinkTelegram() {
    try {
      setTelegramLoading(true);
      setError("");
      setSuccess("");

      await api.delete("/me/telegram/unlink");
      await loadTelegramStatus({ silent: true });
    } catch (err) {
      setError(getApiError(err, text.telegramError));
    } finally {
      setTelegramLoading(false);
    }
  }

  async function loadReminders() {
    try {
      const response = await api.get("/me/reminders");
      setReminders(normalizeList(response.data));
    } catch (err) {
      setError(getApiError(err, text.loadError));
    }
  }

  function toggleMonth(monthNo) {
    setActiveMonths((current) => {
      if (current.includes(monthNo)) {
        return current.filter((item) => item !== monthNo);
      }

      return [...current, monthNo].sort((a, b) => a - b);
    });
  }

  async function createReminder(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await api.post("/me/reminders", {
        type,
        message,
        scheduled_at: scheduledAt,
        active_months: activeMonths.length > 0 ? activeMonths : null,
      });

      setScheduledAt(getDefaultReminderDate());
      setActiveMonths([]);
      setMessage(text.defaultMessages[type] || text.defaultMessages.custom);

      await loadReminders();
      setSuccess("Напоминание создано");
    } catch (err) {
      setError(getApiError(err, text.saveError));
    } finally {
      setSaving(false);
    }
  }

  async function toggleReminder(reminder) {
    try {
      setError("");
      setSuccess("");

      await api.patch(`/me/reminders/${reminder.id}`, {
        is_active: !reminder.is_active,
      });

      await loadReminders();
    } catch (err) {
      setError(getApiError(err, text.saveError));
    }
  }

  async function deleteReminder(reminderId) {
    try {
      setError("");
      setSuccess("");

      await api.delete(`/me/reminders/${reminderId}`);
      await loadReminders();
    } catch (err) {
      setError(getApiError(err, text.saveError));
    }
  }

  function getReminderTypeLabel(value) {
    return text.types[value] || value;
  }

  function getMonthsLabel(months) {
    const list = normalizeList(months);

    if (list.length === 0) return text.allYear;

    return list.map((month) => text.months[month - 1] || month).join(", ");
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-linear-to-br from-emerald-50 via-white to-slate-50 p-6 shadow-sm sm:p-8">
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
        <>
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {text.telegramTitle}
                  </h2>

                  <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
                    {text.telegramDescription}
                  </p>
                </div>

                <TelegramStatusBadge linked={isTelegramLinked} text={text} />
              </div>
            </CardHeader>

            <CardBody>
              <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
                <div className="rounded-[28px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(240,253,250,0.56))] p-5 shadow-[0_16px_42px_rgba(15,23,42,0.07)] backdrop-blur-xl">
                  {botUrl ? (
                    <div className="space-y-4">
                      <div className="rounded-3xl bg-white p-4 shadow-sm">
                        <QRCodeSVG
                          value={botUrl}
                          size={240}
                          level="M"
                          includeMargin
                        />
                      </div>

                      <div className="text-center text-sm font-medium text-slate-700">
                        {text.scanQr}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm leading-6 text-amber-700">
                      {text.noBotUrl}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-sm text-slate-500">
                      {isTelegramLinked
                        ? text.botConnectedHint
                        : text.botNotConnectedHint}
                    </div>

                    {telegram?.username && (
                      <div className="mt-3 text-sm text-slate-600">
                        <span className="font-semibold text-slate-900">
                          {text.username}:
                        </span>{" "}
                        @{telegram.username}
                      </div>
                    )}

                    {botUrl && (
                      <a
                        href={botUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex w-full items-center justify-center rounded-[22px] border border-emerald-300/70 bg-[linear-gradient(135deg,rgba(16,185,129,0.96),rgba(5,150,105,0.86))] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22),inset_0_1px_0_rgba(255,255,255,0.35)] transition hover:scale-[1.01] sm:w-auto"
                      >
                        {text.openTelegram}
                      </a>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <ActionButton
                      onClick={() => loadTelegramStatus()}
                      disabled={telegramLoading}
                      variant="secondary"
                    >
                      {text.checkStatus}
                    </ActionButton>

                    <ActionButton
                      onClick={refreshTelegramLink}
                      disabled={telegramLoading}
                      variant="soft"
                    >
                      {text.refreshQr}
                    </ActionButton>

                    {isTelegramLinked && (
                      <ActionButton
                        onClick={unlinkTelegram}
                        disabled={telegramLoading}
                        variant="danger"
                      >
                        {text.unlink}
                      </ActionButton>
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-slate-900">
                {text.createTitle}
              </h2>
            </CardHeader>

            <CardBody>
              <form onSubmit={createReminder} className="space-y-5">
                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      {text.type}
                    </label>

                    <select
                      value={type}
                      onChange={(event) => setType(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
                    >
                      {REMINDER_TYPES.map((item) => (
                        <option key={item} value={item}>
                          {getReminderTypeLabel(item)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      {text.scheduledAt}
                    </label>

                    <input
                      type="datetime-local"
                      value={scheduledAt}
                      onChange={(event) => setScheduledAt(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    {text.message}
                  </label>

                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={3}
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
                    required
                  />
                </div>

                <div>
                  <div className="mb-2 text-sm font-medium text-slate-700">
                    {text.activeMonths}
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12">
                    {text.months.map((month, index) => {
                      const monthNo = index + 1;

                      return (
                        <MonthButton
                          key={monthNo}
                          active={activeMonths.includes(monthNo)}
                          onClick={() => toggleMonth(monthNo)}
                        >
                          {month}
                        </MonthButton>
                      );
                    })}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {text.activeMonthsHint}
                  </p>
                </div>

                <div className="flex justify-end">
                  <ActionButton type="submit" disabled={saving}>
                    {saving ? text.creating : text.create}
                  </ActionButton>
                </div>
              </form>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-slate-900">
                {text.listTitle}
              </h2>
            </CardHeader>

            <CardBody>
              {reminders.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                  {text.emptyList}
                </div>
              ) : (
                <div className="space-y-3">
                  {reminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="text-lg font-semibold text-slate-900">
                              {getReminderTypeLabel(reminder.type)}
                            </div>

                            <span
                              className={[
                                "rounded-full px-3 py-1 text-xs font-semibold",
                                reminder.is_active
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-slate-100 text-slate-500",
                              ].join(" ")}
                            >
                              {reminder.is_active ? text.active : text.inactive}
                            </span>

                            <span
                              className={[
                                "rounded-full px-3 py-1 text-xs font-semibold",
                                reminder.sent_at
                                  ? "bg-blue-50 text-blue-700"
                                  : "bg-amber-50 text-amber-700",
                              ].join(" ")}
                            >
                              {reminder.sent_at ? text.sent : text.waiting}
                            </span>
                          </div>

                          <div className="mt-2 text-sm leading-6 text-slate-600">
                            {reminder.message || "—"}
                          </div>

                          <div className="mt-3 grid gap-2 text-sm text-slate-500 sm:grid-cols-2">
                            <div>
                              <span className="font-medium text-slate-700">
                                {text.scheduledAt}:
                              </span>{" "}
                              {formatDateTime(reminder.scheduled_at, language)}
                            </div>

                            <div>
                              <span className="font-medium text-slate-700">
                                {text.activeMonths}:
                              </span>{" "}
                              {getMonthsLabel(reminder.active_months)}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <ActionButton
                            onClick={() => toggleReminder(reminder)}
                            variant="secondary"
                          >
                            {reminder.is_active
                              ? text.deactivate
                              : text.activate}
                          </ActionButton>

                          <ActionButton
                            onClick={() => deleteReminder(reminder.id)}
                            variant="danger"
                          >
                            {text.delete}
                          </ActionButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}