const usersRouter = require('express').Router();

const bodyParser = require('body-parser');

const { getAboutMe, updateProfile } = require('../controllers/user');

usersRouter.get('/me', getAboutMe);

usersRouter.patch('/me', updateProfile);

module.exports = usersRouter;
