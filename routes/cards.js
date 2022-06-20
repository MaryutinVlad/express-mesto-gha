const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createCard,
  deleteCard,
  findCards,
  findCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  })
}), createCard);

cardsRouter.get('/', findCards);

cardsRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  })
}), findCard);

cardsRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  })
}), deleteCard);

cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  })
}), likeCard);

cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  })
}), dislikeCard);

module.exports = cardsRouter;
