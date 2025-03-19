Country.fill_countries();

const tableBody = document.querySelector("#countries-table tbody");

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

const rows = Object.values(Country.all_countries).map(createCountryRow);

rows.forEach(row => tableBody.appendChild(row));