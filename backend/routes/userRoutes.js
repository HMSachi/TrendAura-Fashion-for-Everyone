const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, updateUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const { registerUser, loginUser } = require('../controllers/authController');

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', loginUser);
router.route('/:id')
    .delete(protect, admin, deleteUser)
    .put(protect, admin, updateUser);

module.exports = router;
