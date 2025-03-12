class Country{
    static all_countries = [];

    /*code Alpha3, nomFr, capitale, Continent, population,superficie, pays_voisins */ 
    constructor(alpha3,nom,capitale,continent,population,superficie,pays_voisins = [],languages,currency){
        this._alpha3 = alpha3;
        this._nom = nom;
        this._capitale = capitale;
        this._continent = continent;
        this._population = population;
        this._superficie = superficie;
        this._pays_voisins = pays_voisins;
        this._languages = languages;
        this._currencies = currency;
    }



    toString(){
        return `${this._alpha3}, ${this._nom}, ${this._capitale}, ${this._continent}, ${this._population} hab, ${this._pays_voisins} `;
    }


    static fill_countries(){
        countries.forEach(data => {
            
            let country = new Country
            (
                data.alpha3Code,
                data.translations['fr'],
                data.capital,
                data.region,
                data.population,
                data.area,
                data.borders,
                data.languages,
                data.currencies
                
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
console.log(Country.all_countries['ASM'].getLanguages());
