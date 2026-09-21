"use client";

import {
  useEffect,
  useState,
} from "react";

type Cat = {
  id: string;
  name: string | null;
  status: string | null;
  gender: string | null;
  birth_date: string | null;
  arrival_date: string | null;
  location: string | null;
  weight: number | string | null;
  adoption_priority:
    | string
    | number
    | null;
  sterilized: boolean | null;
  vaccinated: boolean | null;
  dewormed: boolean | null;
  microchipped: boolean | null;
  fiv_status: string | null;
  felv_status: string | null;
  fip_status: string | null;
  good_with_children:
    | boolean
    | null;
  good_with_cats:
    | boolean
    | null;
  slug: string | null;
};

type ExportData = {
  cats: Cat[];

  mode:
    | "full"
    | "admin"
    | "names";

  groupBy:
    | "none"
    | "location";
};

function value(
  input: unknown,
) {
  if (
    input === null ||
    input === undefined ||
    input === ""
  ) {
    return "Brak danych";
  }

  return String(input);
}

function shortValue(
  input: unknown,
) {
  if (
    input === null ||
    input === undefined ||
    input === ""
  ) {
    return "—";
  }

  return String(input);
}

function yesNo(
  input: boolean | null,
) {
  if (input === true) {
    return "Tak";
  }

  if (input === false) {
    return "Nie";
  }

  return "—";
}

function date(
  valueDate: string | null,
) {
  if (!valueDate) {
    return "—";
  }

  const valueObject =
    new Date(valueDate);

  if (
    Number.isNaN(
      valueObject.getTime(),
    )
  ) {
    return valueDate;
  }

  return valueObject.toLocaleDateString(
    "pl-PL",
  );
}

function status(
  valueStatus: string | null,
) {
  switch (valueStatus) {
    case "available":
      return "Szukam domu";

    case "reserved":
      return "Zarezerwowany";

    case "adopted":
      return "Mam już dom";

    default:
      return shortValue(
        valueStatus,
      );
  }
}

function gender(
  valueGender: string | null,
) {
  switch (valueGender) {
    case "male":
      return "Kocur";

    case "female":
      return "Kotka";

    default:
      return shortValue(
        valueGender,
      );
  }
}

function age(
  birthDate: string | null,
) {
  if (!birthDate) {
    return "—";
  }

  const birth =
    new Date(birthDate);

  if (
    Number.isNaN(
      birth.getTime(),
    )
  ) {
    return "—";
  }

  const now = new Date();

  let years =
    now.getFullYear() -
    birth.getFullYear();

  if (
    now.getMonth() <
      birth.getMonth() ||
    (now.getMonth() ===
      birth.getMonth() &&
      now.getDate() <
        birth.getDate())
  ) {
    years--;
  }

  if (years <= 0) {
    return "<1 r.";
  }

  if (years === 1) {
    return "1 rok";
  }

  if (
    years >= 2 &&
    years <= 4
  ) {
    return `${years} lata`;
  }

  return `${years} lat`;
}

/* =========================================================
   ADMIN TABLE
   ========================================================= */

function AdminTable({
  cats,
}: {
  cats: Cat[];
}) {
  return (
    <div className="print-admin-table-wrap">
      <table className="print-admin-table">
        <thead>
          <tr>
            <th>Kot</th>
            <th>Status</th>
            <th>Płeć</th>
            <th>Wiek</th>
            <th>Lokalizacja</th>
            <th>Przyjęty</th>
            <th>Priorytet</th>
            <th>Ster.</th>
            <th>Szczep.</th>
            <th>Odrob.</th>
            <th>Chip</th>
            <th>FIV</th>
            <th>FeLV</th>
            <th>FIP</th>
            <th>Dzieci</th>
            <th>Koty</th>
          </tr>
        </thead>

        <tbody>
          {cats.map((cat) => (
            <tr key={cat.id}>
              <td className="print-admin-table__name">
                {value(cat.name)}
              </td>

              <td>
                {status(cat.status)}
              </td>

              <td>
                {gender(cat.gender)}
              </td>

              <td>
                {age(cat.birth_date)}
              </td>

              <td>
                {shortValue(
                  cat.location,
                )}
              </td>

              <td>
                {date(
                  cat.arrival_date,
                )}
              </td>

              <td>
                {shortValue(
                  cat.adoption_priority,
                )}
              </td>

              <td>
                {yesNo(
                  cat.sterilized,
                )}
              </td>

              <td>
                {yesNo(
                  cat.vaccinated,
                )}
              </td>

              <td>
                {yesNo(
                  cat.dewormed,
                )}
              </td>

              <td>
                {yesNo(
                  cat.microchipped,
                )}
              </td>

              <td>
                {shortValue(
                  cat.fiv_status,
                )}
              </td>

              <td>
                {shortValue(
                  cat.felv_status,
                )}
              </td>

              <td>
                {shortValue(
                  cat.fip_status,
                )}
              </td>

              <td>
                {yesNo(
                  cat.good_with_children,
                )}
              </td>

              <td>
                {yesNo(
                  cat.good_with_cats,
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* =========================================================
   FULL VIEW
   ========================================================= */

function FullFields({
  cat,
}: {
  cat: Cat;
}) {
  return (
    <div className="print-cat__fields">
      <div>
        <strong>
          Status:
        </strong>{" "}
        {status(cat.status)}
      </div>

      <div>
        <strong>
          Płeć:
        </strong>{" "}
        {gender(cat.gender)}
      </div>

      <div>
        <strong>
          Wiek:
        </strong>{" "}
        {age(cat.birth_date)}
      </div>

      <div>
        <strong>
          Data urodzenia:
        </strong>{" "}
        {date(cat.birth_date)}
      </div>

      <div>
        <strong>
          Lokalizacja:
        </strong>{" "}
        {value(cat.location)}
      </div>

      <div>
        <strong>
          Przyjęty:
        </strong>{" "}
        {date(cat.arrival_date)}
      </div>

      <div>
        <strong>
          Waga:
        </strong>{" "}
        {value(cat.weight)}
      </div>

      <div>
        <strong>
          Priorytet:
        </strong>{" "}
        {value(
          cat.adoption_priority,
        )}
      </div>

      <div>
        <strong>
          Sterylizacja:
        </strong>{" "}
        {yesNo(cat.sterilized)}
      </div>

      <div>
        <strong>
          Szczepienie:
        </strong>{" "}
        {yesNo(cat.vaccinated)}
      </div>

      <div>
        <strong>
          Odrobaczenie:
        </strong>{" "}
        {yesNo(cat.dewormed)}
      </div>

      <div>
        <strong>
          Chip:
        </strong>{" "}
        {yesNo(
          cat.microchipped,
        )}
      </div>

      <div>
        <strong>
          FIV:
        </strong>{" "}
        {value(cat.fiv_status)}
      </div>

      <div>
        <strong>
          FeLV:
        </strong>{" "}
        {value(cat.felv_status)}
      </div>

      <div>
        <strong>
          FIP:
        </strong>{" "}
        {value(cat.fip_status)}
      </div>

      <div>
        <strong>
          Dzieci:
        </strong>{" "}
        {yesNo(
          cat.good_with_children,
        )}
      </div>

      <div>
        <strong>
          Koty:
        </strong>{" "}
        {yesNo(
          cat.good_with_cats,
        )}
      </div>

      {cat.slug && (
        <div>
          <strong>
            Profil:
          </strong>{" "}
          /koty/{cat.slug}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PAGE
   ========================================================= */

export default function CatsExportPage() {
  const [data, setData] =
    useState<ExportData | null>(
      null,
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    try {
      const raw =
        localStorage.getItem(
          "cats-export",
        );

      if (!raw) {
        setLoading(false);
        return;
      }

      const parsed =
        JSON.parse(raw) as ExportData;

      if (
        !parsed ||
        !Array.isArray(
          parsed.cats,
        )
      ) {
        throw new Error(
          "Nieprawidłowe dane eksportu.",
        );
      }

      setData(parsed);

      /*
       * Dane są już w React state,
       * więc możemy usunąć je z localStorage.
       */
      localStorage.removeItem(
        "cats-export",
      );

      setLoading(false);

      /*
       * Czekamy aż tabela zostanie
       * faktycznie wyrenderowana.
       */
      window.setTimeout(() => {
        window.print();
      }, 700);
    } catch (error) {
      console.error(
        "Błąd eksportu:",
        error,
      );

      localStorage.removeItem(
        "cats-export",
      );

      setData(null);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <main className="print-page print-page--loading">
        <p>
          Przygotowywanie eksportu...
        </p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="print-page print-page--error">
        <header className="print-header">
          <h1>
            Kocia Oaza
          </h1>

          <h2>
            Eksport kotów
          </h2>
        </header>

        <p>
          Brak danych eksportu.
        </p>

        <p>
          Zamknij tę kartę i uruchom
          eksport ponownie z panelu
          administracyjnego.
        </p>
      </main>
    );
  }

  /*
   * ---------------------------------------------------------
   * ADMINISTRACYJNA
   * ---------------------------------------------------------
   *
   * Cała administracyjna lista jest jedną tabelą.
   * Jeżeli wybrano grupowanie po lokalizacji,
   * przed każdą tabelą pojawia się nagłówek lokalizacji.
   */

  if (data.mode === "admin") {
    const groups =
      new Map<string, Cat[]>();

    if (
      data.groupBy ===
      "location"
    ) {
      for (const cat of data.cats) {
        const location =
          cat.location?.trim() ||
          "Brak lokalizacji";

        if (
          !groups.has(
            location,
          )
        ) {
          groups.set(
            location,
            [],
          );
        }

        groups
          .get(location)!
          .push(cat);
      }
    } else {
      groups.set(
        "",
        data.cats,
      );
    }

    const entries =
      [...groups.entries()].sort(
        ([a], [b]) =>
          a.localeCompare(
            b,
            "pl",
          ),
      );

    return (
      <main className="print-page print-page--admin">
        <header className="print-header print-header--admin">
          <div>
            <h1>
              Kocia Oaza
            </h1>

            <h2>
              Lista administracyjna kotów
            </h2>
          </div>

          <div className="print-header__meta">
            <div>
              Liczba kotów:{" "}
              <strong>
                {data.cats.length}
              </strong>
            </div>

            <div>
              Data eksportu:{" "}
              {new Date().toLocaleDateString(
                "pl-PL",
              )}
            </div>
          </div>
        </header>

        {entries.map(
          ([location, cats]) => (
            <section
              key={location}
              className="print-admin-group"
            >
              {data.groupBy ===
                "location" && (
                <h3 className="print-admin-group__title">
                  {location}
                </h3>
              )}

              <AdminTable
                cats={cats}
              />
            </section>
          ),
        )}
      </main>
    );
  }

  /*
   * ---------------------------------------------------------
   * POZOSTAŁE FORMATY
   * ---------------------------------------------------------
   */

  const groups =
    new Map<string, Cat[]>();

  if (
    data.groupBy ===
    "location"
  ) {
    for (const cat of data.cats) {
      const location =
        cat.location?.trim() ||
        "Brak lokalizacji";

      if (
        !groups.has(
          location,
        )
      ) {
        groups.set(
          location,
          [],
        );
      }

      groups
        .get(location)!
        .push(cat);
    }
  } else {
    groups.set(
      "",
      data.cats,
    );
  }

  const entries =
    [...groups.entries()].sort(
      ([a], [b]) =>
        a.localeCompare(
          b,
          "pl",
        ),
    );

  return (
    <main className="print-page">
      <header className="print-header">
        <h1>
          Kocia Oaza
        </h1>

        <h2>
          {data.mode ===
          "names"
            ? "Lista kotów"
            : "Pełna lista kotów"}
        </h2>

        <p>
          Liczba kotów:{" "}
          <strong>
            {data.cats.length}
          </strong>
        </p>

        <p>
          Data eksportu:{" "}
          {new Date().toLocaleDateString(
            "pl-PL",
          )}
        </p>
      </header>

      {entries.map(
        ([location, cats]) => (
          <section
            key={location}
            className="print-group"
          >
            {data.groupBy ===
              "location" && (
              <h3>
                {location}
              </h3>
            )}

            {data.mode ===
            "names" ? (
              cats.map(
                (cat) => (
                  <div
                    key={cat.id}
                    className="print-name"
                  >
                    {value(
                      cat.name,
                    )}
                  </div>
                ),
              )
            ) : (
              cats.map(
                (cat) => (
                  <article
                    key={cat.id}
                    className="print-cat"
                  >
                    <h4>
                      {value(
                        cat.name,
                      )}
                    </h4>

                    <FullFields
                      cat={cat}
                    />
                  </article>
                ),
              )
            )}
          </section>
        ),
      )}
    </main>
  );
}