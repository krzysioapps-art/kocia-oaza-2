export function getWaitingLabel(date?: string | null) {
    if (!date) return null;

    const created = new Date(date);

    if (isNaN(created.getTime())) return null;

    const now = new Date();

    const months =
        (now.getFullYear() - created.getFullYear()) * 12 +
        (now.getMonth() - created.getMonth());

    // 👇 poniżej miesiąca nic nie pokazujemy
    if (months < 1) return null;

    if (months === 1) {
        return "Czeka na dom już miesiąc";
    }

    return `Czeka na dom już ${months} mies.`;
}