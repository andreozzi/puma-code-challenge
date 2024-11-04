const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/', userController.listUsers);
router.post('/:username', userController.addUser);
router.delete('/:username', userController.removeUser);
router.patch('/:username/toggle-star', userController.toggleStar);

module.exports = router;
