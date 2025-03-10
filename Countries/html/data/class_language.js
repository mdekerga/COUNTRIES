// class_language.js
class Language {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }

    toString() {
        return `${this.name} (${this.code})`;
    }

    static all_languages = {};

    static fill_languages() {
        countries.forEach(data => {
            data.languages.forEach(language => {
                let lang = new Language(
                    language.iso639_2,
                    language.name
                );
                Language.all_languages[language.iso639_2] = lang;
            });
        });
    }
}

/* let lang1 = new Language();
lang1.fill_languages();
Object.values(Language.all_languages).forEach(data => {
    console.log(data.toString());
}); */