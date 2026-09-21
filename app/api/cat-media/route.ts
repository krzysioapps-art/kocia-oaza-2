import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { isAdminAuthenticated } from "@/lib/auth/admin";

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

  const url =
    new URL(request.url);

  const catId =
    url.searchParams.get(
      "cat_id"
    );

  if (!catId) {
    return NextResponse.json(
      {
        error: "Brak cat_id",
      },
      {
        status: 400,
      }
    );
  }

  const supabase =
    await createClient();

  const {
    data,
    error,
  } = await supabase
    .from("cat_media")
    .select("*")
    .eq("cat_id", catId)
    .order("display_order", {
      ascending: true,
    })
    .order("created_at", {
      ascending: true,
    });

  if (error) {
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
    media: data ?? [],
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

    if (
      !body.cat_id ||
      !body.url
    ) {
      return NextResponse.json(
        {
          error:
            "cat_id i url są wymagane",
        },
        {
          status: 400,
        }
      );
    }

    const supabase =
      await createClient();

    const {
      data: latest,
    } = await supabase
      .from("cat_media")
      .select("display_order")
      .eq(
        "cat_id",
        body.cat_id
      )
      .order("display_order", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

    const nextOrder =
      (latest?.display_order ?? -1) + 1;

    const {
      data,
      error,
    } = await supabase
      .from("cat_media")
      .insert({
        cat_id: body.cat_id,
        media_type:
          body.media_type ??
          "image",
        url: body.url,
        cloudinary_public_id:
          body.cloudinary_public_id ??
          null,
        is_primary:
          body.is_primary ??
          false,
        display_order:
          body.display_order ??
          nextOrder,
        alt_text:
          body.alt_text ??
          null,
      })
      .select("*")
      .single();

    if (error) {
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
      media: data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Błąd dodawania medium",
      },
      {
        status: 500,
      }
    );
  }
}