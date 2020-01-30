/**
• Créer une fonction getWeather qui possède un paramètre cityId.
• Créer une classe Trip et ajouter un constructeur avec les propriétés : id, name, imageUrl.
• Créer
*/

let favoriteCityId = 'Rome';
console.log(favoriteCityId);

favoriteCityId = "Paris";
console.log(favoriteCityId);

const citiesId = ["paris", "nyc", "rome", "rio-de-janeiro"];
//citiesId =[];
console.log(citiesId);

citiesId.push("tokyo");
console.log(citiesId);


function getWeather(cityId) {
    this.city = cityId.toUpperCase();
    this.temperature = 20;
    return { city: this.city, temperature: this.temperature };
}

const weather = getWeather(favoriteCityId);
console.log(weather);

const { city } = weather;
const { temperature } = weather;

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
        return `Trip : [ ${this.id}, ${this.name}, ${this.imageUrl}, ${this._price} ]`;
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
        return `FreeTrip : [ ${this.id}, ${this.name}, ${this.imageUrl}, ${this._price} ]`;
    }
}

//instancier un objet a partir de la classe Trip, affecter la variable price
let parisTrip = new Trip('paris', 'Paris', 'img/paris.jpg');
parisTrip.price = 100;

console.log(parisTrip);
console.log(parisTrip.name);
console.log(parisTrip.toString());

//constante qui recupere instance de la methode getDefaultTrip() de la classe Trip
const getDefaultTrip = Trip.getDefaultTrip();
console.log(getDefaultTrip.toString());

const freeTrip = new FreeTrip('nantes', 'Nantes', 'img/nantes.jpg');
console.log(`${freeTrip.toString()}
`);


class TripService {
    constructor() {
        // TODO Set of 3 trips
        this.trips = new Set();
        this.trips.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
        this.trips.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
        this.trips.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));
    }

    findByName(tripName) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // ici l'exécution du code est asynchrone
                // TODO utiliser resolve et reject en fonction du résultat de la recherche
                let tripTrouve = new Array([...this.trips].filter(trip => trip.name === tripName));
                if(tripTrouve != ""){
                    resolve(tripTrouve);
                }else{
                    reject(`No trip with name ${tripName}`);
                }
            }, 2000)
        });
    }
}

class PriceService {
    constructor() {
        // TODO Map of 2 trips
        this.prices = new Map();
        this.prices.set('paris',100);
        this.prices.set('rio-de-janeiro',800);
        // 'paris' --> price == 100
        // 'rio-de-janeiro' --> price == 800)
        // no price for 'nantes'
    }
    findPriceByTripId(tripId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // ici l'exécution du code est asynchrone
                // TODO utiliser resolve et reject en fonction du résultat de la recherche
                if(this.prices.has(tripId)){
                    resolve(this.prices.get(tripId));
                }else{
                    reject(`No price for trip id ${tripId}`);
                }
            }, 2000)
        });
    }
}

const tripService = new TripService();
tripService.findByName("Paris")
.then(tripFind => console.log(`Trip found : ${tripFind}`))
.catch(err=> console.log(err));

tripService.findByName("Toulouse")
.then(tripFind => console.log(`Trip found : ${tripFind}`))
.catch(err=> console.log(err));


const priceService = new PriceService();
priceService.findPriceByTripId("rio-de-janeiro")
.then(tripFind => console.log(`Price found : ${tripFind}`))
.catch(err=> console.log(err));

priceService.findPriceByTripId("nantes")
.then(tripFind => console.log(`Price found : ${tripFind}`))
.catch(err=> console.log(err));


tripService.findByName("Rio de Janeiro")
.then(tripFind => console.log(`Trip found : ${tripFind}`))
.catch(err=> console.log(err))
.finally(function(){
    new PriceService().findPriceByTripId("rio-de-janeiro")
    .then(tripFind => console.log(`Price found : ${tripFind}`))
    .catch(err=> console.log(err));
});

tripService.findByName("Nantes")
.then(tripFind => console.log(`Trip found : ${tripFind}`))
.catch(err=> console.log(err))
.finally(function(){
    new PriceService().findPriceByTripId("nantes")
    .then(tripFind => console.log(`Price found : ${tripFind}`))
    .catch(err=> console.log(err));
});

