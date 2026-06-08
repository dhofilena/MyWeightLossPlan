import { useState } from "react";
import type { AIIdentifyResult } from "../types";

interface AIIdentifyProps {
  onAdd: (result: AIIdentifyResult, meal: "breakfast" | "lunch" | "dinner" | "snack") => void;
}

const CONFIDENCE_STYLES = {
  high: "bg-jade-light text-jade",
  medium: "bg-gold-light text-gold",
  low: "bg-coral-light text-coral",
};

const EXAMPLE_QUERIES = [
  "1 bowl of tonkotsu ramen",
  "2 pieces of siu mai",
  "large plate of nasi lemak",
  "珍珠奶茶 bubble tea",
  "half bowl of congee with egg",
];

export function AIIdentify({ onAdd }: AIIdentifyProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIIdentifyResult | null>(null);
  const [error, setError] = useState("");
  const [meal, setMeal] = useState<"breakfast" | "lunch" | "dinner" | "snack">("lunch");

  const handleIdentify = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/identify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to identify food");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">✨</span>
        <div>
          <h2 className="font-semibold text-ink">AI Food Identifier</h2>
          <p className="text-xs text-slate">Describe what you ate in plain language</p>
        </div>
      </div>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='e.g. "2 bowls of pho" or "large fried rice with egg"'
        className="w-full border border-border rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-jade/30 focus:border-jade bg-cream/50"
        rows={2}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleIdentify();
          }
        }}
      />

      <div className="flex flex-wrap gap-1.5 mt-2">
        {EXAMPLE_QUERIES.map((ex) => (
          <button
            key={ex}
            onClick={() => setQuery(ex)}
            className="text-[11px] px-2 py-1 rounded-full bg-cream border border-border text-slate hover:border-jade/40 hover:text-jade transition-colors"
          >
            {ex}
          </button>
        ))}
      </div>

      <button
        onClick={handleIdentify}
        disabled={loading || !query.trim()}
        className="w-full mt-3 bg-jade text-white font-medium py-2.5 rounded-xl hover:bg-jade/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Identifying...
          </>
        ) : (
          "Identify Calories"
        )}
      </button>

      {error && (
        <div className="mt-3 text-sm text-coral bg-coral-light rounded-lg px-3 py-2">{error}</div>
      )}

      {result && (
        <div className="mt-4 border border-border rounded-xl p-4 bg-cream/30 animate-fade-in">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-semibold text-ink">{result.name}</div>
              <div className="text-sm text-slate mt-0.5">
                {result.quantity > 1 ? `${result.quantity}× ` : ""}
                {result.serving} · {result.calories} cal each
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xl font-bold text-coral">{result.totalCalories}</div>
              <div className="text-xs text-slate">calories</div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${CONFIDENCE_STYLES[result.confidence]}`}>
              {result.confidence} confidence
            </span>
          </div>

          <p className="text-xs text-slate mt-2 leading-relaxed">{result.explanation}</p>

          <div className="flex items-center gap-2 mt-4">
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
            <button
              onClick={() => {
                onAdd(result, meal);
                setResult(null);
                setQuery("");
              }}
              className="flex-1 bg-coral text-white font-medium py-2 rounded-lg hover:bg-coral/90 transition-colors text-sm"
            >
              Add to Log
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
