const authRouter = require('express').Router();

const bodyParser = require('body-parser');

const { celebrate, Joi } = require('celebrate');

const { createUser, login } = require('../controllers/user');

authRouter.use(bodyParser.json());
authRouter.use(bodyParser.urlencoded({ extended: true }));

authRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

authRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

module.exports = authRouter;
