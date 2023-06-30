const router = require('express').Router();
const userRoutes = require('./users');
const signinRoutes = require('./signin');
const signupRoutes = require('./signup');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use(auth);
router.use(userRoutes);
router.use(cardRoutes);
router.use(signinRoutes);
router.use(signupRoutes);

router.use('*', (req, res, next) => {
  // res.status(404).json({ message: 'Not Found' });
  // throw new NotFoundError('not found'); // have no idea
  next(new NotFoundError('not found'));
});

module.exports = router;
