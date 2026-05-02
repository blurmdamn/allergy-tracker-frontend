import { cn } from "../../lib/cn";

const base =
  "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-emerald-600 text-white hover:bg-emerald-700",
  dark: "bg-slate-900 text-white hover:bg-slate-800",
  ghost: "text-slate-700 hover:bg-slate-100",
  soft: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  outline: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
};

export default function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], className)}
      {...props}
    />
  );
}