const BASE_IMAGE_URL =
  "https://media-nft.paintswap.finance/0xf2ab95244ce9f89116bee475fa3e6676f1a4daf7_";

export const getPetImageUrl = (petId: number) => {
  return `https://media-nft.paintswap.finance/0xf2ab95244ce9f89116bee475fa3e6676f1a4daf7_${petId}_146.png`;
};

export const getPetNameByPetId = (petId: number) => {
  const pet = pets.find((pet) => pet.id === petId);
  return pet?.name;
};

const pets = [
  {
    id: 4,
    name: "Youking",
    hp: 9014,
    str: 2150,
    def: 650,
    spd: 720,
    int: 620,
    gs: 1,
    elements: ["Electric", "Fire"],
    imageUrl: `${BASE_IMAGE_URL}4_146.png`,
    skills: [
      {
        attribute: "Electric",
        type: "Single",
        description:
          "Deals damage equal to (Attack + (Speed * 2)) to a target.",
      },
      {
        attribute: "Electric",
        type: "Aoe",
        description:
          "Deals damage equal to (Attack + (Speed * 3)) to all enemies.",
      },
    ],
  },
  {
    id: 5,
    name: "Youdraco",
    hp: 9462,
    str: 2460,
    def: 600,
    spd: 809,
    int: 564,
    gs: 1,
    elements: ["Electric", "Fire"],
    imageUrl: `${BASE_IMAGE_URL}5_146.png`,
    skills: [
      {
        attribute: "Fire",
        type: "Single",
        description: "Deals damage equal to (Attack * 2) to a target.",
      },
      {
        attribute: "Fire",
        type: "Aoe",
        description: "Deals damage equal to (Attack * 1.5) to all enemies.",
      },
    ],
  },
  {
    id: 6,
    name: "Youdrake",
    hp: 8765,
    str: 2200,
    def: 670,
    spd: 810,
    int: 740,
    gs: 1,
    elements: ["Fire", "Light"],
    imageUrl: `${BASE_IMAGE_URL}6_146.png`,
    skills: [
      {
        attribute: "Light",
        type: "Single",
        description: "Deals damage equal to (Attack * 2) to a target.",
      },
      {
        attribute: "Light",
        type: "AllyAoe",
        description: "Restores hitpoints to all allies equal to Speed.",
      },
    ],
  },
  {
    id: 16,
    name: "Ancient Berghead",
    hp: 15273,
    str: 2950,
    def: 1120,
    spd: 610,
    int: 680,
    gs: 1,
    elements: ["Ice"],
    imageUrl: `${BASE_IMAGE_URL}16_146.png`,
    skills: [
      {
        attribute: "Ice",
        type: "Single",
        description: "Deals damage equal to (Attack * 2) to a target.",
      },
      {
        attribute: "Ice",
        type: "Aoe",
        description: "Deals damage equal to (Defense * 2) to all enemies.",
      },
    ],
  },
  {
    id: 17,
    name: "Leviathan",
    hp: 12577,
    str: 2660,
    def: 1060,
    spd: 650,
    int: 510,
    gs: 1,
    elements: ["Water"],
    imageUrl: `${BASE_IMAGE_URL}17_146.png`,
    skills: [
      {
        attribute: "Water",
        type: "Single",
        description: "Deals damage equal to (Attack * 2) to a target.",
      },
      {
        attribute: "Water",
        type: "Aoe",
        description: "Deals damage equal to (Hitpoints * 0.3) to all enemies.",
      },
    ],
  },
  {
    id: 18,
    name: "Hexalopus",
    hp: 10268,
    str: 3000,
    def: 900,
    spd: 570,
    int: 480,
    gs: 1,
    elements: ["Dark"],
    imageUrl: `${BASE_IMAGE_URL}18_146.png`,
    skills: [
      {
        attribute: "Dark",
        type: "Single",
        description: "Deals damage equal to (Attack * 2) to a target.",
      },
      {
        attribute: "Dark",
        type: "Single",
        description: "Deals damage equal to (Attack * 3.5) to a target.",
      },
    ],
  },
  {
    id: 27,
    name: "Scalestorm",
    hp: 14609,
    str: 2800,
    def: 890,
    spd: 550,
    int: 660,
    gs: 1,
    elements: ["Electric"],
    imageUrl: `${BASE_IMAGE_URL}27_146.png`,
    skills: [
      {
        attribute: "Electric",
        type: "Single",
        description: "Deals damage equal to (Attack + (Speed*2)) to a target.",
      },
      {
        attribute: "Electric",
        type: "Single",
        description:
          "Deals damage equal to (Attack * Target's Speed * 0) to a target.",
      },
    ],
  },
  {
    id: 28,
    name: "Knightclaw",
    hp: 13366,
    str: 3100,
    def: 750,
    spd: 720,
    int: 600,
    gs: 1,
    elements: ["Fire"],
    imageUrl: `${BASE_IMAGE_URL}28_146.png`,
    skills: [
      {
        attribute: "Fire",
        type: "Single",
        description: "Deals damage equal to (Attack * 2) to a target.",
      },
      {
        attribute: "Fire",
        type: "Single",
        description:
          "Deals damage equal to (Attack *4) if Target's Defense > 1000, otherwise (Attack*3) to a target.",
      },
    ],
  },
  {
    id: 39,
    name: "Flamestart",
    hp: 12120,
    str: 2420,
    def: 590,
    spd: 750,
    int: 660,
    gs: 1,
    elements: ["Fire"],
    imageUrl: `${BASE_IMAGE_URL}39_146.png`,
    skills: [
      {
        attribute: "Fire",
        type: "Single",
        description: "Deals damage equal to (Attack * 2.2) to a target.",
      },
      {
        attribute: "Fire",
        type: "Aoe",
        description:
          "All allies gain (Attack * 0.5), then deal damage equal to (Attack * 0.2) to all enemies.",
      },
    ],
  },
  {
    id: 40,
    name: "Holyguard",
    hp: 9800,
    str: 2670,
    def: 700,
    spd: 710,
    int: 780,
    gs: 1,
    elements: ["Light"],
    imageUrl: `${BASE_IMAGE_URL}40_146.png`,
    skills: [
      {
        attribute: "Light",
        type: "Single",
        description: "Deals damage equal to (Attack * 2.2) to a target.",
      },
      {
        attribute: "Light",
        type: "Single",
        description: "Gain 5000 Health, deal damage equals to (Health * 0.5).",
      },
    ],
  },
  {
    id: 43,
    name: "Icefurr",
    hp: 9050,
    str: 2610,
    def: 1150,
    spd: 620,
    int: 520,
    gs: 1,
    element: "Nature",
    imageUrl: `${BASE_IMAGE_URL}43_146.png`,
    skills: [
      {
        attribute: "Ice",
        type: "Single",
        description: "Deals damage equal to (Attack * 2.2) to a target.",
      },
      {
        attribute: "Ice",
        type: "Single",
        description:
          "Deals damage equal to (Attack * (Target Health * 0.5)) to a target.",
      },
    ],
  },
  {
    id: 44,
    name: "Prisfurr",
    hp: 10020,
    str: 2910,
    def: 720,
    spd: 635,
    int: 524,
    gs: 1,
    element: "Nature",
    imageUrl: `${BASE_IMAGE_URL}44_146.png`,
    skills: [
      {
        attribute: "Dark",
        type: "Single",
        description: "Deals damage equal to (Attack * 2.2) to a target.",
      },
      {
        attribute: "Dark",
        type: "Aoe",
        description:
          "Deal damage equal to (Attack * 1) to all enemies, then reapply DarkElement to all enemies.",
      },
    ],
  },
  {
    id: 47,
    name: "Peckking",
    hp: 12905,
    str: 2850,
    def: 1200,
    spd: 590,
    int: 690,
    gs: 1,
    element: "Ice",
    imageUrl: `${BASE_IMAGE_URL}47_146.png`,
    skills: [
      {
        attribute: "Ice",
        type: "Single",
        description: "Deals damage equal to (Attack * 2.5) to a target.",
      },
      {
        attribute: "Ice",
        type: "Single",
        description:
          "Deals damage equal to (Attack * 4.5) if Target's Defense > 1000, otherwise (Attack *2) to a target.",
      },
    ],
  },
  {
    id: 48,
    name: "Hocuspocus",
    hp: 9950,
    str: 3600,
    def: 610,
    spd: 500,
    int: 750,
    gs: 1,
    element: "Ice",
    imageUrl: `${BASE_IMAGE_URL}48_146.png`,
    skills: [
      {
        attribute: "Light",
        type: "Single",
        description: "Deals damage equal to (Attack * 2.5) to a target.",
      },
      {
        attribute: "Light",
        type: "Aoe",
        description:
          "Deals damage equal to (Attack * 1) to all enemies, then apply Light to allies.",
      },
    ],
  },
  {
    id: 69,
    name: "Bihorn",
    hp: 10560,
    str: 2560,
    def: 790,
    spd: 740,
    int: 540,
    gs: 1,
    element: "Fire",
    imageUrl: `${BASE_IMAGE_URL}69_146.png`,
    skills: [
      {
        attribute: "Fire",
        type: "Single",
        description: "Deals damage equal to (Attack *2) to a target.",
      },
      {
        attribute: "Fire",
        type: "Single",
        description:
          "Deals damage (Attack * 5) if this hit triggers elemental reaction, otherwise (Attack *3) to a target.",
      },
    ],
  },
  {
    id: 71,
    name: "Haichiueen",
    hp: 14650,
    str: 2250,
    def: 870,
    spd: 621,
    int: 640,
    gs: 1,
    element: "Fire",
    imageUrl: `${BASE_IMAGE_URL}71_146.png`,
    skills: [
      {
        attribute: "Water",
        type: "Single",
        description: "Deals damage equal to (Attack * 2.2) to a target.",
      },
      {
        attribute: "Water",
        type: "Single",
        description:
          "Deals damage equal to (Attack *2.5) to target, then reduce target's Defence by (30%).",
      },
    ],
  },
  {
    id: 73,
    name: "Blizzgon",
    hp: 12200,
    str: 2140,
    def: 750,
    spd: 745,
    int: 630,
    gs: 1,
    element: "Ice",
    imageUrl: `${BASE_IMAGE_URL}73_146.png`,
    skills: [
      {
        attribute: "Electric",
        type: "Single",
        description: "Deals damage equal to (Attack * 2.5) to a target.",
      },
      {
        attribute: "Electric",
        type: "Aoe",
        description:
          "Deals damage equal to (Attack * 3) if has Electric on self, otherwise (Attack1.5) to all enemies.",
      },
    ],
  },
  {
    id: 75,
    name: "Divefin",
    hp: 12230,
    str: 2750,
    def: 680,
    spd: 745,
    int: 630,
    gs: 1,
    element: "Ice",
    imageUrl: `${BASE_IMAGE_URL}75_146.png`,
    skills: [
      {
        attribute: "Water",
        type: "Single",
        description: "Deals damage equal to (Attack * 2.5) to a target.",
      },
      {
        attribute: "Water",
        type: "Single",
        description:
          "Deals damage equal to (Attack * 4) if target has Ice Element, otherwise (Attack *2.5) to a target.",
      },
    ],
  },
  {
    id: 77,
    name: "Holyfurr",
    hp: 13660,
    str: 2560,
    def: 750,
    spd: 723,
    int: 598,
    gs: 1,
    element: "Nature",
    imageUrl: `${BASE_IMAGE_URL}77_146.png`,
    skills: [
      {
        attribute: "Light",
        type: "Single",
        description: "Deals damage equal to (Attack * 2.2) to a target.",
      },
      {
        attribute: "Light",
        type: "Aoe",
        description:
          "Deal damage equal to (Attack * 2.5) to all enemies, then reapply Light Element to all enemies.",
      },
    ],
  },
  {
    id: 79,
    name: "Packshark",
    hp: 11200,
    str: 2950,
    def: 795,
    spd: 675,
    int: 425,
    gs: 1,
    element: "Water",
    imageUrl: `${BASE_IMAGE_URL}79_146.png`,
    skills: [
      {
        attribute: "Water",
        type: "Single",
        description: "Deals damage equal to (Attack * 2.2) to a target.",
      },
      {
        attribute: "Water",
        type: "Single",
        description:
          "Deals damage equal to (Health * 0.4 + Target Health * 0.4) to a target.",
      },
    ],
  },
  {
    id: 81,
    name: "Sanbi",
    hp: 10540,
    str: 2460,
    def: 650,
    spd: 710,
    int: 550,
    gs: 1,
    element: "Nature",
    imageUrl: `${BASE_IMAGE_URL}81_146.png`,
    skills: [
      {
        attribute: "Fire",
        type: "Single",
        description: "Deals damage equal to (Attack * 2.2) to a target.",
      },
      {
        attribute: "Fire",
        type: "Single",
        description:
          "Deals damage equal to (Attack*2 + Speed * 5) to a target.",
      },
    ],
  },
  {
    id: 82,
    name: "Weremob",
    hp: 11200,
    str: 2960,
    def: 980,
    spd: 671,
    int: 650,
    gs: 1,
    element: "Nature",
    imageUrl: `${BASE_IMAGE_URL}82_146.png`,
    skills: [
      {
        attribute: "Water",
        type: "Single",
        description: "Deals damage equal to (Attack * 2.2) to a target.",
      },
      {
        attribute: "Water",
        type: "Single",
        description:
          "Reduce target's Defence by (30%), then deals damage equal to (Attack * 3) to on a target.",
      },
    ],
  },
];

const petMap = pets.reduce((acc, pet) => {
  // @ts-expect-error ignore
  acc[pet.id] = {
    stat: {
      hp: pet.hp,
      str: pet.str,
      def: pet.def,
      spd: pet.spd,
      int: pet.int,
    },
    skills: pet.skills,
    elements: pet.elements,
  };
  return acc;
}, {});

console.log(JSON.stringify(petMap));
export default pets;
