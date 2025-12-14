const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} = require('../controllers/sweetsController');

const router = express.Router();

router.post(
  '/',
  auth,
  [
    body('name').trim().notEmpty().withMessage('Sweet name is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
  ],
  createSweet
);

router.get('/', auth, getAllSweets);

router.get('/search', auth, searchSweets);

router.put(
  '/:id',
  auth,
  [
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
  ],
  updateSweet
);

router.delete('/:id', auth, admin, deleteSweet);

router.post('/:id/purchase', auth, purchaseSweet);

router.post('/:id/restock', auth, admin, restockSweet);

module.exports = router;