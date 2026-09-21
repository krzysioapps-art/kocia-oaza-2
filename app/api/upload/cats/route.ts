import { NextResponse } from "next/server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name:
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,

  api_key:
    process.env.CLOUDINARY_API_KEY,

  api_secret:
    process.env.CLOUDINARY_API_SECRET,
});

export async function POST(
  request: Request,
) {
  try {
    const formData =
      await request.formData();

    const file =
      formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error: "Brak pliku",
        },
        {
          status: 400,
        },
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        {
          error: "Plik jest pusty",
        },
        {
          status: 400,
        },
      );
    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const result =
      await new Promise<any>(
        (
          resolve,
          reject,
        ) => {
          cloudinary.uploader.upload_stream(
            {
              folder: "cats",
              resource_type: "auto",
            },
            (
              error,
              uploadResult,
            ) => {
              if (error) {
                reject(error);
              } else {
                resolve(uploadResult);
              }
            },
          ).end(buffer);
        },
      );

    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
      resource_type:
        result.resource_type,
    });
  } catch (error) {
    console.error(
      "CAT MEDIA UPLOAD ERROR:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Upload error",
      },
      {
        status: 500,
      },
    );
  }
}