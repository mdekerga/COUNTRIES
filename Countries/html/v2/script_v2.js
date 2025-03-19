Country.fill_countries();

// Constants
const ITEMS_PER_PAGE = 25;
let currentPage = 1;

// DOM
const tableBody = document.querySelector("#countries-table tbody");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const pageInfo = document.getElementById("page-info");

const createCountryRow = (country) => {
    const row = document.createElement("tr");

    // Nom français
    const nameCell = document.createElement("td");
    nameCell.textContent = country._translations['fr'] || "N/A";
    row.appendChild(nameCell);

    // Population
    const populationCell = document.createElement("td");
    populationCell.textContent = country._population?.toLocaleString() || "N/A";
    row.appendChild(populationCell);

    // Superficie
    const areaCell = document.createElement("td");
    areaCell.textContent = country._superficie?.toLocaleString() || "N/A";
    row.appendChild(areaCell);

    // Densité de population
    const densityCell = document.createElement("td");
    const density = country.getPopDensity();
    densityCell.textContent = density ? density.toFixed(2) : "N/A";
    row.appendChild(densityCell);

    // Continent
    const continentCell = document.createElement("td");
    continentCell.textContent = country._continent || "N/A";
    row.appendChild(continentCell);

    // Flag
    const flagCell = document.createElement("td");
    const flagImg = document.createElement("img");
    flagImg.src = country._drapeau || "";
    flagImg.alt = `Drapeau de ${country._translations['fr']}`;
    flagImg.style.height = "30px";
    flagCell.appendChild(flagImg);
    row.appendChild(flagCell);

    return row;
};

const displayCountries = () => {
    tableBody.innerHTML = "";

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const countries = Object.values(Country.all_countries).slice(startIndex, endIndex);

    countries.forEach(country => {
        const row = createCountryRow(country);
        tableBody.appendChild(row);
    });

    pageInfo.textContent = `Page ${currentPage}`;

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = endIndex >= Object.values(Country.all_countries).length;
};

prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayCountries();
    }
});

nextButton.addEventListener("click", () => {
    const totalPages = Math.ceil(Object.values(Country.all_countries).length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
        currentPage++;
        displayCountries();
    }
});

displayCountries();