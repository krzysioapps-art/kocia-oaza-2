export function formatAge(date?: string | null) {
  if (!date) return "";

  const birth = new Date(date);
  if (isNaN(birth.getTime())) return "";

  const now = new Date();

  let months =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());

  if (months <= 0) return "";

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