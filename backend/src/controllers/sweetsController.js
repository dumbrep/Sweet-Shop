const { validationResult } = require('express-validator');
const Sweet = require('../models/Sweet');

exports.createSweet = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, price, quantity, description } = req.body;

    const sweetExists = await Sweet.findOne({ name });
    if (sweetExists) {
      return res.status(400).json({ message: 'Sweet with this name already exists' });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
      description,
      createdBy: req.user._id
    });

    res.status(201).json({
      message: 'Sweet created successfully',
      sweet
    });
  } catch (error) {
    console.error('Create sweet error:', error);
    res.status(500).json({ message: 'Server error while creating sweet' });
  }
};

exports.getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find().populate('createdBy', 'username email');

    res.json({
      count: sweets.length,
      sweets
    });
  } catch (error) {
    console.error('Get sweets error:', error);
    res.status(500).json({ message: 'Server error while fetching sweets' });
  }
};

exports.searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    let query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (category) {
      query.category = category.toLowerCase();
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = parseFloat(maxPrice);
      }
    }

    const sweets = await Sweet.find(query).populate('createdBy', 'username email');

    res.json({
      count: sweets.length,
      sweets
    });
  } catch (error) {
    console.error('Search sweets error:', error);
    res.status(500).json({ message: 'Server error while searching sweets' });
  }
};

exports.updateSweet = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, category, price, quantity, description } = req.body;

    const sweet = await Sweet.findById(id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (name && name !== sweet.name) {
      const nameExists = await Sweet.findOne({ name });
      if (nameExists) {
        return res.status(400).json({ message: 'Sweet with this name already exists' });
      }
      sweet.name = name;
    }

    if (category) sweet.category = category;
    if (price !== undefined) sweet.price = price;
    if (quantity !== undefined) sweet.quantity = quantity;
    if (description !== undefined) sweet.description = description;

    await sweet.save();

    res.json({
      message: 'Sweet updated successfully',
      sweet
    });
  } catch (error) {
    console.error('Update sweet error:', error);
    res.status(500).json({ message: 'Server error while updating sweet' });
  }
};

exports.deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;

    const sweet = await Sweet.findById(id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    await Sweet.findByIdAndDelete(id);

    res.json({ 
      message: 'Sweet deleted successfully',
      deletedSweet: sweet
    });
  } catch (error) {
    console.error('Delete sweet error:', error);
    res.status(500).json({ message: 'Server error while deleting sweet' });
  }
};

exports.purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Valid quantity is required' });
    }

    const sweet = await Sweet.findById(id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ 
        message: 'Insufficient stock',
        available: sweet.quantity,
        requested: quantity
      });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    res.json({
      message: 'Purchase successful',
      sweet,
      purchased: quantity,
      totalCost: (sweet.price * quantity).toFixed(2)
    });
  } catch (error) {
    console.error('Purchase sweet error:', error);
    res.status(500).json({ message: 'Server error while purchasing sweet' });
  }
};

exports.restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Valid quantity is required' });
    }

    const sweet = await Sweet.findById(id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    sweet.quantity += quantity;
    await sweet.save();

    res.json({
      message: 'Restock successful',
      sweet,
      addedQuantity: quantity
    });
  } catch (error) {
    console.error('Restock sweet error:', error);
    res.status(500).json({ message: 'Server error while restocking sweet' });
  }
};