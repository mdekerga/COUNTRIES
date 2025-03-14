class Country{
    static all_countries = [];

 
    constructor(alpha3,nom,capitale,continent,population,superficie,pays_voisins = [],languages,currency,domains,drapeau,translations){
        this._alpha3 = alpha3;
        this._nom = nom;
        this._capitale = capitale;
        this._continent = continent;
        this._population = population;
        this._superficie = superficie;
        this._pays_voisins = pays_voisins;
        this._languages = languages;
        this._currencies = currency;
        this._domains = domains;
        this._drapeau = drapeau;
        this._translations = translations
    }



    toString() {

        const frenchNeighbors = this._pays_voisins.map(code => {
            const neighbor = Country.all_countries[code];
            return neighbor ? neighbor._translations['fr'] : code; 
        });
    
        return `${this._alpha3}, ${this._translations['fr']}, ${this._capitale}, ${this._continent}, ${this._population} hab, (${frenchNeighbors.join(', ')}) `;
    }
    


    static fill_countries() {
        const noms = ["fr", "it", "es", "de"];
        countries.forEach(data => {
            
            const translations = noms.reduce((acc, lang) => {
                if (data.translations[lang]) {
                    acc[lang] = data.translations[lang];
                }
                return acc;
            }, {});


            let country = new Country(
                data.alpha3Code,
                data.name,
                data.capital,
                data.region,
                data.population,
                data.area,
                data.borders,
                data.languages,
                data.currencies,
                data.topLevelDomain,
                data.flag,
                translations
            );

            Country.all_countries[data.alpha3Code] = country;
        });
    }

    getPopDensity(){
        return this._population / this._superficie;
    }

    getBorders(){
        let borders = [];

        this._pays_voisins.forEach(border=>{
            borders.push(Country.all_countries[border]);
        })
        return borders;
    }

    getCurrencies(){
        let currencies = [];

        this._currencies.forEach(currency=>{
            currencies.push(Currency.all_currencies[currency.code]);
        })

        return currencies;
    }

    getLanguages(){
        let languages = [];
        
        this._languages.forEach(langue=>{
            languages.push(Language.all_languages[langue.iso639_2]);
        })

        return languages; 

    }
}


Country.fill_countries();
console.log(Country.all_countries["RUS"].toString());
