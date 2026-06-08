import { ASIAN_FOODS, type Food } from "../src/data/foods";

export interface IdentifyResult {
  name: string;
  calories: number;
  serving: string;
  quantity: number;
  totalCalories: number;
  confidence: "high" | "medium" | "low";
  explanation: string;
  matchedFoodId?: string;
}

const PORTION_PATTERNS: { pattern: RegExp; multiplier: number; label: string }[] = [
  { pattern: /\b(half|½|0\.5)\s*(a\s+|of\s+)?/i, multiplier: 0.5, label: "half portion" },
  { pattern: /\b(small|little)\s+/i, multiplier: 0.7, label: "small portion" },
  { pattern: /\b(large|big|huge)\s+/i, multiplier: 1.5, label: "large portion" },
  { pattern: /\b(extra large|xl)\s+/i, multiplier: 2, label: "extra large portion" },
  { pattern: /\b(double|2x)\s+/i, multiplier: 2, label: "double portion" },
];

const QUANTITY_PATTERNS: { pattern: RegExp; extract: (m: RegExpMatchArray) => number }[] = [
  { pattern: /(\d+)\s*(pieces?|pcs?|rolls?|balls?|skewers?|sticks?|cups?|bowls?|plates?|servings?|packets?|buns?|tarts?)/i, extract: (m) => parseInt(m[1], 10) },
  { pattern: /\ba\s+(bowl|plate|cup|serving|packet|piece)\s+of\b/i, extract: () => 1 },
  { pattern: /\b(one|1)\s+(bowl|plate|cup|serving|packet|piece)\b/i, extract: () => 1 },
  { pattern: /\b(two|2)\s+(bowls?|plates?|cups?|servings?|packets?|pieces?)\b/i, extract: () => 2 },
  { pattern: /\b(three|3)\s+(bowls?|plates?|cups?|servings?|packets?|pieces?)\b/i, extract: () => 3 },
];

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function scoreFood(food: Food, query: string, tokens: string[]): number {
  let score = 0;
  const q = query.toLowerCase();

  if (food.name.toLowerCase() === q) score += 100;
  if (food.name.toLowerCase().includes(q)) score += 50;
  if (food.nameLocal && q.includes(food.nameLocal.toLowerCase())) score += 80;

  for (const keyword of food.keywords) {
    const kw = keyword.toLowerCase();
    if (q.includes(kw)) score += 40;
    if (kw.includes(q) && q.length > 2) score += 30;
  }

  for (const token of tokens) {
    if (token.length < 2) continue;
    if (food.name.toLowerCase().includes(token)) score += 15;
    if (food.keywords.some((k) => k.toLowerCase().includes(token))) score += 20;
    if (food.cuisine.toLowerCase().includes(token)) score += 5;
  }

  return score;
}

function extractQuantity(query: string): number {
  for (const { pattern, extract } of QUANTITY_PATTERNS) {
    const match = query.match(pattern);
    if (match) return extract(match);
  }
  return 1;
}

function extractPortionMultiplier(query: string): { multiplier: number; note: string } {
  for (const { pattern, multiplier, label } of PORTION_PATTERNS) {
    if (pattern.test(query)) return { multiplier, note: label };
  }
  return { multiplier: 1, note: "" };
}

function estimateFromDescription(query: string): IdentifyResult | null {
  const q = query.toLowerCase();

  const categoryEstimates: { keywords: string[]; name: string; calories: number; serving: string }[] = [
    { keywords: ["fried", "deep fried", "crispy"], name: "Fried dish (estimated)", calories: 400, serving: "1 serving" },
    { keywords: ["steamed", "boiled"], name: "Steamed dish (estimated)", calories: 200, serving: "1 serving" },
    { keywords: ["grilled", "bbq", "barbecue"], name: "Grilled dish (estimated)", calories: 300, serving: "1 serving" },
    { keywords: ["salad"], name: "Asian salad (estimated)", calories: 150, serving: "1 bowl" },
    { keywords: ["smoothie", "juice"], name: "Fruit drink (estimated)", calories: 180, serving: "1 cup" },
    { keywords: ["cake", "pastry"], name: "Asian pastry (estimated)", calories: 250, serving: "1 piece" },
    { keywords: ["rice"], name: "Rice dish (estimated)", calories: 250, serving: "1 bowl" },
    { keywords: ["noodle", "noodles"], name: "Noodle dish (estimated)", calories: 400, serving: "1 bowl" },
    { keywords: ["soup"], name: "Asian soup (estimated)", calories: 180, serving: "1 bowl" },
    { keywords: ["curry"], name: "Curry dish (estimated)", calories: 450, serving: "1 serving" },
    { keywords: ["dumpling", "dumplings"], name: "Dumplings (estimated)", calories: 60, serving: "1 piece" },
  ];

  for (const est of categoryEstimates) {
    if (est.keywords.some((k) => q.includes(k))) {
      const quantity = extractQuantity(query);
      const { multiplier, note } = extractPortionMultiplier(query);
      const calories = Math.round(est.calories * multiplier);
      return {
        name: est.name,
        calories,
        serving: est.serving,
        quantity,
        totalCalories: calories * quantity,
        confidence: "low",
        explanation: `Could not find an exact match. Estimated based on "${est.keywords.find((k) => q.includes(k))}" category${note ? ` (${note})` : ""}. Try being more specific, e.g. "1 bowl of pho" or "2 pieces of siu mai".`,
      };
    }
  }

  return null;
}

async function identifyWithOpenAI(query: string, apiKey: string): Promise<IdentifyResult | null> {
  try {
    const foodList = ASIAN_FOODS.slice(0, 30)
      .map((f) => `${f.name} (${f.calories} cal/${f.serving})`)
      .join(", ");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a nutrition expert specializing in Asian cuisine. Given a food description, identify the food and estimate calories. Reference these common foods when possible: ${foodList}. Respond ONLY with valid JSON: {"name":"food name","calories":number per serving,"serving":"serving size","quantity":number,"confidence":"high|medium|low","explanation":"brief explanation"}`,
          },
          { role: "user", content: query },
        ],
        temperature: 0.3,
        max_tokens: 200,
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);
    const quantity = parsed.quantity || extractQuantity(query);
    const calories = Math.round(parsed.calories);

    const matched = ASIAN_FOODS.find(
      (f) => f.name.toLowerCase() === parsed.name?.toLowerCase()
    );

    return {
      name: parsed.name,
      calories,
      serving: parsed.serving || "1 serving",
      quantity,
      totalCalories: calories * quantity,
      confidence: parsed.confidence || "medium",
      explanation: parsed.explanation || "Identified using AI analysis.",
      matchedFoodId: matched?.id,
    };
  } catch {
    return null;
  }
}

export async function identifyFood(query: string): Promise<IdentifyResult> {
  const trimmed = query.trim();
  if (!trimmed) {
    throw new Error("Please describe the food you ate.");
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (apiKey) {
    const aiResult = await identifyWithOpenAI(trimmed, apiKey);
    if (aiResult) return aiResult;
  }

  const tokens = tokenize(trimmed);
  const scored = ASIAN_FOODS.map((food) => ({
    food,
    score: scoreFood(food, trimmed, tokens),
  }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const quantity = extractQuantity(trimmed);
  const { multiplier, note } = extractPortionMultiplier(trimmed);

  if (scored.length > 0 && scored[0].score >= 20) {
    const best = scored[0].food;
    const calories = Math.round(best.calories * multiplier);
    const confidence: IdentifyResult["confidence"] =
      scored[0].score >= 60 ? "high" : scored[0].score >= 35 ? "medium" : "low";

    const altNote =
      scored.length > 1 && scored[1].score > scored[0].score * 0.7
        ? ` (also considered: ${scored[1].food.name})`
        : "";

    return {
      name: best.name,
      calories,
      serving: best.serving,
      quantity,
      totalCalories: calories * quantity,
      confidence,
      explanation: `Matched "${best.name}" from our Asian foods database (${best.cuisine} cuisine, ${best.calories} cal per ${best.serving})${note ? `. Adjusted for ${note}` : ""}${altNote}.`,
      matchedFoodId: best.id,
    };
  }

  const estimate = estimateFromDescription(trimmed);
  if (estimate) return estimate;

  return {
    name: trimmed,
    calories: 300,
    serving: "1 serving (estimated)",
    quantity,
    totalCalories: 300 * quantity,
    confidence: "low",
    explanation:
      "Could not identify this food precisely. Using a general estimate of 300 calories per serving. Try describing it more specifically — e.g. " +
      '"1 bowl of chicken pho", "2 siu mai", or "large plate of nasi lemak".',
  };
}
