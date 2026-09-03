import type { SiteContent } from "@/i18n/schema";
import { useContent } from "@/i18n/locale-provider";

/**
 * Goda Motors open every post on a line, not a spec, and every photograph
 * is shot under the same suspended ring light. The shared schema has no
 * vocabulary for an editorial opener, a repeated model, or the fixture
 * itself.
 */
export type GodaContent = SiteContent & {
  hero: SiteContent["hero"] & {
    ringAlt: string;
    followersLabel: string;
    postsLabel: string;
  };
  record: {
    eyebrow: string;
    heading: string;
    intro: string;
    fieldLabels: {
      trim: string;
      mileage: string;
      supply: string;
      condition: string;
      factoryPaint: string;
    };
    yes: string;
    viewPost: string;
  };
  teaser: {
    eyebrow: string;
    heading: string;
    body: string;
    viewPost: string;
  };
  light: {
    eyebrow: string;
    heading: string;
    body: string[];
  };
  repeat: {
    heading: string;
    body: string;
  };
  contact: SiteContent["contact"];
};

export function useGoda() {
  return useContent() as GodaContent;
}
