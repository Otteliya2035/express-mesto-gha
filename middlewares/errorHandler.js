const errorHandler = (err, req, res, next) => {
  console.log('work pls');

  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message || 'На сервере произошла ошибка' });
  }
  next();
};

module.exports = errorHandler;
