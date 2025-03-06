class Currency{
    static all_currencies = []
    /*code, nom(anglais), symbole*/
    constructor(){
        
    }

    toString(){
        return this.code + ", " + this.nom + ", " + this.symbole;
    }

    fill_currencies(){
        countries.forEach(data => {
            let currency = new Currency();
            all_currencies[data.alpha3Code] = currency;
        });
    }
}