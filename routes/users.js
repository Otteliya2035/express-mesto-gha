const express = require('express');

const router = express.Router();
const userController = require('../controllers/users');

// Роут для получения всех пользователей
router.get('/', userController.getUsers);

// Роут для получения пользователя по _id
router.get('/:userId', userController.getUserById);

// Роут для создания пользователя
router.post('/', userController.createUser);

// Роут для обновления профиля пользователя
router.patch('/me', userController.updateUserProfile);

// Роут для обновления аватара пользователя
router.patch('/me/avatar', userController.updateUserAvatar);

module.exports = router;
