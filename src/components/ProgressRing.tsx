interface ProgressRingProps {
  current: number;
  goal: number;
  size?: number;
}

export function ProgressRing({ current, goal, size = 140 }: ProgressRingProps) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(current / goal, 1);
  const offset = circumference * (1 - progress);
  const remaining = Math.max(goal - current, 0);
  const over = current > goal;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e8e4dc"
          strokeWidth="10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={over ? "#e85d4c" : "#2d6a4f"}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="progress-ring-circle"
        />
      </svg>
      <div className="text-center z-10">
        <div className="text-2xl font-bold text-ink">{current.toLocaleString()}</div>
        <div className="text-xs text-slate mt-0.5">of {goal.toLocaleString()} cal</div>
        <div className={`text-xs font-medium mt-1 ${over ? "text-coral" : "text-jade"}`}>
          {over ? `+${(current - goal).toLocaleString()} over` : `${remaining.toLocaleString()} left`}
        </div>
      </div>
    </div>
  );
}
