"use client";

import Link from "next/link";

import {
  useMemo,
  useState,
} from "react";

import {
  Archive,
  Check,
  ChevronDown,
  Image as ImageIcon,
  Search,
  Settings2,
  X,
} from "lucide-react";

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
  CAT_TAG_OPTIONS,
} from "@/types/cat";

import CatsExport from "@/app/components/cats-admin/CatsExport";

type Props = {
  initialCats: Cat[];
};

type FilterState = {
  search: string;
  status: string;
  gender: string;
};

type SaveState =
  | "idle"
  | "saving"
  | "saved"
  | "error";

type Column = {
  key:
    | EditableCatField
    | "media"
    | "actions";

  label: string;

  defaultVisible: boolean;

  width: number;
};

const COLUMNS: Column[] = [
  {
    key: "media",
    label: "Zdjęcie",
    defaultVisible: true,
    width: 84,
  },

  {
    key: "name",
    label: "Imię",
    defaultVisible: true,
    width: 180,
  },

  {
    key: "slug",
    label: "Slug",
    defaultVisible: true,
    width: 180,
  },

  {
    key: "status",
    label: "Status",
    defaultVisible: true,
    width: 170,
  },

  {
    key: "gender",
    label: "Płeć",
    defaultVisible: true,
    width: 130,
  },

  {
    key: "birth_date",
    label: "Data urodzenia",
    defaultVisible: true,
    width: 150,
  },

  {
    key: "arrival_date",
    label: "Data przyjęcia",
    defaultVisible: true,
    width: 150,
  },

  {
    key: "location",
    label: "Lokalizacja",
    defaultVisible: true,
    width: 160,
  },

  {
    key: "weight",
    label: "Waga",
    defaultVisible: true,
    width: 120,
  },

  {
    key: "sterilized",
    label: "Sterylizacja",
    defaultVisible: true,
    width: 130,
  },

  {
    key: "vaccinated",
    label: "Szczepienie",
    defaultVisible: true,
    width: 130,
  },

  {
    key: "dewormed",
    label: "Odrobaczanie",
    defaultVisible: true,
    width: 140,
  },

  {
    key: "microchipped",
    label: "Chip",
    defaultVisible: true,
    width: 110,
  },

  {
    key: "good_with_children",
    label: "Dzieci",
    defaultVisible: true,
    width: 110,
  },

  {
    key: "good_with_cats",
    label: "Koty",
    defaultVisible: true,
    width: 110,
  },

  {
    key: "fiv_status",
    label: "FIV",
    defaultVisible: true,
    width: 140,
  },

  {
    key: "felv_status",
    label: "FeLV",
    defaultVisible: true,
    width: 140,
  },

  {
    key: "fip_status",
    label: "FIP",
    defaultVisible: true,
    width: 140,
  },

  {
    key: "adoption_priority",
    label: "Priorytet",
    defaultVisible: false,
    width: 110,
  },

  {
    key: "is_featured",
    label: "Wyróżniony",
    defaultVisible: false,
    width: 120,
  },

  {
    key: "virtual_adoption_url",
    label: "Wirtualna adopcja",
    defaultVisible: false,
    width: 220,
  },

  {
    key: "image_url",
    label: "Image URL",
    defaultVisible: false,
    width: 300,
  },

  {
    key: "tags",
    label: "Tagi",
    defaultVisible: true,
    width: 260,
  },

  {
    key: "description",
    label: "Opis",
    defaultVisible: true,
    width: 340,
  },

  {
    key: "actions",
    label: "Akcje",
    defaultVisible: true,
    width: 220,
  },
];

function getInitialVisibleColumns() {
  return Object.fromEntries(
    COLUMNS.map(
      (column) => [
        column.key,
        column.defaultVisible,
      ],
    ),
  );
}

function getPrimaryImage(
  cat: Cat,
) {
  return (
    cat.media?.find(
      (media) =>
        media.is_primary,
    )?.url ??
    cat.media?.[0]?.url ??
    cat.image_url ??
    "/avatar.jpg"
  );
}

function getOptionLabel(
  options: readonly {
    value: string;
    label: string;
  }[],
  value: unknown,
) {
  return (
    options.find(
      (option) =>
        option.value === value,
    )?.label ??
    String(value ?? "—")
  );
}

export default function CatsDataGrid({
  initialCats,
}: Props) {
  const [cats, setCats] =
    useState<Cat[]>(
      initialCats,
    );

  const [
    selectedIds,
    setSelectedIds,
  ] = useState<string[]>([]);

  const [
    filters,
    setFilters,
  ] = useState<FilterState>({
    search: "",
    status: "",
    gender: "",
  });

  const [
    visibleColumns,
    setVisibleColumns,
  ] = useState(
    getInitialVisibleColumns,
  );

  const [
    showColumnSettings,
    setShowColumnSettings,
  ] = useState(false);

  const [
    saveStates,
    setSaveStates,
  ] = useState<
    Record<string, SaveState>
  >({});

  const [
    editingCell,
    setEditingCell,
  ] = useState<string | null>(
    null,
  );

  const filteredCats =
    useMemo(() => {
      const search =
        filters.search
          .trim()
          .toLowerCase();

      return cats.filter(
        (cat) => {
          if (
            search &&
            ![
              cat.name,
              cat.slug,
              cat.description,
              ...(cat.tags ?? []),
            ]
              .filter(Boolean)
              .some((value) =>
                String(value)
                  .toLowerCase()
                  .includes(search),
              )
          ) {
            return false;
          }

          if (
            filters.status &&
            cat.status !==
              filters.status
          ) {
            return false;
          }

          if (
            filters.gender &&
            cat.gender !==
              filters.gender
          ) {
            return false;
          }

          return true;
        },
      );
    }, [cats, filters]);

  const filteredIds =
    filteredCats.map(
      (cat) => cat.id,
    );

  const allFilteredSelected =
    filteredIds.length > 0 &&
    filteredIds.every(
      (id) =>
        selectedIds.includes(id),
    );

  const someFilteredSelected =
    filteredIds.some(
      (id) =>
        selectedIds.includes(id),
    );

  function toggleCatSelection(
    catId: string,
  ) {
    setSelectedIds(
      (current) =>
        current.includes(catId)
          ? current.filter(
              (id) =>
                id !== catId,
            )
          : [
              ...current,
              catId,
            ],
    );
  }

  function toggleAllFiltered() {
    if (allFilteredSelected) {
      setSelectedIds(
        (current) =>
          current.filter(
            (id) =>
              !filteredIds.includes(
                id,
              ),
          ),
      );

      return;
    }

    setSelectedIds(
      (current) => [
        ...new Set([
          ...current,
          ...filteredIds,
        ]),
      ],
    );
  }

  const visible =
    COLUMNS.filter(
      (column) =>
        visibleColumns[
          column.key
        ],
    );

  async function updateField(
    catId: string,
    field: EditableCatField,
    value: unknown,
  ) {
    const key =
      `${catId}:${field}`;

    const previous =
      cats.find(
        (cat) =>
          cat.id === catId,
      )?.[field];

    setCats(
      (current) =>
        current.map(
          (cat) =>
            cat.id === catId
              ? {
                  ...cat,
                  [field]:
                    value,
                }
              : cat,
        ),
    );

    setSaveStates(
      (current) => ({
        ...current,
        [key]: "saving",
      }),
    );

    try {
      const response =
        await fetch(
          `/api/cats/${catId}`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              field,
              value,
            }),
          },
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Błąd zapisu",
        );
      }

      if (result.cat) {
        setCats(
          (current) =>
            current.map(
              (cat) =>
                cat.id ===
                catId
                  ? {
                      ...cat,
                      ...result.cat,
                    }
                  : cat,
            ),
        );
      }

      setSaveStates(
        (current) => ({
          ...current,
          [key]: "saved",
        }),
      );

      window.setTimeout(
        () => {
          setSaveStates(
            (current) => ({
              ...current,
              [key]: "idle",
            }),
          );
        },
        1200,
      );
    } catch (error) {
      console.error(error);

      setCats(
        (current) =>
          current.map(
            (cat) =>
              cat.id === catId
                ? {
                    ...cat,
                    [field]:
                      previous,
                  }
                : cat,
          ),
      );

      setSaveStates(
        (current) => ({
          ...current,
          [key]: "error",
        }),
      );
    }

    setEditingCell(null);
  }

  async function archiveCat(
    catId: string,
  ) {
    const confirmed =
      window.confirm(
        "Czy na pewno chcesz zarchiwizować tego kota?",
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `/api/cats/${catId}`,
          {
            method: "DELETE",
          },
        );

      if (!response.ok) {
        const result =
          await response.json();

        throw new Error(
          result.error ??
            "Błąd archiwizacji",
        );
      }

      setCats(
        (current) =>
          current.filter(
            (cat) =>
              cat.id !== catId,
          ),
      );

      setSelectedIds(
        (current) =>
          current.filter(
            (id) =>
              id !== catId,
          ),
      );
    } catch (error) {
      console.error(error);

      window.alert(
        "Nie udało się zarchiwizować kota.",
      );
    }
  }

  function renderCell(
    cat: Cat,
    column: Column,
  ) {
    if (
      column.key ===
      "media"
    ) {
      return (
        <div className="cats-grid-photo">
          <img
            src={getPrimaryImage(
              cat,
            )}
            alt={
              cat.name ??
              "Kot"
            }
          />
        </div>
      );
    }

    if (
      column.key ===
      "actions"
    ) {
      return (
        <div className="cats-grid-actions">
          <Link
            href={`/panel/koty/${cat.id}/zdjecia`}
            className="cats-grid-action"
            title="Zdjęcia"
          >
            <ImageIcon
              size={16}
            />

            Zdjęcia
          </Link>

          <Link
            href={`/panel/koty/${cat.id}`}
            className="cats-grid-action"
          >
            Edytuj
          </Link>

          <button
            type="button"
            className="cats-grid-action cats-grid-action--danger"
            onClick={() =>
              archiveCat(
                cat.id,
              )
            }
          >
            <Archive
              size={16}
            />
          </button>
        </div>
      );
    }

    const field =
      column.key;

    const value =
      cat[field];

    const cellKey =
      `${cat.id}:${field}`;

    const saveState =
      saveStates[cellKey] ??
      "idle";

    const isEditing =
      editingCell ===
      cellKey;

    return (
      <EditableCell
        field={field}
        value={value}
        isEditing={
          isEditing
        }
        saveState={
          saveState
        }
        onStartEdit={() =>
          setEditingCell(
            cellKey,
          )
        }
        onCancel={() =>
          setEditingCell(
            null,
          )
        }
        onSave={(nextValue) =>
          updateField(
            cat.id,
            field,
            nextValue,
          )
        }
      />
    );
  }

  return (
    <div className="cats-admin">
      <div className="cats-toolbar">
        <div className="cats-filters">
          <label className="cats-search">
            <Search
              size={17}
            />

            <input
              value={
                filters.search
              }
              onChange={(event) =>
                setFilters(
                  (current) => ({
                    ...current,
                    search:
                      event
                        .target
                        .value,
                  }),
                )
              }
              placeholder="Szukaj kota..."
            />
          </label>

          <select
            value={
              filters.status
            }
            onChange={(event) =>
              setFilters(
                (current) => ({
                  ...current,
                  status:
                    event
                      .target
                      .value,
                }),
              )
            }
          >
            <option value="">
              Wszystkie statusy
            </option>

            {CAT_STATUS_OPTIONS.map(
              (option) => (
                <option
                  key={
                    option.value
                  }
                  value={
                    option.value
                  }
                >
                  {option.label}
                </option>
              ),
            )}
          </select>

          <select
            value={
              filters.gender
            }
            onChange={(event) =>
              setFilters(
                (current) => ({
                  ...current,
                  gender:
                    event
                      .target
                      .value,
                }),
              )
            }
          >
            <option value="">
              Wszystkie płcie
            </option>

            {CAT_GENDER_OPTIONS.map(
              (option) => (
                <option
                  key={
                    option.value
                  }
                  value={
                    option.value
                  }
                >
                  {option.label}
                </option>
              ),
            )}
          </select>
        </div>

        <div className="cats-columns-menu">
          <button
            type="button"
            className="cats-columns-button"
            onClick={() =>
              setShowColumnSettings(
                (value) =>
                  !value,
              )
            }
          >
            <Settings2
              size={17}
            />

            Kolumny

            <ChevronDown
              size={15}
            />
          </button>

          {showColumnSettings && (
            <div className="cats-columns-popover">
              <div className="cats-columns-popover__header">
                Widoczne kolumny
              </div>

              {COLUMNS.map(
                (column) => (
                  <label
                    key={
                      column.key
                    }
                    className="cats-column-option"
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(
                        visibleColumns[
                          column.key
                        ],
                      )}
                      disabled={
                        column.key ===
                          "media" ||
                        column.key ===
                          "name" ||
                        column.key ===
                          "actions"
                      }
                      onChange={() =>
                        setVisibleColumns(
                          (
                            current,
                          ) => ({
                            ...current,
                            [column.key]:
                              !current[
                                column
                                  .key
                              ],
                          }),
                        )
                      }
                    />

                    <span>
                      {
                        column.label
                      }
                    </span>
                  </label>
                ),
              )}
            </div>
          )}
        </div>

        <CatsExport
          filteredCatIds={
            filteredIds
          }
          selectedCatIds={
            selectedIds
          }
        />
      </div>

      <div className="cats-grid-status">
        <div className="cats-grid-status__left">
          <label className="cats-select-all">
            <input
              type="checkbox"
              checked={
                allFilteredSelected
              }
              ref={(element) => {
                if (!element) {
                  return;
                }

                element.indeterminate =
                  someFilteredSelected &&
                  !allFilteredSelected;
              }}
              onChange={
                toggleAllFiltered
              }
              aria-label="Zaznacz wszystkie koty z aktualnego filtrowania"
            />

            <span>
              Zaznacz wszystkie
            </span>
          </label>

          <span>
            {filteredCats.length}{" "}
            {filteredCats.length ===
            1
              ? "kot"
              : "kotów"}
          </span>

          {selectedIds.length >
            0 && (
            <span className="cats-grid-selected">
              Zaznaczono:{" "}
              <strong>
                {
                  selectedIds.length
                }
              </strong>
            </span>
          )}
        </div>

        <span>
          Kliknij komórkę,
          aby ją edytować.
        </span>
      </div>

      <div className="cats-grid-wrapper">
        <table className="cats-grid">
          <colgroup>
            <col
              style={{
                width: 44,
              }}
            />

            {visible.map(
              (column) => (
                <col
                  key={
                    column.key
                  }
                  style={{
                    width:
                      column.width,
                  }}
                />
              ),
            )}
          </colgroup>

          <thead>
            <tr>
              <th className="cats-grid-select">
                <input
                  type="checkbox"
                  checked={
                    allFilteredSelected
                  }
                  ref={(element) => {
                    if (!element) {
                      return;
                    }

                    element.indeterminate =
                      someFilteredSelected &&
                      !allFilteredSelected;
                  }}
                  onChange={
                    toggleAllFiltered
                  }
                  aria-label="Zaznacz wszystkie koty"
                />
              </th>

              {visible.map(
                (column) => (
                  <th
                    key={
                      column.key
                    }
                    className={
                      column.key ===
                      "name"
                        ? "cats-grid-sticky-name"
                        : undefined
                    }
                  >
                    {
                      column.label
                    }
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {filteredCats.map(
              (cat) => (
                <tr
                  key={cat.id}
                  className={
                    selectedIds.includes(
                      cat.id,
                    )
                      ? "cats-grid-row-selected"
                      : undefined
                  }
                >
                  <td className="cats-grid-select">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(
                        cat.id,
                      )}
                      onChange={() =>
                        toggleCatSelection(
                          cat.id,
                        )
                      }
                      aria-label={`Zaznacz ${cat.name ?? "kota"}`}
                    />
                  </td>

                  {visible.map(
                    (column) => (
                      <td
                        key={
                          column.key
                        }
                        className={
                          column.key ===
                          "name"
                            ? "cats-grid-sticky-name"
                            : undefined
                        }
                      >
                        {renderCell(
                          cat,
                          column,
                        )}
                      </td>
                    ),
                  )}
                </tr>
              ),
            )}

            {filteredCats.length ===
              0 && (
              <tr>
                <td
                  colSpan={
                    visible.length +
                    1
                  }
                  className="cats-grid-empty"
                >
                  Brak kotów
                  pasujących do
                  filtrów.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type EditableCellProps = {
  field: EditableCatField;
  value: unknown;
  isEditing: boolean;
  saveState: SaveState;
  onStartEdit: () => void;
  onCancel: () => void;
  onSave: (
    value: unknown,
  ) => void;
};

function EditableCell({
  field,
  value,
  isEditing,
  saveState,
  onStartEdit,
  onCancel,
  onSave,
}: EditableCellProps) {
  if (saveState === "saving") {
    return (
      <div className="cats-cell cats-cell--saving">
        <span className="cats-cell-spinner" />

        zapisywanie...
      </div>
    );
  }

  if (isEditing) {
    return (
      <CellEditor
        field={field}
        value={value}
        onCancel={
          onCancel
        }
        onSave={onSave}
      />
    );
  }

  return (
    <button
      type="button"
      className="cats-cell cats-cell--display"
      onClick={
        onStartEdit
      }
    >
      <span className="cats-cell-value">
        {formatCellValue(
          field,
          value,
        )}
      </span>

      {saveState ===
        "saved" && (
        <Check
          size={14}
          className="cats-cell-success"
        />
      )}

      {saveState ===
        "error" && (
        <X
          size={14}
          className="cats-cell-error"
        />
      )}
    </button>
  );
}

function formatCellValue(
  field: EditableCatField,
  value: unknown,
) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  if (
    [
      "sterilized",
      "vaccinated",
      "dewormed",
      "good_with_children",
      "good_with_cats",
      "is_featured",
      "microchipped",
    ].includes(field)
  ) {
    return value ? "✓" : "—";
  }

  if (field === "gender") {
    return getOptionLabel(
      CAT_GENDER_OPTIONS,
      value,
    );
  }

  if (field === "status") {
    return getOptionLabel(
      CAT_STATUS_OPTIONS,
      value,
    );
  }

  if (field === "location") {
    return getOptionLabel(
      CAT_LOCATIONS,
      value,
    );
  }

  if (field === "fiv_status") {
    return getOptionLabel(
      CAT_FIV_OPTIONS,
      value,
    );
  }

  if (field === "felv_status") {
    return getOptionLabel(
      CAT_FELV_OPTIONS,
      value,
    );
  }

  if (field === "fip_status") {
    return getOptionLabel(
      CAT_FIP_OPTIONS,
      value,
    );
  }

  if (field === "tags") {
    if (
      !Array.isArray(value) ||
      value.length === 0
    ) {
      return "—";
    }

    return value.join(
      ", ",
    );
  }

  if (
    field === "description"
  ) {
    return String(value)
      .replace(/\s+/g, " ")
      .slice(0, 80);
  }

  return String(value);
}

type CellEditorProps = {
  field: EditableCatField;
  value: unknown;
  onCancel: () => void;
  onSave: (
    value: unknown,
  ) => void;
};

function CellEditor({
  field,
  value,
  onCancel,
  onSave,
}: CellEditorProps) {
  const [
    draft,
    setDraft,
  ] = useState(
    field === "tags"
      ? Array.isArray(value)
        ? value
        : []
      : value ?? "",
  );

  const submit = () => {
    if (
      field ===
      "adoption_priority"
    ) {
      const raw =
        String(draft).trim();

      onSave(
        raw === ""
          ? null
          : Number(raw),
      );

      return;
    }

    if (
      [
        "sterilized",
        "vaccinated",
        "dewormed",
        "good_with_children",
        "good_with_cats",
        "is_featured",
        "microchipped",
      ].includes(field)
    ) {
      onSave(
        Boolean(draft),
      );

      return;
    }

    onSave(
      draft === ""
        ? null
        : draft,
    );
  };

  if (
    [
      "gender",
      "status",
      "location",
      "fiv_status",
      "felv_status",
      "fip_status",
    ].includes(field)
  ) {
    let options:
      readonly {
        value: string;
        label: string;
      }[] = [];

    if (field === "gender") {
      options =
        CAT_GENDER_OPTIONS;
    }

    if (field === "status") {
      options =
        CAT_STATUS_OPTIONS;
    }

    if (field === "location") {
      options =
        CAT_LOCATIONS;
    }

    if (field === "fiv_status") {
      options =
        CAT_FIV_OPTIONS;
    }

    if (field === "felv_status") {
      options =
        CAT_FELV_OPTIONS;
    }

    if (field === "fip_status") {
      options =
        CAT_FIP_OPTIONS;
    }

    return (
      <select
        autoFocus
        className="cats-cell-editor"
        value={String(
          draft ?? "",
        )}
        onChange={(event) =>
          onSave(
            event.target.value ||
              null,
          )
        }
        onBlur={
          onCancel
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
          ),
        )}
      </select>
    );
  }

  if (
    [
      "sterilized",
      "vaccinated",
      "dewormed",
      "good_with_children",
      "good_with_cats",
      "is_featured",
      "microchipped",
    ].includes(field)
  ) {
    const checked =
      Boolean(value);

    return (
      <button
        type="button"
        autoFocus
        className={`cats-toggle ${
          checked
            ? "is-active"
            : ""
        }`}
        onClick={() =>
          onSave(
            !checked,
          )
        }
        onBlur={
          onCancel
        }
      >
        {checked
          ? "✓ Tak"
          : "— Nie"}
      </button>
    );
  }

  /*
   * TAGI
   *
   * Lista jest pobierana z
   * CAT_TAG_OPTIONS, czyli z
   * jednego źródła prawdy.
   *
   * Użytkownik nie wpisuje już
   * tagów ręcznie.
   */
  if (field === "tags") {
    const selectedTags =
      Array.isArray(draft)
        ? (draft as string[])
        : [];

    function toggleTag(
      tag: string,
    ) {
      const nextTags =
        selectedTags.includes(
          tag,
        )
          ? selectedTags.filter(
              (item) =>
                item !== tag,
            )
          : [
              ...selectedTags,
              tag,
            ];

      setDraft(nextTags);
    }

    return (
      <div
        className="cats-tags-editor"
        onBlur={(event) => {
          /*
           * Nie zamykamy edytora,
           * kiedy użytkownik przechodzi
           * pomiędzy checkboxami.
           */
          if (
            event.currentTarget.contains(
              event.relatedTarget as Node,
            )
          ) {
            return;
          }

          onSave(
            selectedTags,
          );
        }}
      >
        <div className="cats-tags-editor__selected">
          {selectedTags.length ===
          0 ? (
            <span className="cats-tags-editor__empty">
              Brak tagów
            </span>
          ) : (
            selectedTags.map(
              (tag) => (
                <button
                  key={tag}
                  type="button"
                  className="cats-tag"
                  onMouseDown={(
                    event,
                  ) => {
                    event.preventDefault();
                  }}
                  onClick={() =>
                    toggleTag(
                      tag,
                    )
                  }
                  title="Usuń tag"
                >
                  {tag}

                  <X
                    size={12}
                  />
                </button>
              ),
            )
          )}
        </div>

        <div className="cats-tags-editor__options">
          {CAT_TAG_OPTIONS.map(
            (tag) => {
              const checked =
                selectedTags.includes(
                  tag,
                );

              return (
                <label
                  key={tag}
                  className={`cats-tag-option ${
                    checked
                      ? "is-selected"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={
                      checked
                    }
                    onChange={() =>
                      toggleTag(
                        tag,
                      )
                    }
                  />

                  <span>
                    {tag}
                  </span>
                </label>
              );
            },
          )}
        </div>

        <button
          type="button"
          className="cats-tags-editor__done"
          onMouseDown={(
            event,
          ) => {
            event.preventDefault();
          }}
          onClick={() =>
            onSave(
              selectedTags,
            )
          }
        >
          Gotowe
        </button>
      </div>
    );
  }

  if (
    field ===
    "description"
  ) {
    return (
      <div className="cats-cell-editor-wrap">
        <textarea
          autoFocus
          className="cats-cell-editor cats-cell-editor--textarea"
          value={String(
            draft,
          )}
          onChange={(event) =>
            setDraft(
              event.target
                .value,
            )
          }
          onKeyDown={(
            event,
          ) => {
            if (
              event.key ===
              "Escape"
            ) {
              onCancel();
            }

            if (
              event.key ===
                "Enter" &&
              (event.metaKey ||
                event.ctrlKey)
            ) {
              event.preventDefault();

              submit();
            }
          }}
          onBlur={
            submit
          }
        />
      </div>
    );
  }

  return (
    <input
      autoFocus
      type={
        field ===
        "adoption_priority"
          ? "number"
          : field ===
                "birth_date" ||
              field ===
                "arrival_date"
            ? "date"
            : "text"
      }
      className="cats-cell-editor"
      value={String(
        draft ?? "",
      )}
      onChange={(event) =>
        setDraft(
          event.target.value,
        )
      }
      onKeyDown={(event) => {
        if (
          event.key ===
          "Escape"
        ) {
          onCancel();
        }

        if (
          event.key ===
          "Enter"
        ) {
          event.preventDefault();

          submit();
        }
      }}
      onBlur={submit}
    />
  );
}