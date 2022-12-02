const usersRouter = require('express').Router();

const bodyParser = require('body-parser');

const { celebrate, Joi } = require('celebrate');

const { getAboutMe, updateProfile } = require('../controllers/user');

usersRouter.use(bodyParser.json());
usersRouter.use(bodyParser.urlencoded({ extended: true }));

usersRouter.get('/me', getAboutMe);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateProfile);

module.exports = usersRouter;
