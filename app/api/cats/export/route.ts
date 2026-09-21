import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type ExportScope = "all" | "selected";
type ExportMode = "full" | "admin" | "names";
type GroupMode = "none" | "location";

type ExportRequest = {
  scope: ExportScope;
  mode: ExportMode;
  groupBy: GroupMode;
  format: "txt" | "pdf";
  ids?: string[];
};

type Cat = {
  id: string;
  name: string | null;
  status: string | null;
  gender: string | null;
  birth_date: string | null;
  arrival_date: string | null;
  location: string | null;
  weight: number | string | null;
  adoption_priority: string | number | null;

  sterilized: boolean | null;
  vaccinated: boolean | null;
  dewormed: boolean | null;
  microchipped: boolean | null;

  fiv_status: string | null;
  felv_status: string | null;
  fip_status: string | null;

  good_with_children: boolean | null;
  good_with_cats: boolean | null;

  slug: string | null;
};

function value(value: unknown, fallback = "Brak danych") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return String(value);
}

function yesNo(value: boolean | null) {
  if (value === true) return "Tak";
  if (value === false) return "Nie";
  return "Brak danych";
}

function formatDate(date: string | null) {
  if (!date) return "Brak danych";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("pl-PL");
}

function statusLabel(status: string | null) {
  switch (status) {
    case "available":
      return "Szukam domu";
    case "reserved":
      return "Zarezerwowany";
    case "adopted":
      return "Mam już dom";
    default:
      return value(status);
  }
}

function genderLabel(gender: string | null) {
  switch (gender) {
    case "male":
      return "Kocur";
    case "female":
      return "Kotka";
    default:
      return value(gender);
  }
}

function ageFromBirthDate(date: string | null) {
  if (!date) return "Brak danych";

  const birth = new Date(date);

  if (Number.isNaN(birth.getTime())) {
    return "Brak danych";
  }

  const now = new Date();

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();

  if (
    months < 0 ||
    (months === 0 && now.getDate() < birth.getDate())
  ) {
    years--;
    months += 12;
  }

  if (years > 0) {
    return `${years} ${years === 1 ? "rok" : years < 5 ? "lata" : "lat"}`;
  }

  if (months === 0) {
    return "poniżej miesiąca";
  }

  return `${months} ${
    months === 1
      ? "miesiąc"
      : months < 5
        ? "miesiące"
        : "miesięcy"
  }`;
}

function renderCatFull(cat: Cat) {
  return [
    `Imię: ${value(cat.name)}`,
    `Status: ${statusLabel(cat.status)}`,
    `Płeć: ${genderLabel(cat.gender)}`,
    `Wiek: ${ageFromBirthDate(cat.birth_date)}`,
    `Data urodzenia: ${formatDate(cat.birth_date)}`,
    `Data przyjęcia: ${formatDate(cat.arrival_date)}`,
    `Lokalizacja: ${value(cat.location)}`,
    `Waga: ${value(cat.weight)}`,
    `Priorytet adopcyjny: ${value(cat.adoption_priority)}`,
    `Sterylizacja: ${yesNo(cat.sterilized)}`,
    `Szczepienie: ${yesNo(cat.vaccinated)}`,
    `Odrobaczenie: ${yesNo(cat.dewormed)}`,
    `Chip: ${yesNo(cat.microchipped)}`,
    `FIV: ${value(cat.fiv_status)}`,
    `FeLV: ${value(cat.felv_status)}`,
    `FIP: ${value(cat.fip_status)}`,
    `Dobrze z dziećmi: ${yesNo(cat.good_with_children)}`,
    `Dobrze z kotami: ${yesNo(cat.good_with_cats)}`,
    cat.slug
      ? `Profil: /koty/${cat.slug}`
      : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function renderCatAdmin(cat: Cat) {
  return [
    `Imię: ${value(cat.name)}`,
    `Status: ${statusLabel(cat.status)}`,
    `Płeć: ${genderLabel(cat.gender)}`,
    `Wiek: ${ageFromBirthDate(cat.birth_date)}`,
    `Lokalizacja: ${value(cat.location)}`,
    `Przyjęty: ${formatDate(cat.arrival_date)}`,
    `Priorytet: ${value(cat.adoption_priority)}`,
    `Sterylizacja: ${yesNo(cat.sterilized)}`,
    `Szczepienie: ${yesNo(cat.vaccinated)}`,
    `Odrobaczenie: ${yesNo(cat.dewormed)}`,
    `Chip: ${yesNo(cat.microchipped)}`,
    `FIV: ${value(cat.fiv_status)}`,
    `FeLV: ${value(cat.felv_status)}`,
    `FIP: ${value(cat.fip_status)}`,
    `Dzieci: ${yesNo(cat.good_with_children)}`,
    `Koty: ${yesNo(cat.good_with_cats)}`,
  ].join("\n");
}

function renderCat(cat: Cat, mode: ExportMode) {
  if (mode === "names") {
    return value(cat.name);
  }

  if (mode === "admin") {
    return renderCatAdmin(cat);
  }

  return renderCatFull(cat);
}

function buildText(
  cats: Cat[],
  mode: ExportMode,
  groupBy: GroupMode,
) {
  const title =
    mode === "names"
      ? "LISTA KOTÓW"
      : mode === "admin"
        ? "LISTA ADMINISTRACYJNA KOTÓW"
        : "PEŁNA LISTA KOTÓW";

  const lines: string[] = [
    "KOCIA OAZA",
    title,
    `Data eksportu: ${new Date().toLocaleDateString("pl-PL")}`,
    "",
  ];

  if (groupBy === "location") {
    const groups = new Map<string, Cat[]>();

    for (const cat of cats) {
      const location = cat.location?.trim() || "Brak lokalizacji";

      if (!groups.has(location)) {
        groups.set(location, []);
      }

      groups.get(location)!.push(cat);
    }

    const sortedGroups = [...groups.entries()].sort(
      ([a], [b]) => a.localeCompare(b, "pl"),
    );

    for (const [location, locationCats] of sortedGroups) {
      lines.push(`=== ${location.toUpperCase()} ===`);
      lines.push("");

      for (const cat of locationCats) {
        lines.push(renderCat(cat, mode));
        lines.push("");
      }
    }
  } else {
    for (const cat of cats) {
      lines.push(renderCat(cat, mode));
      lines.push("");
    }
  }

  return lines.join("\n").trim() + "\n";
}

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as ExportRequest;

    const {
      scope,
      mode,
      groupBy,
      format,
      ids = [],
    } = body;

    if (
      !["all", "selected"].includes(scope) ||
      !["full", "admin", "names"].includes(mode) ||
      !["none", "location"].includes(groupBy) ||
      !["txt", "pdf"].includes(format)
    ) {
      return NextResponse.json(
        { error: "Nieprawidłowe parametry eksportu." },
        { status: 400 },
      );
    }

    if (
      scope === "selected" &&
      ids.length === 0
    ) {
      return NextResponse.json(
        { error: "Nie zaznaczono żadnego kota." },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    let query = supabase
      .from("cats")
      .select(`
        id,
        name,
        status,
        gender,
        birth_date,
        arrival_date,
        location,
        weight,
        adoption_priority,
        sterilized,
        vaccinated,
        dewormed,
        microchipped,
        fiv_status,
        felv_status,
        fip_status,
        good_with_children,
        good_with_cats,
        slug
      `)
      .is("deleted_at", null)
      .order("name", {
        ascending: true,
      });

    if (scope === "selected") {
      query = query.in("id", ids);
    }

    const {
      data,
      error,
    } = await query;

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          error:
            "Nie udało się pobrać kotów do eksportu.",
        },
        { status: 500 },
      );
    }

    const cats = (data ?? []) as Cat[];

    if (format === "txt") {
      const content = buildText(
        cats,
        mode,
        groupBy,
      );

      return new NextResponse(content, {
        headers: {
          "Content-Type":
            "text/plain; charset=utf-8",
          "Content-Disposition":
            `attachment; filename="kocia-oaza-koty.txt"`,
        },
      });
    }

    /*
     * PDF nie jest generowany tutaj.
     *
     * Zwracamy dane do widoku drukowania.
     * Frontend otworzy stronę /panel/koty/eksport
     * i wywoła window.print().
     */
    return NextResponse.json({
      cats,
      mode,
      groupBy,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Błąd eksportu.",
      },
      { status: 500 },
    );
  }
}