import {generatePoint} from './point-mock.js';
import {generateDestination} from './destination-mock.js';
import {generateOffer} from './offer-mock.js';

const DESTINATIONS = [
  generateDestination({
    id: 'amsterdam',
    name: 'Amsterdam',
    description: 'Amsterdam is the capital and most populous city of the Netherlands. Known for its artistic heritage, elaborate canal system and narrow houses with gabled facades.',
    pictures: [
      {src: 'img/photos/1.jpg', description: 'Amsterdam landscape'},
      {src: 'img/photos/2.jpg', description: 'Amsterdam landscape'}
    ]
  }),
  generateDestination({
    id: 'chamonix',
    name: 'Chamonix',
    description: 'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.',
    pictures: [
      {src: 'img/photos/1.jpg', description: 'Chamonix landscape'},
      {src: 'img/photos/2.jpg', description: 'Chamonix landscape'},
      {src: 'img/photos/3.jpg', description: 'Chamonix landscape'},
      {src: 'img/photos/4.jpg', description: 'Chamonix landscape'},
      {src: 'img/photos/5.jpg', description: 'Chamonix landscape'}
    ]
  }),
  generateDestination({
    id: 'geneva',
    name: 'Geneva',
    description: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    pictures: [
      {src: 'img/photos/1.jpg', description: 'Geneva landscape'},
      {src: 'img/photos/2.jpg', description: 'Geneva landscape'},
      {src: 'img/photos/3.jpg', description: 'Geneva landscape'}
    ]
  })
];

const OFFERS_BY_TYPE = {
  taxi: [
    generateOffer({id: 'taxi-1', title: 'Order Uber', price: 20}),
    generateOffer({id: 'taxi-2', title: 'Add luggage', price: 30}),
    generateOffer({id: 'taxi-3', title: 'Switch to comfort', price: 100})
  ],
  flight: [
    generateOffer({id: 'flight-1', title: 'Add luggage', price: 50}),
    generateOffer({id: 'flight-2', title: 'Switch to comfort', price: 80}),
    generateOffer({id: 'flight-3', title: 'Add meal', price: 15}),
    generateOffer({id: 'flight-4', title: 'Choose seats', price: 5})
  ],
  drive: [
    generateOffer({id: 'drive-1', title: 'Rent a car', price: 200}),
    generateOffer({id: 'drive-2', title: 'Add child seat', price: 10})
  ],
  'check-in': [
    generateOffer({id: 'check-in-1', title: 'Add breakfast', price: 50}),
    generateOffer({id: 'check-in-2', title: 'Room upgrade', price: 100})
  ],
  sightseeing: [
    generateOffer({id: 'sightseeing-1', title: 'Book tickets', price: 40}),
    generateOffer({id: 'sightseeing-2', title: 'Lunch in city', price: 30})
  ]
};

const POINTS = [
  generatePoint({
    id: 'point-1',
    type: 'taxi',
    destination: 'amsterdam',
    basePrice: 20,
    dateFrom: '2019-03-18T10:30:00.000Z',
    dateTo: '2019-03-18T11:00:00.000Z',
    isFavorite: true,
    offers: ['taxi-1']
  }),
  generatePoint({
    id: 'point-2',
    type: 'flight',
    destination: 'chamonix',
    basePrice: 160,
    dateFrom: '2019-03-18T12:25:00.000Z',
    dateTo: '2019-03-18T13:35:00.000Z',
    isFavorite: false,
    offers: ['flight-1', 'flight-2']
  }),
  generatePoint({
    id: 'point-3',
    type: 'drive',
    destination: 'chamonix',
    basePrice: 160,
    dateFrom: '2019-03-18T14:30:00.000Z',
    dateTo: '2019-03-18T16:05:00.000Z',
    isFavorite: true,
    offers: ['drive-1']
  })
];

export {DESTINATIONS, OFFERS_BY_TYPE, POINTS};

