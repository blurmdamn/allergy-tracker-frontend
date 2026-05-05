import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApiError } from "../lib/api";
import { registerRequest } from "../lib/auth";
import { getLanguage, t } from "../lib/i18n";
import LanguageSwitcher from "../components/layout/LanguageSwitcher";

export default function Register() {
  const navigate = useNavigate();
  const language = getLanguage();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setError(t("auth.passwordsDoNotMatch", language));
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await registerRequest({
        email,
        password,
      });

      setSuccess(t("auth.registerSuccess", language));

      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (err) {
      setError(getApiError(err, t("auth.registerError", language)));
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
            {t("auth.registerTitle", language)}
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {t("auth.registerDescription", language)}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700">
            {success}
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
                placeholder={t("auth.createPassword", language)}
                required
                minLength={8}
                maxLength={72}
                autoComplete="new-password"
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

            <p className="mt-1 text-xs text-slate-400">8–72 characters</p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              {t("auth.repeatPassword", language)}
            </label>

            <div className="relative">
              <input
                type={showPasswordConfirm ? "text" : "password"}
                value={passwordConfirm}
                onChange={(event) => setPasswordConfirm(event.target.value)}
                placeholder={t("auth.repeatPassword", language)}
                required
                minLength={8}
                maxLength={72}
                autoComplete="new-password"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-24 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-600/15"
              />

              <button
                type="button"
                onClick={() => setShowPasswordConfirm((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-emerald-600 transition hover:text-emerald-700 sm:text-sm"
              >
                {showPasswordConfirm
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
              ? t("auth.registering", language)
              : t("auth.registerButton", language)}
          </button>
        </form>

        <div className="mt-6 text-center text-sm leading-6 text-slate-500">
          {t("auth.alreadyHaveAccount", language)}{" "}
          <Link
            to="/login"
            className="font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            {t("auth.loginLink", language)}
          </Link>
        </div>
      </div>
    </div>
  );
}