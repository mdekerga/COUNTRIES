Country.fill_countries();

const ITEMS_PER_PAGE = 25;
let currentPage = 1;

// DOM 
const tableBody = document.querySelector("#countries-table tbody");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const pageInfo = document.getElementById("page-info");

// Filter 
const continentFilter = document.getElementById("continent-filter");
const languageFilter = document.getElementById("language-filter");
const countryFilter = document.getElementById("country-filter");

// Overlay 
const detailsOverlay = document.getElementById("details-overlay");
const closeDetailsButton = document.getElementById("close-details-button");
const flagOverlay = document.getElementById("flag-overlay");
const closeFlagButton = document.getElementById("close-flag-button");

// Details Contenu
const detailsName = document.getElementById("details-name");
const detailsPopulation = document.getElementById("details-population");
const detailsArea = document.getElementById("details-area");
const detailsDensity = document.getElementById("details-density");
const detailsContinent = document.getElementById("details-continent");
const detailsNeighbors = document.getElementById("details-neighbors");
const detailsLanguages = document.getElementById("details-languages");
const detailsCurrencies = document.getElementById("details-currencies");

// Flag Contenu 
const largeFlag = document.getElementById("large-flag");

const createCountryRow = (country) => {
    const row = document.createElement("tr");
    row.setAttribute("data-alpha3", country._alpha3); 

    const nameCell = document.createElement("td");
    nameCell.textContent = country._translations['fr'] || "N/A";
    row.appendChild(nameCell);

    const populationCell = document.createElement("td");
    populationCell.textContent = country._population?.toLocaleString('fr-FR') || "N/A";
    populationCell.style.textAlign = "right"; 
    row.appendChild(populationCell);

    const areaCell = document.createElement("td");
    areaCell.textContent = country._superficie?.toLocaleString('fr-FR') || "N/A";
    areaCell.style.textAlign = "right";
    row.appendChild(areaCell);

    const densityCell = document.createElement("td");
    const density = country.getPopDensity();
    densityCell.textContent = density ? density.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : "N/A";
    densityCell.style.textAlign = "right";
    row.appendChild(densityCell);

    const continentCell = document.createElement("td");
    continentCell.textContent = country._continent || "N/A";
    row.appendChild(continentCell);

    const flagCell = document.createElement("td");
    const flagImg = document.createElement("img");
    flagImg.src = country._drapeau || "";
    flagImg.alt = `Drapeau de ${country._translations['fr']}`;
    flagImg.style.height = "30px";
    flagImg.addEventListener("click", (e) => {
        e.stopPropagation(); 
        largeFlag.src = country._drapeau;
        flagOverlay.style.display = "flex";
    });
    flagCell.appendChild(flagImg);
    row.appendChild(flagCell);

    row.addEventListener("click", () => showCountryDetails(country));
    return row;
};

const filterCountries = () => {
    const selectedContinent = continentFilter.value;
    const selectedLanguage = languageFilter.value;
    const searchText = countryFilter.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return Object.values(Country.all_countries).filter(country => {
        const matchesContinent = !selectedContinent || country._continent === selectedContinent;
        const matchesLanguage = !selectedLanguage || country._languages.some(lang => lang.name === selectedLanguage);
        const matchesName = !searchText || 
            (country._translations['fr']?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchText) ||
             country._nom?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchText));
        return matchesContinent && matchesLanguage && matchesName;
    });
};

const displayCountries = () => {
    tableBody.innerHTML = "";

    const filteredCountries = filterCountries();

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const countries = filteredCountries.slice(startIndex, endIndex);

    countries.forEach(country => {
        const row = createCountryRow(country);
        tableBody.appendChild(row);
    });

    pageInfo.textContent = `Page ${currentPage} sur ${Math.ceil(filteredCountries.length / ITEMS_PER_PAGE)}`;

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = endIndex >= filteredCountries.length;
};

const populateFilters = () => {
    const continents = new Set();
    const languages = new Set();

    Object.values(Country.all_countries).forEach(country => {
        continents.add(country._continent);
        country._languages.forEach(lang => languages.add(lang.name));
    });

    continents.forEach(continent => {
        const option = document.createElement("option");
        option.value = continent;
        option.textContent = continent;
        continentFilter.appendChild(option);
    });

    languages.forEach(language => {
        const option = document.createElement("option");
        option.value = language;
        option.textContent = language;
        languageFilter.appendChild(option);
    });
};

const showCountryDetails = (country) => {
    detailsName.textContent = country._translations['fr'] || "N/A";
    detailsPopulation.textContent = country._population?.toLocaleString() || "N/A";
    detailsArea.textContent = country._superficie?.toLocaleString() || "N/A";
    detailsDensity.textContent = country.getPopDensity()?.toFixed(2) || "N/A";
    detailsContinent.textContent = country._continent || "N/A";
    detailsNeighbors.textContent = country._pays_voisins.map(code => Country.all_countries[code]?._translations['fr'] || code).join(", ") || "N/A";
    detailsLanguages.textContent = country._languages.map(lang => lang.name).join(", ") || "N/A";
    detailsCurrencies.textContent = country._currencies.map(currency => currency.name).join(", ") || "N/A";
    detailsOverlay.style.display = "flex";
};

continentFilter.addEventListener("change", () => {
    currentPage = 1;
    displayCountries();
});

languageFilter.addEventListener("change", () => {
    currentPage = 1;
    displayCountries();
});

countryFilter.addEventListener("input", () => {
    currentPage = 1;
    displayCountries();
});

prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayCountries();
    }
});

nextButton.addEventListener("click", () => {
    const filteredCountries = filterCountries();
    const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
        currentPage++;
        displayCountries();
    }
});

closeDetailsButton.addEventListener("click", () => {
    detailsOverlay.style.display = "none";
});

closeFlagButton.addEventListener("click", () => {
    flagOverlay.style.display = "none";
});

populateFilters();
displayCountries();