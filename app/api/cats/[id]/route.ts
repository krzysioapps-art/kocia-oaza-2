import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { isAdminAuthenticated } from "@/lib/auth/admin";

import {
  EDITABLE_CAT_FIELDS,
  type EditableCatField,
} from "@/types/cat";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function isEditableField(
  value: unknown
): value is EditableCatField {
  return (
    typeof value === "string" &&
    EDITABLE_CAT_FIELDS.includes(
      value as EditableCatField
    )
  );
}

function validateValue(
  field: EditableCatField,
  value: unknown
) {
  switch (field) {
    case "name":
    case "slug":
    case "description":
    case "image_url":
    case "weight":
    case "virtual_adoption_url":
      return (
        value === null ||
        typeof value === "string"
      );

    case "gender":
    case "status":
    case "location":
    case "fiv_status":
    case "felv_status":
    case "fip_status":
      return (
        value === null ||
        typeof value === "string"
      );

    case "birth_date":
    case "arrival_date":
      return (
        value === null ||
        typeof value === "string"
      );

    case "tags":
      return (
        value === null ||
        Array.isArray(value)
      );

    case "adoption_priority":
      return (
        value === null ||
        (
          typeof value === "number" &&
          Number.isInteger(value)
        )
      );

    case "sterilized":
    case "vaccinated":
    case "dewormed":
    case "good_with_children":
    case "good_with_cats":
    case "is_featured":
    case "microchipped":
      return (
        value === null ||
        typeof value === "boolean"
      );

    default:
      return false;
  }
}

export async function GET(
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

  const { id } =
    await params;

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
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    cat: data,
  });
}

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

    const field =
      body.field;

    const value =
      body.value;

    if (!isEditableField(field)) {
      return NextResponse.json(
        {
          error:
            "To pole nie może być edytowane.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !validateValue(
        field,
        value
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Nieprawidłowa wartość pola.",
        },
        {
          status: 400,
        }
      );
    }

    const supabase =
      await createClient();

    const { data, error } =
      await supabase
        .from("cats")
        .update({
          [field]: value,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", id)
        .select("*")
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
      success: true,
      cat: data,
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
      error,
    } = await supabase
      .from("cats")
      .update({
        deleted_at:
          new Date().toISOString(),
        updated_at:
          new Date().toISOString(),
      })
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

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Błąd archiwizacji",
      },
      {
        status: 500,
      }
    );
  }
}