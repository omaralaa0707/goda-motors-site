import type { GodaContent } from "./schema-ext";
import { PROFILE } from "./media";

export const en: GodaContent = {
  locale: "en",
  dir: "ltr",

  brand: {
    name: "Goda Motors",
    shortName: "GM",
    tagline: "A line before a spec",
  },

  nav: [
    { label: "The record", href: "#record" },
    { label: "The light", href: "#light" },
  ],

  hero: {
    eyebrow: "Cairo",
    headline: "They write a line before they write the mileage",
    sub: "Every one of Goda Motors' last five posts opens on a short, unhurried sentence — not the model name, not the price — before it settles into the facts. This page keeps that order: their line first, always, and the specification after it. Every car below is lit by the same fixture: a suspended ring hanging over it in a dark studio bay, rebuilt here as the piece above.",
    primaryCta: "Call Goda Motors",
    secondaryCta: "See the record",
    ringAlt: "A car from Goda Motors' feed, lit by a rebuilt model of their own suspended ring light.",
    followersLabel: "Followers",
    postsLabel: "Posts",
  },

  about: {
    heading: "Goda Motors",
    body: [
      "A showroom in Cairo, photographed in one consistent studio bay under a single suspended ring light — the same fixture in every post they publish.",
    ],
  },

  services: { heading: "The record", items: [] },
  gallery: { heading: "The record", items: [] },

  record: {
    eyebrow: "The record",
    heading: "Four cars, each opened on their own line",
    intro: "Their line comes first in every post, exactly as they wrote it — then the facts they chose to publish, and nothing they didn't.",
    fieldLabels: {
      trim: "Trim",
      mileage: "Mileage",
      supply: "Supply",
      condition: "Condition",
      factoryPaint: "Factory paint",
    },
    yes: "All factory paint",
    viewPost: "See the post",
  },

  teaser: {
    eyebrow: "One more post",
    heading: "The one without a single fact",
    body: "Their most recent post carries no year, no mileage, no trim — just a choice of two colours on the same car, and their line. It is kept apart from the record above rather than folded into either E180 listing, because it isn't a claim about either one specifically.",
    viewPost: "See the post",
  },

  light: {
    eyebrow: "The light",
    heading: "One fixture, in every photograph",
    body: [
      "A circular pendant hangs over the car in every post Goda Motors publish: a warm russet housing wrapped around a glowing white arc, in a dark, mezzanine-walled studio bay with a glass office visible behind the glass wall to one side.",
      "It is the piece rebuilt at the top of this page — a real ring, swinging very slightly on its cable, the way a suspended fixture never actually hangs still.",
    ],
  },

  repeat: {
    heading: "The same model, twice",
    body: "Two of the four cars in the record are the same E180 — a 2018 Avantgarde at 60,000 km and a separate 2018 car at 5,000 km they call Exclusive. They are kept here as two posts, not averaged into one listing.",
  },

  contact: {
    heading: "Visit",
    addressLabel: "Address",
    address: "Cairo, Egypt",
    phoneLabel: "Call",
    phones: [...PROFILE.phones],
    mapsUrl: PROFILE.maps,
    instagramUrl: PROFILE.instagram,
    facebookUrl: PROFILE.facebook,
    cta: "Call Goda Motors",
  },

  footer: {
    rights: "© Goda Motors. All rights reserved.",
  },

  a11y: {
    toggleLanguage: "التبديل إلى العربية",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};
