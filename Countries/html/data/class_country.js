class Country{
    static all_countries = []

    /*code Alpha3, nomFr, capitale, Continent, population,superficie, pays_voisins */ 
    constructor(_alpha3,_nom,_capitale,_continent,_population,_superficie,_pays_voisins = []){
        this.alpha3 = _alpha3;
        this.nom = _nom;
        this.capitale = _capitale;
        this.continent = _continent;
        this.population = _population;
        this.superficie = _superficie;
        this._pays_voisins = _pays_voisins
    }



    toString(){
        return this.alpha3 + ", " + this.nom + ", " + this.capitale + ", "+this.continent+", " + this.population + "hab, ";
    }


    fill_countries(){
        countries.forEach(data => {
            let country = new Country
            (
                data.alpha3Code,data.translation["fr"],
                data.capital,
                data.region,
                data.population,
                data.area,
            );
            all_countries[data.alpha3Code] = country;
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