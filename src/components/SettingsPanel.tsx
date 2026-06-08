import type { UserSettings } from "../types";

interface SettingsPanelProps {
  settings: UserSettings;
  onUpdate: (update: Partial<UserSettings>) => void;
  open: boolean;
  onClose: () => void;
}

export function SettingsPanel({ settings, onUpdate, open, onClose }: SettingsPanelProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="relative bg-card rounded-t-2xl sm:rounded-2xl w-full max-w-md p-6 animate-fade-in shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-lg">Settings</h2>
          <button onClick={onClose} className="text-slate hover:text-ink p-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <label className="block mb-4">
          <span className="text-sm font-medium text-ink">Your Name</span>
          <input
            type="text"
            value={settings.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="Optional"
            className="mt-1 w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-jade/30 focus:border-jade"
          />
        </label>

        <label className="block mb-6">
          <span className="text-sm font-medium text-ink">Daily Calorie Goal</span>
          <input
            type="number"
            value={settings.dailyCalorieGoal}
            onChange={(e) => onUpdate({ dailyCalorieGoal: Math.max(500, parseInt(e.target.value) || 2000) })}
            min={500}
            max={10000}
            step={50}
            className="mt-1 w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-jade/30 focus:border-jade"
          />
          <p className="text-xs text-slate mt-1">Recommended: 1,800–2,200 for most adults</p>
        </label>

        <button
          onClick={onClose}
          className="w-full bg-jade text-white font-medium py-2.5 rounded-xl hover:bg-jade/90 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
}
