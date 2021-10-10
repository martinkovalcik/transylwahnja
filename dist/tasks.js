"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task7 = exports.task6 = exports.task5 = exports.task4 = exports.task3 = exports.task2 = exports.task1 = void 0;
/**
 * 1. Vráťte pole s názvami všetkých krajín.
 */
const task1 = (countries) => {
    return countries.map(country => country.name);
};
exports.task1 = task1;
/**
 * 2. Vráťte pole s názvami európskych krajín.
 */
const task2 = (countries) => {
    return countries.filter(country => country.region === "Europe")
        .map(country => country.name);
};
exports.task2 = task2;
/**
 * Vráťte pole objektov s vlastnosťami name a area, popisujúce krajiny
 * s počtom obyvateľov nad 100 miliónov, teda:

  [ { name: 'Bangladesh', area: '147570 km2' },
    { name: 'Brazil', area: '8515767 km2' },
    { name: 'China', area: '9640011 km2' },
    ...
  ]
 */
const task3 = (countries) => {
    return countries.filter(country => country.population >= 100000000)
        // .map(country => {
        //   return { name: country.name, area: country.area + ' km2' };
        // });
        // .map(({name, area}) => {
        //   return { name, area: area + ' km2' };
        // });
        .map(({ name, area }) => ({ name, area: area + ' km2' }));
};
exports.task3 = task3;
/**
 * Vráťte pole všetkých jazykov, ktoré sa používajú Južnej Amerike bez duplicít, teda:
  [ { iso639_1: 'es', iso639_2: 'spa', name: 'Spanish', nativeName: 'Español' },
    { iso639_1: 'gn', iso639_2: 'grn', name: 'Guaraní', nativeName: "Avañe'ẽ" },
    { iso639_1: 'ay', iso639_2: 'aym', name: 'Aymara', nativeName: 'aymar aru'},
    ...
  ]
 */
const task4 = (countries) => {
    return countries.filter(country => country.subregion === "South America")
        .map(country => country.languages)
        .flat()
        .reduce((acc, lang) => acc.some(accVal => accVal.name === lang.name) ? acc : [...acc, lang], []);
};
exports.task4 = task4;
/**
 * Vráťte objekt, kde vlastnosti sú jazyky z Južnej Ameriky a ich hodnotami polia krajín z Južnej Ameriky,
 * v ktorých sa nimi hovorí, teda:
  {
    Spanish: ['Argentina', 'Bolivia (Plurinational State of)', 'Chile',...],
    Portuguese: [ 'Brazil' ],
    English: [ 'Falkland Islands (Malvinas)', 'Guyana',...],
    ...
  }
 */
const task5 = (countries) => {
    const langCountry = (country) => {
        return country.languages.map(language => ({ language: language.name, country: country.name }));
    };
    return countries.filter(country => country.subregion === "South America")
        .map(country => langCountry(country))
        .flat()
        .reduce((acc, { language, country }) => {
        // return acc[language] 
        //        ? { ...acc, [language] : [...acc[language], country]}
        //        : { ...acc, [language] : [country]}
        return { ...acc, [language]: [...(acc[language] || []), country] };
    }, {});
};
exports.task5 = task5;
/**
 *
 * Vráťte pole objektov s dvoma vlastnosťami, jazyk z Južnej Ameriky a krajiny z Južnej Ameriky,
 * v ktorých sa ním hovorí, teda:
  [ { language: 'Spanish', countries: ['Argentina', 'Bolivia (Plurinational State of)', 'Chile',...]},
    { language: 'Portuguese', countries: [ 'Brazil' ]},
    { language: 'English', countries: [ 'Falkland Islands (Malvinas)', 'Guyana',...]},
    ...
  ]
 */
const task6 = (_countries) => {
    return Object.entries((0, exports.task5)(_countries))
        //             .map(([language, countries]) => ({language, countries}));
        .map(pair => ({ language: pair[0], countries: pair[1] }));
};
exports.task6 = task6;
const pipe = (...fns) => fns.reduceRight((f, g) => (...args) => f(g(...args)));
const trace = (label, numberOfChars) => value => {
    const output = JSON.stringify(value).substring(0, numberOfChars);
    console.log(`============== ${label} ==============:
${output} ...
`);
    return value;
};
/**
 * Vráťte pre každú menu, ktorá sa používa aspoň v 5 krajinách, krajiny, v ktorých sa ňou platí a ich počet.
 * Výsledkom je usporiadané pole od najmenej používaných po najviac používané meny, teda:
  [ { currency: 'New Zealand dollar',
      countries: [ 'Cook Islands', 'New Zealand', 'Niue', 'Pitcairn', 'Tokelau' ],
      count: 5 },
    { currency: 'Central African CFA franc',
      countries: ['Cameroon', 'Central African Republic', 'Chad', 'Congo', 'Equatorial Guinea', 'Gabon'],
      count: 6 },
    ...
  ]
 */
const task7 = (countries) => {
    const currCountry = (country) => {
        return country.currencies.map(currency => ({ currency: currency.name, country: country.name }));
    };
    const currencyCountryPairs = (countries) => {
        return countries.flatMap(country => currCountry(country));
    };
    const currencyCountriesObject = (pairs) => {
        return pairs.reduce((acc, pair) => {
            return { ...acc, [pair.currency]: [...(acc[pair.currency] || []), pair.country] };
        }, {});
    };
    const toCurrencyObjects = (bigObject) => {
        return Object.entries(bigObject)
            .map(([currency, countries]) => ({ currency, countries, count: countries.length }));
    };
    const fivePlus = (currencyObjects) => {
        return currencyObjects.filter(currObj => currObj.count >= 5);
    };
    const sortCurrencyObjects = (currencyObjects) => {
        return currencyObjects.sort((a, b) => a.count - b.count);
    };
    return pipe(trace('vstup', 100), currencyCountryPairs, trace('pairs', 150), currencyCountriesObject, trace('object', 150), toCurrencyObjects, trace('currency objects', 800), fivePlus, trace('five plus', 800), sortCurrencyObjects, trace('final', 800))(countries);
};
exports.task7 = task7;
//# sourceMappingURL=tasks.js.map