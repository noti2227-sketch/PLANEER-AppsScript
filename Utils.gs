function normalizeHospitalName(name) {

  if (!name)
    return "NIEZNANY";

  return name
    .toUpperCase()
    .replace(/[\/\\:*?"<>|]/g, "")
    .replace(/\s+/g, " ")
    .trim();

}
