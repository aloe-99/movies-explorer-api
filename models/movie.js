const mongoose = require('mongoose');

const { cirillicRegExp, latinRegExp, urlRegExp } = require('../utils/regExp');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    validate: {
      validator(v) {
        return urlRegExp.test(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
    type: String,
    required: true,
  },
  trailerLink: {
    validate: {
      validator(v) {
        return urlRegExp.test(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
    type: String,
    required: true,
  },
  thumbnail: {
    validate: {
      validator(v) {
        return urlRegExp.test(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    unique: true,
  },
  nameRU: {
    validate: {
      validator(v) {
        return cirillicRegExp.test(v);
      },
      message: (props) => `${props.value} is not a valid language!`,
    },
    type: String,
    required: true,
  },
  nameEN: {
    validate: {
      validator(v) {
        return latinRegExp.test(v);
      },
      message: (props) => `${props.value} is not a valid language!`,
    },
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
