const express = require('express');
const router = express.Router();
const { getUsers, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const { registerUser, loginUser } = require('../controllers/authController');

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', loginUser);
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;
