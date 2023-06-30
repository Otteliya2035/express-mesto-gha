const router = require('express')();
const userRoutes = require('./users');
const signinRoutes = require('./signin');
const signupRoutes = require('./signup');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use(signinRoutes);
router.use(signupRoutes);
router.use('/users', auth, userRoutes);
router.use('/cards', auth, cardRoutes);

router.use('*', () => {
  throw new NotFoundError('not found');
});

module.exports = router;
