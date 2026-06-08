export type FoodCategory =
  | "rice"
  | "noodles"
  | "dim-sum"
  | "curry"
  | "soup"
  | "protein"
  | "snack"
  | "drink"
  | "dessert";

export interface Food {
  id: string;
  name: string;
  nameLocal?: string;
  category: FoodCategory;
  calories: number;
  serving: string;
  cuisine: string;
  keywords: string[];
}

export const FOOD_CATEGORIES: Record<FoodCategory, string> = {
  rice: "Rice & Grains",
  noodles: "Noodles",
  "dim-sum": "Dim Sum & Dumplings",
  curry: "Curries & Stir-fry",
  soup: "Soups & Broths",
  protein: "Protein & Sides",
  snack: "Snacks & Street Food",
  drink: "Drinks",
  dessert: "Desserts",
};

export const ASIAN_FOODS: Food[] = [
  // Rice
  { id: "white-rice", name: "Steamed White Rice", nameLocal: "白飯", category: "rice", calories: 205, serving: "1 bowl (150g)", cuisine: "Pan-Asian", keywords: ["rice", "steamed rice", "bowl of rice", "白飯", "米饭"] },
  { id: "brown-rice", name: "Brown Rice", nameLocal: "糙米", category: "rice", calories: 216, serving: "1 bowl (150g)", cuisine: "Pan-Asian", keywords: ["brown rice", "糙米"] },
  { id: "fried-rice", name: "Fried Rice", nameLocal: "炒飯", category: "rice", calories: 350, serving: "1 plate (250g)", cuisine: "Chinese", keywords: ["fried rice", "炒飯", "炒饭", "yangzhou"] },
  { id: "nasi-lemak", name: "Nasi Lemak", category: "rice", calories: 494, serving: "1 plate", cuisine: "Malaysian", keywords: ["nasi lemak", "coconut rice"] },
  { id: "bibimbap", name: "Bibimbap", nameLocal: "비빔밥", category: "rice", calories: 560, serving: "1 bowl", cuisine: "Korean", keywords: ["bibimbap", "비빔밥", "mixed rice"] },
  { id: "congee", name: "Congee / Rice Porridge", nameLocal: "粥", category: "rice", calories: 120, serving: "1 bowl (250ml)", cuisine: "Chinese", keywords: ["congee", "porridge", "juk", "粥", "zhou"] },
  { id: "biryani", name: "Chicken Biryani", category: "rice", calories: 580, serving: "1 plate (350g)", cuisine: "Indian", keywords: ["biryani", "biriyani", "nasi biryani"] },

  // Noodles
  { id: "ramen", name: "Ramen", nameLocal: "ラーメン", category: "noodles", calories: 450, serving: "1 bowl", cuisine: "Japanese", keywords: ["ramen", "ラーメン", "tonkotsu", "shoyu"] },
  { id: "pho", name: "Pho", category: "noodles", calories: 400, serving: "1 bowl", cuisine: "Vietnamese", keywords: ["pho", "phở", "beef noodle soup"] },
  { id: "pad-thai", name: "Pad Thai", nameLocal: "ผัดไทย", category: "noodles", calories: 450, serving: "1 plate", cuisine: "Thai", keywords: ["pad thai", "ผัดไทย", "thai noodles"] },
  { id: "lo-mein", name: "Lo Mein", nameLocal: "撈麵", category: "noodles", calories: 380, serving: "1 plate", cuisine: "Chinese", keywords: ["lo mein", "撈麵", "捞面", "chow mein"] },
  { id: "udon", name: "Udon", nameLocal: "うどん", category: "noodles", calories: 320, serving: "1 bowl", cuisine: "Japanese", keywords: ["udon", "うどん", "udon soup"] },
  { id: "soba", name: "Soba", nameLocal: "そば", category: "noodles", calories: 280, serving: "1 bowl", cuisine: "Japanese", keywords: ["soba", "そば", "buckwheat noodles"] },
  { id: "laksa", name: "Laksa", category: "noodles", calories: 550, serving: "1 bowl", cuisine: "Malaysian", keywords: ["laksa", "curry laksa", "asam laksa"] },
  { id: "char-kway-teow", name: "Char Kway Teow", category: "noodles", calories: 742, serving: "1 plate", cuisine: "Malaysian", keywords: ["char kway teow", "ckt", "fried flat noodles"] },
  { id: "jajangmyeon", name: "Jajangmyeon", nameLocal: "짜장면", category: "noodles", calories: 800, serving: "1 bowl", cuisine: "Korean", keywords: ["jajangmyeon", "짜장면", "black bean noodles"] },
  { id: "instant-noodles", name: "Instant Noodles", category: "noodles", calories: 380, serving: "1 packet", cuisine: "Pan-Asian", keywords: ["instant noodles", "cup noodles", "indomie", "maggi"] },

  // Dim Sum
  { id: "siu-mai", name: "Siu Mai", nameLocal: "燒賣", category: "dim-sum", calories: 58, serving: "1 piece", cuisine: "Cantonese", keywords: ["siu mai", "shumai", "燒賣", "烧卖"] },
  { id: "har-gow", name: "Har Gow", nameLocal: "蝦餃", category: "dim-sum", calories: 45, serving: "1 piece", cuisine: "Cantonese", keywords: ["har gow", "shrimp dumpling", "蝦餃", "虾饺"] },
  { id: "char-siu-bao", name: "Char Siu Bao", nameLocal: "叉燒包", category: "dim-sum", calories: 180, serving: "1 bun", cuisine: "Cantonese", keywords: ["char siu bao", "bbq pork bun", "叉燒包", "叉烧包"] },
  { id: "xiao-long-bao", name: "Xiao Long Bao", nameLocal: "小籠包", category: "dim-sum", calories: 70, serving: "1 piece", cuisine: "Shanghainese", keywords: ["xiao long bao", "soup dumpling", "小籠包", "小笼包", "xiaolongbao"] },
  { id: "spring-roll", name: "Spring Roll", nameLocal: "春卷", category: "dim-sum", calories: 150, serving: "1 roll", cuisine: "Chinese", keywords: ["spring roll", "春卷", "egg roll"] },
  { id: "gyoza", name: "Gyoza", nameLocal: "餃子", category: "dim-sum", calories: 60, serving: "1 piece", cuisine: "Japanese", keywords: ["gyoza", "dumpling", "餃子", "potsticker", "jiaozi"] },
  { id: "mandu", name: "Mandu", nameLocal: "만두", category: "dim-sum", calories: 65, serving: "1 piece", cuisine: "Korean", keywords: ["mandu", "만두", "korean dumpling"] },

  // Curry & Stir-fry
  { id: "green-curry", name: "Thai Green Curry", nameLocal: "แกงเขียวหวาน", category: "curry", calories: 430, serving: "1 bowl with rice", cuisine: "Thai", keywords: ["green curry", "แกงเขียวหวาน", "thai curry"] },
  { id: "red-curry", name: "Thai Red Curry", category: "curry", calories: 450, serving: "1 bowl with rice", cuisine: "Thai", keywords: ["red curry", "thai red curry"] },
  { id: "japanese-curry", name: "Japanese Curry Rice", nameLocal: "カレーライス", category: "curry", calories: 520, serving: "1 plate", cuisine: "Japanese", keywords: ["japanese curry", "kare raisu", "カレー", "curry rice"] },
  { id: "butter-chicken", name: "Butter Chicken", category: "curry", calories: 490, serving: "1 serving (200g)", cuisine: "Indian", keywords: ["butter chicken", "murgh makhani", "makhani"] },
  { id: "mapo-tofu", name: "Mapo Tofu", nameLocal: "麻婆豆腐", category: "curry", calories: 320, serving: "1 serving", cuisine: "Sichuan", keywords: ["mapo tofu", "麻婆豆腐", "ma po dou fu"] },
  { id: "kung-pao", name: "Kung Pao Chicken", nameLocal: "宮保雞丁", category: "curry", calories: 380, serving: "1 serving", cuisine: "Sichuan", keywords: ["kung pao", "宮保雞丁", "gong bao"] },
  { id: "teriyaki-chicken", name: "Teriyaki Chicken", nameLocal: "照り焼き", category: "curry", calories: 350, serving: "1 serving", cuisine: "Japanese", keywords: ["teriyaki", "照り焼き", "teriyaki chicken"] },
  { id: "bulgogi", name: "Bulgogi", nameLocal: "불고기", category: "curry", calories: 310, serving: "1 serving (150g)", cuisine: "Korean", keywords: ["bulgogi", "불고기", "korean bbq beef"] },
  { id: "adobo", name: "Chicken Adobo", category: "curry", calories: 350, serving: "1 serving with rice", cuisine: "Filipino", keywords: ["adobo", "chicken adobo", "pork adobo"] },
  { id: "rendang", name: "Beef Rendang", category: "curry", calories: 420, serving: "1 serving (150g)", cuisine: "Indonesian", keywords: ["rendang", "beef rendang"] },

  // Soup
  { id: "miso-soup", name: "Miso Soup", nameLocal: "味噌汁", category: "soup", calories: 40, serving: "1 bowl", cuisine: "Japanese", keywords: ["miso soup", "味噌汁", "miso shiru"] },
  { id: "tom-yum", name: "Tom Yum Soup", nameLocal: "ต้มยำ", category: "soup", calories: 180, serving: "1 bowl", cuisine: "Thai", keywords: ["tom yum", "ต้มยำ", "tom yum goong"] },
  { id: "sinigang", name: "Sinigang", category: "soup", calories: 220, serving: "1 bowl", cuisine: "Filipino", keywords: ["sinigang", "sour soup", "tamarind soup"] },
  { id: "hot-sour-soup", name: "Hot & Sour Soup", nameLocal: "酸辣湯", category: "soup", calories: 90, serving: "1 bowl", cuisine: "Chinese", keywords: ["hot sour soup", "酸辣湯", "酸辣汤"] },
  { id: "wonton-soup", name: "Wonton Soup", nameLocal: "雲吞湯", category: "soup", calories: 180, serving: "1 bowl", cuisine: "Cantonese", keywords: ["wonton soup", "雲吞湯", "馄饨汤", "wonton mee"] },

  // Protein & Sides
  { id: "sushi-roll", name: "Sushi Roll (6 pcs)", nameLocal: "巻き寿司", category: "protein", calories: 300, serving: "6 pieces", cuisine: "Japanese", keywords: ["sushi", "maki", "roll", "巻き寿司"] },
  { id: "sashimi", name: "Sashimi", nameLocal: "刺身", category: "protein", calories: 200, serving: "1 serving (100g)", cuisine: "Japanese", keywords: ["sashimi", "刺身", "raw fish"] },
  { id: "edamame", name: "Edamame", nameLocal: "枝豆", category: "protein", calories: 120, serving: "1 cup", cuisine: "Japanese", keywords: ["edamame", "枝豆", "soy beans"] },
  { id: "kimchi", name: "Kimchi", nameLocal: "김치", category: "protein", calories: 23, serving: "1 cup (150g)", cuisine: "Korean", keywords: ["kimchi", "김치", "fermented cabbage"] },
  { id: "tofu", name: "Steamed Tofu", nameLocal: "豆腐", category: "protein", calories: 94, serving: "100g", cuisine: "Pan-Asian", keywords: ["tofu", "豆腐", "doufu", "bean curd"] },
  { id: "tempura", name: "Tempura (shrimp)", nameLocal: "天ぷら", category: "protein", calories: 60, serving: "1 piece", cuisine: "Japanese", keywords: ["tempura", "天ぷら", "fried shrimp"] },
  { id: "satay", name: "Chicken Satay", category: "protein", calories: 180, serving: "4 skewers", cuisine: "Malaysian", keywords: ["satay", "sate", "chicken satay"] },
  { id: "char-siu", name: "Char Siu (BBQ Pork)", nameLocal: "叉燒", category: "protein", calories: 240, serving: "100g", cuisine: "Cantonese", keywords: ["char siu", "bbq pork", "叉燒", "叉烧"] },
  { id: "egg", name: "Tea Egg", nameLocal: "茶葉蛋", category: "protein", calories: 78, serving: "1 egg", cuisine: "Taiwanese", keywords: ["tea egg", "茶葉蛋", "茶叶蛋", "boiled egg"] },
  { id: "takoyaki", name: "Takoyaki", nameLocal: "たこ焼き", category: "protein", calories: 70, serving: "1 ball", cuisine: "Japanese", keywords: ["takoyaki", "たこ焼き", "octopus ball"] },

  // Snacks
  { id: "onigiri", name: "Onigiri", nameLocal: "おにぎり", category: "snack", calories: 180, serving: "1 piece", cuisine: "Japanese", keywords: ["onigiri", "おにぎり", "rice ball"] },
  { id: "bao", name: "Steamed Bao", nameLocal: "包子", category: "snack", calories: 200, serving: "1 bun", cuisine: "Chinese", keywords: ["bao", "包子", "baozi", "steamed bun"] },
  { id: "roti-prata", name: "Roti Prata", category: "snack", calories: 350, serving: "1 piece", cuisine: "Indian-Singaporean", keywords: ["roti prata", "roti canai", "prata"] },
  { id: "fish-ball", name: "Fish Ball Noodles", category: "snack", calories: 400, serving: "1 bowl", cuisine: "Hong Kong", keywords: ["fish ball", "魚蛋", "鱼蛋", "fishball noodles"] },
  { id: "youtiao", name: "Youtiao", nameLocal: "油條", category: "snack", calories: 290, serving: "1 stick", cuisine: "Chinese", keywords: ["youtiao", "油條", "油条", "chinese cruller"] },
  { id: "mochi", name: "Mochi", nameLocal: "餅", category: "snack", calories: 96, serving: "1 piece (45g)", cuisine: "Japanese", keywords: ["mochi", "餅", "rice cake"] },
  { id: "samosa", name: "Samosa", category: "snack", calories: 262, serving: "1 piece", cuisine: "Indian", keywords: ["samosa", "singhara"] },

  // Drinks
  { id: "bubble-tea", name: "Bubble Tea", nameLocal: "珍珠奶茶", category: "drink", calories: 350, serving: "1 cup (500ml)", cuisine: "Taiwanese", keywords: ["bubble tea", "boba", "珍珠奶茶", "pearl milk tea"] },
  { id: "matcha-latte", name: "Matcha Latte", nameLocal: "抹茶ラテ", category: "drink", calories: 240, serving: "1 cup", cuisine: "Japanese", keywords: ["matcha", "matcha latte", "抹茶"] },
  { id: "thai-tea", name: "Thai Iced Tea", nameLocal: "ชาเย็น", category: "drink", calories: 200, serving: "1 cup", cuisine: "Thai", keywords: ["thai tea", "thai iced tea", "ชาเย็น"] },
  { id: "soy-milk", name: "Soy Milk", nameLocal: "豆漿", category: "drink", calories: 80, serving: "1 cup (240ml)", cuisine: "Chinese", keywords: ["soy milk", "豆漿", "豆浆", "doujiang"] },
  { id: "sake", name: "Sake", nameLocal: "日本酒", category: "drink", calories: 130, serving: "1 cup (180ml)", cuisine: "Japanese", keywords: ["sake", "日本酒", "nihonshu"] },

  // Desserts
  { id: "mango-sticky-rice", name: "Mango Sticky Rice", nameLocal: "ข้าวเหนียวมะม่วง", category: "dessert", calories: 430, serving: "1 serving", cuisine: "Thai", keywords: ["mango sticky rice", "ข้าวเหนียวมะม่วง", "khao niao mamuang"] },
  { id: "red-bean-soup", name: "Red Bean Soup", nameLocal: "紅豆沙", category: "dessert", calories: 200, serving: "1 bowl", cuisine: "Chinese", keywords: ["red bean soup", "紅豆沙", "红豆沙", "dou sha"] },
  { id: "taiyaki", name: "Taiyaki", nameLocal: "たい焼き", category: "dessert", calories: 280, serving: "1 piece", cuisine: "Japanese", keywords: ["taiyaki", "たい焼き", "fish cake dessert"] },
  { id: "halo-halo", name: "Halo-Halo", category: "dessert", calories: 380, serving: "1 glass", cuisine: "Filipino", keywords: ["halo halo", "halohalo", "mixed dessert"] },
  { id: "egg-tart", name: "Egg Tart", nameLocal: "蛋撻", category: "dessert", calories: 220, serving: "1 tart", cuisine: "Cantonese", keywords: ["egg tart", "蛋撻", "蛋挞", "dan tat"] },
];

export function searchFoods(query: string): Food[] {
  const q = query.toLowerCase().trim();
  if (!q) return ASIAN_FOODS;

  return ASIAN_FOODS.filter(
    (food) =>
      food.name.toLowerCase().includes(q) ||
      food.nameLocal?.toLowerCase().includes(q) ||
      food.cuisine.toLowerCase().includes(q) ||
      food.keywords.some((k) => k.toLowerCase().includes(q))
  );
}
