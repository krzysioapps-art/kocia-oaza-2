"use client";

import { useMemo, useState } from "react";
import {
  Download,
  FileText,
  Printer,
} from "lucide-react";

type ExportMode =
  | "full"
  | "admin"
  | "names";

type ExportScope =
  | "all"
  | "selected";

type GroupMode =
  | "none"
  | "location";

type Props = {
  filteredCatIds: string[];
  selectedCatIds: string[];
};

export default function CatsExport({
  filteredCatIds,
  selectedCatIds,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const [scope, setScope] =
    useState<ExportScope>("selected");

  const [mode, setMode] =
    useState<ExportMode>("admin");

  const [groupBy, setGroupBy] =
    useState<GroupMode>("location");

  const [loading, setLoading] =
    useState(false);

  const selectedCount =
    selectedCatIds.length;

  const exportCount =
    scope === "selected"
      ? selectedCount
      : filteredCatIds.length;

  const canExport =
    exportCount > 0;

  const ids = useMemo(
    () =>
      scope === "selected"
        ? selectedCatIds
        : filteredCatIds,
    [
      scope,
      selectedCatIds,
      filteredCatIds,
    ],
  );

  async function downloadTxt() {
    setLoading(true);

    try {
      const response =
        await fetch(
          "/api/cats/export",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              scope,
              mode,
              groupBy,
              format: "txt",
              ids,
            }),
          },
        );

      if (!response.ok) {
        throw new Error(
          "Nie udało się wygenerować eksportu.",
        );
      }

      const blob =
        await response.blob();

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download =
        "kocia-oaza-koty.txt";

      document.body.appendChild(
        link,
      );

      link.click();

      link.remove();

      URL.revokeObjectURL(url);

      setOpen(false);
    } catch (error) {
      console.error(error);

      alert(
        "Nie udało się wygenerować eksportu.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function printPdf() {
    if (!canExport) {
      return;
    }

    setLoading(true);

    try {
      const response =
        await fetch(
          "/api/cats/export",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              scope,
              mode,
              groupBy,
              format: "pdf",
              ids,
            }),
          },
        );

      if (!response.ok) {
        throw new Error(
          "Nie udało się przygotować PDF.",
        );
      }

      const data =
        await response.json();

      /*
       * localStorage jest współdzielony
       * pomiędzy kartami tego samego originu.
       *
       * sessionStorage może być osobne dla
       * nowo otwartej karty, przez co strona
       * eksportu dostawała null.
       */
      localStorage.setItem(
        "cats-export",
        JSON.stringify(data),
      );

      /*
       * Otwieramy stronę eksportu dopiero
       * po zapisaniu danych.
       */
      window.open(
        "/panel/koty/eksport",
        "_blank",
      );

      setOpen(false);
    } catch (error) {
      console.error(error);

      alert(
        "Nie udało się przygotować PDF.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cats-export">
      <button
        type="button"
        className="button button--primary"
        onClick={() =>
          setOpen(
            (value) => !value,
          )
        }
      >
        <Download size={17} />

        Eksportuj

        {selectedCount > 0 && (
          <span>
            ({selectedCount})
          </span>
        )}
      </button>

      {open && (
        <div className="cats-export__panel">
          {/* =====================================================
              ZAKRES
              ===================================================== */}

          <div className="cats-export__section">
            <strong>
              Zakres
            </strong>

            <label>
              <input
                type="radio"
                checked={
                  scope === "all"
                }
                onChange={() =>
                  setScope("all")
                }
              />

              Pełna lista z filtrowania
            </label>

            <label>
              <input
                type="radio"
                checked={
                  scope ===
                  "selected"
                }
                onChange={() =>
                  setScope(
                    "selected",
                  )
                }
                disabled={
                  selectedCount ===
                  0
                }
              />

              Zaznaczone

              {selectedCount >
                0 &&
                ` (${selectedCount})`}
            </label>
          </div>

          {/* =====================================================
              RODZAJ LISTY
              ===================================================== */}

          <div className="cats-export__section">
            <strong>
              Rodzaj listy
            </strong>

            <label>
              <input
                type="radio"
                checked={
                  mode === "full"
                }
                onChange={() =>
                  setMode("full")
                }
              />

              Pełna
            </label>

            <label>
              <input
                type="radio"
                checked={
                  mode === "admin"
                }
                onChange={() =>
                  setMode("admin")
                }
              />

              Administracyjna
            </label>

            <label>
              <input
                type="radio"
                checked={
                  mode === "names"
                }
                onChange={() =>
                  setMode("names")
                }
              />

              Uproszczona —
              tylko imiona
            </label>
          </div>

          {/* =====================================================
              GRUPOWANIE
              ===================================================== */}

          <div className="cats-export__section">
            <strong>
              Grupowanie
            </strong>

            <label>
              <input
                type="radio"
                checked={
                  groupBy ===
                  "none"
                }
                onChange={() =>
                  setGroupBy("none")
                }
              />

              Bez grupowania
            </label>

            <label>
              <input
                type="radio"
                checked={
                  groupBy ===
                  "location"
                }
                onChange={() =>
                  setGroupBy(
                    "location",
                  )
                }
              />

              Według lokalizacji
            </label>
          </div>

          {/* =====================================================
              LICZNIK
              ===================================================== */}

          <div className="cats-export__count">
            Do eksportu:{" "}
            <strong>
              {exportCount}
            </strong>{" "}
            {exportCount === 1
              ? "kot"
              : "kotów"}
          </div>

          {/* =====================================================
              AKCJE
              ===================================================== */}

          <div className="cats-export__actions">
            <button
              type="button"
              className="button button--outline-primary"
              disabled={
                !canExport ||
                loading
              }
              onClick={
                downloadTxt
              }
            >
              <FileText size={16} />

              {loading
                ? "Przetwarzanie..."
                : "TXT"}
            </button>

            <button
              type="button"
              className="button button--primary"
              disabled={
                !canExport ||
                loading
              }
              onClick={
                printPdf
              }
            >
              <Printer size={16} />

              {loading
                ? "Przetwarzanie..."
                : "PDF"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}