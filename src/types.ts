export interface LogEntry {
  id: string;
  foodId?: string;
  name: string;
  calories: number;
  serving: string;
  quantity: number;
  meal: "breakfast" | "lunch" | "dinner" | "snack";
  timestamp: string;
  source: "manual" | "database" | "ai";
}

export interface DailyLog {
  date: string;
  entries: LogEntry[];
}

export interface UserSettings {
  dailyCalorieGoal: number;
  name: string;
}

export interface AIIdentifyResult {
  name: string;
  calories: number;
  serving: string;
  quantity: number;
  totalCalories: number;
  confidence: "high" | "medium" | "low";
  explanation: string;
  matchedFoodId?: string;
}
