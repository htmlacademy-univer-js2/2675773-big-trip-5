import Destination from '../destination.js';

const generateDestination = (overrides = {}) => {
  const defaultDestination = {
    id: 'chamonix',
    description: 'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'img/photos/1.jpg',
        description: 'Chamonix landscape'
      },
      {
        src: 'img/photos/2.jpg',
        description: 'Chamonix landscape'
      },
      {
        src: 'img/photos/3.jpg',
        description: 'Chamonix landscape'
      },
      {
        src: 'img/photos/4.jpg',
        description: 'Chamonix landscape'
      },
      {
        src: 'img/photos/5.jpg',
        description: 'Chamonix landscape'
      }
    ],
    ...overrides
  };

  return new Destination(defaultDestination);
};

export {generateDestination};

