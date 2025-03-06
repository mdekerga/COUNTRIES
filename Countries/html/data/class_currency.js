class Currency{
    static all_currencies = []
    /*code, nom(anglais), symbole*/
    constructor(code,nom,symbole){
        this._code = code;
        this._nom = nom;
        this._symbole = symbole
    }

    toString(){
        return `${this._code}, ${this._nom}, ${this._symbole}`;
    }

    fill_currencies(){
        countries.forEach(data => {
            let currency = new Currency(data.code,data.name,data.symbol);
            all_currencies[data.alpha3Code] = currency;
        });
    }
}