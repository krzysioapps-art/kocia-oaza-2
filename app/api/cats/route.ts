import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { isAdminAuthenticated } from "@/lib/auth/admin";

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

export async function GET(
  request: Request
) {
  const authenticated =
    await isAdminAuthenticated();

  if (!authenticated) {
    return NextResponse.json(
      {
        error: "Brak autoryzacji",
      },
      {
        status: 401,
      }
    );
  }

  const supabase =
    await createClient();

  const url =
    new URL(request.url);

  const requestedSlug =
    url.searchParams.get(
      "slug"
    );

  if (requestedSlug !== null) {
    const slug =
      slugify(requestedSlug);

    if (!slug) {
      return NextResponse.json({
        available: true,
      });
    }

    const {
      data: existingCats,
      error,
    } = await supabase
      .from("cats")
      .select("id")
      .eq("slug", slug)
      .limit(1);

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      available:
        !existingCats ||
        existingCats.length === 0,
    });
  }

  const {
    data,
    error,
  } = await supabase
    .from("cats")
    .select(`
      *,
      media:cat_media(*)
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    cats: data ?? [],
  });
}

export async function POST(
  request: Request
) {
  const authenticated =
    await isAdminAuthenticated();

  if (!authenticated) {
    return NextResponse.json(
      {
        error: "Brak autoryzacji",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const body =
      await request.json();

    const supabase =
      await createClient();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const requestedSlug =
      typeof body.slug === "string"
        ? body.slug.trim()
        : "";

    if (!name) {
      return NextResponse.json(
        {
          error:
            "Imię kota jest wymagane",
        },
        {
          status: 400,
        }
      );
    }

    const baseSlug =
      slugify(
        requestedSlug ||
          name
      );

    if (!baseSlug) {
      return NextResponse.json(
        {
          error:
            "Nie udało się utworzyć sluga",
        },
        {
          status: 400,
        }
      );
    }

    let slug =
      baseSlug;

    let suffix = 2;

    while (true) {
      const {
        data: existingCats,
        error: slugCheckError,
      } = await supabase
        .from("cats")
        .select("id")
        .eq("slug", slug)
        .limit(1);

      if (slugCheckError) {
        console.error(
          slugCheckError
        );

        return NextResponse.json(
          {
            error:
              slugCheckError.message,
          },
          {
            status: 500,
          }
        );
      }

      if (
        !existingCats ||
        existingCats.length === 0
      ) {
        break;
      }

      slug =
        `${baseSlug}-${suffix}`;

      suffix += 1;
    }

    const {
      data,
      error,
    } =
      await supabase
        .from("cats")
        .insert({
          ...body,
          name,
          slug,
        })
        .select(`
          *,
          media:cat_media(*)
        `)
        .single();

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          error:
            error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      cat: data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Błąd tworzenia kota",
      },
      {
        status: 500,
      }
    );
  }
}