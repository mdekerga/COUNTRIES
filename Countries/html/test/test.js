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
    
}

/* voisins qui n'ont pas de monnaies communes*/
function withoutCommonCurrency(){
    
}

function sortingDecreasingDensity(){
    let countriesArray = Object.values(Country.all_countries);
    let result = countriesArray.sort(function(a, b){return b.getPopDensity() - a.getPopDensity()});

    console.table(result)
}

function moreTopLevelDomains(){
    
}