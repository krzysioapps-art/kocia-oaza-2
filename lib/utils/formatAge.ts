export function formatAge(months?: number | null) {
  if (!months || months <= 0) return "";

  if (months < 12) {
    return `${months} ${months === 1 ? "miesiąc" : "mies."}`;
  }

  const years = Math.floor(months / 12);
  const rest = months % 12;

  const yearsLabel =
    years === 1 ? "rok" :
    years < 5 ? "lata" :
    "lat";

  if (rest === 0) {
    return `${years} ${yearsLabel}`;
  }

  return `${years} ${yearsLabel} ${rest} mies.`;
}