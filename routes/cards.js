const cardsRouter = require('express').Router();

const {
  createCard,
  deleteCard,
  findCards,
  findCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.post('/', createCard);

cardsRouter.get('/', findCards);

cardsRouter.get('/:id', findCard);

cardsRouter.delete('/:id', deleteCard);

cardsRouter.put('/:cardId/likes', likeCard);

cardsRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRouter;
