// Sprach-Übersetzungen für zweisprachige Texte
const translations = {
  de: {
    siteTitle: "CO2-Transparenz",
    menuHome: "Startseite", menuData: "Emissionen", menuAbout: "Über uns", menuContact: "Kontakt",
    localHeading: "Emissionen",
    localLinkTable: "Emissionstabelle",
    localLinkCountry: "Nach Land filtern",
    localLinkCompany: "Nach Unternehmen filtern",
    filterCountryLabel: "Land:", filterCompanyLabel: "Unternehmen:",
    companySearchPlaceholder: "Unternehmenssuche...",
    allOption: "Alle",
    tableCaption: "Jährliche CO₂-Emissionen nach Unternehmen und Land",
    contentHeading: "CO₂-Emissionen nach Unternehmen und Land",
    contentIntro: "Diese Tabelle zeigt fiktive Daten, welche die jährlichen CO₂-Emissionen verschiedener Unternehmen und Länder vergleichen. Nutzen Sie die Filter, um spezifische Länder oder Unternehmen anzuzeigen.",
    thCountry: "Land", thCompany: "Unternehmen", thEmissions: "Emissionen (Mt)",
    footerText: "Alle Rechte vorbehalten.",
    imprint: "Impressum", privacy: "Datenschutz"
  },
  en: {
    siteTitle: "CO2 Transparency",
    menuHome: "Home", menuData: "Emissions", menuAbout: "About us", menuContact: "Contact",
    localHeading: "Emissions",
    localLinkTable: "Emissions table",
    localLinkCountry: "Filter by country",
    localLinkCompany: "Filter by company",
    filterCountryLabel: "Country:", filterCompanyLabel: "Company:",
    companySearchPlaceholder: "Search company...",
    allOption: "All",
    tableCaption: "Annual CO₂ emissions by company and country",
    contentHeading: "CO₂ emissions by company and country",
    contentIntro: "This table shows fictitious data comparing annual CO₂ emissions of various companies and countries. Use the filters to focus on specific countries or companies.",
    thCountry: "Country", thCompany: "Company", thEmissions: "Emissions (Mt)",
    footerText: "All rights reserved.",
    imprint: "Imprint", privacy: "Privacy"
  }
};

// Elemente referenzieren
const siteTitleEl = document.getElementById("site-title");
const globalNavLinks = document.querySelectorAll(".global-nav a");
const localNavHeading = document.querySelector(".local-nav h2");
const filterCountryLabel = document.querySelector("label[for='countryFilter']");
const filterCompanyLabel = document.querySelector("label[for='companyFilter']");
const companyFilterInput = document.getElementById("companyFilter");
const countryFilterSelect = document.getElementById("countryFilter");
const tableCaption = document.querySelector("#data-table caption");
const thCountry = document.querySelector("th[data-col='country']");
const thCompany = document.querySelector("th[data-col='company']");
const thEmissions = document.querySelector("th[data-col='emissions']");
const footerTextEl = document.querySelector("footer p");
const langToggleBtn = document.getElementById("lang-toggle");

const contentHeadingEl = document.getElementById("contentHeading");
const introTextEl      = document.getElementById("introText");
const lnkTable         = document.getElementById("lnkTable");
const lnkCountry       = document.getElementById("lnkCountry");
const lnkCompany       = document.getElementById("lnkCompany");
const imprintLink      = document.getElementById("linkImprint");
const privacyLink      = document.getElementById("linkPrivacy");

// Aktuelle Sprache (default Deutsch)
let currentLang = "de";

// Texte basierend auf currentLang setzen
function updateLanguageTexts() {
  const t = translations[currentLang];

  siteTitleEl.textContent = t.siteTitle;
  if (globalNavLinks.length >= 4) {
    globalNavLinks[0].textContent = t.menuHome;
    globalNavLinks[1].textContent = t.menuData;
    globalNavLinks[2].textContent = t.menuAbout;
    globalNavLinks[3].textContent = t.menuContact;
  }

  localNavHeading.textContent = t.localHeading;
  if (lnkTable)   lnkTable.textContent   = t.localLinkTable;
  if (lnkCountry) lnkCountry.textContent = t.localLinkCountry;
  if (lnkCompany) lnkCompany.textContent = t.localLinkCompany;

  filterCountryLabel.textContent = t.filterCountryLabel;
  filterCompanyLabel.textContent = t.filterCompanyLabel;
  companyFilterInput.placeholder = t.companySearchPlaceholder;

  const firstOpt = countryFilterSelect.querySelector("option[value='all']");
  if (firstOpt) firstOpt.textContent = t.allOption;

  if (contentHeadingEl) contentHeadingEl.textContent = t.contentHeading;
  if (introTextEl)      introTextEl.textContent      = t.contentIntro;

  tableCaption.textContent = t.tableCaption;
  thCountry.textContent   = t.thCountry   + " \u25B4\u25BE";
  thCompany.textContent   = t.thCompany   + " \u25B4\u25BE";
  thEmissions.textContent = t.thEmissions + " \u25B4\u25BE";

  if (footerTextEl) {
    footerTextEl.firstChild.textContent = `© 2025 Climate Transparency Initiative e.V. – ${t.footerText} `;
  }
  if (imprintLink) imprintLink.textContent = t.imprint;
  if (privacyLink) privacyLink.textContent = t.privacy;

  // Button-Label passend setzen (zeigt jeweils die andere Sprache)
  langToggleBtn.textContent = (currentLang === "de") ? "EN" : "DE";
  // html lang-Attribut
  document.documentElement.lang = currentLang;
  // Body-Klasse für Layout (Sidebar links/rechts)
  document.body.className = currentLang === "de" ? "lang-de" : "lang-en";
}

// Sprachumschalter
langToggleBtn.addEventListener("click", () => {
  currentLang = (currentLang === "de") ? "en" : "de";
  updateLanguageTexts();
});

// Länder-Dropdown füllen
function populateCountryOptions() {
  const rows = document.querySelectorAll("#data-table tbody tr");
  const countries = new Set();
  rows.forEach(row => {
    const country = row.querySelector("td").textContent;
    countries.add(country);
  });
  const countryList = Array.from(countries).sort();
  countryList.forEach(ctry => {
    const opt = document.createElement("option");
    opt.value = ctry;
    opt.textContent = ctry;
    countryFilterSelect.appendChild(opt);
  });
}

// Filter
function filterTable() {
  const filterCountry = countryFilterSelect.value;
  const filterCompany = companyFilterInput.value.toLowerCase().trim();
  const rows = document.querySelectorAll("#data-table tbody tr");
  rows.forEach(row => {
    const country = row.cells[0].textContent;
    const company = row.cells[1].textContent.toLowerCase();
    const countryMatch = (filterCountry === "all" || country === filterCountry);
    const companyMatch = (filterCompany === "" || company.indexOf(filterCompany) !== -1);
    row.style.display = (countryMatch && companyMatch) ? "" : "none";
  });
}
countryFilterSelect.addEventListener("change", filterTable);
companyFilterInput.addEventListener("input", filterTable);

// Sortierung
let currentSortCol = null;
let currentSortAsc = true;
function sortTableByCol(colName) {
  const table = document.getElementById("data-table");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));
  let colIndex = (colName === "country") ? 0 : (colName === "company") ? 1 : 2;

  if (currentSortCol === colName) currentSortAsc = !currentSortAsc;
  else { currentSortAsc = true; currentSortCol = colName; }

  rows.sort((a, b) => {
    let aText = a.cells[colIndex].textContent;
    let bText = b.cells[colIndex].textContent;
    if (colName === "emissions") {
      aText = parseFloat(aText) || 0;
      bText = parseFloat(bText) || 0;
    } else {
      aText = aText.toLowerCase();
      bText = bText.toLowerCase();
    }
    if (aText < bText) return currentSortAsc ? -1 : 1;
    if (aText > bText) return currentSortAsc ? 1 : -1;
    return 0;
  });

  rows.forEach(row => tbody.appendChild(row));

  [thCountry, thCompany, thEmissions].forEach(th => th.classList.remove("sorted-asc", "sorted-desc"));
  const thEl = (colName === "country") ? thCountry : (colName === "company") ? thCompany : thEmissions;
  thEl.classList.add(currentSortAsc ? "sorted-asc" : "sorted-desc");
}

// Sort-Listener
thCountry.addEventListener("click", () => sortTableByCol("country"));
thCompany.addEventListener("click", () => sortTableByCol("company"));
thEmissions.addEventListener("click", () => sortTableByCol("emissions"));

// Init
populateCountryOptions();
updateLanguageTexts();
