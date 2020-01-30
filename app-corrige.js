/*
setTimeout(() => {
    console.log('Formation !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
}, 5000);

setTimeout(function()  {
    console.log('Formation !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
}, 5000);

function show() {
    console.log('Formation !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
}

setInterval(show, 1000);
*/

/**
• Créer une fonction getWeather qui possède un paramètre cityId.
• Créer une classe Trip et ajouter un constructeur avec les propriétés : id, name, imageUrl.
• const > let
*/

let favoriteCityId = 'Rome';
console.log(favoriteCityId);

favoriteCityId = 'Paris';
console.log(favoriteCityId);

const citiesId = ['paris', 'nyc', 'rome', 'rio-de-janeiro'];
//citiesId =[];
console.log(citiesId);

citiesId.push('tokyo');
console.log(citiesId);


function getWeather(cityId) {
    const city = cityId.toUpperCase();
    const temperature = 20;
    return { city, temperature };
}

const weather = getWeather(favoriteCityId);
console.log(weather);

const { city, temperature } = weather;

console.log(city);
console.log(temperature);


const [parisId, nycId, ...othersCitiesId] = citiesId;
console.log(parisId);
console.log(nycId);
console.log(othersCitiesId.length);

class Trip {

    constructor(id, name, imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    get price() {
        return this._price;
    }

    set price(newPrice) {
        this._price = newPrice;
    }


    toString() {
        return `Trip [${this.id}, ${this.name}, ${this.imageUrl}, ${this._price}]`;
    }

    static getDefaultTrip() {
        return new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg');
    }

}

class FreeTrip extends Trip {

    constructor(id, name, imageUrl) {
        super(id, name, imageUrl);
        this.price = 0;
    }

    toString() {
        return `Free${super.toString()}`;
    }
}

//instancier un objet a partir de la classe Trip, affecter la variable price
let parisTrip = new Trip('paris', 'Paris', 'img/paris.jpg');
console.log(parisTrip);
console.log(parisTrip.name);

parisTrip.price = 100; //  set price(newPrice) { }


console.log(parisTrip.toString());

//constante qui recupere instance de la methode getDefaultTrip() de la classe Trip
const getDefaultTrip = Trip.getDefaultTrip();
console.log(getDefaultTrip.toString());

const freeTrip = new FreeTrip('nantes', 'Nantes', 'img/nantes.jpg');
console.log(`${freeTrip.toString()}
`);

/*
const tripSrv = new TripService();

// l'enfer du callback
tripSrv.findByName('Nice', () => {
    // OK
    tripSrv.findByName('Lyon', () => {

        tripSrv.findByName('Nantes', () => {

        }, () => {
            // KO
        })
    }, () => {
        // KO
    })
}, () => {
    // KO
});

const promesse1$ = tripSrv.findByName('Nice');
const promesse2$ = tripSrv.findByName('Lyon');
const promesse3$ = tripSrv.findByName('Nantes');

Promise.all([promesse1$ , promesse2$, promesse3$ ])
    .then(result => {
        // ici j'ai reçu toutes les réponses
    })

tripSrv.findByName('Nice')
    .then(() => tripSrv.findByName('Lyon'))
    .then(() => tripSrv.findByName('Nantes')) // OK => resolve
    .catch(obj => {}) // KO => reject

*/

class TripService {

    constructor() {
        // TODO Set of 3 trips
        this.trips = new Set();
        this.trips.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
        this.trips.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
        this.trips.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));
    }

    findByName(tripName, fnOK, fnKO) {

        return new Promise((resolve, reject) => {

            // 1
            setTimeout(() => {

                // 3

                // rechercher trip

                // ETATS => EN_COURS => RESOLUE
                //                      REJETEE

                for (const trip of this.trips) {
                    if(trip.name === tripName) {
                        resolve(trip);
                    }
                }

                // si pas trouvé
                reject(`No trip found with name ${tripName}`)


            }, 2000);

            // 2




        });

    }

}

class PriceService {
    constructor() {
        // TODO Map of 2 trips
        this.prices = new Map();
        this.prices.set('paris', 100);
        this.prices.set('rio-de-janeiro', 800);
        // 'paris' --> price == 100
        // 'rio-de-janeiro' --> price == 800)
        // no price for 'nantes'
    }
    findPriceByTripId(tripId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // ici l'exécution du code est asynchrone
                // TODO utiliser resolve et reject en fonction du résultat de la recherche
                const price = this.prices.get(tripId);

                if (price) {
                    resolve(price);
                } else {
                    reject(`No price for trip id ${tripId}`);
                }
            }, 2000)
        });
    }
}


const tripService = new TripService();
tripService.findByName("Paris")
    .then(tripFind => console.log(`Trip found : ${tripFind}`)) // ici
    .catch(err => console.log(err));

tripService.findByName("Toulouse")
    .then(tripFind => console.log(`Trip found : ${tripFind}`))
    .catch(err => console.log(err)); // là


const priceService = new PriceService();
priceService.findPriceByTripId("rio-de-janeiro")
    .then(priceFound => console.log(`Price found : ${priceFound}`)) // ici
    .catch(err => console.log(err));

priceService.findPriceByTripId("nantes")
    .then(tripFind => console.log(`Price found : ${tripFind}`))
    .catch(err => console.log(err)); // là

// du nom au prix
// nom => findByName => id => findById => prix

//const nomVoyage = 'Nice';
const nomVoyage = 'Rio de Janeiro';
tripService.findByName(nomVoyage)
    .then(trip => trip.id)
    .then(tripId => priceService.findPriceByTripId(tripId))
    .then(price => console.log(`Price Found ${price}`))
    .catch(err => console.log(err));
