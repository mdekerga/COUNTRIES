class Country{
    static all_countries = []

    /*code Alpha3, nomFr, capitale, Continent, population,superficie, pays_voisins */ 
    constructor(alpha3,nom,capitale,continent,population,superficie,pays_voisins = []){
        this._alpha3 = alpha3;
        this._nom = nom;
        this._capitale = capitale;
        this._continent = continent;
        this._population = population;
        this._superficie = superficie;
        this._pays_voisins = pays_voisins;
    }



    toString(){
        return `${this._alpha3}, ${this._nom}, ${this._capitale}, ${this._continent}, ${this._population} hab, `;
    }


    fill_countries(){
        countries.forEach(data => {
            let country = new Country
            (
                data.alpha3Code,data.name,
                data.capital,
                data.region,
                data.population,
                data.area,
            );
            Country.all_countries[data.alpha3Code] = country;
        });
    }

    getPopDensity(){
        return this.population / this.densite;
    }

    getBorders(){
        return
    }

    getCurrencies(){
        return
    }

    getLanguages(){
        return 
    }
}

let c1 = new Country();
c1.fill_countries();
console.table(Country.all_countries);