"use client";

import {
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  CAT_COAT_TYPE_OPTIONS,
  CAT_GENDER_OPTIONS,
  CAT_LOCATIONS,
  CAT_STATUS_OPTIONS,
} from "@/types/cat";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CatCreateForm() {
  const router =
    useRouter();

  const [
    slugManuallyEdited,
    setSlugManuallyEdited,
  ] = useState(false);

  const [
    form,
    setForm,
  ] = useState({
    name: "",
    slug: "",
    status: "available",
    gender: "",
    coat_type: "",
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
    checkingSlug,
    setCheckingSlug,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  async function checkSlugAvailability(
    value: string
  ) {
    const normalizedSlug =
      slugify(value);

    if (!normalizedSlug) {
      return "";
    }

    setCheckingSlug(true);

    try {
      const response =
        await fetch(
          `/api/cats?slug=${encodeURIComponent(
            normalizedSlug
          )}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Nie udało się sprawdzić sluga"
        );
      }

      if (result.available) {
        return normalizedSlug;
      }

      let suffix = 2;

      while (true) {
        const candidate =
          `${normalizedSlug}-${suffix}`;

        const candidateResponse =
          await fetch(
            `/api/cats?slug=${encodeURIComponent(
              candidate
            )}`,
            {
              method: "GET",
              cache: "no-store",
            }
          );

        const candidateResult =
          await candidateResponse.json();

        if (!candidateResponse.ok) {
          throw new Error(
            candidateResult.error ??
              "Nie udało się sprawdzić sluga"
          );
        }

        if (
          candidateResult.available
        ) {
          return candidate;
        }

        suffix += 1;
      }
    } finally {
      setCheckingSlug(false);
    }
  }

  async function handleNameBlur() {
    if (slugManuallyEdited) {
      return;
    }

    const generatedSlug =
      slugify(form.name);

    if (!generatedSlug) {
      return;
    }

    try {
      const availableSlug =
        await checkSlugAvailability(
          generatedSlug
        );

      if (availableSlug) {
        setForm(
          (current) => ({
            ...current,
            slug: availableSlug,
          })
        );
      }
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Nie udało się sprawdzić sluga"
      );
    }
  }

  async function handleSlugBlur() {
    if (!form.slug.trim()) {
      return;
    }

    try {
      const normalizedSlug =
        slugify(form.slug);

      if (!normalizedSlug) {
        setForm(
          (current) => ({
            ...current,
            slug: "",
          })
        );

        return;
      }

      const availableSlug =
        await checkSlugAvailability(
          normalizedSlug
        );

      if (availableSlug) {
        setForm(
          (current) => ({
            ...current,
            slug: availableSlug,
          })
        );
      }
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Nie udało się sprawdzić sluga"
      );
    }
  }

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
      let slug =
        slugify(form.slug);

      if (!slug) {
        slug =
          slugify(form.name);
      }

      if (!slug) {
        throw new Error(
          "Slug jest wymagany"
        );
      }

      const availableSlug =
        await checkSlugAvailability(
          slug
        );

      if (availableSlug) {
        slug = availableSlug;
      }

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
              slug,
              status:
                form.status,
              gender:
                form.gender ||
                null,
              coat_type:
                form.coat_type ||
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
            onChange={(value) => {
              setForm((current) => ({
                ...current,
                name: value,
                slug: slugManuallyEdited
                  ? current.slug
                  : slugify(value),
              }));

              setError("");
            }}
            onBlur={
              handleNameBlur
            }
          />

          <Field
            label="Slug"
            required
            value={
              form.slug
            }
            onChange={(value) => {
              setSlugManuallyEdited(
                true
              );

              setField(
                "slug",
                value
              );

              setError("");
            }}
            onBlur={
              handleSlugBlur
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

          <SelectField
            label="Typ sierści"
            value={
              form.coat_type
            }
            options={
              CAT_COAT_TYPE_OPTIONS
            }
            onChange={(value) =>
              setField(
                "coat_type",
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

        {checkingSlug && (
          <div
            style={{
              marginTop: 8,
              fontSize: 13,
              opacity: 0.7,
            }}
          >
            Sprawdzam dostępność sluga...
          </div>
        )}
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
          disabled={
            saving ||
            checkingSlug
          }
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
  onBlur,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  onBlur?: () => void;
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
        onBlur={onBlur}
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