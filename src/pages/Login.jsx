import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApiError } from "../lib/api";
import { loginRequest } from "../lib/auth";

export default function Login() {
  const navigate = useNavigate();

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
      setError(getApiError(err, "Не удалось войти в систему"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F8FB] px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-semibold text-emerald-600">
            Allergy Tracker
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Вход в систему
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Личный дневник симптомов, лекарств и курса АСИТ.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
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
                placeholder="Введите пароль"
                required
                autoComplete="current-password"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Входим..." : "Войти"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Нет аккаунта?{" "}
          <Link
            to="/register"
            className="font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            Зарегистрируйтесь
          </Link>
        </div>
      </div>
    </div>
  );
}