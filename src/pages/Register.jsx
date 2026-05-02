import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApiError } from "../lib/api";
import { registerRequest } from "../lib/auth";

export default function Register() {
  const navigate = useNavigate();

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
      setError("Пароли не совпадают");
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

      setSuccess("Аккаунт создан. Теперь войдите в систему.");

      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (err) {
      setError(getApiError(err, "Не удалось зарегистрироваться"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F8FB] px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-semibold text-emerald-600">
            Allergy Tracker
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Регистрация
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Создайте аккаунт для ведения дневника симптомов и курса АСИТ.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="patient@example.com"
              required
              autoComplete="email"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Пароль
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Придумайте пароль"
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-24 outline-none transition focus:border-emerald-500 focus:bg-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
              >
                {showPassword ? "Скрыть" : "Показать"}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Повторите пароль
            </label>

            <div className="relative">
              <input
                type={showPasswordConfirm ? "text" : "password"}
                value={passwordConfirm}
                onChange={(event) => setPasswordConfirm(event.target.value)}
                placeholder="Повторите пароль"
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-24 outline-none transition focus:border-emerald-500 focus:bg-white"
              />

              <button
                type="button"
                onClick={() => setShowPasswordConfirm((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
              >
                {showPasswordConfirm ? "Скрыть" : "Показать"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Регистрируем..." : "Зарегистрироваться"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Уже есть аккаунт?{" "}
          <Link
            to="/login"
            className="font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}