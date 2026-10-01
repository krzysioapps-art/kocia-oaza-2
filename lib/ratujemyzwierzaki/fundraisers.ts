type RatujemyZwierzakiFundraiser = {
    slug: string;
    title: string;
    imageUrl: string | null;
    daysLeft: number | null;
};

const PROFILE_URL =
    "https://www.ratujemyzwierzaki.pl/en/organizacje/kociaoaza";

function decodeResponse(response: string) {
    return response
        .replace(/\\(['"/])/g, "$1")
        .replace(/\\n/g, "\n")
        .replace(/\\r/g, "\r")
        .replace(/\\t/g, "\t");
}

function stripHtml(value: string) {
    return value
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/\s+/g, " ")
        .trim();
}

function extractFundraisers(response: string) {
    const html = decodeResponse(response);

    /*
     * RatujemyZwierzaki zwraca odpowiedź w rodzaju:
     *
     * (() => {
     *   const data = $("<hr ...>
     *     ... karty zbiórek ...
     *   ");
     *
     *   $(".load_more.active-cause").replaceWith(data);
     * })();
     *
     * Wyciągamy zawartość stringa przekazanego do $("...").
     */

    const dataMatch = html.match(
        /const\s+data\s*=\s*\$\("([\s\S]*?)"\);/i
    );

    if (!dataMatch) {
        console.warn(
            "RatujemyZwierzaki: nie znaleziono `const data`"
        );

        console.warn("Początek odpowiedzi:", html.slice(0, 1000));

        return [];
    }

    const dataHtml = dataMatch[1]
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        .replace(/\\n/g, "\n")
        .replace(/\\r/g, "\r")
        .replace(/\\t/g, "\t");

    const matches = [
        ...dataHtml.matchAll(
            /<a\s+class=["']cause-card["']\s+href=["']\/en\/([^"']+)["']>([\s\S]*?)<\/a>/gi
        ),
    ];

    return matches
        .map((match) => {
            const slug = match[1];
            const cardHtml = match[2];

            const titleMatch = cardHtml.match(
                /<h3[^>]*>([\s\S]*?)<\/h3>/i
            );

            const imageMatch = cardHtml.match(
                /<img[^>]+src=["']([^"']+)["']/i
            );

            if (!titleMatch) {
                return null;
            }

            return {
                slug,
                title: stripHtml(titleMatch[1]),
                imageUrl: imageMatch?.[1] ?? null,
            };
        })
        .filter(
            (
                fundraiser
            ): fundraiser is RatujemyZwierzakiFundraiser =>
                fundraiser !== null
        );
}

async function fetchFundraiserPage(page: number) {
    const url = `${PROFILE_URL}?active_cause_page=${page}`;

    const response = await fetch(url, {
        headers: {
            Accept: "text/javascript, application/javascript, text/html, */*",
            "X-Requested-With": "XMLHttpRequest",
        },
        next: {
            revalidate: 60,
        },
    });

    if (!response.ok) {
        throw new Error(
            `RatujemyZwierzaki zwróciło ${response.status} dla ${url}`
        );
    }

    const contentType = response.headers.get("content-type");

    console.log(
        `RatujemyZwierzaki: page=${page}, content-type=${contentType}`
    );

    return response.text();
}

export async function getRatujemyZwierzakiFundraisers() {
    const fundraisers: RatujemyZwierzakiFundraiser[] = [];

    try {
        for (let page = 1; page <= 20; page++) {
            const response = await fetchFundraiserPage(page);

            const nextFundraisers = extractFundraisers(response);

            console.log(
                `RatujemyZwierzaki: strona ${page}, znaleziono ${nextFundraisers.length} zbiórek`
            );

            if (nextFundraisers.length === 0) {
                break;
            }

            fundraisers.push(...nextFundraisers);
        }

        const uniqueFundraisers = Array.from(
            new Map(
                fundraisers.map((fundraiser) => [
                    fundraiser.slug,
                    fundraiser,
                ])
            ).values()
        );

        const fundraisersWithDays = await Promise.all(
            uniqueFundraisers.map(async (fundraiser) => {
                const daysLeft = await fetchFundraiserDaysLeft(
                    fundraiser.slug
                );

                return {
                    ...fundraiser,
                    daysLeft,
                };
            })
        );

        console.log(
            `RatujemyZwierzaki: łącznie ${fundraisersWithDays.length} aktywnych zbiórek`
        );

        return fundraisersWithDays;

    } catch (error) {
        console.error(
            "Błąd pobierania zbiórek Kociej Oazy z RatujemyZwierzaki:",
            error
        );

        return [];
    }
}

async function fetchFundraiserDaysLeft(slug: string) {
  const url = `https://www.ratujemyzwierzaki.pl/en/${slug}`;

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      console.error(
        `Nie udało się pobrać strony zbiórki ${slug}:`,
        response.status
      );

      return null;
    }

    const html = await response.text();

    const match = html.match(
      /<div[^>]*class=["'][^"']*\bleft-days\b[^"']*["'][^>]*>\s*(\d+)\s*days?\s*left/i
    );

    if (!match) {
      console.warn(
        `RatujemyZwierzaki: nie znaleziono liczby dni dla ${slug}`
      );

      return null;
    }

    return Number(match[1]);
  } catch (error) {
    console.error(
      `Błąd pobierania liczby dni dla zbiórki ${slug}:`,
      error
    );

    return null;
  }
}