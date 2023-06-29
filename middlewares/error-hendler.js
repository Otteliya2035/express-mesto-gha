const errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else if (err.status === 404) {
    res.status(404).json({ message: 'Not Found' });
  } else {
    res.status(500).send({ message: err.message || 'На сервере произошла ошибка' });
  }
  next();
};

module.exports = errorHandler;
