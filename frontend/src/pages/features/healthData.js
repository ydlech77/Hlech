export const healthConditions = [
  {
  id: "T001",
  name: "Toothache",
  keywords: [
    "tooth pain",
    "toothache",
    "mouth pain"
  ],
  causes: [
    "tooth decay",
    "infection",
    "gum problem"
  ],
  natural: [
    "rinse mouth with warm salt water",
    "avoid sugary food"
  ],
  drugs: [
    "pain reliever",
    "antibiotic if prescribed"
  ],
  emergency: false
},

{
  id: "P000",
  name: "General Body Pain",
  keywords: [
    "pain",
    "body pain",
    "whole body pain",
    "aches",
    "aching"
  ],
  causes: [
    "stress",
    "tiredness",
    "infection",
    "physical activity"
  ],
  natural: [
    "rest well",
    "drink plenty of water",
    "warm bath"
  ],
  drugs: [
    "paracetamol"
  ],
  emergency: false
},

  {
  id: "D003",
  name: "Ulcer",
  keywords: [
    "ulcer",
    "burning stomach pain",
    "pain after eating",
    "heartburn"
  ],
  causes: [
    "too much acid",
    "skipping meals",
    "stress"
  ],
  natural: [
    "eat regularly",
    "avoid spicy food",
    "drink cabbage juice"
  ],
  drugs: [
    "antacid",
    "omeprazole"
  ],
  emergency: false
},

  {
  id: "INF001",
  name: "Malaria",
  keywords: [
    "malaria",
    "hot body",
    "fever with chills",
    "shivering",
    "bitter taste",
    "body weakness"
  ],
  causes: [
    "mosquito bite"
  ],
  natural: [
    "drink plenty of water",
    "rest well",
    "eat fruits like orange and banana"
  ],
  drugs: [
    "ACT",
    "artemether lumefantrine"
  ],
  emergency: true
},

{
  id: "INF002",
  name: "Typhoid",
  keywords: [
    "typhoid",
    "long fever",
    "stomach pain",
    "loss of appetite",
    "weakness"
  ],
  causes: [
    "dirty food or water"
  ],
  natural: [
    "drink clean water",
    "eat light food",
    "rest well"
  ],
  drugs: [
    "ciprofloxacin",
    "azithromycin"
  ],
  emergency: true
},

{
  id: "INF003",
  name: "HIV",
  keywords: [
    "hiv",
    "aids",
    "weight loss",
    "frequent sickness",
    "night sweats"
  ],
  causes: [
    "unprotected sex",
    "infected blood",
    "sharing sharp objects"
  ],
  natural: [
    "eat healthy balanced food",
    "avoid stress",
    "get enough rest"
  ],
  drugs: [
    "antiretroviral therapy (ART)"
  ],
  emergency: true
},

  {
    id: "P001",
    keywords: ["headache", "head pain", "migraine"],
    name: "Headache",
    causes: ["stress", "dehydration", "lack of sleep", "eye strain"],
    natural: [
      "drink plenty of water",
      "rest in a quiet room",
      "eat banana and orange",
      "reduce screen time"
    ],
    drugs: ["paracetamol", "ibuprofen"],
    emergency: false
  },
  {
    id: "P002",
    keywords: ["waist pain", "lower back pain", "back pain"],
    name: "Lower back pain",
    causes: ["muscle strain", "poor posture", "long sitting"],
    natural: [
      "apply warm compress",
      "gentle stretching",
      "rest your back",
      "eat calcium-rich foods"
    ],
    drugs: ["paracetamol", "ibuprofen"],
    emergency: false
  },
  {
    id: "D001",
    keywords: ["running stomach", "diarrhea", "loose stool"],
    name: "Running stomach",
    causes: ["infection", "bad food", "stress"],
    natural: [
      "drink ORS",
      "eat banana and rice",
      "avoid oily foods"
    ],
    drugs: ["ORS", "zinc"],
    emergency: false
  },
  {
    id: "G001",
    keywords: ["fever", "high temperature"],
    name: "Fever",
    causes: ["infection", "malaria", "flu"],
    natural: [
      "drink plenty of fluids",
      "rest well",
      "lukewarm sponge bath"
    ],
    drugs: ["paracetamol"],
    emergency: false
  },
  {
    id: "R001",
    keywords: ["cough", "sore throat", "cold"],
    name: "Common Cold / Respiratory Infection",
    causes: ["virus", "allergy", "dust"],
    natural: [
      "steam inhalation",
      "drink honey water",
      "rest"
    ],
    drugs: ["cough syrup", "paracetamol"],
    emergency: false
  },
  {
    id: "SK001",
    keywords: ["rash", "itching", "skin redness"],
    name: "Skin Allergy / Rash",
    causes: ["allergy", "infection", "chemical exposure"],
    natural: [
      "cool compress",
      "aloe vera",
      "avoid scratching"
    ],
    drugs: ["antihistamine cream"],
    emergency: false
  },
  {
    id: "D002",
    keywords: ["stomach pain", "abdominal pain", "gas"],
    name: "Stomach Ache / Gas",
    causes: ["indigestion", "food poisoning", "stress"],
    natural: [
      "ginger tea",
      "small frequent meals",
      "avoid spicy foods"
    ],
    drugs: ["antacid", "simethicone"],
    emergency: false
  },
  {
    id: "P003",
    keywords: ["neck pain", "stiff neck"],
    name: "Neck Pain",
    causes: ["poor posture", "muscle strain", "sleeping wrong"],
    natural: [
      "gentle stretching",
      "hot or cold compress",
      "rest"
    ],
    drugs: ["paracetamol", "ibuprofen"],
    emergency: false
  },
  {
    id: "S001",
    keywords: ["chest pain", "heart pain"],
    name: "Chest Pain",
    causes: ["muscle strain", "heart-related issue"],
    natural: [],
    drugs: [],
    emergency: true
  },
  {
    id: "M001",
    keywords: ["mental", "depression", "suicidal", "mad"],
    name: "Mental Health Concern",
    causes: ["stress", "emotional distress"],
    natural: [],
    drugs: [],
    emergency: true
  }
];
