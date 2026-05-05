export function getStatusMeta(status?: string) {
  switch (status) {
    case "available":
      return {
        label: "Szukam domu",
        className: "status status--available",
      };

    case "reserved":
      return {
        label: "Zarezerwowany",
        className: "status status--reserved",
      };

    case "adopted":
      return {
        label: "Mam już dom",
        className: "status status--adopted",
      };

    default:
      return {
        label: "",
        className: "",
      };
  }
}