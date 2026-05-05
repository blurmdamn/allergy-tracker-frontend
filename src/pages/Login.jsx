import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApiError } from "../lib/api";
import { loginRequest } from "../lib/auth";
import { getLanguage, t } from "../lib/i18n";
import LanguageSwitcher from "../components/layout/LanguageSwitcher";

export default function Login() {
  const navigate = useNavigate();
  const language = getLanguage();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await loginRequest({
        email,
        password,
      });

      navigate("/");
    } catch (err) {
      setError(getApiError(err, t("auth.loginError", language)));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-3 py-6 sm:px-4 lg:px-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-7">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-emerald-100 bg-emerald-50 shadow-sm">
                <span className="text-sm font-bold text-emerald-700">AT</span>
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  Allergy Tracker
                </p>
                <p className="truncate text-xs text-slate-400">
                  ASIT monitoring
                </p>
              </div>
            </div>

            <div className="w-32 shrink-0 sm:w-36">
              <LanguageSwitcher />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {t("auth.loginTitle", language)}
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {t("auth.loginDescription", language)}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              {t("auth.email", language)}
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="patient@example.com"
              required
              autoComplete="email"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-600/15"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              {t("auth.password", language)}
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={t("auth.enterPassword", language)}
                required
                autoComplete="current-password"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-24 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-600/15"
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-emerald-600 transition hover:text-emerald-700 sm:text-sm"
              >
                {showPassword
                  ? t("auth.hide", language)
                  : t("auth.show", language)}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? t("auth.loggingIn", language)
              : t("auth.loginButton", language)}
          </button>
        </form>

        <div className="mt-6 text-center text-sm leading-6 text-slate-500">
          {t("auth.noAccount", language)}{" "}
          <Link
            to="/register"
            className="font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            {t("auth.registerLink", language)}
          </Link>
        </div>
      </div>
    </div>
  );
}