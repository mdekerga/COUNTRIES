function outsideTheContinent() {
    const result = Object.values(Country.all_countries).filter(country =>
        country._pays_voisins.some(border => Country.all_countries[border]?._continent !== country._continent)
    );
    console.table(result);
}

function moreNeighbors() {
    let maxNeighbors = 0;
    let result = [];
    
    Object.values(all_countries).forEach(country => {
        if (country.borders.length > maxNeighbors) {
            maxNeighbors = country.borders.length;
            result = [country];
        } else if (country.borders.length === maxNeighbors) {
            result.push(country);
        }
    });
    console.table(result);
}

function neighborless() {
    const result = Object.values(all_countries).filter(country => country.borders.length === 0);
    console.table(result);
}

function moreLanguages() {
    let maxLanguages = 0;
    let result = [];
    
    Object.values(all_countries).forEach(country => {
        if (country.languages.length > maxLanguages) {
            maxLanguages = country.languages.length;
            result = [country];
        } else if (country.languages.length === maxLanguages) {
            result.push(country);
        }
    });
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