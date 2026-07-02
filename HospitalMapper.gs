/**
 * HospitalMapper.gs
 * PLANEER
 */

const HOSPITAL_MAP = {
  "REGIONALNE CENTRUM KRWIODAWSTWA": "RCKIK",
  "RCKIK": "RCKIK",

  "UCK KATOWICE UL. MEDYKÓW": "UCK KATOWICE",
  "UCK KATOWICE UL. CEGLANA": "UCK KATOWICE",

  "ANGELIUS": "ANGELIUS",
  "MAZOVIA": "MAZOVIA UROLOGIA",
  "UROVITA": "UROVITA",

  "AHOP / PAKS KATOWICE": "AHOP PAKS KATOWICE",
  "AHOP / PAKS TYCHY": "AHOP PAKS TYCHY",
  "AHOP / PAKS DĄBROWA": "AHOP PAKS DĄBROWA GÓRNICZA",
  "AHOP / PAKS BIELSKO": "AHOP PAKS BIELSKO-BIAŁA",

  "MYSŁOWICKIE CENTRUM ZDROWIA": "SZPITAL NR 1 MYSŁOWICE",
  "SZPITAL NR 1 W MYSŁOWICACH": "SZPITAL NR 1 MYSŁOWICE",
  "SZPITAL NR 2": "SZPITAL NR 2 W MYSŁOWICACH",
  "BYTOMSKA 41": "SZPITAL NR 2 W MYSŁOWICACH",

  "SOSNOWIECKI SZPITAL MIEJSKI": "SOSNOWIECKI SZPITAL MIEJSKI",
  "CENTRUM ZDROWIA DZIECKA": "CENTRUM ZDROWIA DZIECKA I RODZINY",
  "ZAGŁĘBIOWSKIE CENTRUM ONKOLOG": "ZCO DĄBROWA GÓRNICZA",
  "ŚWIĘTOCHŁOWIC": "FRYDA",

  "SZPITAL SPECJALISTYCZNY NR 1 W BYTOMIU": "SZPITAL NR 1 BYTOM",

  "JAWORZN": "JAWORZNO",

  "MEGREZ": "MEGREZ TYCHY",
  "SZPITAL MIEJSKI W TYCHACH": "SZPITAL MIEJSKI TYCHY",

  "JOANNITAS": "JOANNITAS PSZCZYNA",

  "MAZAN": "MAZAN",
  "KLINIKA 2000": "KLINIKA 2000",
  "GLOBIANA": "GLOBIANA",
  "EUROMEDIC": "EUROMEDIC",

  "PILCHOWIC": "SZPITAL CHORÓB PŁUC PILCHOWICE",
  "GALEN": "GALEN ORTOPEDIA",
  "MURCKI": "MURCKI",
  "NEFROLUX": "NEFROLUX",

  "SPZOZ SZPITAL SPECJALISTYCZNY W ZABRZU": "SPZOZ ZABRZE",
  "OKRĘGOWY SZPITAL KOLEJOWY": "OKRĘGOWY SZPITAL KOLEJOWY",
  "WOJEWÓDZKI SZPITAL SPECJALISTYCZNY NR 5": "WSS NR 5 SOSNOWIEC",
    "SAMODZIELNY PUBLICZNY SZPITAL KLINICZNY ŚLĄSKIEGO UNIWERSYTETU MEDYCZNEGO W ZABRZU": "SPSK SUM ZABRZE",

  "WODZISŁAW": "WSS CHORÓB PŁUC WODZISŁAW",

  "SZPITAL WIELOSPECJALISTYCZNY W GLIWICACH": "SZPITAL WIELOSPECJALISTYCZNY GLIWICE",

  "BONIFRATR": "BONIFRATRZY",

  "GÓRNOŚLĄSKIE CENTRUM MEDYCZNE": "GCM",
  "GCM": "GCM",

  "CENTRUM LECZENIA OPARZEŃ": "CENTRUM LECZENIA OPARZEŃ",

  "KATOWICKIE CENTRUM ONKOLOGII": "KATOWICKIE CENTRUM ONKOLOGII",

  "SCANMED": "SCANMED",

  "PSSE TYCHY": "PSSE",
  "PSSE KATOWICE": "PSSE",

  "SZPITAL MIEJSKI W ZABRZU": "SZPITAL MIEJSKI ZABRZE",

  "SZPITAL SPECJALISTYCZNY W CHORZOWIE": "SZPITAL SPECJALISTYCZNY CHORZÓW",

  "TOMMED": "TOMMED",

  "WOJEWÓDZKI SZPITAL SPECJALISTYCZNY NR 3": "WSS NR 3 RYBNIK",

  "SAMODZIELNY PUBLICZNY SZPITAL KLINICZNY ŚLĄSKIEGO UNIWERSYTETU MEDYCZNEGO W KATOWICACH":
    "SPSK SUM KATOWICE",

  "UL. FRANCUSKA 20-24": "SPSK SUM KATOWICE"
};

const HOSPITAL_SHEETS = [
  ...new Set(Object.values(HOSPITAL_MAP)),
  "INNE"
];

function getHospitalSheetName(destination) {

  if (!destination)
    return "INNE";

  const text = destination.toUpperCase();

  for (const key of Object.keys(HOSPITAL_MAP)) {

    if (text.includes(key)) {
      return HOSPITAL_MAP[key];
    }

  }
    // Dodatkowe uproszczone dopasowania

  if (text.includes("UCK"))
    return "UCK KATOWICE";

  if (text.includes("MEGREZ"))
    return "MEGREZ TYCHY";

  if (text.includes("BONIFRATR"))
    return "BONIFRATRZY";

  if (text.includes("GCM"))
    return "GCM";

  if (text.includes("JAWORZN"))
    return "JAWORZNO";

  if (text.includes("SOSNOWIECKI"))
    return "SOSNOWIECKI SZPITAL MIEJSKI";

  if (text.includes("MYSŁOWICKIE"))
    return "SZPITAL NR 1 MYSŁOWICE";

  if (text.includes("BYTOMSKA"))
    return "SZPITAL NR 2 W MYSŁOWICACH";

  if (text.includes("NEFROLUX"))
    return "NEFROLUX";

  if (text.includes("SCANMED"))
    return "SCANMED";

  if (text.includes("PSSE"))
    return "PSSE";

  if (text.includes("RYBNIK"))
    return "WSS NR 3 RYBNIK";

  if (text.includes("GLIWIC"))
    return "SZPITAL WIELOSPECJALISTYCZNY GLIWICE";

  if (text.includes("ZABRZ"))
    return "SPZOZ ZABRZE";

  if (text.includes("PILCHOWIC"))
    return "SZPITAL CHORÓB PŁUC PILCHOWICE";

  if (text.includes("GALEN"))
    return "GALEN ORTOPEDIA";

  if (text.includes("ANGELIUS"))
    return "ANGELIUS";

  if (text.includes("MAZOVIA"))
    return "MAZOVIA UROLOGIA";

  if (text.includes("UROVITA"))
    return "UROVITA";

  if (text.includes("EUROMEDIC"))
    return "EUROMEDIC";

  if (text.includes("GLOBIANA"))
    return "GLOBIANA";

  if (text.includes("KLINIKA 2000"))
    return "KLINIKA 2000";

  if (text.includes("MAZAN"))
    return "MAZAN";

  if (text.includes("JOANNITAS"))
    return "JOANNITAS PSZCZYNA";

  if (text.includes("RCKIK"))
    return "RCKIK";

  if (text.includes("REGIONALNE CENTRUM KRWIODAWSTWA"))
    return "RCKIK";
    if (text.includes("CENTRUM LECZENIA OPARZEŃ"))
    return "CENTRUM LECZENIA OPARZEŃ";

  if (text.includes("KATOWICKIE CENTRUM ONKOLOGII"))
    return "KATOWICKIE CENTRUM ONKOLOGII";

  if (text.includes("TOMMED"))
    return "TOMMED";

  if (text.includes("MURCKI"))
    return "MURCKI";

  if (text.includes("OKRĘGOWY SZPITAL KOLEJOWY"))
    return "OKRĘGOWY SZPITAL KOLEJOWY";

  if (text.includes("SZPITAL MIEJSKI W TYCHACH"))
    return "SZPITAL MIEJSKI TYCHY";

  if (text.includes("ZESPÓŁ OPIEKI ZDROWOTNEJ W ŚWIĘTOCHŁOWICACH"))
    return "FRYDA";

  if (text.includes("ZAGŁĘBIOWSKIE CENTRUM ONKOLOG"))
    return "ZCO DĄBROWA GÓRNICZA";

  if (text.includes("CENTRUM ZDROWIA DZIECKA"))
    return "CENTRUM ZDROWIA DZIECKA I RODZINY";

  return "INNE";
}
