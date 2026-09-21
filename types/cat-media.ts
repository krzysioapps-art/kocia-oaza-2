export type CatMedia = {
  id: string;
  cat_id: string;

  media_type: string;
  url: string;

  cloudinary_public_id: string | null;

  is_primary: boolean | null;
  display_order: number | null;

  created_at: string | null;
  updated_at: string | null;

  alt_text: string | null;
};