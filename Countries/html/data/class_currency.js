class Currency
{
    static all_currencies = []
    /*code, nom(anglais), symbole*/
    constructor(code,nom,symbole){
        this._code = code;
        this._nom = nom;
        this._symbole = symbole
    }

    toString()
    {
        return `${this._code}, ${this._nom}, ${this._symbole}`;
    }

    static fill_currencies() {
        countries.forEach(country => {
            if (country.currencies) {
                country.currencies.forEach(currency => {
                    const newCurrency = new Currency(currency.code, currency.name, currency.symbol);
                    Currency.all_currencies[currency.code] = newCurrency;
                });
            }
        });
    }
}



Currency.fill_currencies();
