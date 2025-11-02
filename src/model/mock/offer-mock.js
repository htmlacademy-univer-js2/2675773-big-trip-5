import Offer from '../offer.js';

const generateOffer = (overrides = {}) => {
  const defaultOffer = {
    id: crypto.randomUUID(),
    title: 'Add luggage',
    price: 30,
    ...overrides
  };

  return new Offer(defaultOffer);
};

export {generateOffer};

