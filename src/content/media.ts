/**
 * Goda Motors write a line before they write a spec. Every one of their last
 * five posts opens with a short, unhurried sentence — "Designed to stand
 * out.", "Some things just speak for themselves.", "That's not something you
 * see every day" — before it gets to the mileage. It is a distinct editorial
 * voice among the dealers sourced for this series, most of whom open on the
 * model name.
 *
 * It is matched by one fixed piece of their own architecture: every car is
 * shot under the same suspended ring light — a warm red housing around a
 * glowing white arc — in the same dark, mezzanine-walled studio bay.
 *
 * Three of their five posts are the same model, a Mercedes-Benz E180: a
 * plain teaser choosing between two colours, a 2018 Avantgarde at 60,000 km,
 * and a separate 2018 car at 5,000 km they call "Exclusive" and "Perfect
 * Condition". They are kept here as what they are — three posts, not one
 * listing averaged into three.
 */

export type CarId = "sl55" | "e180-avantgarde" | "e180-exclusive" | "x5";

export type Car = {
  id: CarId;
  marque: string;
  model: string;
  year: string;
  /** Their own opening line for this post, verbatim. */
  line: string;
  /** Their own sub-billing, when they gave one beyond the model name. */
  billing?: string;
  trim?: string;
  mileageKm?: number;
  factoryPaint?: boolean;
  supply?: string;
  condition?: string;
  frames: string[];
  postUrl: string;
};

const post = (code: string) => `https://www.instagram.com/p/${code}/`;
const f = (s: string, n = 3) => Array.from({ length: n }, (_, i) => `/media/${s}-${i + 1}.jpg`);

/** Newest first, as posted. */
export const CARS: Car[] = [
  {
    id: "sl55",
    marque: "Mercedes-AMG",
    model: "SL 55",
    year: "2024",
    line: "Some things are made to be seen.",
    billing: "MANUFAKTUR Monza Grey Magno",
    supply: "Agency warranty",
    condition: "Pre-owned",
    frames: f("sl55"),
    postUrl: post("DcMZCEODpXI"),
  },
  {
    id: "e180-exclusive",
    marque: "Mercedes-Benz",
    model: "E180",
    year: "2018",
    line: "That's not something you see every day.",
    trim: "Exclusive",
    mileageKm: 5000,
    condition: "Perfect condition",
    frames: f("e180-exclusive"),
    postUrl: post("DcRcs3tjpfX"),
  },
  {
    id: "x5",
    marque: "BMW",
    model: "X5 M40i",
    year: "2025",
    line: "Some things just speak for themselves.",
    mileageKm: 10000,
    factoryPaint: true,
    frames: f("x5"),
    postUrl: post("DcjL0o6APrG"),
  },
  {
    id: "e180-avantgarde",
    marque: "Mercedes-Benz",
    model: "E180",
    year: "2018",
    line: "Designed to stand out.",
    trim: "Avantgarde",
    mileageKm: 60000,
    factoryPaint: true,
    supply: "Wakeel",
    frames: f("e180-avantgarde", 2),
    postUrl: post("DctXAUhANxN"),
  },
];

/** The teaser post — no specification, kept apart from the record above. */
export const TEASER = {
  line: "Classic black. Brilliant white. Choose your E180.",
  frame: "/media/e180-teaser-1.jpg",
  postUrl: post("DcvXq2fuWlo"),
};

export const PROFILE = {
  instagram: "https://www.instagram.com/godamotors_/",
  facebook: "https://www.facebook.com/GodaMotors/",
  maps: "https://www.google.com/maps/place/Goda+motors/data=!4m2!3m1!1s0x0:0x2b268aadd8828873",
  /** All four printed on every post, in their order. */
  phones: ["01002929326", "01202226606", "0100 0011016", "01000166476"],
  phoneHref: "tel:+201002929326",
  followers: "5,171",
  posts: "360",
} as const;
