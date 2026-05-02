import { cn } from "../../lib/cn";

export default function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none",
        "focus:border-emerald-400 focus:ring-2 focus:ring-emerald-600/15",
        "placeholder:text-slate-400",
        className
      )}
      {...props}
    />
  );
}