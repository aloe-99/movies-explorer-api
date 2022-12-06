const IternalServerError = 500;

module.exports = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(IternalServerError).send({ message: 'Неизвестная ошибка сервера' });
  }
  return next();
};
