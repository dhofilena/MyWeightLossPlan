import type { LogEntry as LogEntryType } from "../types";

interface LogEntryProps {
  entry: LogEntryType;
  onRemove: (id: string) => void;
}

const MEAL_LABELS = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
};

const MEAL_COLORS = {
  breakfast: "bg-gold-light text-gold",
  lunch: "bg-jade-light text-jade",
  dinner: "bg-indigo-50 text-indigo-700",
  snack: "bg-coral-light text-coral",
};

const SOURCE_ICONS = {
  manual: "✏️",
  database: "📋",
  ai: "✨",
};

export function LogEntry({ entry, onRemove }: LogEntryProps) {
  const total = entry.calories * entry.quantity;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-border last:border-0 animate-fade-in">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-ink truncate">{entry.name}</span>
          <span className="text-xs" title={`Added via ${entry.source}`}>
            {SOURCE_ICONS[entry.source]}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${MEAL_COLORS[entry.meal]}`}>
            {MEAL_LABELS[entry.meal]}
          </span>
          <span className="text-xs text-slate">
            {entry.quantity > 1 ? `${entry.quantity}× ` : ""}
            {entry.serving}
          </span>
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="font-semibold text-coral">{total} cal</div>
      </div>
      <button
        onClick={() => onRemove(entry.id)}
        className="text-slate hover:text-coral transition-colors p-1 rounded-lg hover:bg-coral-light"
        aria-label="Remove entry"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
