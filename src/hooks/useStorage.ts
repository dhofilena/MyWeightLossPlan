import { useCallback, useEffect, useState } from "react";
import type { DailyLog, LogEntry, UserSettings } from "../types";

const SETTINGS_KEY = "asian-calorie-settings";
const LOG_PREFIX = "asian-calorie-log-";

const DEFAULT_SETTINGS: UserSettings = {
  dailyCalorieGoal: 2000,
  name: "",
};

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function loadLog(date: string): DailyLog {
  try {
    const raw = localStorage.getItem(`${LOG_PREFIX}${date}`);
    return raw ? JSON.parse(raw) : { date, entries: [] };
  } catch {
    return { date, entries: [] };
  }
}

export function useSettings() {
  const [settings, setSettingsState] = useState<UserSettings>(loadSettings);

  const setSettings = useCallback((update: Partial<UserSettings>) => {
    setSettingsState((prev) => {
      const next = { ...prev, ...update };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { settings, setSettings };
}

export function useDailyLog(date?: string) {
  const targetDate = date ?? todayKey();
  const [log, setLog] = useState<DailyLog>(() => loadLog(targetDate));

  useEffect(() => {
    setLog(loadLog(targetDate));
  }, [targetDate]);

  const saveLog = useCallback(
    (entries: LogEntry[]) => {
      const next: DailyLog = { date: targetDate, entries };
      localStorage.setItem(`${LOG_PREFIX}${targetDate}`, JSON.stringify(next));
      setLog(next);
    },
    [targetDate]
  );

  const addEntry = useCallback(
    (entry: Omit<LogEntry, "id" | "timestamp">) => {
      const newEntry: LogEntry = {
        ...entry,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      };
      saveLog([...log.entries, newEntry]);
    },
    [log.entries, saveLog]
  );

  const removeEntry = useCallback(
    (id: string) => {
      saveLog(log.entries.filter((e) => e.id !== id));
    },
    [log.entries, saveLog]
  );

  const totalCalories = log.entries.reduce(
    (sum, e) => sum + e.calories * e.quantity,
    0
  );

  return { log, addEntry, removeEntry, totalCalories, date: targetDate };
}
