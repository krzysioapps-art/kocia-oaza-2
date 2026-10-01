type RatujemyZwierzakiStats = {
  payments_count: number;
  amount: string;
  percentage: number;
  amount_left: string;
  suffix: string;
};

export type FundraiserStats = {
  paymentsCount: number;
  amount: number;
  percentage: number;
  amountLeft: number;
  target: number;
};

export async function getFundraiserStats(
  slug: string
): Promise<FundraiserStats | null> {
  try {
    const response = await fetch(
      `https://www.ratujemyzwierzaki.pl/en/${slug}/statystyki`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Nie udało się pobrać statystyk zbiórki ${slug}:`,
        response.status
      );

      return null;
    }

    const data: RatujemyZwierzakiStats =
      await response.json();

    const amount = Number(data.amount);
    const amountLeft = Number(data.amount_left);

    if (
      !Number.isFinite(amount) ||
      !Number.isFinite(amountLeft) ||
      !Number.isFinite(data.percentage)
    ) {
      console.error(
        `Nieprawidłowe dane statystyk dla zbiórki ${slug}`
      );

      return null;
    }

    return {
      paymentsCount: data.payments_count,
      amount,
      percentage: data.percentage,
      amountLeft,
      target: amount + amountLeft,
    };
  } catch (error) {
    console.error(
      `Błąd pobierania statystyk zbiórki ${slug}:`,
      error
    );

    return null;
  }
}