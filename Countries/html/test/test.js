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

function withCommonLanguage(){
    console.log();
}

function withoutCommonCurrency(){
    console.log();
}

function sortingDecreasingDensity(){
    console.log();
}

function moreTopLevelDomains(){
    console.log();
}