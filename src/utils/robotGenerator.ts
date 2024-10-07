export interface Robot {
  head: {
    color: string;
    shape: string;
    details: {
      screen: string;
      buttons_and_knobs: string;
    };
  };
  body: {
    clothing: string;
    accessories: string;
  };
  overall_style: {
    color_tone: string;
    material: string;
  };
}

const headColors = [
  "white with a subtle yellow tint",
  "metallic silver",
  "matte black",
  "glossy white",
  "brushed aluminum",
];

const headShapes = [
  "square with rounded corners",
  "oval",
  "cylindrical",
  "hexagonal",
  "dome-shaped",
];

const screenTypes = [
  "CRT displaying pixelated expressions",
  "LED matrix showing simple patterns",
  "OLED screen with high-resolution graphics",
  "E-ink display with changeable text",
  "Holographic projection",
];

const buttonTypes = [
  "physical buttons and knobs scattered around the head",
  "touch-sensitive panels on the sides",
  "retro-style toggle switches",
  "illuminated push buttons",
  "rotary dials and sliders",
];

const clothingStyles = [
  "mid-20th century fashion with high-waisted pants and a slim tie",
  "futuristic jumpsuit with glowing accents",
  "steampunk-inspired vest and trousers",
  "minimalist tunic with geometric patterns",
  "retro space suit with bulky joints",
];

const accessoryTypes = [
  "magnetic tapes and floppy disks attached to a belt",
  "glowing power cores on the chest",
  "retractable antennae on the shoulders",
  "utility pockets filled with gadgets",
  "holographic projectors on the wrists",
];

const colorTones = [
  "soft, muted tones",
  "vibrant neon colors",
  "earthy, natural hues",
  "monochromatic grayscale",
  "pastel shades",
];

const materials = [
  "textures resembling old electronic devices",
  "smooth, polished surfaces",
  "weathered and worn metal",
  "translucent plastics with inner glow",
  "fabric-like textures with circuitry patterns",
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateRandomRobot(): Robot {
  return {
    head: {
      color: getRandomElement(headColors),
      shape: getRandomElement(headShapes),
      details: {
        screen: getRandomElement(screenTypes),
        buttons_and_knobs: getRandomElement(buttonTypes),
      },
    },
    body: {
      clothing: getRandomElement(clothingStyles),
      accessories: getRandomElement(accessoryTypes),
    },
    overall_style: {
      color_tone: getRandomElement(colorTones),
      material: getRandomElement(materials),
    },
  };
}