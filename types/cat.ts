export type CatStatus =
  | "available"
  | "reserved"
  | "adopted"
  | "deceased";

export type CatGender =
  | "male"
  | "female"
  | string;

export type CatLocation =
  | "kociarnia"
  | "dt"
  | "cafe"
  | "ds"
  | "zytnia"
  | "zoska"
  | "lecznica"
  | "piwnica"
  | "poczekalnia";

export type FivStatus = string;
export type FelvStatus = string;
export type FipStatus = string;

export type Cat = {
  id: string;

  name: string | null;
  gender: CatGender | null;
  description: string | null;
  image_url: string | null;
  status: CatStatus | null;

  created_at: string | null;

  tags: string[] | null;
  location: CatLocation | null;

  sterilized: boolean | null;
  vaccinated: boolean | null;
  dewormed: boolean | null;

  good_with_children: boolean | null;
  good_with_cats: boolean | null;

  weight: string | null;

  adoption_priority: number | null;
  is_featured: boolean | null;

  birth_date: string | null;

  deleted_at: string | null;

  slug: string;

  fiv_status: FivStatus | null;
  felv_status: FelvStatus | null;
  fip_status: FipStatus | null;

  updated_at: string | null;

  virtual_adoption_url: string | null;

  microchipped: boolean | null;

  arrival_date: string | null;

  media?: CatMedia[];
};

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

export const CAT_LOCATIONS: {
  value: CatLocation;
  label: string;
}[] = [
    {
      value: "kociarnia",
      label: "Kociarnia",
    },
    {
      value: "dt",
      label: "Dom tymczasowy",
    },
    {
      value: "cafe",
      label: "Cafe",
    },
    {
      value: "ds",
      label: "DS",
    },
    {
      value: "zytnia",
      label: "Żytnia",
    },
    {
      value: "zoska",
      label: "Zośka",
    },
    {
      value: "lecznica",
      label: "Lecznica",
    },
    {
      value: "piwnica",
      label: "Piwnica",
    },
    {
      value: "poczekalnia",
      label: "Poczekalnia",
    },
  ];

export const CAT_STATUS_OPTIONS = [
  {
    value: "available",
    label: "Szukam domu",
  },
  {
    value: "reserved",
    label: "Zarezerwowany",
  },
  {
    value: "adopted",
    label: "Mam już dom",
  },
  {
    value: "deceased",
    label: "Odszedł za tęczowy most",
  },
] as const;

export const CAT_GENDER_OPTIONS = [
  {
    value: "female",
    label: "Samica",
  },
  {
    value: "male",
    label: "Samiec",
  },
] as const;

export const CAT_FIV_OPTIONS = [
  {
    value: "unknown",
    label: "Nieznany",
  },
  {
    value: "negative",
    label: "Negatywny",
  },
  {
    value: "positive",
    label: "Pozytywny",
  },
] as const;

export const CAT_FELV_OPTIONS = [
  {
    value: "unknown",
    label: "Nieznany",
  },
  {
    value: "negative",
    label: "Negatywny",
  },
  {
    value: "positive",
    label: "Pozytywny",
  },
] as const;

export const CAT_FIP_OPTIONS = [
  {
    value: "none",
    label: "Brak",
  },
  {
    value: "unknown",
    label: "Nieznany",
  },
  {
    value: "suspected",
    label: "Podejrzenie",
  },
  {
    value: "positive",
    label: "Pozytywny",
  },
] as const;

export type EditableCatField =
  | "name"
  | "gender"
  | "description"
  | "image_url"
  | "status"
  | "tags"
  | "location"
  | "sterilized"
  | "vaccinated"
  | "dewormed"
  | "good_with_children"
  | "weight"
  | "adoption_priority"
  | "is_featured"
  | "good_with_cats"
  | "birth_date"
  | "slug"
  | "fiv_status"
  | "felv_status"
  | "fip_status"
  | "virtual_adoption_url"
  | "microchipped"
  | "arrival_date";

export const EDITABLE_CAT_FIELDS: EditableCatField[] = [
  "name",
  "gender",
  "description",
  "image_url",
  "status",
  "tags",
  "location",
  "sterilized",
  "vaccinated",
  "dewormed",
  "good_with_children",
  "weight",
  "adoption_priority",
  "is_featured",
  "good_with_cats",
  "birth_date",
  "slug",
  "fiv_status",
  "felv_status",
  "fip_status",
  "virtual_adoption_url",
  "microchipped",
  "arrival_date",
];

export const CAT_TAG_OPTIONS = [
  "aktywny",
  "do adopcji razem",
  "jedynak",
  "łatwy",
  "miziasty",
  "nieśmiały",
  "niezależny",
  "potrzebuje czasu",
  "spokojny",
  "towarzyski",
  "wrażliwy",
  "z kotem",
] as const;

export type CatTag = (typeof CAT_TAG_OPTIONS)[number];