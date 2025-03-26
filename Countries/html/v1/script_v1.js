Country.fill_countries();

const tableBody = document.querySelector("#countries-table tbody");

const createCountryRow = (country) => {
    const row = document.createElement("tr");
    row.setAttribute("data-alpha3", country._alpha3); 

    const nameCell = document.createElement("td");
    nameCell.textContent = country._translations['fr'] || "N/A";
    row.appendChild(nameCell);

    const populationCell = document.createElement("td");
    populationCell.textContent = country._population?.toLocaleString('fr-FR') || "N/A";
    populationCell.style.textAlign = "right"; // Right-align numbers
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

const rows = Object.values(Country.all_countries).map(createCountryRow);

rows.forEach(row => tableBody.appendChild(row));