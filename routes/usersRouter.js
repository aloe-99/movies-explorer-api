const usersRouter = require('express').Router();

const {
  getAboutMe, updateProfile
} = require('../controllers/user');

usersRouter.get('/me', getAboutMe);

usersRouter.patch('/me', updateProfile);

module.exports = usersRouter;