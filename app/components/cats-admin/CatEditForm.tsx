"use client";

import {
  useState,
} from "react";

import type {
  Cat,
  EditableCatField,
} from "@/types/cat";

import {
  CAT_FELV_OPTIONS,
  CAT_FIP_OPTIONS,
  CAT_FIV_OPTIONS,
  CAT_GENDER_OPTIONS,
  CAT_LOCATIONS,
  CAT_STATUS_OPTIONS,
} from "@/types/cat";

type Props = {
  cat: Cat;
};

export default function CatEditForm({
  cat: initialCat,
}: Props) {
  const [cat, setCat] =
    useState<Cat>(
      initialCat
    );

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState("");

  function setField(
    field: EditableCatField,
    value: unknown
  ) {
    setCat(
      (current) => ({
        ...current,
        [field]:
          value,
      })
    );
  }

  async function save(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const fields = [
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
      ] as EditableCatField[];

      for (
        const field of fields
      ) {
        const response =
          await fetch(
            `/api/cats/${cat.id}`,
            {
              method:
                "PATCH",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                field,
                value:
                  cat[field],
              }),
            }
          );

        if (
          !response.ok
        ) {
          const result =
            await response.json();

          throw new Error(
            result.error ??
              "Błąd zapisu"
          );
        }
      }

      setMessage(
        "✓ Wszystkie zmiany zapisane."
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "Nie udało się zapisać zmian."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      className="cat-full-form"
      onSubmit={save}
    >
      <section className="cat-full-form__section">
        <h2>
          Podstawowe dane
        </h2>

        <div className="cat-full-form__grid">
          <Field
            label="Imię"
            value={
              cat.name ?? ""
            }
            onChange={(value) =>
              setField(
                "name",
                value
              )
            }
          />

          <Field
            label="Slug"
            value={
              cat.slug
            }
            onChange={(value) =>
              setField(
                "slug",
                value
              )
            }
          />

          <SelectField
            label="Status"
            value={
              cat.status ??
              ""
            }
            options={
              CAT_STATUS_OPTIONS
            }
            onChange={(value) =>
              setField(
                "status",
                value
              )
            }
          />

          <SelectField
            label="Płeć"
            value={
              cat.gender ??
              ""
            }
            options={
              CAT_GENDER_OPTIONS
            }
            onChange={(value) =>
              setField(
                "gender",
                value
              )
            }
          />

          <Field
            label="Data urodzenia"
            type="date"
            value={
              cat.birth_date ??
              ""
            }
            onChange={(value) =>
              setField(
                "birth_date",
                value ||
                  null
              )
            }
          />

          <Field
            label="Data przyjęcia"
            type="date"
            value={
              cat.arrival_date ??
              ""
            }
            onChange={(value) =>
              setField(
                "arrival_date",
                value ||
                  null
              )
            }
          />

          <SelectField
            label="Lokalizacja"
            value={
              cat.location ??
              ""
            }
            options={
              CAT_LOCATIONS
            }
            onChange={(value) =>
              setField(
                "location",
                value ||
                  null
              )
            }
          />

          <Field
            label="Waga"
            value={
              cat.weight ??
              ""
            }
            onChange={(value) =>
              setField(
                "weight",
                value ||
                  null
              )
            }
          />
        </div>
      </section>

      <section className="cat-full-form__section">
        <h2>
          Zdrowie
        </h2>

        <div className="cat-full-form__checks">
          <BooleanField
            label="Sterylizowany"
            value={
              cat.sterilized
            }
            onChange={(value) =>
              setField(
                "sterilized",
                value
              )
            }
          />

          <BooleanField
            label="Szczepiony"
            value={
              cat.vaccinated
            }
            onChange={(value) =>
              setField(
                "vaccinated",
                value
              )
            }
          />

          <BooleanField
            label="Odrobaczony"
            value={
              cat.dewormed
            }
            onChange={(value) =>
              setField(
                "dewormed",
                value
              )
            }
          />

          <BooleanField
            label="Mikrochip"
            value={
              cat.microchipped
            }
            onChange={(value) =>
              setField(
                "microchipped",
                value
              )
            }
          />

          <BooleanField
            label="Dobry dla dzieci"
            value={
              cat.good_with_children
            }
            onChange={(value) =>
              setField(
                "good_with_children",
                value
              )
            }
          />

          <BooleanField
            label="Dobry dla kotów"
            value={
              cat.good_with_cats
            }
            onChange={(value) =>
              setField(
                "good_with_cats",
                value
              )
            }
          />
        </div>

        <div className="cat-full-form__grid">
          <SelectField
            label="FIV"
            value={
              cat.fiv_status ??
              "unknown"
            }
            options={
              CAT_FIV_OPTIONS
            }
            onChange={(value) =>
              setField(
                "fiv_status",
                value
              )
            }
          />

          <SelectField
            label="FeLV"
            value={
              cat.felv_status ??
              "unknown"
            }
            options={
              CAT_FELV_OPTIONS
            }
            onChange={(value) =>
              setField(
                "felv_status",
                value
              )
            }
          />

          <SelectField
            label="FIP"
            value={
              cat.fip_status ??
              "none"
            }
            options={
              CAT_FIP_OPTIONS
            }
            onChange={(value) =>
              setField(
                "fip_status",
                value
              )
            }
          />
        </div>
      </section>

      <section className="cat-full-form__section">
        <h2>
          Adopcja
        </h2>

        <div className="cat-full-form__grid">
          <Field
            label="Priorytet adopcji"
            type="number"
            value={String(
              cat.adoption_priority ??
                0
            )}
            onChange={(value) =>
              setField(
                "adoption_priority",
                Number(value)
              )
            }
          />

          <BooleanField
            label="Wyróżniony"
            value={
              cat.is_featured
            }
            onChange={(value) =>
              setField(
                "is_featured",
                value
              )
            }
          />

          <Field
            label="Link do adopcji wirtualnej"
            value={
              cat.virtual_adoption_url ??
              ""
            }
            onChange={(value) =>
              setField(
                "virtual_adoption_url",
                value ||
                  null
              )
            }
          />

          <Field
            label="Image URL"
            value={
              cat.image_url ??
              ""
            }
            onChange={(value) =>
              setField(
                "image_url",
                value ||
                  null
              )
            }
          />
        </div>
      </section>

      <section className="cat-full-form__section">
        <h2>
          Treść
        </h2>

        <label className="cat-full-form__field">
          <span>Opis</span>

          <textarea
            value={
              cat.description ??
              ""
            }
            onChange={(event) =>
              setField(
                "description",
                event.target
                  .value
              )
            }
          />
        </label>

        <label className="cat-full-form__field">
          <span>
            Tagi — oddziel przecinkami
          </span>

          <input
            value={
              cat.tags?.join(
                ", "
              ) ?? ""
            }
            onChange={(event) =>
              setField(
                "tags",
                event.target
                  .value
                  .split(",")
                  .map(
                    (item) =>
                      item.trim()
                  )
                  .filter(
                    Boolean
                  )
              )
            }
          />
        </label>
      </section>

      <div className="cat-full-form__footer">
        <button
          type="submit"
          className="button button--primary"
          disabled={saving}
        >
          {saving
            ? "Zapisywanie..."
            : "Zapisz wszystkie zmiany"}
        </button>

        {message && (
          <span>
            {message}
          </span>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  type?: string;
}) {
  return (
    <label className="cat-full-form__field">
      <span>{label}</span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly {
    value: string;
    label: string;
  }[];
  onChange: (
    value: string
  ) => void;
}) {
  return (
    <label className="cat-full-form__field">
      <span>{label}</span>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
      >
        <option value="">
          —
        </option>

        {options.map(
          (option) => (
            <option
              key={
                option.value
              }
              value={
                option.value
              }
            >
              {
                option.label
              }
            </option>
          )
        )}
      </select>
    </label>
  );
}

function BooleanField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean | null;
  onChange: (
    value: boolean
  ) => void;
}) {
  return (
    <label className="cat-full-form__boolean">
      <input
        type="checkbox"
        checked={
          Boolean(value)
        }
        onChange={(event) =>
          onChange(
            event.target.checked
          )
        }
      />

      <span>{label}</span>
    </label>
  );
}