function outsideTheContinent() {
    const result = Object.values(Country.all_countries).filter(country =>
        country._pays_voisins.some(border => Country.all_countries[border]?._continent !== country._continent)
    );
    console.table(result);
}

function moreNeighbors() {
    let maxNeighbors = 0;
    let result = [];
    
    Object.values(Country.all_countries).forEach(country => {
        if (country._pays_voisins.length > maxNeighbors) {
            maxNeighbors = country._pays_voisins.length;
            result = [{
                countryNom: country._nom,
                voisins: country._pays_voisins.toString()
            }];
        } else if (country._pays_voisins.length === maxNeighbors) {
            result.push({
                countryNom: country._nom,
                voisins: country._pays_voisins.toString()
            });
        }
    });
    
    // Affichage des résultats avec le pays et les noms de ses voisins
    console.table(result);
}


function neighborless() {
    const result = Object.values(Country.all_countries).filter(country => country._pays_voisins.length === 0);
    console.table(result);
}

function moreLanguages() {
    let maxLanguages = 0;
    let result = [];
    
    // Collect the countries with the most languages
    Object.values(Country.all_countries).forEach(country => {
        if (country._languages.length > maxLanguages) {
            maxLanguages = country._languages.length;
            result = [{
                countryNom: country._nom,
                languages: country._languages
            }];
        } else if (country._languages.length === maxLanguages) {
            result.push({
                countryNom: country._nom,
                languages: country._languages
            });
        }
    });
    
    // Output all results in one table
    console.table(result);
}


/* voisins qui ont au moins une langue commune*/
function withCommonLanguage(){
    let result = [];
    Object.values(Country.all_countries).forEach(country => {
        let voisins = country.getBorders();
        let commonLanguageFound = false;

        voisins.forEach(voisin => {
            // Check if there is any common language between the country and its neighbor
            const commonLanguages = country.getLanguages().filter(language =>
                voisin.getLanguages().includes(language)
            );

            if (commonLanguages.length > 0) {
                commonLanguageFound = true;
            }
        });

        if (commonLanguageFound) {
            result.push(country);
            console.log(country);
        }
    });

    console.table(result);
}

/* voisins qui n'ont pas de monnaies communes*/
function withoutCommonCurrency() {
    let result = [];

    // On parcourt tous les pays
    Object.values(Country.all_countries).forEach(country => {
        let voisins = country.getBorders();
        let nonCommonCurrencyFound = false;
       
        voisins.forEach(voisin => {
            const countryCurrencies = country.getCurrencies();
            const voisinCurrencies = voisin.getCurrencies();

            const commonCurrency = countryCurrencies.some(currency =>
                voisinCurrencies.includes(currency)
            );

            
            if (commonCurrency) {
                nonCommonCurrencyFound = false;
                return;  
            } else {
                nonCommonCurrencyFound = true;
            }
        });

        if (nonCommonCurrencyFound) {
            result.push(country);
        }
    });

    console.table(result);
}

function sortingDecreasingDensity(){
    let countriesArray = Object.values(Country.all_countries);
    let result = countriesArray.sort(function(a, b){return b.getPopDensity() - a.getPopDensity()});

    console.table(result)
}

function moreTopLevelDomains(){
    let result = [];

    Object.values(Country.all_countries).forEach(country=>{
        if(country._domains.length > 1){
            result.push(country);
        }
    })
    

    console.table(result);
}
