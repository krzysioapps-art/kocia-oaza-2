"use client";

import {
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  Clock3,
  Mars,
  Search,
  SlidersHorizontal,
  Venus,
  X,
} from "lucide-react";

import { formatAge } from "@/lib/utils/formatAge";
import { getWaitingLabel } from "@/lib/utils/getWaitingLabel";

type CatStatus =
  | "available"
  | "reserved"
  | "adopted"
  | "deceased";

type Cat = {
  id: string;
  name: string;
  description: string | null;
  image: string;
  slug: string;

  status?: CatStatus | null;
  gender?: "male" | "female" | null;
  birth_date?: string | null;

  tags?: string[];

  arrival_date?: string | null;
};

type Props = {
  cats: Cat[];
};

type AgeFilter =
  | "kitten"
  | "young"
  | "adult"
  | "senior";

const STATUS_FILTERS: {
  value: CatStatus;
  label: string;
}[] = [
  {
    value: "available",
    label: "Szukają domu",
  },
  {
    value: "reserved",
    label: "Zarezerwowane",
  },
  {
    value: "adopted",
    label: "Adoptowane",
  },
  {
    value: "deceased",
    label: "Za tęczowym mostem",
  },
];

const GENDER_FILTERS = [
  {
    value: "female",
    label: "Kotki",
  },
  {
    value: "male",
    label: "Kocurki",
  },
] as const;

const AGE_FILTERS: {
  value: AgeFilter;
  label: string;
}[] = [
  {
    value: "kitten",
    label: "Kocięta — do 1 roku",
  },
  {
    value: "young",
    label: "Młode — 1–3 lata",
  },
  {
    value: "adult",
    label: "Dorosłe — 4–7 lat",
  },
  {
    value: "senior",
    label: "Seniorzy — 8+ lat",
  },
];

const DEFAULT_STATUSES: CatStatus[] = [
  "available",
  "reserved",
  "deceased",
];

function getCatAgeInYears(
  birthDate?: string | null
) {
  if (!birthDate) {
    return null;
  }

  const birth = new Date(
    `${birthDate}T00:00:00`
  );

  if (
    Number.isNaN(
      birth.getTime()
    )
  ) {
    return null;
  }

  const today = new Date();

  let age =
    today.getFullYear() -
    birth.getFullYear();

  const monthDifference =
    today.getMonth() -
    birth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() <
        birth.getDate())
  ) {
    age -= 1;
  }

  return Math.max(0, age);
}

function matchesAgeFilter(
  birthDate: string | null | undefined,
  filter: AgeFilter
) {
  const age =
    getCatAgeInYears(
      birthDate
    );

  if (age === null) {
    return false;
  }

  switch (filter) {
    case "kitten":
      return age < 1;

    case "young":
      return age >= 1 && age <= 3;

    case "adult":
      return age >= 4 && age <= 7;

    case "senior":
      return age >= 8;

    default:
      return true;
  }
}

function normalizeTag(
  value: string
) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    );
}

export default function PublicCatsGrid({
  cats,
}: Props) {
  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selectedStatuses,
    setSelectedStatuses,
  ] = useState<CatStatus[]>(
    DEFAULT_STATUSES
  );

  const [
    selectedGenders,
    setSelectedGenders,
  ] = useState<
    ("male" | "female")[]
  >([]);

  const [
    selectedAges,
    setSelectedAges,
  ] = useState<AgeFilter[]>(
    []
  );

  const [
    selectedTags,
    setSelectedTags,
  ] = useState<
    string[]
  >([]);

  const [
    isFilterModalOpen,
    setIsFilterModalOpen,
  ] = useState(false);

  const [
    draftStatuses,
    setDraftStatuses,
  ] = useState<CatStatus[]>(
    DEFAULT_STATUSES
  );

  const [
    draftGenders,
    setDraftGenders,
  ] = useState<
    ("male" | "female")[]
  >([]);

  const [
    draftAges,
    setDraftAges,
  ] = useState<AgeFilter[]>(
    []
  );

  const [
    draftTags,
    setDraftTags,
  ] = useState<
    string[]
  >([]);

  /*
   * Wszystkie tagi dostępne w kotach.
   * Pokazujemy je jako filtry.
   */
  const availableTags =
    useMemo(() => {
      const tags =
        cats.flatMap(
          (cat) =>
            cat.tags ?? []
        );

      const unique =
        new Map<
          string,
          string
        >();

      tags.forEach(
        (tag) => {
          const normalized =
            normalizeTag(
              tag
            );

          if (
            normalized &&
            !unique.has(
              normalized
            )
          ) {
            unique.set(
              normalized,
              tag.trim()
            );
          }
        }
      );

      return Array.from(
        unique.values()
      ).sort(
        (a, b) =>
          a.localeCompare(
            b,
            "pl"
          )
      );
    }, [cats]);

  const filteredCats =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return cats.filter(
        (cat) => {
          const status =
            cat.status ??
            "available";

          /*
           * STATUS
           */
          if (
            !selectedStatuses.includes(
              status
            )
          ) {
            return false;
          }

          /*
           * PŁEĆ
           */
          if (
            selectedGenders.length >
            0
          ) {
            if (
              !cat.gender ||
              !selectedGenders.includes(
                cat.gender
              )
            ) {
              return false;
            }
          }

          /*
           * WIEK
           */
          if (
            selectedAges.length >
            0
          ) {
            const matchesAnyAge =
              selectedAges.some(
                (age) =>
                  matchesAgeFilter(
                    cat.birth_date,
                    age
                  )
              );

            if (
              !matchesAnyAge
            ) {
              return false;
            }
          }

          /*
           * TAGI
           *
           * Kot musi mieć wszystkie
           * wybrane cechy.
           */
          if (
            selectedTags.length >
            0
          ) {
            const catTags =
              (cat.tags ?? []).map(
                normalizeTag
              );

            const matchesAllTags =
              selectedTags.every(
                (selectedTag) =>
                  catTags.includes(
                    normalizeTag(
                      selectedTag
                    )
                  )
              );

            if (
              !matchesAllTags
            ) {
              return false;
            }
          }

          /*
           * WYSZUKIWANIE
           */
          if (!query) {
            return true;
          }

          const searchableText = [
            cat.name,
            cat.description ?? "",
            ...(cat.tags ?? []),
          ]
            .join(" ")
            .toLowerCase();

          return searchableText.includes(
            query
          );
        }
      );
    }, [
      cats,
      search,
      selectedStatuses,
      selectedGenders,
      selectedAges,
      selectedTags,
    ]);

  function toggleStatus(
    status: CatStatus
  ) {
    setSelectedStatuses(
      (current) => {
        if (
          current.includes(
            status
          )
        ) {
          return current.filter(
            (item) =>
              item !== status
          );
        }

        return [
          ...current,
          status,
        ];
      }
    );
  }

  function toggleGender(
    gender:
      | "male"
      | "female"
  ) {
    setSelectedGenders(
      (current) => {
        if (
          current.includes(
            gender
          )
        ) {
          return current.filter(
            (item) =>
              item !== gender
          );
        }

        return [
          ...current,
          gender,
        ];
      }
    );
  }

  function toggleAge(
    age: AgeFilter
  ) {
    setSelectedAges(
      (current) => {
        if (
          current.includes(age)
        ) {
          return current.filter(
            (item) =>
              item !== age
          );
        }

        return [
          ...current,
          age,
        ];
      }
    );
  }

  function toggleTag(
    tag: string
  ) {
    setSelectedTags(
      (current) => {
        const exists =
          current.some(
            (item) =>
              normalizeTag(
                item
              ) ===
              normalizeTag(
                tag
              )
          );

        if (exists) {
          return current.filter(
            (item) =>
              normalizeTag(
                item
              ) !==
              normalizeTag(
                tag
              )
          );
        }

        return [
          ...current,
          tag,
        ];
      }
    );
  }

  function toggleDraftStatus(
    status: CatStatus
  ) {
    setDraftStatuses(
      (current) => {
        if (
          current.includes(
            status
          )
        ) {
          return current.filter(
            (item) =>
              item !== status
          );
        }

        return [
          ...current,
          status,
        ];
      }
    );
  }

  function toggleDraftGender(
    gender:
      | "male"
      | "female"
  ) {
    setDraftGenders(
      (current) => {
        if (
          current.includes(
            gender
          )
        ) {
          return current.filter(
            (item) =>
              item !== gender
          );
        }

        return [
          ...current,
          gender,
        ];
      }
    );
  }

  function toggleDraftAge(
    age: AgeFilter
  ) {
    setDraftAges(
      (current) => {
        if (
          current.includes(age)
        ) {
          return current.filter(
            (item) =>
              item !== age
          );
        }

        return [
          ...current,
          age,
        ];
      }
    );
  }

  function toggleDraftTag(
    tag: string
  ) {
    setDraftTags(
      (current) => {
        const exists =
          current.some(
            (item) =>
              normalizeTag(
                item
              ) ===
              normalizeTag(
                tag
              )
          );

        if (exists) {
          return current.filter(
            (item) =>
              normalizeTag(
                item
              ) !==
              normalizeTag(
                tag
              )
          );
        }

        return [
          ...current,
          tag,
        ];
      }
    );
  }

  function openFilterModal() {
    setDraftStatuses(
      selectedStatuses
    );

    setDraftGenders(
      selectedGenders
    );

    setDraftAges(
      selectedAges
    );

    setDraftTags(
      selectedTags
    );

    setIsFilterModalOpen(
      true
    );
  }

  function closeFilterModal() {
    setIsFilterModalOpen(
      false
    );
  }

  function applyMobileFilters() {
    setSelectedStatuses(
      draftStatuses
    );

    setSelectedGenders(
      draftGenders
    );

    setSelectedAges(
      draftAges
    );

    setSelectedTags(
      draftTags
    );

    setIsFilterModalOpen(
      false
    );
  }

  function clearFilters() {
    setSearch("");

    setSelectedStatuses(
      DEFAULT_STATUSES
    );

    setSelectedGenders([]);

    setSelectedAges([]);

    setSelectedTags([]);

    setDraftStatuses(
      DEFAULT_STATUSES
    );

    setDraftGenders([]);

    setDraftAges([]);

    setDraftTags([]);
  }

  const hasFilters =
    search.trim() !== "" ||
    selectedStatuses.length !==
      DEFAULT_STATUSES.length ||
    !selectedStatuses.includes(
      "available"
    ) ||
    !selectedStatuses.includes(
      "reserved"
    ) ||
    !selectedStatuses.includes(
      "deceased"
    ) ||
    selectedGenders.length > 0 ||
    selectedAges.length > 0 ||
    selectedTags.length > 0;

  const activeFilterCount =
    selectedStatuses.filter(
      (status) =>
        !DEFAULT_STATUSES.includes(
          status
        )
    ).length +
    selectedGenders.length +
    selectedAges.length +
    selectedTags.length;

  return (
    <div className="public-cats">
      <div className="public-cats__toolbar">
        <div className="public-cats__search">
          <Search
            size={18}
            aria-hidden="true"
          />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Szukaj kota po imieniu..."
            aria-label="Szukaj kota"
          />

          {search && (
            <button
              type="button"
              className="public-cats__search-clear"
              onClick={() =>
                setSearch("")
              }
              aria-label="Wyczyść wyszukiwanie"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* =================================================
            DESKTOP FILTERS
            ================================================= */}

        <div className="public-cats__desktop-filters">
          <div className="public-cats__filter-group">
            <span className="public-cats__filter-group-label">
              Status
            </span>

            <div className="public-cats__filters">
              {STATUS_FILTERS.map(
                (filter) => {
                  const active =
                    selectedStatuses.includes(
                      filter.value
                    );

                  return (
                    <button
                      key={
                        filter.value
                      }
                      type="button"
                      className={`public-cats__filter ${
                        active
                          ? "is-active"
                          : ""
                      } public-cats__filter--${filter.value}`}
                      onClick={() =>
                        toggleStatus(
                          filter.value
                        )
                      }
                      aria-pressed={
                        active
                      }
                    >
                      <span className="public-cats__filter-dot" />

                      {
                        filter.label
                      }
                    </button>
                  );
                }
              )}
            </div>
          </div>

          <div className="public-cats__filter-group">
            <span className="public-cats__filter-group-label">
              Płeć
            </span>

            <div className="public-cats__filters">
              {GENDER_FILTERS.map(
                (filter) => {
                  const active =
                    selectedGenders.includes(
                      filter.value
                    );

                  return (
                    <button
                      key={
                        filter.value
                      }
                      type="button"
                      className={`public-cats__filter ${
                        active
                          ? "is-active"
                          : ""
                      }`}
                      onClick={() =>
                        toggleGender(
                          filter.value
                        )
                      }
                      aria-pressed={
                        active
                      }
                    >
                      {filter.value ===
                      "female" ? (
                        <Venus
                          size={14}
                        />
                      ) : (
                        <Mars
                          size={14}
                        />
                      )}

                      {
                        filter.label
                      }
                    </button>
                  );
                }
              )}
            </div>
          </div>

          <div className="public-cats__filter-group">
            <span className="public-cats__filter-group-label">
              Wiek
            </span>

            <div className="public-cats__filters">
              {AGE_FILTERS.map(
                (filter) => {
                  const active =
                    selectedAges.includes(
                      filter.value
                    );

                  return (
                    <button
                      key={
                        filter.value
                      }
                      type="button"
                      className={`public-cats__filter ${
                        active
                          ? "is-active"
                          : ""
                      }`}
                      onClick={() =>
                        toggleAge(
                          filter.value
                        )
                      }
                      aria-pressed={
                        active
                      }
                    >
                      {
                        filter.label
                      }
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {availableTags.length >
            0 && (
            <div className="public-cats__filter-group">
              <span className="public-cats__filter-group-label">
                Cechy
              </span>

              <div className="public-cats__filters">
                {availableTags.map(
                  (tag) => {
                    const active =
                      selectedTags.some(
                        (item) =>
                          normalizeTag(
                            item
                          ) ===
                          normalizeTag(
                            tag
                          )
                      );

                    return (
                      <button
                        key={tag}
                        type="button"
                        className={`public-cats__filter ${
                          active
                            ? "is-active"
                            : ""
                        }`}
                        onClick={() =>
                          toggleTag(
                            tag
                          )
                        }
                        aria-pressed={
                          active
                        }
                      >
                        {tag}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </div>

        {/* =================================================
            MOBILE FILTER BUTTON
            ================================================= */}

        <button
          type="button"
          className="public-cats__mobile-filter-button"
          onClick={
            openFilterModal
          }
        >
          <SlidersHorizontal
            size={18}
          />

          <span>
            Filtry
          </span>

          {activeFilterCount >
            0 && (
            <span className="public-cats__mobile-filter-count">
              {activeFilterCount}
            </span>
          )}
        </button>

        {hasFilters && (
          <button
            type="button"
            className="public-cats__clear"
            onClick={
              clearFilters
            }
          >
            Wyczyść filtry
          </button>
        )}
      </div>

      {/* =================================================
          MOBILE FILTER MODAL
          ================================================= */}

      {isFilterModalOpen && (
        <div
          className="public-cats__modal-backdrop"
          onClick={
            closeFilterModal
          }
        >
          <div
            className="public-cats__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="public-cats-filter-title"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="public-cats__modal-header">
              <div>
                <h2 id="public-cats-filter-title">
                  Filtry
                </h2>

                <p>
                  Dopasuj koty do swoich
                  preferencji.
                </p>
              </div>

              <button
                type="button"
                className="public-cats__modal-close"
                onClick={
                  closeFilterModal
                }
                aria-label="Zamknij filtry"
              >
                <X size={20} />
              </button>
            </div>

            {/* STATUS */}
            <div className="public-cats__modal-section">
              <h3>
                Status
              </h3>

              <div className="public-cats__modal-options">
                {STATUS_FILTERS.map(
                  (filter) => {
                    const active =
                      draftStatuses.includes(
                        filter.value
                      );

                    return (
                      <button
                        key={
                          filter.value
                        }
                        type="button"
                        className={`public-cats__modal-option ${
                          active
                            ? "is-active"
                            : ""
                        } public-cats__modal-option--${filter.value}`}
                        onClick={() =>
                          toggleDraftStatus(
                            filter.value
                          )
                        }
                        aria-pressed={
                          active
                        }
                      >
                        <span className="public-cats__modal-option-dot" />

                        <span>
                          {
                            filter.label
                          }
                        </span>

                        <span className="public-cats__modal-option-check">
                          {active
                            ? "✓"
                            : ""}
                        </span>
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* PŁEĆ */}
            <div className="public-cats__modal-section">
              <h3>
                Płeć
              </h3>

              <div className="public-cats__modal-options public-cats__modal-options--grid">
                {GENDER_FILTERS.map(
                  (filter) => {
                    const active =
                      draftGenders.includes(
                        filter.value
                      );

                    return (
                      <button
                        key={
                          filter.value
                        }
                        type="button"
                        className={`public-cats__modal-option ${
                          active
                            ? "is-active"
                            : ""
                        }`}
                        onClick={() =>
                          toggleDraftGender(
                            filter.value
                          )
                        }
                        aria-pressed={
                          active
                        }
                      >
                        {filter.value ===
                        "female" ? (
                          <Venus
                            size={16}
                          />
                        ) : (
                          <Mars
                            size={16}
                          />
                        )}

                        <span>
                          {
                            filter.label
                          }
                        </span>

                        <span className="public-cats__modal-option-check">
                          {active
                            ? "✓"
                            : ""}
                        </span>
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* WIEK */}
            <div className="public-cats__modal-section">
              <h3>
                Wiek
              </h3>

              <div className="public-cats__modal-options">
                {AGE_FILTERS.map(
                  (filter) => {
                    const active =
                      draftAges.includes(
                        filter.value
                      );

                    return (
                      <button
                        key={
                          filter.value
                        }
                        type="button"
                        className={`public-cats__modal-option ${
                          active
                            ? "is-active"
                            : ""
                        }`}
                        onClick={() =>
                          toggleDraftAge(
                            filter.value
                          )
                        }
                        aria-pressed={
                          active
                        }
                      >
                        <span>
                          {
                            filter.label
                          }
                        </span>

                        <span className="public-cats__modal-option-check">
                          {active
                            ? "✓"
                            : ""}
                        </span>
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* CECHY */}
            {availableTags.length >
              0 && (
              <div className="public-cats__modal-section">
                <h3>
                  Cechy
                </h3>

                <div className="public-cats__modal-options public-cats__modal-options--tags">
                  {availableTags.map(
                    (tag) => {
                      const active =
                        draftTags.some(
                          (item) =>
                            normalizeTag(
                              item
                            ) ===
                            normalizeTag(
                              tag
                            )
                        );

                      return (
                        <button
                          key={tag}
                          type="button"
                          className={`public-cats__modal-tag ${
                            active
                              ? "is-active"
                              : ""
                          }`}
                          onClick={() =>
                            toggleDraftTag(
                              tag
                            )
                          }
                          aria-pressed={
                            active
                          }
                        >
                          {tag}

                          {active && (
                            <span>
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            <div className="public-cats__modal-footer">
              <button
                type="button"
                className="public-cats__modal-clear"
                onClick={() => {
                  setDraftStatuses(
                    DEFAULT_STATUSES
                  );

                  setDraftGenders(
                    []
                  );

                  setDraftAges([]);

                  setDraftTags([]);
                }}
              >
                Przywróć domyślne
              </button>

              <button
                type="button"
                className="public-cats__modal-apply"
                onClick={
                  applyMobileFilters
                }
              >
                Pokaż{" "}
                {filteredCats.length}{" "}
                kotów
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================
          SUMMARY
          ================================================= */}

      <div className="public-cats__summary">
        <strong>
          {filteredCats.length}
        </strong>

        <span>
          {filteredCats.length ===
          1
            ? "kot"
            : filteredCats.length >=
                2 &&
              filteredCats.length <=
                4
            ? "koty"
            : "kotów"}
        </span>
      </div>

      {/* =================================================
          EMPTY
          ================================================= */}

      {filteredCats.length ===
      0 ? (
        <div className="public-cats__empty">
          <div className="public-cats__empty-icon">
            🐱
          </div>

          <h2>
            Nie znaleźliśmy takiego kota
          </h2>

          <p>
            Spróbuj zmienić wyszukiwanie
            albo wybrać inne filtry.
          </p>

          <button
            type="button"
            className="public-cats__empty-button"
            onClick={
              clearFilters
            }
          >
            Przywróć filtry
          </button>
        </div>
      ) : (
        <div className="public-cats__grid">
          {filteredCats.map(
            (cat) => {
              const age =
                formatAge(
                  cat.birth_date
                );

              const waitingLabel =
                getWaitingLabel(
                  cat.arrival_date
                );

              const isDeceased =
                cat.status ===
                "deceased";

              const isAdopted =
                cat.status ===
                "adopted";

              return (
                <Link
                  key={cat.id}
                  href={`/koty/${cat.slug}`}
                  className={`public-cat-card ${
                    isDeceased
                      ? "public-cat-card--deceased"
                      : ""
                  }`}
                >
                  <div className="public-cat-card__image-wrap">
                    <img
                      src={cat.image}
                      alt={`Kot ${cat.name}`}
                      className="public-cat-card__image"
                    />

                    {isDeceased && (
                      <div
                        className="public-cat-card__rainbow"
                        aria-label="Za tęczowym mostem"
                        title="Za tęczowym mostem"
                      >
                        <span>
                          🌈
                        </span>
                      </div>
                    )}

                    <div
                      className={`public-cat-card__status public-cat-card__status--${
                        cat.status ??
                        "available"
                      }`}
                    >
                      {isDeceased ? (
                        <>
                          <span>
                            Odszedł / odeszła
                          </span>

                          <small>
                            za tęczowy most
                          </small>
                        </>
                      ) : cat.status ===
                        "available" ? (
                        "Szukam domu"
                      ) : cat.status ===
                        "reserved" ? (
                        "Zarezerwowany"
                      ) : isAdopted ? (
                        "Mam już dom"
                      ) : (
                        "Szukam domu"
                      )}
                    </div>
                  </div>

                  <div className="public-cat-card__body">
                    <div className="public-cat-card__heading">
                      <h2>
                        {cat.name}
                      </h2>

                      <span className="public-cat-card__arrow">
                        →
                      </span>
                    </div>

                    <div className="public-cat-card__meta">
                      {cat.gender ===
                        "male" && (
                        <span>
                          <Mars
                            size={15}
                          />
                          Kocurek
                        </span>
                      )}

                      {cat.gender ===
                        "female" && (
                        <span>
                          <Venus
                            size={15}
                          />
                          Kotka
                        </span>
                      )}

                      {age && (
                        <span>
                          {age}
                        </span>
                      )}
                    </div>

                    {cat.status ===
                      "available" &&
                      waitingLabel && (
                        <div className="public-cat-card__waiting">
                          <Clock3
                            size={14}
                          />
                          {waitingLabel}
                        </div>
                      )}

                    {cat.tags &&
                      cat.tags.length >
                        0 && (
                        <div className="public-cat-card__tags">
                          {cat.tags
                            .slice(
                              0,
                              3
                            )
                            .map(
                              (
                                tag
                              ) => (
                                <span
                                  key={
                                    tag
                                  }
                                >
                                  {tag}
                                </span>
                              )
                            )}
                        </div>
                      )}

                    {cat.description && (
                      <p>
                        {cat.description}
                      </p>
                    )}

                    <span className="public-cat-card__link">
                      Zobacz profil

                      <span>
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}