import { useMemo, useState } from "react";
import { ASIAN_FOODS, FOOD_CATEGORIES, searchFoods, type Food, type FoodCategory } from "./data/foods";
import { useDailyLog, useSettings } from "./hooks/useStorage";
import type { AIIdentifyResult } from "./types";
import { ProgressRing } from "./components/ProgressRing";
import { FoodCard } from "./components/FoodCard";
import { LogEntry } from "./components/LogEntry";
import { AIIdentify } from "./components/AIIdentify";
import { SettingsPanel } from "./components/SettingsPanel";

type Tab = "browse" | "ai" | "log";

function getGreeting(name: string): string {
  const hour = new Date().getHours();
  const time =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  return name ? `${time}, ${name}` : time;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  if (dateStr === today) return "Today";
  if (dateStr === yesterday) return "Yesterday";
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function App() {
  const { settings, setSettings } = useSettings();
  const [selectedDate, setSelectedDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const { log, addEntry, removeEntry, totalCalories } = useDailyLog(selectedDate);

  const [tab, setTab] = useState<Tab>("browse");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<FoodCategory | "all">("all");
  const [meal, setMeal] = useState<"breakfast" | "lunch" | "dinner" | "snack">("lunch");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [addedFlash, setAddedFlash] = useState("");

  const filteredFoods = useMemo(() => {
    let foods = search ? searchFoods(search) : ASIAN_FOODS;
    if (category !== "all") {
      foods = foods.filter((f) => f.category === category);
    }
    return foods;
  }, [search, category]);

  const handleAddFood = (food: Food) => {
    addEntry({
      foodId: food.id,
      name: food.name,
      calories: food.calories,
      serving: food.serving,
      quantity: 1,
      meal,
      source: "database",
    });
    setAddedFlash(food.name);
    setTimeout(() => setAddedFlash(""), 2000);
  };

  const handleAddAI = (result: AIIdentifyResult, mealType: typeof meal) => {
    addEntry({
      foodId: result.matchedFoodId,
      name: result.name,
      calories: result.calories,
      serving: result.serving,
      quantity: result.quantity,
      meal: mealType,
      source: "ai",
    });
    setAddedFlash(result.name);
    setTab("log");
    setTimeout(() => setAddedFlash(""), 2000);
  };

  const mealBreakdown = useMemo(() => {
    const breakdown = { breakfast: 0, lunch: 0, dinner: 0, snack: 0 };
    for (const entry of log.entries) {
      breakdown[entry.meal] += entry.calories * entry.quantity;
    }
    return breakdown;
  }, [log.entries]);

  const shiftDate = (days: number) => {
    const d = new Date(selectedDate + "T12:00:00");
    d.setDate(d.getDate() + days);
    const next = d.toISOString().slice(0, 10);
    const today = new Date().toISOString().slice(0, 10);
    if (next <= today) setSelectedDate(next);
  };

  const isToday = selectedDate === new Date().toISOString().slice(0, 10);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-ink">Asian Calorie Tracker</h1>
              <p className="text-xs text-slate">{getGreeting(settings.name)}</p>
            </div>
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2 rounded-xl hover:bg-cream transition-colors text-slate"
              aria-label="Settings"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M16.2 12.1a1.4 1.4 0 00.3 1.5l.05.05a1.7 1.7 0 11-2.4 2.4l-.05-.05a1.4 1.4 0 00-1.5-.3 1.4 1.4 0 00-.85 1.3v.15a1.7 1.7 0 11-3.4 0v-.1a1.4 1.4 0 00-.9-1.3 1.4 1.4 0 00-1.5.3l-.05.05a1.7 1.7 0 11-2.4-2.4l.05-.05a1.4 1.4 0 00.3-1.5 1.4 1.4 0 00-1.3-.85h-.15a1.7 1.7 0 110-3.4h.1a1.4 1.4 0 001.3-.9 1.4 1.4 0 00-.3-1.5l-.05-.05a1.7 1.7 0 112.4-2.4l.05.05a1.4 1.4 0 001.5.3h.05a1.4 1.4 0 00.85-1.3v-.15a1.7 1.7 0 113.4 0v.1a1.4 1.4 0 00.9 1.3 1.4 1.4 0 001.5-.3l.05-.05a1.7 1.7 0 112.4 2.4l-.05.05a1.4 1.4 0 00-.3 1.5v.05a1.4 1.4 0 001.3.9h.15a1.7 1.7 0 110 3.4h-.1a1.4 1.4 0 00-1.3.9z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-5">
        {/* Progress Section */}
        <section className="bg-card border border-border rounded-2xl p-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => shiftDate(-1)}
              className="p-1.5 rounded-lg hover:bg-cream text-slate transition-colors"
              aria-label="Previous day"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <span className="font-medium text-sm">{formatDate(selectedDate)}</span>
            <button
              onClick={() => shiftDate(1)}
              disabled={isToday}
              className="p-1.5 rounded-lg hover:bg-cream text-slate transition-colors disabled:opacity-30"
              aria-label="Next day"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-5">
            <ProgressRing current={totalCalories} goal={settings.dailyCalorieGoal} />
            <div className="flex-1 space-y-2">
              {(["breakfast", "lunch", "dinner", "snack"] as const).map((m) => (
                <div key={m} className="flex items-center justify-between text-xs">
                  <span className="text-slate capitalize">{m}</span>
                  <span className="font-medium">{mealBreakdown[m]} cal</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Flash notification */}
        {addedFlash && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-jade text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg animate-fade-in">
            Added {addedFlash}
          </div>
        )}

        {/* Tab Content */}
        {tab === "browse" && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <select
                value={meal}
                onChange={(e) => setMeal(e.target.value as typeof meal)}
                className="text-sm border border-border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-jade/30"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search foods..."
                className="flex-1 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-jade/30 bg-white"
              />
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide">
              <button
                onClick={() => setCategory("all")}
                className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                  category === "all"
                    ? "bg-jade text-white"
                    : "bg-cream border border-border text-slate hover:border-jade/40"
                }`}
              >
                All
              </button>
              {(Object.keys(FOOD_CATEGORIES) as FoodCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                    category === cat
                      ? "bg-jade text-white"
                      : "bg-cream border border-border text-slate hover:border-jade/40"
                  }`}
                >
                  {FOOD_CATEGORIES[cat]}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {filteredFoods.length === 0 ? (
                <p className="text-center text-sm text-slate py-8">
                  No foods found. Try the AI tab to identify custom items.
                </p>
              ) : (
                filteredFoods.map((food) => (
                  <FoodCard key={food.id} food={food} onAdd={handleAddFood} />
                ))
              )}
            </div>
            <p className="text-center text-[11px] text-slate mt-4">
              {filteredFoods.length} of {ASIAN_FOODS.length} Asian foods
            </p>
          </div>
        )}

        {tab === "ai" && (
          <div className="animate-fade-in">
            <AIIdentify onAdd={handleAddAI} />
          </div>
        )}

        {tab === "log" && (
          <div className="bg-card border border-border rounded-2xl p-5 animate-fade-in">
            <h2 className="font-semibold text-ink mb-1">Food Log</h2>
            <p className="text-xs text-slate mb-4">
              {log.entries.length} item{log.entries.length !== 1 ? "s" : ""} · {totalCalories} cal total
            </p>
            {log.entries.length === 0 ? (
              <div className="text-center py-10">
                <div className="text-3xl mb-2">🍜</div>
                <p className="text-sm text-slate">No food logged yet today.</p>
                <p className="text-xs text-slate mt-1">Browse foods or use AI to get started.</p>
              </div>
            ) : (
              <div>
                {log.entries
                  .slice()
                  .reverse()
                  .map((entry) => (
                    <LogEntry key={entry.id} entry={entry} onRemove={removeEntry} />
                  ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 inset-x-0 bg-card border-t border-border z-40">
        <div className="max-w-lg mx-auto flex">
          {(
            [
              { id: "browse" as Tab, label: "Foods", icon: "🍱" },
              { id: "ai" as Tab, label: "AI Identify", icon: "✨" },
              { id: "log" as Tab, label: "Log", icon: "📊" },
            ] as const
          ).map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 flex flex-col items-center py-3 text-xs font-medium transition-colors ${
                tab === id ? "text-jade" : "text-slate"
              }`}
            >
              <span className="text-lg mb-0.5">{icon}</span>
              {label}
              {id === "log" && log.entries.length > 0 && (
                <span className="absolute top-1 ml-8 bg-coral text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {log.entries.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      <SettingsPanel
        settings={settings}
        onUpdate={setSettings}
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
