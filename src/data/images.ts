import type { Photo } from "@/types";

export interface SitePhoto extends Photo {
  /** CSS object-position, to keep faces in frame when the photo is cropped. */
  position?: string;
  /** Where the photo came from (for licensing records). */
  source?: string;
}

/**
 * PLACEHOLDER stock photography (Unsplash / Pexels — both free to use).
 * No doctors appear in these images; doctor photos belong only in the
 * Our Doctors section. Replace with the clinic's own photos when available:
 * put the files in /public/images/ and change `src` to e.g. "/images/about/women.jpg".
 * next/image resizes and serves them in modern formats automatically.
 */
const unsplash = (key: string) =>
  `https://images.unsplash.com/${key}?w=2000&q=80&fit=crop&auto=format`;
const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2000`;

export const aboutPhotos: Record<"women" | "children" | "families", SitePhoto> = {
  women: {
    src: pexels(7088480),
    alt: "An expectant mother resting her hands on her baby bump in a clinic",
    position: "62% 50%",
    source: "https://www.pexels.com/photo/7088480/",
  },
  children: {
    src: unsplash("photo-1758691462322-be12d399df01"),
    alt: "A young boy playing doctor with a stethoscope and a teddy bear",
    position: "70% 50%",
    source: "https://unsplash.com/s/photos/teddy-bear-stethoscope",
  },
  families: {
    src: unsplash("photo-1581952976147-5a2d15560349"),
    alt: "Parents with their newborn baby and young daughter at home",
    position: "50% 50%",
    source: "https://unsplash.com/s/photos/family-health",
  },
};
