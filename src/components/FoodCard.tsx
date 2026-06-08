import type { Food } from "../data/foods";
import { FOOD_CATEGORIES } from "../data/foods";

interface FoodCardProps {
  food: Food;
  onAdd: (food: Food) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  rice: "bg-amber-50 text-amber-700",
  noodles: "bg-orange-50 text-orange-700",
  "dim-sum": "bg-rose-50 text-rose-700",
  curry: "bg-red-50 text-red-700",
  soup: "bg-sky-50 text-sky-700",
  protein: "bg-emerald-50 text-emerald-700",
  snack: "bg-yellow-50 text-yellow-700",
  drink: "bg-blue-50 text-blue-700",
  dessert: "bg-pink-50 text-pink-700",
};

export function FoodCard({ food, onAdd }: FoodCardProps) {
  const colorClass = CATEGORY_COLORS[food.category] || "bg-gray-50 text-gray-700";

  return (
    <button
      onClick={() => onAdd(food)}
      className="w-full text-left bg-card border border-border rounded-xl p-3 hover:border-jade/40 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="font-medium text-sm text-ink group-hover:text-jade transition-colors truncate">
            {food.name}
          </div>
          {food.nameLocal && (
            <div className="text-xs text-slate mt-0.5">{food.nameLocal}</div>
          )}
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${colorClass}`}>
              {FOOD_CATEGORIES[food.category]}
            </span>
            <span className="text-[10px] text-slate">{food.cuisine}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-semibold text-sm text-coral">{food.calories}</div>
          <div className="text-[10px] text-slate">cal</div>
          <div className="text-[10px] text-slate mt-0.5 max-w-[80px] truncate">{food.serving}</div>
        </div>
      </div>
    </button>
  );
}
