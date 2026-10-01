import { NextResponse } from "next/server";

import {
  getRatujemyZwierzakiFundraisers,
} from "@/lib/ratujemyzwierzaki/fundraisers";

import {
  getFundraiserStats,
} from "@/lib/supabase/fundraiser-stats";

export async function GET() {
  try {
    const fundraisers =
      await getRatujemyZwierzakiFundraisers();

    const fundraisersWithStats =
      await Promise.all(
        fundraisers.map(async (fundraiser) => ({
          ...fundraiser,
          stats: await getFundraiserStats(
            fundraiser.slug
          ),
        }))
      );

    fundraisersWithStats.sort((a, b) => {
      const percentageA =
        a.stats?.percentage ?? 0;

      const percentageB =
        b.stats?.percentage ?? 0;

      return percentageB - percentageA;
    });

    return NextResponse.json(
      fundraisersWithStats
    );
  } catch (error) {
    console.error(
      "Błąd pobierania zbiórek:",
      error
    );

    return NextResponse.json([], {
      status: 500,
    });
  }
}