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

    fill_currencies()
    {
        countries.forEach(data => 
            {
                data.currencies.forEach(currency =>{
                    let cur = new Currency
                    (
                        currency.code,
                        currency.name,
                        currency.symbol
                    )
                    Currency.all_currencies[currency.code] = cur;
                })
            }
        );
    }
}

let cu1 = new Currency();
cu1.fill_currencies();
Object.values(Currency.all_currencies).forEach(data => {
    console.log(data.toString());
});