/* ── Complete Blood Type Profile Data ── */

export interface FoodCategory {
  category: string;
  items: string[];
}

export interface BloodTypeProfile {
  type: string;
  rhFactor: "positive" | "negative";
  archetype: string;
  overview: string;
  overviewExtra?: string; // additional paragraph for negative types
  beneficialFoods: FoodCategory[];
  avoidFoods: FoodCategory[];
  exercise: string;
  personalityTraits: string[];
  personalityDescription: string;
  healthStrengths: string[];
  healthVulnerabilities: string[];
  healthWatch: string[];
  supplements: string[];
  teas?: string[];
}

export const BLOOD_TYPE_PROFILES: Record<string, BloodTypeProfile> = {
  "O+": {
    type: "O", rhFactor: "positive", archetype: "The Hunter",
    overview: "O positive is the oldest and most common blood type — the original human blood type of our hunter-gatherer ancestors. O+ individuals are natural leaders, intensely focused, and built for physical action and survival. Your blood carries the memory of thousands of generations of hunters who survived by strength, instinct, and decisive action.",
    beneficialFoods: [
      { category: "Meats", items: ["Beef","Lamb","Venison","Buffalo","Veal","Liver"] },
      { category: "Seafood", items: ["Cod","Halibut","Herring","Mackerel","Pike","Rainbow Trout","Red Snapper","Salmon","Sardines","Sole","Striped Bass","Swordfish","Tilefish","Yellowtail","Tuna"] },
      { category: "Vegetables", items: ["Broccoli","Spinach","Kale","Collard Greens","Romaine Lettuce","Sweet Potatoes","Turnips","Kelp","Artichokes","Chicory","Dandelion","Escarole","Garlic","Horseradish","Kohlrabi","Leeks","Okra","Onions","Parsley","Parsnips","Red Peppers","Pumpkin"] },
      { category: "Fruits", items: ["Plums","Figs","Prunes","Cherries","Guava"] },
      { category: "Nuts & Seeds", items: ["Walnuts","Pumpkin Seeds","Flaxseed"] },
      { category: "Oils", items: ["Olive Oil","Flaxseed Oil"] },
    ],
    avoidFoods: [
      { category: "Grains", items: ["Wheat","Corn","Oats","Barley"] },
      { category: "Legumes", items: ["Kidney Beans","Navy Beans","Lentils","Black-Eyed Peas"] },
      { category: "Vegetables", items: ["Cabbage","Brussels Sprouts","Cauliflower","Mustard Greens","Eggplant","Potatoes","Alfalfa Sprouts","Shiitake Mushrooms"] },
      { category: "Meats", items: ["Pork","Goose","Bacon","Ham","Catfish","Conch","Octopus"] },
      { category: "Dairy", items: ["Milk","Yogurt","Cheese","Ice Cream","Butter"] },
      { category: "Other", items: ["Coffee","Corn Syrup","Ketchup","Vinegar"] },
    ],
    exercise: "Intense physical exercise is not optional for O types — it is medicine. Running, martial arts, weightlifting, contact sports, cycling, swimming. O types become anxious, unfocused, and depressed without vigorous physical activity. Aim for 4–5 sessions per week of high intensity movement.",
    personalityTraits: ["Natural Leader","Decisive","Self-Reliant","Ambitious","Focused","Athletic","Competitive"],
    personalityDescription: "The warrior and hunter archetype. When balanced: powerful, protective, visionary. When stressed: angry, impulsive, hyperactive.",
    healthStrengths: ["Strong immune system","Excellent physical stamina","Natural resilience"],
    healthVulnerabilities: ["Thyroid issues","Inflammatory conditions","Blood clotting disorders","Ulcers"],
    healthWatch: ["Hyperthyroidism","Arthritis","Low thyroid activity"],
    supplements: ["Bladderwrack (thyroid support)","Iodine","Licorice Root","Quercetin","Bromelain"],
    teas: ["Fenugreek","Ginger","Hops","Linden","Mulberry","Peppermint","Rose Hips","Sarsaparilla","Slippery Elm"],
  },

  "O-": {
    type: "O", rhFactor: "negative", archetype: "The Rare Hunter",
    overview: "O positive is the oldest and most common blood type — the original human blood type of our hunter-gatherer ancestors. O+ individuals are natural leaders, intensely focused, and built for physical action and survival. Your blood carries the memory of thousands of generations of hunters who survived by strength, instinct, and decisive action.",
    overviewExtra: "O negative is the universal donor — the rarest and most mysterious of the O blood types. Only 7% of the world's population carries this blood. You share all the hunter strength of O positive but carry an additional layer of mystery that science has not fully explained. Your blood can be given to anyone but can only receive from your own kind — a metaphor that resonates deeply with how O negative individuals often experience life.",
    beneficialFoods: [
      { category: "Meats", items: ["Beef","Lamb","Venison","Buffalo","Veal","Liver"] },
      { category: "Seafood", items: ["Cod","Halibut","Herring","Mackerel","Pike","Rainbow Trout","Red Snapper","Salmon","Sardines","Sole","Striped Bass","Swordfish","Tilefish","Yellowtail","Tuna"] },
      { category: "Vegetables", items: ["Broccoli","Spinach","Kale","Collard Greens","Romaine Lettuce","Sweet Potatoes","Turnips","Kelp","Artichokes","Chicory","Dandelion","Escarole","Garlic","Horseradish","Kohlrabi","Leeks","Okra","Onions","Parsley","Parsnips","Red Peppers","Pumpkin"] },
      { category: "Fruits", items: ["Plums","Figs","Prunes","Cherries","Guava"] },
      { category: "Nuts & Seeds", items: ["Walnuts","Pumpkin Seeds","Flaxseed"] },
      { category: "Oils", items: ["Olive Oil","Flaxseed Oil"] },
    ],
    avoidFoods: [
      { category: "Grains", items: ["Wheat","Corn","Oats","Barley"] },
      { category: "Legumes", items: ["Kidney Beans","Navy Beans","Lentils","Black-Eyed Peas"] },
      { category: "Vegetables", items: ["Cabbage","Brussels Sprouts","Cauliflower","Mustard Greens","Eggplant","Potatoes","Alfalfa Sprouts","Shiitake Mushrooms"] },
      { category: "Meats", items: ["Pork","Goose","Bacon","Ham","Catfish","Conch","Octopus"] },
      { category: "Dairy", items: ["Milk","Yogurt","Cheese","Ice Cream","Butter"] },
      { category: "Other", items: ["Coffee","Corn Syrup","Ketchup","Vinegar"] },
    ],
    exercise: "Intense physical exercise is not optional for O types — it is medicine. Running, martial arts, weightlifting, contact sports, cycling, swimming. O types become anxious, unfocused, and depressed without vigorous physical activity. Aim for 4–5 sessions per week of high intensity movement.",
    personalityTraits: ["Natural Leader","Decisive","Self-Reliant","Ambitious","Focused","Athletic","Competitive","Highly Intuitive"],
    personalityDescription: "The warrior and hunter archetype. When balanced: powerful, protective, visionary. When stressed: angry, impulsive, hyperactive.",
    healthStrengths: ["Strong immune system","Excellent physical stamina","Natural resilience"],
    healthVulnerabilities: ["Thyroid issues","Inflammatory conditions","Blood clotting disorders","Ulcers"],
    healthWatch: ["Hyperthyroidism","Arthritis","Low thyroid activity"],
    supplements: ["Bladderwrack (thyroid support)","Iodine","Licorice Root","Quercetin","Bromelain"],
    teas: ["Fenugreek","Ginger","Hops","Linden","Mulberry","Peppermint","Rose Hips","Sarsaparilla","Slippery Elm"],
  },

  "A+": {
    type: "A", rhFactor: "positive", archetype: "The Agrarian",
    overview: "Type A blood emerged as humans transitioned from hunter-gatherers to agricultural communities approximately 15,000 years ago. A positive individuals are built for a predominantly plant-based diet, thrive on calm and routine, and carry the natural gifts of patience, cooperation, and deep sensitivity. You are the community builder, the nurturer, the one who makes civilization possible.",
    beneficialFoods: [
      { category: "Proteins", items: ["Tofu","Tempeh","Soy Products","Pinto Beans","Black Beans","Lentils","Green Lentils","String Beans","Fava Beans","Black-Eyed Peas","Peanuts"] },
      { category: "Seafood", items: ["Cod","Mackerel","Monkfish","Pickerel","Red Snapper","Rainbow Trout","Salmon","Sardines","Sea Trout","Silver Perch","Snail","Whitefish","Carp","Grouper"] },
      { category: "Vegetables", items: ["Broccoli","Carrots","Collard Greens","Escarole","Garlic","Kale","Kohlrabi","Leeks","Romaine Lettuce","Okra","Onions","Parsley","Spinach","Artichokes","Chicory","Dandelion","Horseradish","Fennel","Ginger"] },
      { category: "Fruits", items: ["Berries (all types)","Plums","Prunes","Figs","Grapefruit","Lemons","Pineapple","Apricots","Cherries"] },
      { category: "Oils", items: ["Olive Oil","Flaxseed Oil"] },
      { category: "Grains", items: ["Amaranth","Buckwheat","Soy Flour","Oat Flour","Rice Flour"] },
    ],
    avoidFoods: [
      { category: "Meats", items: ["Beef","Pork","Lamb","Veal","Venison","Duck","Goose","Heart","Partridge","Pheasant"] },
      { category: "Dairy", items: ["Whole Milk","Ice Cream","Sherbet","Brie","Buttermilk","Camembert","American Cheese"] },
      { category: "Legumes", items: ["Kidney Beans","Lima Beans","Navy Beans","Red Beans","Garbanzo Beans"] },
      { category: "Vegetables", items: ["Peppers","Olives","Potatoes","Sweet Potatoes","Yams","Tomatoes","Cabbage","Eggplant"] },
      { category: "Fruits", items: ["Oranges","Mangoes","Papaya","Bananas","Coconut","Melons"] },
      { category: "Grains", items: ["Wheat Bran","Wheat Germ","Whole Wheat","Multi-Grain Bread"] },
      { category: "Other", items: ["Beer","Distilled Liquor","Soda","Black Tea"] },
    ],
    exercise: "Calming centering exercise — yoga, tai chi, golf, walking, swimming, cycling, light hiking. A types must NOT do intense competitive exercise — it raises cortisol and causes more harm than good. Gentle movement performed consistently is far more beneficial than occasional intense workouts.",
    personalityTraits: ["Organized","Responsible","Creative","Sensitive","Patient","Cooperative","Perfectionistic","Empathic"],
    personalityDescription: "The farmer, teacher, and community builder. When balanced: compassionate, efficient, deeply caring. When stressed: obsessive, anxious, withdrawn.",
    healthStrengths: ["Adaptable immune system","Strong community bonds support longevity"],
    healthVulnerabilities: ["Heart disease","Cancer (especially digestive)","Anemia","Diabetes","Liver and gallbladder disorders"],
    healthWatch: ["Digestive enzyme deficiency","Low stomach acid"],
    supplements: ["Hawthorn (cardiovascular)","Echinacea (immune)","Quercetin","Milk Thistle","Panax Ginseng"],
    teas: ["Aloe","Burdock","Chamomile","Echinacea","Ginger","Ginkgo Biloba","Green Tea","Hawthorn","Milk Thistle","Rose Hips","Saint-John's-Wort","Slippery Elm","Valerian"],
  },

  "A-": {
    type: "A", rhFactor: "negative", archetype: "The Sensitive Agrarian",
    overview: "Type A blood emerged as humans transitioned from hunter-gatherers to agricultural communities approximately 15,000 years ago. A positive individuals are built for a predominantly plant-based diet, thrive on calm and routine, and carry the natural gifts of patience, cooperation, and deep sensitivity. You are the community builder, the nurturer, the one who makes civilization possible.",
    overviewExtra: "As an A negative individual, you carry all the sensitivity and community-building gifts of the A blood type combined with the rare and mysterious Rh negative factor. This dual nature makes you one of the most empathically gifted and spiritually attuned blood types on Earth.",
    beneficialFoods: [
      { category: "Proteins", items: ["Tofu","Tempeh","Soy Products","Pinto Beans","Black Beans","Lentils","Green Lentils","String Beans","Fava Beans","Black-Eyed Peas","Peanuts"] },
      { category: "Seafood", items: ["Cod","Mackerel","Monkfish","Pickerel","Red Snapper","Rainbow Trout","Salmon","Sardines","Sea Trout","Silver Perch","Snail","Whitefish","Carp","Grouper"] },
      { category: "Vegetables", items: ["Broccoli","Carrots","Collard Greens","Escarole","Garlic","Kale","Kohlrabi","Leeks","Romaine Lettuce","Okra","Onions","Parsley","Spinach","Artichokes","Chicory","Dandelion","Horseradish","Fennel","Ginger"] },
      { category: "Fruits", items: ["Berries (all types)","Plums","Prunes","Figs","Grapefruit","Lemons","Pineapple","Apricots","Cherries"] },
      { category: "Oils", items: ["Olive Oil","Flaxseed Oil"] },
      { category: "Grains", items: ["Amaranth","Buckwheat","Soy Flour","Oat Flour","Rice Flour"] },
    ],
    avoidFoods: [
      { category: "Meats", items: ["Beef","Pork","Lamb","Veal","Venison","Duck","Goose","Heart","Partridge","Pheasant"] },
      { category: "Dairy", items: ["Whole Milk","Ice Cream","Sherbet","Brie","Buttermilk","Camembert","American Cheese"] },
      { category: "Legumes", items: ["Kidney Beans","Lima Beans","Navy Beans","Red Beans","Garbanzo Beans"] },
      { category: "Vegetables", items: ["Peppers","Olives","Potatoes","Sweet Potatoes","Yams","Tomatoes","Cabbage","Eggplant"] },
      { category: "Fruits", items: ["Oranges","Mangoes","Papaya","Bananas","Coconut","Melons"] },
      { category: "Grains", items: ["Wheat Bran","Wheat Germ","Whole Wheat","Multi-Grain Bread"] },
      { category: "Other", items: ["Beer","Distilled Liquor","Soda","Black Tea"] },
    ],
    exercise: "Calming centering exercise — yoga, tai chi, golf, walking, swimming, cycling, light hiking. A types must NOT do intense competitive exercise — it raises cortisol and causes more harm than good.",
    personalityTraits: ["Organized","Responsible","Creative","Sensitive","Patient","Cooperative","Perfectionistic","Empathic","Deeply Intuitive"],
    personalityDescription: "The farmer, teacher, and community builder. When balanced: compassionate, efficient, deeply caring. When stressed: obsessive, anxious, withdrawn.",
    healthStrengths: ["Adaptable immune system","Strong community bonds support longevity"],
    healthVulnerabilities: ["Heart disease","Cancer (especially digestive)","Anemia","Diabetes","Liver and gallbladder disorders"],
    healthWatch: ["Digestive enzyme deficiency","Low stomach acid"],
    supplements: ["Hawthorn (cardiovascular)","Echinacea (immune)","Quercetin","Milk Thistle","Panax Ginseng"],
    teas: ["Aloe","Burdock","Chamomile","Echinacea","Ginger","Ginkgo Biloba","Green Tea","Hawthorn","Milk Thistle","Rose Hips","Saint-John's-Wort","Slippery Elm","Valerian"],
  },

  "B+": {
    type: "B", rhFactor: "positive", archetype: "The Nomad",
    overview: "Type B blood emerged in the Himalayan highlands, carried by nomadic peoples sweeping across the Eurasian steppes. B positive individuals are the most balanced and flexible of all blood types — able to eat a wider variety of foods, adapt to diverse environments, and thrive on constant mental and physical stimulation. You are the wanderer, the explorer, the one who bridges worlds.",
    beneficialFoods: [
      { category: "Meats", items: ["Lamb","Mutton","Venison","Rabbit","Pheasant"] },
      { category: "Seafood", items: ["Cod","Flounder","Grouper","Halibut","Mackerel","Mahi-Mahi","Monkfish","Pike","Porgy","Salmon","Sardines","Shad","Snapper","Sole","Striped Bass","Sturgeon","Swordfish","Trout","Tuna"] },
      { category: "Dairy", items: ["Yogurt","Kefir","Cottage Cheese","Farmer Cheese","Feta","Goat Cheese","Mozzarella","Ricotta","Eggs","Skim Milk"] },
      { category: "Oils", items: ["Olive Oil"] },
      { category: "Legumes", items: ["Kidney Beans","Lima Beans","Navy Beans"] },
      { category: "Vegetables", items: ["Beets","Broccoli","Brussels Sprouts","Cabbage","Carrots","Cauliflower","Collard Greens","Eggplant","Ginger","Kale","Mushrooms","Parsley","Bell Peppers","Sweet Potatoes","Yams"] },
      { category: "Fruits", items: ["Bananas","Cranberries","Grapes","Papaya","Pineapple","Plums","Watermelon"] },
    ],
    avoidFoods: [
      { category: "Meats", items: ["Chicken","Duck","Goose","Partridge","Pork","Quail","Cornish Hen"] },
      { category: "Legumes", items: ["Lentils","Peanuts","Garbanzo Beans","Black-Eyed Peas","Pinto Beans"] },
      { category: "Grains", items: ["Buckwheat","Corn","Rye","Barley","Wheat"] },
      { category: "Vegetables", items: ["Tomatoes","Avocado","Olives","Pumpkin","Radishes"] },
      { category: "Fruits", items: ["Pomegranates","Persimmons","Starfruit","Coconut"] },
      { category: "Oils", items: ["Canola","Corn Oil","Cottonseed","Peanut Oil","Safflower","Sesame","Sunflower"] },
      { category: "Dairy", items: ["American Cheese","Blue Cheese","Ice Cream","String Cheese"] },
      { category: "Other", items: ["Ketchup","Corn Syrup","Gelatin"] },
    ],
    exercise: "Balance of mental and physical — hiking, tennis, swimming, cycling, yoga, martial arts, golf. B types need variety — doing the same workout repeatedly creates stress. Change your exercise routine regularly.",
    personalityTraits: ["Flexible","Creative","Unconventional","Independent","Strong Instincts","Direct","Pragmatic","Strong Memory"],
    personalityDescription: "The nomad and pioneer archetype. When balanced: charming, action-oriented, visionary. When stressed: erratic, non-compliant, irresponsible.",
    healthStrengths: ["Strong immune system","Good adaptation to dietary and climate changes"],
    healthVulnerabilities: ["Slow-growing viral infections","Immune disorders","Rare blood disorders"],
    healthWatch: ["Multiple sclerosis","Lupus","Chronic fatigue syndrome"],
    supplements: ["Licorice Root","Ginkgo Biloba","Magnesium","Lecithin","Bromelain"],
    teas: ["Ginger","Ginkgo Biloba","Green Tea","Licorice Root","Peppermint","Raspberry Leaf","Rose Hips","Sage"],
  },

  "B-": {
    type: "B", rhFactor: "negative", archetype: "The Rare Nomad",
    overview: "Type B blood emerged in the Himalayan highlands, carried by nomadic peoples sweeping across the Eurasian steppes. B positive individuals are the most balanced and flexible of all blood types — able to eat a wider variety of foods, adapt to diverse environments, and thrive on constant mental and physical stimulation. You are the wanderer, the explorer, the one who bridges worlds.",
    overviewExtra: "As a B negative individual, you carry all the adaptive brilliance and nomadic spirit of the B blood type combined with the rare Rh negative factor. This gives you a uniquely powerful combination of physical resilience and spiritual sensitivity.",
    beneficialFoods: [
      { category: "Meats", items: ["Lamb","Mutton","Venison","Rabbit","Pheasant"] },
      { category: "Seafood", items: ["Cod","Flounder","Grouper","Halibut","Mackerel","Mahi-Mahi","Monkfish","Pike","Porgy","Salmon","Sardines","Shad","Snapper","Sole","Striped Bass","Sturgeon","Swordfish","Trout","Tuna"] },
      { category: "Dairy", items: ["Yogurt","Kefir","Cottage Cheese","Farmer Cheese","Feta","Goat Cheese","Mozzarella","Ricotta","Eggs","Skim Milk"] },
      { category: "Oils", items: ["Olive Oil"] },
      { category: "Legumes", items: ["Kidney Beans","Lima Beans","Navy Beans"] },
      { category: "Vegetables", items: ["Beets","Broccoli","Brussels Sprouts","Cabbage","Carrots","Cauliflower","Collard Greens","Eggplant","Ginger","Kale","Mushrooms","Parsley","Bell Peppers","Sweet Potatoes","Yams"] },
      { category: "Fruits", items: ["Bananas","Cranberries","Grapes","Papaya","Pineapple","Plums","Watermelon"] },
    ],
    avoidFoods: [
      { category: "Meats", items: ["Chicken","Duck","Goose","Partridge","Pork","Quail","Cornish Hen"] },
      { category: "Legumes", items: ["Lentils","Peanuts","Garbanzo Beans","Black-Eyed Peas","Pinto Beans"] },
      { category: "Grains", items: ["Buckwheat","Corn","Rye","Barley","Wheat"] },
      { category: "Vegetables", items: ["Tomatoes","Avocado","Olives","Pumpkin","Radishes"] },
      { category: "Fruits", items: ["Pomegranates","Persimmons","Starfruit","Coconut"] },
      { category: "Oils", items: ["Canola","Corn Oil","Cottonseed","Peanut Oil","Safflower","Sesame","Sunflower"] },
      { category: "Dairy", items: ["American Cheese","Blue Cheese","Ice Cream","String Cheese"] },
      { category: "Other", items: ["Ketchup","Corn Syrup","Gelatin"] },
    ],
    exercise: "Balance of mental and physical — hiking, tennis, swimming, cycling, yoga, martial arts, golf. B types need variety — doing the same workout repeatedly creates stress. Change your exercise routine regularly.",
    personalityTraits: ["Flexible","Creative","Unconventional","Independent","Strong Instincts","Direct","Pragmatic","Deeply Intuitive"],
    personalityDescription: "The nomad and pioneer archetype. When balanced: charming, action-oriented, visionary. When stressed: erratic, non-compliant, irresponsible.",
    healthStrengths: ["Strong immune system","Good adaptation to dietary and climate changes"],
    healthVulnerabilities: ["Slow-growing viral infections","Immune disorders","Rare blood disorders"],
    healthWatch: ["Multiple sclerosis","Lupus","Chronic fatigue syndrome"],
    supplements: ["Licorice Root","Ginkgo Biloba","Magnesium","Lecithin","Bromelain"],
    teas: ["Ginger","Ginkgo Biloba","Green Tea","Licorice Root","Peppermint","Raspberry Leaf","Rose Hips","Sage"],
  },

  "AB+": {
    type: "AB", rhFactor: "positive", archetype: "The Enigma",
    overview: "AB is the newest blood type — appearing less than 1,500 years ago from the intermingling of A and B blood type peoples. Less than 4% of the population is AB positive. You carry the biological complexity of two blood types in one body — and this duality shows up in every aspect of your nature. You are the most spiritually complex and biologically evolved of all blood types.",
    beneficialFoods: [
      { category: "Proteins", items: ["Tofu","Tempeh","Mozzarella","Ricotta","Cottage Cheese","Kefir","Yogurt","Eggs","Soy Products"] },
      { category: "Seafood", items: ["Cod","Grouper","Mackerel","Mahi-Mahi","Monkfish","Pike","Porgy","Rainbow Trout","Red Snapper","Sailfish","Salmon","Sardines","Snail","Sturgeon","Swordfish","Tuna"] },
      { category: "Dairy", items: ["Low-Fat Yogurt","Kefir","Sour Cream","Goat Cheese","Mozzarella","Ricotta","Cottage Cheese"] },
      { category: "Oils", items: ["Olive Oil","Walnut Oil"] },
      { category: "Legumes", items: ["Lentils","Pinto Beans","Snap Beans","Soy Beans"] },
      { category: "Vegetables", items: ["Broccoli","Beets","Cauliflower","Celery","Cucumber","Eggplant","Garlic","Kale","Mushrooms","Parsley","Sweet Potatoes","Yams","Alfalfa Sprouts","Collard Greens"] },
      { category: "Fruits", items: ["Cherries","Cranberries","Figs","Gooseberries","Grapes","Grapefruit","Kiwi","Lemons","Pineapple","Plums","Watermelon"] },
    ],
    avoidFoods: [
      { category: "Meats", items: ["Beef","Pork","Chicken","Veal","Venison","Duck","Goose","Quail","Partridge"] },
      { category: "Oils", items: ["Corn Oil","Sesame Oil","Sunflower Oil","Cottonseed"] },
      { category: "Legumes", items: ["Kidney Beans","Lima Beans","Black-Eyed Peas","Garbanzo Beans"] },
      { category: "Grains", items: ["Buckwheat","Corn","Soba Noodles"] },
      { category: "Vegetables", items: ["Bell Peppers","Radishes","Artichokes","Avocado","Corn"] },
      { category: "Fruits", items: ["Bananas","Coconut","Mangoes","Oranges","Persimmons","Pomegranates","Guava"] },
      { category: "Other", items: ["Caffeine (with great moderation)","Alcohol (with great moderation)","Distilled Liquor","Black Tea","Soda"] },
    ],
    exercise: "Calming AND moderate intensity alternating — yoga, tai chi, hiking, cycling, tennis, swimming. AB types need to cycle between calming and moderate exercise. Their nervous system requires both stimulation and recovery.",
    personalityTraits: ["Spiritual","Empathic","Intuitive","Charismatic","Multi-Faceted","Deeply Creative","Mystical"],
    personalityDescription: "The bridge-builder and mystic archetype. When balanced: charming, deeply intuitive, spiritually evolved. When stressed: scattered, indecisive, can internalize too much.",
    healthStrengths: ["Adaptable immune system","Strong resilience"],
    healthVulnerabilities: ["Heart disease","Cancer","Anemia"],
    healthWatch: ["Need to monitor both A and B type health vulnerabilities"],
    supplements: ["Hawthorn","Echinacea","Quercetin","Milk Thistle","Selenium","Panax Ginseng"],
    teas: ["Chamomile","Echinacea","Ginger","Ginkgo Biloba","Green Tea","Hawthorn","Milk Thistle"],
  },

  "AB-": {
    type: "AB", rhFactor: "negative", archetype: "The Rarest Enigma",
    overview: "AB is the newest blood type — appearing less than 1,500 years ago from the intermingling of A and B blood type peoples. Less than 4% of the population is AB positive. You carry the biological complexity of two blood types in one body — and this duality shows up in every aspect of your nature. You are the most spiritually complex and biologically evolved of all blood types.",
    overviewExtra: "AB negative is the rarest blood type on Earth — less than 1% of the world population. Individuals with AB negative blood carry all the complexity and spiritual evolution of AB blood combined with the mysterious qualities of Rh negative. Many researchers and spiritual teachers consider AB- individuals to be among the most evolved souls currently incarnated on Earth.",
    beneficialFoods: [
      { category: "Proteins", items: ["Tofu","Tempeh","Mozzarella","Ricotta","Cottage Cheese","Kefir","Yogurt","Eggs","Soy Products"] },
      { category: "Seafood", items: ["Cod","Grouper","Mackerel","Mahi-Mahi","Monkfish","Pike","Porgy","Rainbow Trout","Red Snapper","Sailfish","Salmon","Sardines","Snail","Sturgeon","Swordfish","Tuna"] },
      { category: "Dairy", items: ["Low-Fat Yogurt","Kefir","Sour Cream","Goat Cheese","Mozzarella","Ricotta","Cottage Cheese"] },
      { category: "Oils", items: ["Olive Oil","Walnut Oil"] },
      { category: "Legumes", items: ["Lentils","Pinto Beans","Snap Beans","Soy Beans"] },
      { category: "Vegetables", items: ["Broccoli","Beets","Cauliflower","Celery","Cucumber","Eggplant","Garlic","Kale","Mushrooms","Parsley","Sweet Potatoes","Yams","Alfalfa Sprouts","Collard Greens"] },
      { category: "Fruits", items: ["Cherries","Cranberries","Figs","Gooseberries","Grapes","Grapefruit","Kiwi","Lemons","Pineapple","Plums","Watermelon"] },
    ],
    avoidFoods: [
      { category: "Meats", items: ["Beef","Pork","Chicken","Veal","Venison","Duck","Goose","Quail","Partridge"] },
      { category: "Oils", items: ["Corn Oil","Sesame Oil","Sunflower Oil","Cottonseed"] },
      { category: "Legumes", items: ["Kidney Beans","Lima Beans","Black-Eyed Peas","Garbanzo Beans"] },
      { category: "Grains", items: ["Buckwheat","Corn","Soba Noodles"] },
      { category: "Vegetables", items: ["Bell Peppers","Radishes","Artichokes","Avocado","Corn"] },
      { category: "Fruits", items: ["Bananas","Coconut","Mangoes","Oranges","Persimmons","Pomegranates","Guava"] },
      { category: "Other", items: ["Caffeine (with great moderation)","Alcohol (with great moderation)","Distilled Liquor","Black Tea","Soda"] },
    ],
    exercise: "Calming AND moderate intensity alternating — yoga, tai chi, hiking, cycling, tennis, swimming. AB types need to cycle between calming and moderate exercise. Their nervous system requires both stimulation and recovery.",
    personalityTraits: ["Spiritual","Empathic","Intuitive","Charismatic","Multi-Faceted","Deeply Creative","Mystical","Profoundly Sensitive"],
    personalityDescription: "The bridge-builder and mystic archetype. When balanced: charming, deeply intuitive, spiritually evolved. When stressed: scattered, indecisive, can internalize too much.",
    healthStrengths: ["Adaptable immune system","Strong resilience"],
    healthVulnerabilities: ["Heart disease","Cancer","Anemia"],
    healthWatch: ["Need to monitor both A and B type health vulnerabilities"],
    supplements: ["Hawthorn","Echinacea","Quercetin","Milk Thistle","Selenium","Panax Ginseng"],
    teas: ["Chamomile","Echinacea","Ginger","Ginkgo Biloba","Green Tea","Hawthorn","Milk Thistle"],
  },
};

/* ── Rh Negative Deep Guide ── */
export const RH_NEGATIVE_GUIDE = {
  title: "You Carry the Rare Blood — The Rh Negative Mystery",
  subtitle: "Less than 15% of the world's population carries Rh negative blood. Science cannot fully explain where it came from. Here is what we know — and what it may mean for you.",
  chapters: [
    {
      title: "Chapter 1 — The Scientific Mystery",
      content: `Rh negative blood cannot be explained by conventional evolutionary theory. The Rhesus factor — named after the Rhesus monkey — is a protein found on red blood cells. 85% of humans have it. 15% do not.\n\nHere is what makes this scientifically puzzling: Rh negative cannot be produced by two Rh positive parents. When it appeared in the human gene pool, it appeared suddenly — not gradually as Darwinian evolution would predict.\n\nGeneticists have traced the major human blood types back to common ancestors. They cannot do the same for Rh negative. Its origin in the human genome remains officially unexplained.`,
    },
    {
      title: "Chapter 2 — The Basque Connection",
      content: `The highest concentration of Rh negative blood on Earth — 30 to 40 percent — is found in the Basque people of northern Spain and southern France in a region straddling the Pyrenees mountains. For context the global average is approximately 15 percent. Most European populations carry Rh negative rates between 15 and 17 percent. The Basque carry nearly double that.\n\nWhat makes this extraordinary is that the Basque people are also a complete mystery in their own right. Their language — Euskara — is a language isolate. It shares absolutely no relationship with any other known language on Earth — living or extinct.\n\nModern genetic studies confirm that the Basque people are genetically distinct from all surrounding European populations. They appear to have arrived in their current location fully formed — with no traceable migration path and no linguistic relatives anywhere on the planet.`,
    },
    {
      title: "Chapter 3 — The Spiritual & Metaphysical Implications",
      content: `Across cultures and centuries researchers have documented consistent traits among Rh negative individuals that transcend geography, education, and upbringing. These include:\n\n• Heightened intuition and psychic sensitivity beyond statistical explanation\n• An inability to be deceived for long — a built-in truth detection that others often find unsettling\n• Deep empathic ability — feeling others' emotions physically not just emotionally\n• Persistent feeling of mission — a knowing that they came here for a specific purpose\n• Difficulty with authority, manufactured consensus, and systems that feel spiritually false\n• Higher than average rates of reported contact with non-human intelligences\n• More frequent mystical experiences, visions, and spontaneous knowing\n• A deep and often painful sense of not fully belonging to mainstream human society\n• Higher IQ and creative intelligence on average\n• Unexplained memories of other places, times, and existences`,
    },
    {
      title: "Chapter 4 — The Ancient Bloodline Theories",
      content: `Several serious researchers have proposed theories about the origin of Rh negative blood. These include:\n\n• The Pre-Adamic Theory — that Rh negative blood represents a lineage that predates or runs parallel to the conventional human genetic line.\n\n• The Extraterrestrial Hypothesis — proposed by researchers including those who have studied the data of alleged alien abductees — noting disproportionately high rates of Rh negative blood among contact experiencers.\n\n• The Nephilim Theory — based on ancient texts from multiple traditions describing the interbreeding of otherworldly beings with humanity.\n\n• The Ancient Survivor Theory — that the Basque and similar isolated populations carrying high Rh negative concentrations are remnants of pre-flood or pre-catastrophe civilizations whose records were lost.\n\nNone of these theories has been proven. None has been disproven. What is certain is that Rh negative blood remains one of the genuine mysteries of human genetics.`,
    },
    {
      title: "Chapter 5 — What It Means for You",
      content: `Your blood is not an accident. The feeling of being different — of seeing what others cannot see, of knowing things before they happen, of sensing deception and holding truth even when it costs you — these are not personality quirks. They may be features, not bugs.\n\nYou were not made for a world that is asleep. You were made for a world that is waking up.\n\nThat world is arriving now.`,
    },
  ],
};

export const RH_NEGATIVE_RESOURCES = [
  {
    title: "The Basque People — Europe's Most Mysterious Culture",
    description: "The only people in Europe with no known linguistic or genetic origin. Their language predates all known European languages.",
    url: "https://www.ancient-origins.net/ancient-places-europe/mysterious-origin-basques-021023",
  },
  {
    title: "Rh Negative Blood — The Scientific Mystery",
    description: "Why conventional evolutionary theory cannot explain the sudden appearance of Rh negative blood in the human gene pool.",
    url: "https://www.rhesusnegatif.com",
  },
  {
    title: "The Rh Negative Registry",
    description: "A community and research hub for Rh negative individuals documenting shared traits, experiences, and history.",
    url: "https://www.rhesusnegative.net",
  },
  {
    title: "Rh Negative Blood and Extraterrestrial Contact Research",
    description: "Documented research showing disproportionately high rates of Rh negative blood among individuals reporting extraterrestrial contact experiences.",
    url: "https://www.bibliotecapleyades.net/ciencia/ciencia_rhblood.htm",
  },
  {
    title: "The Starseed Connection to Rh Negative Blood",
    description: "Exploring the overlap between starseed characteristics and Rh negative traits across cultures and continents.",
    url: "https://in5d.com/rh-negative-blood-type-and-the-starseed-connection/",
  },
  {
    title: "Basque Genetics — What DNA Research Reveals",
    description: "Modern genetic studies on the Basque people and what they reveal about pre-Indo-European European populations.",
    url: "https://www.nationalgeographic.com/science/article/basque-people-spain-france-genetics",
  },
];
