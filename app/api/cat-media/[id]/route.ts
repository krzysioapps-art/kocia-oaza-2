import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { isAdminAuthenticated } from "@/lib/auth/admin";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  { params }: Props
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
    const { id } =
      await params;

    const body =
      await request.json();

    const supabase =
      await createClient();

    const update: Record<
      string,
      unknown
    > = {};

    if (
      "is_primary" in body
    ) {
      update.is_primary =
        Boolean(body.is_primary);
    }

    if (
      "display_order" in body
    ) {
      update.display_order =
        Number(body.display_order);
    }

    if (
      "alt_text" in body
    ) {
      update.alt_text =
        body.alt_text;
    }

    if (
      "media_type" in body
    ) {
      update.media_type =
        body.media_type;
    }

    update.updated_at =
      new Date().toISOString();

    if (
      update.is_primary === true
    ) {
      const {
        data: current,
        error: currentError,
      } = await supabase
        .from("cat_media")
        .select("cat_id")
        .eq("id", id)
        .single();

      if (currentError) {
        return NextResponse.json(
          {
            error:
              currentError.message,
          },
          {
            status: 404,
          }
        );
      }

      await supabase
        .from("cat_media")
        .update({
          is_primary: false,
        })
        .eq(
          "cat_id",
          current.cat_id
        );
    }

    const {
      data,
      error,
    } = await supabase
      .from("cat_media")
      .update(update)
      .eq("id", id)
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
        error: "Błąd zapisu",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Props
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
    const { id } =
      await params;

    const supabase =
      await createClient();

    const {
      data: media,
    } = await supabase
      .from("cat_media")
      .select(
        "cloudinary_public_id"
      )
      .eq("id", id)
      .single();

    const {
      error,
    } = await supabase
      .from("cat_media")
      .delete()
      .eq("id", id);

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

    /*
     * Usuwamy również asset z Cloudinary.
     *
     * Wykorzystujemy istniejący endpoint
     * /api/upload/delete.
     */
    if (
      media?.cloudinary_public_id
    ) {
      try {
        await fetch(
          new URL(
            "/api/upload/delete",
            request.url
          ),
          {
            method: "POST",
            headers: {
              "content-type":
                "application/json",
            },
            body: JSON.stringify({
              public_id:
                media.cloudinary_public_id,
            }),
          }
        );
      } catch {
        /*
         * Usunięcie rekordu z DB
         * pozostaje sukcesem nawet jeśli
         * Cloudinary chwilowo nie odpowie.
         */
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Błąd usuwania",
      },
      {
        status: 500,
      }
    );
  }
}