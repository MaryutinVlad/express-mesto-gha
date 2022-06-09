const cardsRouter = require('express').Router();

const {
  createCard,
  deleteCard,
  findCards,
  findCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.post('/cards', createCard);

cardsRouter.get('/cards', findCards);

cardsRouter.get('/cards/:id', findCard);

cardsRouter.delete('/cards/:id', deleteCard);

cardsRouter.put('/cards/:cardId/likes', likeCard);

cardsRouter.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardsRouter;
