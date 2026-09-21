import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { isAdminAuthenticated } from "@/lib/auth/admin";

export async function GET() {
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

    const slug =
      typeof body.slug === "string"
        ? body.slug.trim()
        : "";

    if (!name) {
      return NextResponse.json(
        {
          error: "Imię kota jest wymagane",
        },
        {
          status: 400,
        }
      );
    }

    if (!slug) {
      return NextResponse.json(
        {
          error: "Slug jest wymagany",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } =
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
          error: error.message,
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
        error: "Błąd tworzenia kota",
      },
      {
        status: 500,
      }
    );
  }
}