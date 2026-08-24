export type GalleryCategory =
  | "semua"
  | "sekolah"
  | "alam"
  | "transportasi"
  | "budaya";

export type GalleryAspect =
  | "square"
  | "portrait"
  | "landscape";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: Exclude<GalleryCategory, "semua">;
  aspect: GalleryAspect;
}
