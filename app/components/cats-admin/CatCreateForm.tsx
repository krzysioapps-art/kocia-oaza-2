"use client";

import {
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  CAT_GENDER_OPTIONS,
  CAT_LOCATIONS,
  CAT_STATUS_OPTIONS,
} from "@/types/cat";

export default function CatCreateForm() {
  const router =
    useRouter();

  const [
    form,
    setForm,
  ] = useState({
    name: "",
    slug: "",
    status: "available",
    gender: "",
    description: "",
    birth_date: "",
    arrival_date: "",
    location: "",
    weight: "",
  });

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  function setField(
    field: string,
    value: string
  ) {
    setForm(
      (current) => ({
        ...current,
        [field]:
          value,
      })
    );
  }

  async function submit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      const response =
        await fetch(
          "/api/cats",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              name:
                form.name,
              slug:
                form.slug,
              status:
                form.status,
              gender:
                form.gender ||
                null,
              description:
                form.description ||
                null,
              birth_date:
                form.birth_date ||
                null,
              arrival_date:
                form.arrival_date ||
                null,
              location:
                form.location ||
                null,
              weight:
                form.weight ||
                null,
              tags: [],
              adoption_priority: 0,
              is_featured: false,
              sterilized: null,
              vaccinated: null,
              dewormed: null,
              good_with_children:
                null,
              good_with_cats:
                null,
              microchipped:
                false,
              fiv_status:
                "unknown",
              felv_status:
                "unknown",
              fip_status:
                "none",
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Błąd tworzenia"
        );
      }

      router.push(
        `/panel/koty/${result.cat.id}`
      );
      router.refresh();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Błąd tworzenia kota"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      className="cat-full-form"
      onSubmit={submit}
    >
      <section className="cat-full-form__section">
        <h2>
          Podstawowe dane
        </h2>

        <div className="cat-full-form__grid">
          <Field
            label="Imię"
            required
            value={
              form.name
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
            required
            value={
              form.slug
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
              form.status
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
              form.gender
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
              form.birth_date
            }
            onChange={(value) =>
              setField(
                "birth_date",
                value
              )
            }
          />

          <Field
            label="Data przyjęcia"
            type="date"
            value={
              form.arrival_date
            }
            onChange={(value) =>
              setField(
                "arrival_date",
                value
              )
            }
          />

          <SelectField
            label="Lokalizacja"
            value={
              form.location
            }
            options={
              CAT_LOCATIONS
            }
            onChange={(value) =>
              setField(
                "location",
                value
              )
            }
          />

          <Field
            label="Waga"
            value={
              form.weight
            }
            onChange={(value) =>
              setField(
                "weight",
                value
              )
            }
          />
        </div>
      </section>

      <section className="cat-full-form__section">
        <h2>
          Opis
        </h2>

        <label className="cat-full-form__field">
          <span>
            Opis kota
          </span>

          <textarea
            value={
              form.description
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
      </section>

      {error && (
        <div className="cats-admin-error">
          {error}
        </div>
      )}

      <div className="cat-full-form__footer">
        <button
          type="submit"
          className="button button--primary"
          disabled={saving}
        >
          {saving
            ? "Tworzenie..."
            : "Dodaj kota"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="cat-full-form__field">
      <span>
        {label}
        {required &&
          " *"}
      </span>

      <input
        type={type}
        required={required}
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